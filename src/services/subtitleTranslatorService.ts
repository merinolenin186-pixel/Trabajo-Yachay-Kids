import { QUECHUA_DICTIONARY, translateOffline } from '../data/quechuaDictionary';
import { AppLanguage, QuechuaDialect, SubtitleCue } from '../types';

export interface TranslatedTriplet {
  spanish: string;
  quechuaChanka: string;
  quechuaCollao: string;
}

const PHRASE_MAP_ES_TO_QU: Record<string, { chanka: string; collao: string }> = {
  'hola': { chanka: 'Rimaykullayki', collao: 'Napaykullayki' },
  'hola niños': { chanka: 'Rimaykullayki warmakuna', collao: 'Napaykullayki erqekuna' },
  'hola amiguitos': { chanka: 'Rimaykullayki masiykuna', collao: 'Napaykullayki masiykuna' },
  'buenos días': { chanka: 'Allin p\'unchaw', collao: 'Allin p\'unchay' },
  'buenas tardes': { chanka: 'Allin ch\'isi', collao: 'Allin sukha' },
  'buenas noches': { chanka: 'Allin tuta', collao: 'Allin tuta' },
  'cómo estás': { chanka: 'Allillanchu kachkanki', collao: 'Allillanchu kashanki' },
  'estoy bien': { chanka: 'Allillanmi kani', collao: 'Allillanmi kani' },
  'gracias': { chanka: 'Añay', collao: 'Sulpayki' },
  'muchas gracias': { chanka: 'Ancha añay', collao: 'Ancha sulpayki' },
  'por favor': { chanka: 'Allichu', collao: 'Allichu' },
  'hasta luego': { chanka: 'Tupananchikkama', collao: 'Tupananchiskama' },
  'hasta mañana': { chanka: 'Paqarinkama', collao: 'Paqarinkama' },
  'bienvenidos': { chanka: 'Allin hamusqaykichik', collao: 'Allin jamusqaykichis' },
  'aprendamos juntos': { chanka: 'Kuska yachakusunchik', collao: 'Kuska yachakusunchis' },
  'vamos a jugar': { chanka: 'Pukllasunchik', collao: 'Pukllasunchis' },
  'vamos a cantar': { chanka: 'Takisunchik', collao: 'Takisunchis' },
  'agua': { chanka: 'Yaku', collao: 'Unu' },
  'sol': { chanka: 'Inti', collao: 'Inti' },
  'luna': { chanka: 'Killa', collao: 'Killa' },
  'madre tierra': { chanka: 'Pachamama', collao: 'Pachamama' },
  'familia': { chanka: 'Ayllu', collao: 'Ayllu' },
  'escuela': { chanka: 'Yachaywasi', collao: 'Yachaywasi' },
  'te quiero': { chanka: 'Kuyayki', collao: 'Munakuyki' },
};

const WORD_STOPWORDS_ES: Record<string, string> = {
  'el': '',
  'la': '',
  'los': '',
  'las': '',
  'un': 'huk',
  'una': 'huk',
  'y': 'hinallataq',
  'de': '-manta',
  'en': '-pi',
  'con': '-wan',
  'para': '-paq',
  'muy': 'ancha',
  'mi': '-y',
  'es': 'mi',
  'son': 'mi',
};

function normalizeText(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[¿?¡!.,;:()"]/g, '')
    .trim();
}

function translateSingleLineOffline(
  line: string,
  sourceLang: 'spanish' | 'quechua' | 'auto'
): TranslatedTriplet {
  const trimmed = line.trim();
  if (!trimmed) {
    return { spanish: '', quechuaChanka: '', quechuaCollao: '' };
  }

  const norm = normalizeText(trimmed);

  // Detect probable source language if auto
  let effectiveLang: 'spanish' | 'quechua' = sourceLang === 'auto' ? 'spanish' : sourceLang;
  if (sourceLang === 'auto') {
    const quMarkers = ['kuna', 'nchik', 'nchis', 'lla', 'yaku', 'inti', 'allin', 'añay', 'sulpayki', 'pacha', 'wasi', 'warmi', 'qari', 'uywa', 'yachay'];
    const lower = trimmed.toLowerCase();
    const hasQuMarker = quMarkers.some((m) => lower.includes(m));
    const exactQuEntry = QUECHUA_DICTIONARY.some((d) => normalizeText(d.quechua) === norm);
    if (hasQuMarker || exactQuEntry) {
      effectiveLang = 'quechua';
    }
  }

  if (effectiveLang === 'spanish') {
    // 1. Exact phrase match
    if (PHRASE_MAP_ES_TO_QU[norm]) {
      return {
        spanish: trimmed,
        quechuaChanka: PHRASE_MAP_ES_TO_QU[norm].chanka,
        quechuaCollao: PHRASE_MAP_ES_TO_QU[norm].collao,
      };
    }

    // 2. Dictionary entry match
    const chankaAttempt = translateOffline(trimmed, 'es', 'chanka');
    const collaoAttempt = translateOffline(trimmed, 'es', 'collao');
    if (chankaAttempt.entry) {
      return {
        spanish: trimmed,
        quechuaChanka: chankaAttempt.translated,
        quechuaCollao: collaoAttempt.translated,
      };
    }

    // 3. Word-by-word offline composition with Quechua dictionary
    const words = trimmed.split(/\s+/);
    const chankaWords: string[] = [];
    const collaoWords: string[] = [];

    for (const rawWord of words) {
      const cleanW = normalizeText(rawWord);
      if (!cleanW) continue;

      if (PHRASE_MAP_ES_TO_QU[cleanW]) {
        chankaWords.push(PHRASE_MAP_ES_TO_QU[cleanW].chanka.toLowerCase());
        collaoWords.push(PHRASE_MAP_ES_TO_QU[cleanW].collao.toLowerCase());
        continue;
      }

      const match = QUECHUA_DICTIONARY.find((d) => {
        const esNorm = normalizeText(d.spanish);
        return esNorm === cleanW || esNorm.split('/').some((p) => p.trim() === cleanW);
      });

      if (match) {
        chankaWords.push((match.chankaVariation || match.quechua).split('/')[0].trim().toLowerCase());
        collaoWords.push((match.collaoVariation || match.quechua).split('/')[0].trim().toLowerCase());
      } else if (WORD_STOPWORDS_ES[cleanW] !== undefined) {
        const mapped = WORD_STOPWORDS_ES[cleanW];
        if (mapped && !mapped.startsWith('-')) {
          chankaWords.push(mapped);
          collaoWords.push(mapped === 'huk' ? 'juk' : mapped);
        }
      } else {
        chankaWords.push(rawWord);
        collaoWords.push(rawWord);
      }
    }

    const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : trimmed);
    return {
      spanish: trimmed,
      quechuaChanka: chankaWords.length > 0 ? cap(chankaWords.join(' ')) : trimmed,
      quechuaCollao: collaoWords.length > 0 ? cap(collaoWords.join(' ')) : trimmed,
    };
  } else {
    // Source is Quechua -> translate to Spanish and ensure both dialect forms
    const esAttempt = translateOffline(trimmed, 'qu', 'chanka');
    if (esAttempt.entry) {
      return {
        spanish: esAttempt.translated,
        quechuaChanka: (esAttempt.entry.chankaVariation || esAttempt.entry.quechua).split('/')[0].trim(),
        quechuaCollao: (esAttempt.entry.collaoVariation || esAttempt.entry.quechua).split('/')[0].trim(),
      };
    }

    const words = trimmed.split(/\s+/);
    const esWords: string[] = [];
    for (const rawWord of words) {
      const cleanW = normalizeText(rawWord);
      const match = QUECHUA_DICTIONARY.find(
        (d) =>
          normalizeText(d.quechua) === cleanW ||
          (d.chankaVariation && normalizeText(d.chankaVariation).includes(cleanW)) ||
          (d.collaoVariation && normalizeText(d.collaoVariation).includes(cleanW))
      );
      if (match) {
        esWords.push(match.spanish.split('/')[0].trim().toLowerCase());
      } else {
        esWords.push(rawWord);
      }
    }

    const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : trimmed);
    const chankaOut = trimmed.replace(/\bjuk\b/gi, 'huk').replace(/\bunu\b/gi, 'yaku').replace(/\bsulpayki\b/gi, 'añay');
    const collaoOut = trimmed.replace(/\bhuk\b/gi, 'juk').replace(/\byaku\b/gi, 'unu').replace(/\bañay\b/gi, 'sulpayki');

    return {
      spanish: esWords.length > 0 ? cap(esWords.join(' ')) : trimmed,
      quechuaChanka: chankaOut,
      quechuaCollao: collaoOut,
    };
  }
}

/**
 * Translates an array of lines using Gemini AI backend when online,
 * seamlessly falling back to the 100% offline Quechua-Spanish engine when offline.
 */
export async function translateLinesAutomatically(
  lines: string[],
  sourceLang: 'spanish' | 'quechua' | 'auto' = 'auto'
): Promise<{ translations: TranslatedTriplet[]; usedOnlineAI: boolean }> {
  const nonEmpty = lines.map((l) => l.trim()).filter(Boolean);
  if (nonEmpty.length === 0) {
    return { translations: [], usedOnlineAI: false };
  }

  // Attempt online server-side translation when online
  if (typeof navigator === 'undefined' || navigator.onLine) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 9000);
      const response = await fetch('/api/translate-subtitles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lines: nonEmpty, sourceLang }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.translations) && data.translations.length === nonEmpty.length) {
          return {
            translations: data.translations,
            usedOnlineAI: true,
          };
        }
      }
    } catch {
      // Offline or unreachable server -> proceed seamlessly with local offline engine
    }
  }

  const offlineResults = nonEmpty.map((l) => translateSingleLineOffline(l, sourceLang));
  return {
    translations: offlineResults,
    usedOnlineAI: false,
  };
}

/**
 * Translates a single text or description into Spanish, Quechua Chanka, and Quechua Collao.
 */
export async function translateSingleTextAutomatically(
  text: string,
  sourceLang: 'spanish' | 'quechua' | 'auto' = 'auto'
): Promise<TranslatedTriplet & { usedOnlineAI: boolean }> {
  if (!text.trim()) {
    return { spanish: '', quechuaChanka: '', quechuaCollao: '', usedOnlineAI: false };
  }
  const res = await translateLinesAutomatically([text], sourceLang);
  const first = res.translations[0] || {
    spanish: text,
    quechuaChanka: text,
    quechuaCollao: text,
  };
  return {
    ...first,
    usedOnlineAI: res.usedOnlineAI,
  };
}

/**
 * Parses a user-entered script (supports optional timestamps like "00:05 Texto" or plain sentences/lines)
 * and automatically translates every subtitle cue into Spanish, Quechua Chanka, and Quechua Collao.
 */
export async function parseAndAutoTranslateSubtitles(
  rawScript: string,
  sourceLang: 'spanish' | 'quechua' | 'auto',
  totalDurationSeconds = 30
): Promise<{ cues: SubtitleCue[]; usedOnlineAI: boolean }> {
  const cleanScript = rawScript.trim();
  if (!cleanScript) {
    return { cues: [], usedOnlineAI: false };
  }

  // Split by newlines; if single long line with multiple sentences, split by sentence punctuation
  let rawLines = cleanScript
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (rawLines.length === 1 && rawLines[0].length > 75) {
    const sentenceParts = rawLines[0]
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (sentenceParts.length > 1) {
      rawLines = sentenceParts;
    }
  }

  // Parse optional timestamps: "00:05 Hola" or "[0:12] Hola" or "5s Hola"
  const timestampRegex = /^\[?(\d{1,2}):(\d{2})\]?\s*[-–:]?\s*(.+)$/;
  const parsedInputs: { explicitStart?: number; text: string }[] = [];

  for (const line of rawLines) {
    const match = line.match(timestampRegex);
    if (match) {
      const mins = parseInt(match[1], 10);
      const secs = parseInt(match[2], 10);
      parsedInputs.push({
        explicitStart: mins * 60 + secs,
        text: match[3].trim(),
      });
    } else {
      parsedInputs.push({ text: line });
    }
  }

  const { translations, usedOnlineAI } = await translateLinesAutomatically(
    parsedInputs.map((p) => p.text),
    sourceLang
  );

  const safeDuration = Math.max(totalDurationSeconds, parsedInputs.length * 3);
  const sliceDuration = safeDuration / Math.max(parsedInputs.length, 1);

  const cues: SubtitleCue[] = parsedInputs.map((item, idx) => {
    const start =
      item.explicitStart !== undefined
        ? item.explicitStart
        : Math.round(idx * sliceDuration);
    const nextExplicit = parsedInputs[idx + 1]?.explicitStart;
    const end =
      nextExplicit !== undefined
        ? Math.max(start + 1, nextExplicit)
        : Math.round((idx + 1) * sliceDuration);

    const t = translations[idx] || {
      spanish: item.text,
      quechuaChanka: item.text,
      quechuaCollao: item.text,
    };

    return {
      id: `cue-${Date.now()}-${idx}`,
      startTime: start,
      endTime: end,
      spanish: t.spanish,
      quechuaChanka: t.quechuaChanka,
      quechuaCollao: t.quechuaCollao,
    };
  });

  return { cues, usedOnlineAI };
}

/**
 * Returns the exact subtitle string matching the active app language and dialect.
 * If missing, translates on-the-fly with the offline engine.
 */
export function getLocalizedSubtitleText(
  cue: SubtitleCue,
  appLang: AppLanguage,
  dialect: QuechuaDialect
): string {
  if (appLang === 'spanish') {
    if (cue.spanish?.trim()) return cue.spanish;
    const base = cue.quechuaChanka || cue.quechuaCollao || '';
    return translateSingleLineOffline(base, 'quechua').spanish;
  }

  if (dialect === 'collao') {
    if (cue.quechuaCollao?.trim()) return cue.quechuaCollao;
    if (cue.quechuaChanka?.trim()) return cue.quechuaChanka;
    return translateSingleLineOffline(cue.spanish || '', 'spanish').quechuaCollao;
  }

  if (cue.quechuaChanka?.trim()) return cue.quechuaChanka;
  if (cue.quechuaCollao?.trim()) return cue.quechuaCollao;
  return translateSingleLineOffline(cue.spanish || '', 'spanish').quechuaChanka;
}
