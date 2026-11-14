import React, { useState, useRef } from 'react';
import { useAdmin, THEME_PRESETS } from '../../context/AdminContext';
import { VIDEO_STORIES_DATA } from '../../data/videoStoriesData';
import {
  parseAndAutoTranslateSubtitles,
  translateSingleTextAutomatically,
} from '../../services/subtitleTranslatorService';
import { saveMediaBlob, fileToBase64 } from '../../services/mediaStorage';
import { audioService } from '../../services/audioService';
import {
  AdminVideoItem,
  AdminAudioItem,
  SubtitleCue,
  VideoStory,
  AppLanguage,
  QuechuaDialect,
} from '../../types';
import {
  Palette,
  FileText,
  Layers,
  Film,
  Volume2,
  Shield,
  LogOut,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  RotateCcw,
  Languages,
  CheckCircle2,
  Upload,
  Mic,
  Square,
  ArrowLeft,
  Sparkles,
  Play,
} from 'lucide-react';

interface AdminDashboardProps {
  appLang: AppLanguage;
  dialect: QuechuaDialect;
  onExitAdmin: () => void;
}

type AdminTab = 'theme' | 'texts' | 'sections' | 'videos' | 'audios' | 'security';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  dialect,
  onExitAdmin,
}) => {
  const {
    adminUsername,
    logout,
    changeCredentials,
    themeConfig,
    updateTheme,
    applyPreset,
    resetTheme,
    customTexts,
    updateCustomTexts,
    resetCustomTexts,
    hiddenOptions,
    toggleHiddenItem,
    setUiFlag,
    restoreAllHiddenOptions,
    customVideos,
    addCustomVideo,
    deleteCustomVideo,
    customAudios,
    addCustomAudio,
    deleteCustomAudio,
    customSections,
    addCustomSection,
    deleteCustomSection,
    addItemToSection,
    removeItemFromSection,
  } = useAdmin();

  const [activeTab, setActiveTab] = useState<AdminTab>('theme');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const notify = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(null), 4000);
  };

  // --- TEXT AUTO-TRANSLATE HELPER ---
  const [translatingKey, setTranslatingKey] = useState<string | null>(null);

  const handleAutoTranslateTextField = async (
    field: 'heroTitle' | 'heroDescription' | 'videosBannerTitle' | 'videosBannerDescription' | 'pictogramsDescription' | 'translatorDescription',
    direction: 'es-to-qu' | 'qu-to-es'
  ) => {
    setTranslatingKey(field);
    const currentObj = customTexts[field];
    const sourceText = direction === 'es-to-qu' ? currentObj.spanish : currentObj.quechua;
    const res = await translateSingleTextAutomatically(
      sourceText,
      direction === 'es-to-qu' ? 'spanish' : 'quechua'
    );
    updateCustomTexts({
      [field]: {
        quechua:
          direction === 'es-to-qu'
            ? dialect === 'collao'
              ? res.quechuaCollao
              : res.quechuaChanka
            : currentObj.quechua,
        spanish: direction === 'qu-to-es' ? res.spanish : currentObj.spanish,
      },
    });
    setTranslatingKey(null);
    audioService.playSuccessSound();
    notify(
      res.usedOnlineAI
        ? 'Texto traducido automáticamente con IA.'
        : 'Texto traducido automáticamente con diccionario offline.'
    );
  };

  // --- CUSTOM VIDEO FORM STATE ---
  const [vTitle, setVTitle] = useState('');
  const [vDesc, setVDesc] = useState('');
  const [vCategory, setVCategory] = useState<VideoStory['category']>('cuentos');
  const [vSourceType, setVSourceType] = useState<'file' | 'url' | 'animated'>('file');
  const [vUrl, setVUrl] = useState('');
  const [vFile, setVFile] = useState<File | null>(null);
  const [vDuration, setVDuration] = useState(25);
  const [vColor, setVColor] = useState('#7c3aed');
  const [vSourceLang, setVSourceLang] = useState<'spanish' | 'quechua'>('spanish');
  const [vScript, setVScript] = useState('');
  const [vAutoTranslate, setVAutoTranslate] = useState(true);
  const [vPreviewCues, setVPreviewCues] = useState<SubtitleCue[]>([]);
  const [vBusy, setVBusy] = useState(false);

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setVFile(file);
    if (file && !vTitle) {
      setVTitle(file.name.replace(/\.[^/.]+$/, ''));
    }
    if (file) {
      const url = URL.createObjectURL(file);
      const vid = document.createElement('video');
      vid.preload = 'metadata';
      vid.onloadedmetadata = () => {
        if (Number.isFinite(vid.duration) && vid.duration > 0) {
          setVDuration(Math.ceil(vid.duration));
        }
        URL.revokeObjectURL(url);
      };
      vid.src = url;
    }
  };

  const handleTranscribeMediaForVideo = async () => {
    if (!vFile) return;
    if (vFile.size > 7 * 1024 * 1024) {
      notify('El archivo supera 7 MB para transcripción automática en línea. Escribe el texto para auto-traducirlo.');
      return;
    }
    setVBusy(true);
    try {
      const base64Data = await fileToBase64(vFile);
      const resp = await fetch('/api/transcribe-media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          base64Data,
          mimeType: vFile.type || 'video/mp4',
        }),
      });
      if (resp.ok) {
        const data = await resp.json();
        if (Array.isArray(data.cues) && data.cues.length > 0) {
          const formattedCues: SubtitleCue[] = data.cues.map((c: SubtitleCue, i: number) => ({
            id: `cue-${Date.now()}-${i}`,
            startTime: Number(c.startTime) || i * 4,
            endTime: Number(c.endTime) || (i + 1) * 4,
            spanish: c.spanish || '',
            quechuaChanka: c.quechuaChanka || '',
            quechuaCollao: c.quechuaCollao || '',
          }));
          setVPreviewCues(formattedCues);
          setVScript(formattedCues.map((c) => c.spanish || c.quechuaChanka).join('\n'));
          audioService.playSuccessSound();
          notify('Audio/video transcrito y subtítulos traducidos automáticamente.');
        } else {
          notify('No se detectó diálogo claro; ingresa el guion manualmente.');
        }
      } else {
        notify('Transcripción automática no disponible sin conexión; escribe el texto abajo para auto-traducirlo.');
      }
    } catch {
      notify('Sin conexión para transcribir archivo; escribe el guion y se traducirá offline.');
    } finally {
      setVBusy(false);
    }
  };

  const handlePreviewVideoSubtitles = async () => {
    if (!vScript.trim()) {
      notify('Escribe los subtítulos o el texto del video para traducirlos.');
      return;
    }
    setVBusy(true);
    const { cues, usedOnlineAI } = await parseAndAutoTranslateSubtitles(
      vScript,
      vSourceLang,
      vDuration
    );
    setVPreviewCues(cues);
    setVBusy(false);
    audioService.playPop();
    notify(
      usedOnlineAI
        ? 'Subtítulos traducidos automáticamente (Quechua Chanka, Collao y Español).'
        : 'Subtítulos traducidos automáticamente con el motor local offline.'
    );
  };

  const handleSaveVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vTitle.trim()) {
      notify('Ingresa un título para el video.');
      return;
    }
    if (vSourceType === 'file' && !vFile) {
      notify('Selecciona un archivo de video o cambia el tipo de origen a URL o Cuento.');
      return;
    }
    if (vSourceType === 'url' && !vUrl.trim()) {
      notify('Ingresa el enlace (URL) del video.');
      return;
    }

    setVBusy(true);
    try {
      const id = `vid-custom-${Date.now()}`;
      let mediaId: string | undefined;
      if (vSourceType === 'file' && vFile) {
        mediaId = `blob-${id}`;
        await saveMediaBlob(mediaId, vFile);
      }

      const [titleTrans, descTrans] = await Promise.all([
        translateSingleTextAutomatically(vTitle, vSourceLang),
        translateSingleTextAutomatically(vDesc || vTitle, vSourceLang),
      ]);

      let cues = vPreviewCues;
      if (vScript.trim() && (cues.length === 0 || vAutoTranslate)) {
        const parsed = await parseAndAutoTranslateSubtitles(vScript, vSourceLang, vDuration);
        cues = parsed.cues;
      }

      const newVideo: AdminVideoItem = {
        id,
        title: {
          spanish: titleTrans.spanish,
          quechua: dialect === 'collao' ? titleTrans.quechuaCollao : titleTrans.quechuaChanka,
        },
        description: {
          spanish: descTrans.spanish,
          quechua: dialect === 'collao' ? descTrans.quechuaCollao : descTrans.quechuaChanka,
        },
        category: vCategory,
        sourceType: vSourceType,
        mediaId,
        mediaUrl: vSourceType === 'url' ? vUrl.trim() : undefined,
        durationSeconds: Math.max(5, vDuration),
        thumbnailColor: vColor,
        icon: '🎬',
        autoTranslate: vAutoTranslate,
        sourceLang: vSourceLang,
        rawScript: vScript.trim(),
        subtitles: cues,
        createdAt: Date.now(),
      };

      addCustomVideo(newVideo);
      audioService.playSuccessSound();
      notify('Video guardado con subtítulos auto-traducidos.');

      setVTitle('');
      setVDesc('');
      setVUrl('');
      setVFile(null);
      setVScript('');
      setVPreviewCues([]);
    } finally {
      setVBusy(false);
    }
  };

  // --- CUSTOM AUDIO FORM STATE & MICROPHONE RECORDER ---
  const [aTitle, setATitle] = useState('');
  const [aDesc, setADesc] = useState('');
  const [aCategory, setACategory] = useState('Cuentos y Voces');
  const [aSourceType, setASourceType] = useState<'file' | 'recording' | 'tts'>('recording');
  const [aFile, setAFile] = useState<File | null>(null);
  const [aRecordedBlob, setARecordedBlob] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [aDuration, setADuration] = useState(15);
  const [aColor, setAColor] = useState('#0d9488');
  const [aSourceLang, setASourceLang] = useState<'spanish' | 'quechua'>('spanish');
  const [aScript, setAScript] = useState('');
  const [aAutoTranslate, setAAutoTranslate] = useState(true);
  const [aPreviewCues, setAPreviewCues] = useState<SubtitleCue[]>([]);
  const [aBusy, setABusy] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordStartRef = useRef<number>(0);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      audioChunksRef.current = [];
      recordStartRef.current = Date.now();

      recorder.ondataavailable = (ev) => {
        if (ev.data.size > 0) audioChunksRef.current.push(ev.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setARecordedBlob(blob);
        const secs = Math.max(3, Math.round((Date.now() - recordStartRef.current) / 1000));
        setADuration(secs);
        stream.getTracks().forEach((t) => t.stop());
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      audioService.playPop();
    } catch {
      notify('No se pudo acceder al micrófono. Verifica los permisos o sube un archivo de audio.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      audioService.playSuccessSound();
      notify('Audio grabado correctamente.');
    }
  };

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAFile(file);
    if (file && !aTitle) {
      setATitle(file.name.replace(/\.[^/.]+$/, ''));
    }
    if (file) {
      const url = URL.createObjectURL(file);
      const aud = document.createElement('audio');
      aud.preload = 'metadata';
      aud.onloadedmetadata = () => {
        if (Number.isFinite(aud.duration) && aud.duration > 0) {
          setADuration(Math.ceil(aud.duration));
        }
        URL.revokeObjectURL(url);
      };
      aud.src = url;
    }
  };

  const handlePreviewAudioSubtitles = async () => {
    if (!aScript.trim()) {
      notify('Escribe la letra, frase o transcripción del audio para traducir los subtítulos.');
      return;
    }
    setABusy(true);
    const { cues, usedOnlineAI } = await parseAndAutoTranslateSubtitles(
      aScript,
      aSourceLang,
      aDuration
    );
    setAPreviewCues(cues);
    setABusy(false);
    audioService.playPop();
    notify(
      usedOnlineAI
        ? 'Subtítulos del audio traducidos con IA.'
        : 'Subtítulos del audio traducidos con motor offline.'
    );
  };

  const handleSaveAudio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aTitle.trim()) {
      notify('Ingresa un título para el audio.');
      return;
    }
    if (aSourceType === 'file' && !aFile) {
      notify('Selecciona un archivo de audio (.mp3, .wav, .ogg).');
      return;
    }
    if (aSourceType === 'recording' && !aRecordedBlob) {
      notify('Graba un audio con el micrófono o cambia a Texto a Voz / Subir archivo.');
      return;
    }
    if (aSourceType === 'tts' && !aScript.trim()) {
      notify('Escribe el texto que reproducirá la voz educativa.');
      return;
    }

    setABusy(true);
    try {
      const id = `aud-custom-${Date.now()}`;
      let mediaId: string | undefined;

      if (aSourceType === 'file' && aFile) {
        mediaId = `blob-${id}`;
        await saveMediaBlob(mediaId, aFile);
      } else if (aSourceType === 'recording' && aRecordedBlob) {
        mediaId = `blob-${id}`;
        await saveMediaBlob(mediaId, aRecordedBlob);
      }

      const [titleTrans, descTrans] = await Promise.all([
        translateSingleTextAutomatically(aTitle, aSourceLang),
        translateSingleTextAutomatically(aDesc || aTitle, aSourceLang),
      ]);

      let cues = aPreviewCues;
      const scriptToUse = aScript.trim() || aDesc.trim() || aTitle.trim();
      if (scriptToUse && (cues.length === 0 || aAutoTranslate)) {
        const parsed = await parseAndAutoTranslateSubtitles(scriptToUse, aSourceLang, aDuration);
        cues = parsed.cues;
      }

      const newAudio: AdminAudioItem = {
        id,
        title: {
          spanish: titleTrans.spanish,
          quechua: dialect === 'collao' ? titleTrans.quechuaCollao : titleTrans.quechuaChanka,
        },
        description: {
          spanish: descTrans.spanish,
          quechua: dialect === 'collao' ? descTrans.quechuaCollao : descTrans.quechuaChanka,
        },
        category: aCategory.trim() || 'Educativo',
        sourceType: aSourceType,
        mediaId,
        durationSeconds: Math.max(3, aDuration),
        accentColor: aColor,
        autoTranslate: aAutoTranslate,
        sourceLang: aSourceLang,
        rawScript: scriptToUse,
        subtitles: cues,
        createdAt: Date.now(),
      };

      addCustomAudio(newAudio);
      audioService.playSuccessSound();
      notify('Audio guardado con subtítulos traducidos automáticamente.');

      setATitle('');
      setADesc('');
      setAFile(null);
      setARecordedBlob(null);
      setAScript('');
      setAPreviewCues([]);
    } finally {
      setABusy(false);
    }
  };

  // --- CUSTOM SECTION FORM STATE ---
  const [secTitle, setSecTitle] = useState('');
  const [secDesc, setSecDesc] = useState('');
  const [secIcon, setSecIcon] = useState('🎵');
  const [secColor, setSecColor] = useState('#0284c7');
  const [secBusy, setSecBusy] = useState(false);

  // Add item to existing custom section
  const [selectedSectionId, setSelectedSectionId] = useState<string>('');
  const [itemTitle, setItemTitle] = useState('');
  const [itemDesc, setItemDesc] = useState('');
  const [itemIcon, setItemIcon] = useState('✨');
  const [itemAudioId, setItemAudioId] = useState('');
  const [itemVideoId, setItemVideoId] = useState('');

  const handleCreateSection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!secTitle.trim()) {
      notify('Ingresa un título para la nueva sección.');
      return;
    }
    setSecBusy(true);
    const [tTrans, dTrans] = await Promise.all([
      translateSingleTextAutomatically(secTitle, 'auto'),
      translateSingleTextAutomatically(secDesc || secTitle, 'auto'),
    ]);

    const newSecId = `sec-${Date.now()}`;
    addCustomSection({
      id: newSecId,
      title: {
        spanish: tTrans.spanish,
        quechua: dialect === 'collao' ? tTrans.quechuaCollao : tTrans.quechuaChanka,
      },
      description: {
        spanish: dTrans.spanish,
        quechua: dialect === 'collao' ? dTrans.quechuaCollao : dTrans.quechuaChanka,
      },
      icon: secIcon,
      accentColor: secColor,
      items: [],
      createdAt: Date.now(),
    });
    setSelectedSectionId(newSecId);
    setSecTitle('');
    setSecDesc('');
    setSecBusy(false);
    audioService.playSuccessSound();
    notify('Nueva sección creada y visible en el inicio de la aplicación.');
  };

  const handleAddItemToSection = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetSecId = selectedSectionId || customSections[0]?.id;
    if (!targetSecId) {
      notify('Primero crea una sección para agregar elementos.');
      return;
    }
    if (!itemTitle.trim()) {
      notify('Ingresa el título de la tarjeta o actividad.');
      return;
    }

    const [tTrans, dTrans] = await Promise.all([
      translateSingleTextAutomatically(itemTitle, 'auto'),
      translateSingleTextAutomatically(itemDesc || itemTitle, 'auto'),
    ]);

    addItemToSection(targetSecId, {
      id: `item-${Date.now()}`,
      title: {
        spanish: tTrans.spanish,
        quechua: dialect === 'collao' ? tTrans.quechuaCollao : tTrans.quechuaChanka,
      },
      description: {
        spanish: dTrans.spanish,
        quechua: dialect === 'collao' ? dTrans.quechuaCollao : dTrans.quechuaChanka,
      },
      icon: itemIcon,
      audioId: itemAudioId || undefined,
      videoId: itemVideoId || undefined,
    });

    setItemTitle('');
    setItemDesc('');
    setItemAudioId('');
    setItemVideoId('');
    audioService.playSuccessSound();
    notify('Elemento agregado a la sección.');
  };

  // --- SECURITY FORM ---
  const [newUsername, setNewUsername] = useState(adminUsername);
  const [newPassword, setNewPassword] = useState('');

  const handleUpdateCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim() || newPassword.length < 4) {
      notify('Ingresa un usuario válido y contraseña de al menos 4 caracteres.');
      return;
    }
    changeCredentials(newUsername, newPassword);
    setNewPassword('');
    audioService.playSuccessSound();
    notify('Credenciales de administrador actualizadas.');
  };

  const navTabs: { id: AdminTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'theme', label: 'Colores y Tema', icon: Palette },
    { id: 'texts', label: 'Descripciones', icon: FileText },
    { id: 'sections', label: 'Secciones y Opciones', icon: Layers },
    { id: 'videos', label: 'Videos y Subtítulos', icon: Film },
    { id: 'audios', label: 'Audios Educativos', icon: Volume2 },
    { id: 'security', label: 'Cuenta Admin', icon: Shield },
  ];

  const mainTabsConfig = [
    { id: 'games', label: 'Juegos Educativos' },
    { id: 'translator', label: 'Traductor Quechua - Español' },
    { id: 'pictograms', label: 'Biblioteca de Pictogramas' },
    { id: 'videos', label: 'Videos, Cuentos y Audios' },
  ];

  const gamesConfig = [
    { id: 'numbers', label: 'Juego 1: Números (1 al 10)' },
    { id: 'memory', label: 'Juego 2: Memoria Bilingüe' },
    { id: 'colors', label: 'Juego 3: Los Colores' },
    { id: 'animals', label: 'Juego 4: Animales del Perú' },
    { id: 'foods', label: 'Juego 5: Frutas y Alimentos' },
  ];

  const pictogramCats = [
    { id: 'animales', label: 'Animales' },
    { id: 'alimentos', label: 'Alimentos' },
    { id: 'colores', label: 'Colores' },
    { id: 'numeros', label: 'Números' },
    { id: 'familia', label: 'Familia' },
    { id: 'cuerpo', label: 'Partes del cuerpo' },
    { id: 'naturaleza', label: 'Naturaleza' },
    { id: 'escuela', label: 'Escuela' },
    { id: 'emociones', label: 'Emociones' },
    { id: 'actividades', label: 'Actividades' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Admin Top Header */}
      <div className="bg-white dark:bg-slate-800 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-sm shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-['Fredoka']">
              Panel de Administración
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Sesión activa: <strong>{adminUsername}</strong> · Cambios guardados automáticamente en el dispositivo.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              audioService.playPop();
              onExitAdmin();
            }}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ver Aplicación</span>
          </button>

          <button
            onClick={() => {
              audioService.playPop();
              logout();
              onExitAdmin();
            }}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>

      {/* Status Toast */}
      {statusMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Admin Sub-Navigation */}
      <div className="bg-white dark:bg-slate-800 p-2 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {navTabs.map((t) => {
          const Icon = t.icon;
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => {
                audioService.playPop();
                setActiveTab(t.id);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap shrink-0 cursor-pointer ${
                active
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: COLORES Y TEMA */}
      {activeTab === 'theme' && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-['Fredoka']">
                Personalizar Colores de la Aplicación
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Elige una paleta predefinida o ajusta cada color a tu gusto en tiempo real.
              </p>
            </div>
            <button
              onClick={() => {
                audioService.playPop();
                resetTheme();
                notify('Colores originales restaurados.');
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 self-start cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Original</span>
            </button>
          </div>

          {/* Presets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {THEME_PRESETS.map((preset) => {
              const selected = themeConfig.presetId === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    audioService.playPop();
                    applyPreset(preset.id);
                    notify(`Paleta "${preset.name}" aplicada.`);
                  }}
                  className={`p-4 rounded-2xl border-2 text-left transition cursor-pointer ${
                    selected
                      ? 'border-amber-500 bg-amber-50/70 dark:bg-slate-900'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {preset.name}
                    </span>
                    <div className="flex items-center gap-1">
                      <span
                        className="w-4 h-4 rounded-full border border-black/10"
                        style={{ backgroundColor: preset.config.primaryColor }}
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-black/10"
                        style={{ backgroundColor: preset.config.secondaryColor }}
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-black/10"
                        style={{ backgroundColor: preset.config.backgroundColor }}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {preset.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Custom Color Pickers */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <label className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 cursor-pointer">
              <div>
                <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  Color Principal (Barra y Botones)
                </span>
                <span className="text-[11px] font-mono text-slate-500">{themeConfig.primaryColor}</span>
              </div>
              <input
                type="color"
                value={themeConfig.primaryColor}
                onChange={(e) => updateTheme({ presetId: 'custom', primaryColor: e.target.value })}
                className="w-10 h-10 rounded-xl border-0 cursor-pointer bg-transparent"
              />
            </label>

            <label className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 cursor-pointer">
              <div>
                <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  Color Secundario (Banners)
                </span>
                <span className="text-[11px] font-mono text-slate-500">{themeConfig.secondaryColor}</span>
              </div>
              <input
                type="color"
                value={themeConfig.secondaryColor}
                onChange={(e) => updateTheme({ presetId: 'custom', secondaryColor: e.target.value })}
                className="w-10 h-10 rounded-xl border-0 cursor-pointer bg-transparent"
              />
            </label>

            <label className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 cursor-pointer">
              <div>
                <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  Fondo de la Aplicación
                </span>
                <span className="text-[11px] font-mono text-slate-500">{themeConfig.backgroundColor}</span>
              </div>
              <input
                type="color"
                value={themeConfig.backgroundColor}
                onChange={(e) => updateTheme({ presetId: 'custom', backgroundColor: e.target.value })}
                className="w-10 h-10 rounded-xl border-0 cursor-pointer bg-transparent"
              />
            </label>

            <label className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 cursor-pointer">
              <div>
                <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  Color de Tarjetas
                </span>
                <span className="text-[11px] font-mono text-slate-500">{themeConfig.cardColor}</span>
              </div>
              <input
                type="color"
                value={themeConfig.cardColor}
                onChange={(e) => updateTheme({ presetId: 'custom', cardColor: e.target.value })}
                className="w-10 h-10 rounded-xl border-0 cursor-pointer bg-transparent"
              />
            </label>

            <label className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 cursor-pointer">
              <div>
                <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  Texto de Cabecera
                </span>
                <span className="text-[11px] font-mono text-slate-500">{themeConfig.headerTextColor}</span>
              </div>
              <input
                type="color"
                value={themeConfig.headerTextColor}
                onChange={(e) => updateTheme({ presetId: 'custom', headerTextColor: e.target.value })}
                className="w-10 h-10 rounded-xl border-0 cursor-pointer bg-transparent"
              />
            </label>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
              <div>
                <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  Modo Oscuro Global
                </span>
                <span className="text-[11px] text-slate-500">
                  {themeConfig.darkMode ? 'Activado' : 'Desactivado'}
                </span>
              </div>
              <button
                onClick={() => updateTheme({ darkMode: !themeConfig.darkMode })}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  themeConfig.darkMode
                    ? 'bg-amber-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                }`}
              >
                {themeConfig.darkMode ? 'Oscuro ON' : 'Claro'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TEXTOS Y DESCRIPCIONES */}
      {activeTab === 'texts' && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-['Fredoka']">
                Agregar o Modificar Descripciones y Títulos
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Edita los textos en español o quechua y usa el botón de auto-traducción en cualquier momento.
              </p>
            </div>
            <button
              onClick={() => {
                audioService.playPop();
                resetCustomTexts();
                notify('Descripciones restauradas.');
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 self-start cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Textos</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nombre de la Aplicación
              </label>
              <input
                type="text"
                value={customTexts.appName}
                onChange={(e) => updateCustomTexts({ appName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Texto del Pie de Página (Footer)
              </label>
              <input
                type="text"
                value={customTexts.footerText}
                onChange={(e) => updateCustomTexts({ footerText: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm"
              />
            </div>
          </div>

          {(
            [
              { key: 'heroTitle', label: 'Título de Bienvenida (Inicio)' },
              { key: 'heroDescription', label: 'Descripción de Bienvenida (Inicio)' },
              { key: 'videosBannerTitle', label: 'Título de Biblioteca de Videos y Audios' },
              { key: 'videosBannerDescription', label: 'Descripción de Videos y Audios' },
              { key: 'pictogramsDescription', label: 'Descripción de Pictogramas' },
              { key: 'translatorDescription', label: 'Descripción del Traductor' },
            ] as const
          ).map((item) => {
            const val = customTexts[item.key];
            return (
              <div
                key={item.key}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100">
                    {item.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={translatingKey === item.key}
                      onClick={() => handleAutoTranslateTextField(item.key, 'es-to-qu')}
                      className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Languages className="w-3 h-3" />
                      <span>Español → Quechua</span>
                    </button>
                    <button
                      type="button"
                      disabled={translatingKey === item.key}
                      onClick={() => handleAutoTranslateTextField(item.key, 'qu-to-es')}
                      className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-100 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Languages className="w-3 h-3" />
                      <span>Quechua → Español</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 block mb-1">Español</span>
                    <textarea
                      rows={2}
                      value={val.spanish}
                      onChange={(e) =>
                        updateCustomTexts({
                          [item.key]: { ...val, spanish: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 block mb-1">Quechua</span>
                    <textarea
                      rows={2}
                      value={val.quechua}
                      onChange={(e) =>
                        updateCustomTexts({
                          [item.key]: { ...val, quechua: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: SECCIONES Y ELIMINAR/OCULTAR OPCIONES */}
      {activeTab === 'sections' && (
        <div className="space-y-6">
          {/* Show / Hide / Remove existing options */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-['Fredoka']">
                  Eliminar u Ocultar Opciones que no Desees
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Desactiva secciones, juegos, herramientas o categorías que no quieras mostrar a los niños.
                </p>
              </div>
              <button
                onClick={() => {
                  audioService.playPop();
                  restoreAllHiddenOptions();
                  notify('Todas las opciones predeterminadas fueron restauradas.');
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 self-start cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar Todo</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Main Tabs */}
              <div className="space-y-2">
                <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block">
                  Secciones Principales
                </span>
                {mainTabsConfig.map((tab) => {
                  const hidden = hiddenOptions.mainTabs.includes(tab.id);
                  return (
                    <div
                      key={tab.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    >
                      <span className={`text-xs font-bold ${hidden ? 'line-through text-slate-400' : ''}`}>
                        {tab.label}
                      </span>
                      <button
                        onClick={() => toggleHiddenItem('mainTabs', tab.id)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer ${
                          hidden
                            ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                            : 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300'
                        }`}
                      >
                        {hidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>{hidden ? 'Eliminada (Restaurar)' : 'Visible'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Games & UI Toggles */}
              <div className="space-y-2">
                <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block">
                  Juegos Individuales
                </span>
                {gamesConfig.map((g) => {
                  const hidden = hiddenOptions.games.includes(g.id);
                  return (
                    <div
                      key={g.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    >
                      <span className={`text-xs font-bold ${hidden ? 'line-through text-slate-400' : ''}`}>
                        {g.label}
                      </span>
                      <button
                        onClick={() => toggleHiddenItem('games', g.id)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer ${
                          hidden
                            ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                            : 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300'
                        }`}
                      >
                        {hidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>{hidden ? 'Oculto' : 'Visible'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Extra UI Options & Pictogram Categories */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
              <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block">
                Otras Opciones de Interfaz y Categorías de Pictogramas
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setUiFlag('showAccessibilityBar', !hiddenOptions.showAccessibilityBar)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer ${
                    hiddenOptions.showAccessibilityBar
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-slate-100 border-slate-300 text-slate-500 line-through'
                  }`}
                >
                  Barra de Accesibilidad
                </button>
                <button
                  onClick={() => setUiFlag('showOfflineBadge', !hiddenOptions.showOfflineBadge)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer ${
                    hiddenOptions.showOfflineBadge
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-slate-100 border-slate-300 text-slate-500 line-through'
                  }`}
                >
                  Etiqueta Sin Conexión
                </button>
                <button
                  onClick={() => setUiFlag('showCaaButton', !hiddenOptions.showCaaButton)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer ${
                    hiddenOptions.showCaaButton
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-slate-100 border-slate-300 text-slate-500 line-through'
                  }`}
                >
                  Botón Tablero Habla (CAA)
                </button>

                {pictogramCats.map((cat) => {
                  const hidden = hiddenOptions.pictogramCategories.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => toggleHiddenItem('pictogramCategories', cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer ${
                        !hidden
                          ? 'bg-amber-50 border-amber-300 text-amber-900'
                          : 'bg-slate-100 border-slate-300 text-slate-500 line-through'
                      }`}
                    >
                      Pictogramas: {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Create New Custom Section */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-['Fredoka']">
              Crear Nueva Sección Personalizada
            </h3>

            <form onSubmit={handleCreateSection} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Título de la Sección (Español o Quechua)
                </label>
                <input
                  type="text"
                  value={secTitle}
                  onChange={(e) => setSecTitle(e.target.value)}
                  placeholder="Ej: Canciones de mi comunidad"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm"
                />
              </div>

              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Ícono
                  </label>
                  <select
                    value={secIcon}
                    onChange={(e) => setSecIcon(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm"
                  >
                    <option value="🎵">🎵 Música / Canciones</option>
                    <option value="📖">📖 Lectura / Cuentos</option>
                    <option value="🧩">🧩 Adivinanzas</option>
                    <option value="🌱">🌱 Naturaleza</option>
                    <option value="🦙">🦙 Cultura Andina</option>
                    <option value="🎨">🎨 Arte y Dibujo</option>
                    <option value="✨">✨ Especial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Color
                  </label>
                  <input
                    type="color"
                    value={secColor}
                    onChange={(e) => setSecColor(e.target.value)}
                    className="w-12 h-10 rounded-xl border-0 cursor-pointer bg-transparent"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Descripción (se traducirá automáticamente a Quechua y Español)
                </label>
                <textarea
                  rows={2}
                  value={secDesc}
                  onChange={(e) => setSecDesc(e.target.value)}
                  placeholder="Describe qué aprenderán los niños en esta sección..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={secBusy}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-sm active:scale-95 transition flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{secBusy ? 'Creando y traduciendo...' : 'Agregar Nueva Sección'}</span>
                </button>
              </div>
            </form>

            {/* Add items inside Custom Sections */}
            {customSections.length > 0 && (
              <div className="pt-5 border-t border-slate-200 dark:border-slate-700 space-y-4">
                <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-100">
                  Agregar Tarjetas, Videos o Audios dentro de una Sección
                </h4>

                <form onSubmit={handleAddItemToSection} className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                      Sección destino
                    </label>
                    <select
                      value={selectedSectionId || customSections[0]?.id || ''}
                      onChange={(e) => setSelectedSectionId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs"
                    >
                      {customSections.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.icon} {s.title.spanish}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                      Título de la actividad
                    </label>
                    <input
                      type="text"
                      value={itemTitle}
                      onChange={(e) => setItemTitle(e.target.value)}
                      placeholder="Ej: Canción del Agua"
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                      Descripción
                    </label>
                    <input
                      type="text"
                      value={itemDesc}
                      onChange={(e) => setItemDesc(e.target.value)}
                      placeholder="Explicación o mensaje educativo..."
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                      Vincular Audio (opcional)
                    </label>
                    <select
                      value={itemAudioId}
                      onChange={(e) => setItemAudioId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs"
                    >
                      <option value="">Ninguno</option>
                      {customAudios.map((a) => (
                        <option key={a.id} value={a.id}>
                          🔊 {a.title.spanish}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                      Vincular Video (opcional)
                    </label>
                    <select
                      value={itemVideoId}
                      onChange={(e) => setItemVideoId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs"
                    >
                      <option value="">Ninguno</option>
                      {customVideos.map((v) => (
                        <option key={v.id} value={v.id}>
                          🎬 {v.title.spanish}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2 flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-500">Ícono:</span>
                      {['✨', '🎵', '📖', '🎬', '🔊', '🦙', '☀️'].map((ico) => (
                        <button
                          key={ico}
                          type="button"
                          onClick={() => setItemIcon(ico)}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-base cursor-pointer ${
                            itemIcon === ico
                              ? 'bg-amber-500 text-white'
                              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {ico}
                        </button>
                      ))}
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Agregar a Sección</span>
                    </button>
                  </div>
                </form>

                {/* Existing Custom Sections List */}
                <div className="space-y-3">
                  {customSections.map((sec) => (
                    <div
                      key={sec.id}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg text-white"
                            style={{ backgroundColor: sec.accentColor }}
                          >
                            {sec.icon}
                          </span>
                          <div>
                            <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                              {sec.title.spanish} · {sec.title.quechua}
                            </h5>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {sec.description.spanish}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            deleteCustomSection(sec.id);
                            notify('Sección eliminada.');
                          }}
                          className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 hover:bg-rose-200 cursor-pointer"
                          title="Eliminar sección"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {sec.items.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
                          {sec.items.map((it) => (
                            <div
                              key={it.id}
                              className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                            >
                              <div className="min-w-0">
                                <span className="font-bold block truncate">
                                  {it.icon} {it.title.spanish}
                                </span>
                                <span className="text-[11px] text-slate-500 block truncate">
                                  {it.description.spanish}
                                </span>
                              </div>
                              <button
                                onClick={() => removeItemFromSection(sec.id, it.id)}
                                className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer shrink-0"
                                title="Quitar elemento"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: VIDEOS CON SUBTÍTULOS AUTO-TRADUCIDOS */}
      {activeTab === 'videos' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-['Fredoka']">
                Agregar Nuevo Video con Subtítulos Auto-Traducidos
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sube un video desde tu dispositivo (offline), pega una URL o crea un cuento. Los subtítulos se traducen automáticamente según el idioma activo en la aplicación.
              </p>
            </div>

            <form onSubmit={handleSaveVideo} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(
                  [
                    { id: 'file', label: 'Subir Archivo (.mp4 / .webm)' },
                    { id: 'url', label: 'Enlace URL o YouTube' },
                    { id: 'animated', label: 'Cuento Animado con Voz' },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setVSourceType(opt.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border-2 transition cursor-pointer ${
                      vSourceType === opt.id
                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {vSourceType === 'file' && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <label className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer">
                    <Upload className="w-5 h-5 text-amber-600" />
                    <span>
                      {vFile ? `Archivo: ${vFile.name}` : 'Seleccionar video del celular o PC'}
                    </span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoFileChange}
                      className="hidden"
                    />
                  </label>

                  {vFile && (
                    <button
                      type="button"
                      disabled={vBusy}
                      onClick={handleTranscribeMediaForVideo}
                      className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{vBusy ? 'Transcribiendo...' : 'Auto-Transcribir y Traducir'}</span>
                    </button>
                  )}
                </div>
              )}

              {vSourceType === 'url' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Enlace del video (YouTube o MP4 directo)
                  </label>
                  <input
                    type="url"
                    value={vUrl}
                    onChange={(e) => setVUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... o https://.../video.mp4"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Título del Video
                  </label>
                  <input
                    type="text"
                    value={vTitle}
                    onChange={(e) => setVTitle(e.target.value)}
                    placeholder="Ej: El viaje de la llamita"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Categoría
                    </label>
                    <select
                      value={vCategory}
                      onChange={(e) => setVCategory(e.target.value as VideoStory['category'])}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                    >
                      <option value="cuentos">Cuentos</option>
                      <option value="numeros">Números</option>
                      <option value="animales">Animales</option>
                      <option value="colores">Colores</option>
                      <option value="alimentos">Alimentos</option>
                      <option value="saludos">Saludos</option>
                      <option value="familia">Familia</option>
                      <option value="naturaleza">Naturaleza</option>
                      <option value="cultura">Cultura</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Idioma original
                    </label>
                    <select
                      value={vSourceLang}
                      onChange={(e) => setVSourceLang(e.target.value as 'spanish' | 'quechua')}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                    >
                      <option value="spanish">Español</option>
                      <option value="quechua">Quechua</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Descripción breve
                  </label>
                  <input
                    type="text"
                    value={vDesc}
                    onChange={(e) => setVDesc(e.target.value)}
                    placeholder="Descripción educativa para los niños..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm"
                  />
                </div>

                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Duración (seg)
                    </label>
                    <input
                      type="number"
                      min={5}
                      value={vDuration}
                      onChange={(e) => setVDuration(Number(e.target.value) || 15)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Color
                    </label>
                    <input
                      type="color"
                      value={vColor}
                      onChange={(e) => setVColor(e.target.value)}
                      className="w-10 h-10 rounded-xl border-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Subtitles Input & Auto Translation */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="text-xs font-extrabold text-slate-800 dark:text-slate-100">
                    Guion o Subtítulos (uno por línea; opcional poner tiempo como «00:05 Hola niños»)
                  </label>
                  <button
                    type="button"
                    disabled={vBusy}
                    onClick={handlePreviewVideoSubtitles}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Languages className="w-3.5 h-3.5" />
                    <span>{vBusy ? 'Traduciendo...' : 'Traducir Subtítulos Ahora'}</span>
                  </button>
                </div>

                <textarea
                  rows={4}
                  value={vScript}
                  onChange={(e) => setVScript(e.target.value)}
                  placeholder={`00:00 Hola amiguitos, hoy aprenderemos los saludos.\n00:06 Agua pura de la montaña.\n00:12 Muchas gracias y hasta mañana.`}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm"
                />

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={vAutoTranslate}
                    onChange={(e) => setVAutoTranslate(e.target.checked)}
                    className="rounded accent-amber-500"
                  />
                  <span>
                    Traducir automáticamente los subtítulos al idioma seleccionado en la app (Quechua Chanka, Quechua Collao o Español).
                  </span>
                </label>

                {vPreviewCues.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 block">
                      Vista previa de subtítulos auto-traducidos ({vPreviewCues.length} líneas):
                    </span>
                    <div className="max-h-44 overflow-y-auto space-y-2">
                      {vPreviewCues.map((cue, idx) => (
                        <div
                          key={cue.id}
                          className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] grid grid-cols-1 sm:grid-cols-3 gap-2"
                        >
                          <div>
                            <strong className="text-slate-500">[{cue.startTime}s - {cue.endTime}s] Español:</strong>
                            <input
                              type="text"
                              value={cue.spanish}
                              onChange={(e) => {
                                const next = [...vPreviewCues];
                                next[idx] = { ...cue, spanish: e.target.value };
                                setVPreviewCues(next);
                              }}
                              className="w-full mt-0.5 px-2 py-1 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                            />
                          </div>
                          <div>
                            <strong className="text-amber-700 dark:text-amber-400">Quechua Chanka:</strong>
                            <input
                              type="text"
                              value={cue.quechuaChanka}
                              onChange={(e) => {
                                const next = [...vPreviewCues];
                                next[idx] = { ...cue, quechuaChanka: e.target.value };
                                setVPreviewCues(next);
                              }}
                              className="w-full mt-0.5 px-2 py-1 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                            />
                          </div>
                          <div>
                            <strong className="text-teal-700 dark:text-teal-400">Quechua Collao:</strong>
                            <input
                              type="text"
                              value={cue.quechuaCollao}
                              onChange={(e) => {
                                const next = [...vPreviewCues];
                                next[idx] = { ...cue, quechuaCollao: e.target.value };
                                setVPreviewCues(next);
                              }}
                              className="w-full mt-0.5 px-2 py-1 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={vBusy}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md active:scale-95 transition flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{vBusy ? 'Guardando y traduciendo...' : 'Guardar Video'}</span>
              </button>
            </form>
          </div>

          {/* List of Custom & Built-in Videos */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-['Fredoka']">
              Videos Agregados y Predeterminados
            </h3>

            {customVideos.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 block">Tus Videos Agregados ({customVideos.length})</span>
                {customVideos.map((v) => (
                  <div
                    key={v.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  >
                    <div>
                      <span className="font-bold text-sm text-slate-900 dark:text-white block">
                        {v.title.spanish} · {v.title.quechua}
                      </span>
                      <span className="text-xs text-slate-500">
                        {v.category} · {v.durationSeconds}s · {v.subtitles.length} subtítulos traducidos
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        deleteCustomVideo(v.id);
                        notify('Video eliminado.');
                      }}
                      className="p-2 rounded-xl bg-rose-100 text-rose-700 hover:bg-rose-200 cursor-pointer"
                      title="Eliminar video"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-500 block">
                Videos Predeterminados (puedes ocultar los que no te gusten)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {VIDEO_STORIES_DATA.map((story) => {
                  const hidden = hiddenOptions.videoIds.includes(story.id);
                  return (
                    <div
                      key={story.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                    >
                      <span className={`font-bold truncate pr-2 ${hidden ? 'line-through text-slate-400' : ''}`}>
                        {story.title.spanish}
                      </span>
                      <button
                        onClick={() => toggleHiddenItem('videoIds', story.id)}
                        className={`px-2.5 py-1 rounded-lg font-bold shrink-0 cursor-pointer ${
                          hidden
                            ? 'bg-slate-200 text-slate-700'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {hidden ? 'Eliminado' : 'Visible'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: AUDIOS EDUCATIVOS CON SUBTÍTULOS AUTO-TRADUCIDOS */}
      {activeTab === 'audios' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-['Fredoka']">
                Agregar Audio Educativo con Subtítulos Automáticos
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Graba tu voz, sube un archivo de audio o escribe texto para voz sintetizada. Los subtítulos se traducen al idioma configurado.
              </p>
            </div>

            <form onSubmit={handleSaveAudio} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(
                  [
                    { id: 'recording', label: 'Grabar con Micrófono' },
                    { id: 'file', label: 'Subir Archivo (.mp3 / .wav)' },
                    { id: 'tts', label: 'Texto a Voz Bilingüe' },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setASourceType(opt.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border-2 transition cursor-pointer ${
                      aSourceType === opt.id
                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {aSourceType === 'recording' && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    {isRecording
                      ? 'Grabando audio ahora... habla claro frente al micrófono.'
                      : aRecordedBlob
                      ? `Grabación lista (${aDuration}s).`
                      : 'Presiona el botón para grabar tu voz directamente.'}
                  </div>
                  {!isRecording ? (
                    <button
                      type="button"
                      onClick={startRecording}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Mic className="w-4 h-4" />
                      <span>Iniciar Grabación</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={stopRecording}
                      className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Square className="w-4 h-4 fill-white" />
                      <span>Detener</span>
                    </button>
                  )}
                </div>
              )}

              {aSourceType === 'file' && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700">
                  <label className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer">
                    <Upload className="w-5 h-5 text-amber-600" />
                    <span>
                      {aFile ? `Archivo: ${aFile.name}` : 'Seleccionar audio (.mp3, .wav, .ogg, .m4a)'}
                    </span>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleAudioFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Título del Audio
                  </label>
                  <input
                    type="text"
                    value={aTitle}
                    onChange={(e) => setATitle(e.target.value)}
                    placeholder="Ej: Saludos de la mañana"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Categoría
                    </label>
                    <input
                      type="text"
                      value={aCategory}
                      onChange={(e) => setACategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Idioma original
                    </label>
                    <select
                      value={aSourceLang}
                      onChange={(e) => setASourceLang(e.target.value as 'spanish' | 'quechua')}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                    >
                      <option value="spanish">Español</option>
                      <option value="quechua">Quechua</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Descripción
                  </label>
                  <input
                    type="text"
                    value={aDesc}
                    onChange={(e) => setADesc(e.target.value)}
                    placeholder="¿Qué escucharán los niños en este audio?"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Color Tarjeta
                  </label>
                  <input
                    type="color"
                    value={aColor}
                    onChange={(e) => setAColor(e.target.value)}
                    className="w-full h-10 rounded-xl border-0 cursor-pointer"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="text-xs font-extrabold text-slate-800 dark:text-slate-100">
                    Texto / Subtítulos del Audio (se traducen automáticamente)
                  </label>
                  <button
                    type="button"
                    disabled={aBusy}
                    onClick={handlePreviewAudioSubtitles}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Languages className="w-3.5 h-3.5" />
                    <span>{aBusy ? 'Traduciendo...' : 'Traducir Subtítulos'}</span>
                  </button>
                </div>

                <textarea
                  rows={3}
                  value={aScript}
                  onChange={(e) => setAScript(e.target.value)}
                  placeholder="Escribe las frases del audio línea por línea..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm"
                />

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={aAutoTranslate}
                    onChange={(e) => setAAutoTranslate(e.target.checked)}
                    className="rounded accent-amber-500"
                  />
                  <span>
                    Traducir subtítulos automáticamente al idioma activo (Quechua Chanka, Collao o Español).
                  </span>
                </label>

                {aPreviewCues.length > 0 && (
                  <div className="space-y-2 pt-2">
                    {aPreviewCues.map((cue) => (
                      <div
                        key={cue.id}
                        className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] grid grid-cols-1 sm:grid-cols-3 gap-2"
                      >
                        <div>
                          <strong className="text-slate-500">Español:</strong>
                          <p>{cue.spanish}</p>
                        </div>
                        <div>
                          <strong className="text-amber-700 dark:text-amber-400">Chanka:</strong>
                          <p>{cue.quechuaChanka}</p>
                        </div>
                        <div>
                          <strong className="text-teal-700 dark:text-teal-400">Collao:</strong>
                          <p>{cue.quechuaCollao}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={aBusy}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md active:scale-95 transition flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{aBusy ? 'Guardando...' : 'Guardar Audio'}</span>
              </button>
            </form>
          </div>

          {customAudios.length > 0 && (
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-['Fredoka']">
                Audios Agregados ({customAudios.length})
              </h3>
              <div className="space-y-2">
                {customAudios.map((aud) => (
                  <div
                    key={aud.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  >
                    <div>
                      <span className="font-bold text-sm text-slate-900 dark:text-white block">
                        {aud.title.spanish} · {aud.title.quechua}
                      </span>
                      <span className="text-xs text-slate-500">
                        {aud.category} · {aud.durationSeconds}s · {aud.subtitles.length} subtítulos
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => audioService.speakSpanish(aud.rawScript)}
                        className="p-2 rounded-xl bg-amber-100 text-amber-800 hover:bg-amber-200 cursor-pointer"
                        title="Probar audio"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          deleteCustomAudio(aud.id);
                          notify('Audio eliminado.');
                        }}
                        className="p-2 rounded-xl bg-rose-100 text-rose-700 hover:bg-rose-200 cursor-pointer"
                        title="Eliminar audio"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 6: CUENTA Y SEGURIDAD */}
      {activeTab === 'security' && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-5 max-w-lg">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-['Fredoka']">
              Usuario y Contraseña de Administrador
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Cambia tus credenciales de acceso cuando lo necesites.
            </p>
          </div>

          <form onSubmit={handleUpdateCredentials} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nuevo Usuario
              </label>
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nueva Contraseña (mínimo 4 caracteres)
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Ingresa nueva contraseña"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm cursor-pointer"
            >
              Actualizar Credenciales
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
