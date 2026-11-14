import 'dotenv/config';
import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '12mb' }));

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', app: 'Yachay Kids' });
});

// Automatic subtitle and description translation endpoint (Spanish <-> Quechua Chanka & Collao)
app.post('/api/translate-subtitles', async (req, res) => {
  try {
    const { lines, sourceLang } = req.body as {
      lines?: string[];
      sourceLang?: 'spanish' | 'quechua' | 'auto';
    };

    if (!Array.isArray(lines) || lines.length === 0) {
      res.status(400).json({ error: 'Se requiere un arreglo de líneas para traducir.' });
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      res.status(503).json({ error: 'Servicio de IA no disponible; usando traductor local offline.' });
      return;
    }

    const cleanLines = lines.map((l) => String(l ?? '').trim()).slice(0, 50);

    const prompt = `Eres un especialista en Educación Intercultural Bilingüe (EIB) del Perú, experto en español peruano, Quechua Chanka (Ayacucho/Apurímac/Huancavelica, trivocálico a/i/u) y Quechua Collao (Cusco/Puno/Arequipa, con glotalizadas y aspiradas).

Traduce cada una de las siguientes líneas de subtítulos o descripciones educativas infantiles (idioma origen indicado: "${sourceLang || 'auto'}") a:
1. spanish: Español claro, natural y amigable para niños.
2. quechuaChanka: Quechua Chanka (sin mezclar con Collao; ej: yaku, allqo, añay, huk).
3. quechuaCollao: Quechua Collao (sin mezclar con Chanka; ej: unu, allqu, sulpayki, juk).

Líneas a traducir (mantén exactamente el mismo orden y cantidad de elementos):
${JSON.stringify(cleanLines)}`;

    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            translations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  spanish: { type: Type.STRING },
                  quechuaChanka: { type: Type.STRING },
                  quechuaCollao: { type: Type.STRING },
                },
                required: ['spanish', 'quechuaChanka', 'quechuaCollao'],
              },
            },
          },
          required: ['translations'],
        },
      },
    });

    const rawText = (response.text ?? '{}').trim();
    const parsed = JSON.parse(rawText);
    res.json({
      source: 'gemini',
      translations: Array.isArray(parsed.translations) ? parsed.translations : [],
    });
  } catch (err) {
    console.error('Error translating subtitles:', err);
    res.status(500).json({ error: 'Error al traducir subtítulos con IA.' });
  }
});

// Transcribe uploaded short audio/video and produce translated bilingual subtitles
app.post('/api/transcribe-media', async (req, res) => {
  try {
    const { base64Data, mimeType } = req.body as {
      base64Data?: string;
      mimeType?: string;
    };

    if (!base64Data || !mimeType) {
      res.status(400).json({ error: 'Se requiere el archivo de audio o video en base64.' });
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      res.status(503).json({ error: 'Servicio de transcripción IA no disponible.' });
      return;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-transcribe',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType,
              data: base64Data,
            },
          },
          {
            text: 'Transcribe el contenido hablado de este audio o video educativo infantil en segmentos cortos con tiempos aproximados y tradúcelos al español, quechua chanka y quechua collao.',
          },
        ],
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            cues: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  startTime: { type: Type.NUMBER },
                  endTime: { type: Type.NUMBER },
                  spanish: { type: Type.STRING },
                  quechuaChanka: { type: Type.STRING },
                  quechuaCollao: { type: Type.STRING },
                },
                required: ['startTime', 'endTime', 'spanish', 'quechuaChanka', 'quechuaCollao'],
              },
            },
          },
          required: ['cues'],
        },
      },
    });

    const rawText = (response.text ?? '{}').trim();
    const parsed = JSON.parse(rawText);
    res.json({
      source: 'gemini',
      cues: Array.isArray(parsed.cues) ? parsed.cues : [],
    });
  } catch (err) {
    console.error('Error transcribing media:', err);
    res.status(500).json({ error: 'No se pudo transcribir automáticamente el archivo multimedia.' });
  }
});

async function startServer() {
  const httpServer = http.createServer(app);

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const disableHmr = process.env.DISABLE_HMR === 'true';
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        allowedHosts: true,
        ws: { server: httpServer },
        hmr: disableHmr ? false : { server: httpServer },
        watch: disableHmr ? null : undefined,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Yachay Kids server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
