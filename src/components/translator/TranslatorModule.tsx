import React, { useState, useEffect } from 'react';
import { AppLanguage, QuechuaDialect, TranslationHistoryItem, DictionaryEntry } from '../../types';
import { translateOffline, QUECHUA_DICTIONARY } from '../../data/quechuaDictionary';
import { audioService } from '../../services/audioService';
import {
  ArrowLeftRight,
  Volume2,
  Copy,
  Trash2,
  Check,
  History,
  BookOpen,
  Search,
  Sparkles,
  Layers,
} from 'lucide-react';

interface TranslatorModuleProps {
  appLang: AppLanguage;
  dialect: QuechuaDialect;
}

const HISTORY_STORAGE_KEY = 'yachay_kids_translation_history';

export const TranslatorModule: React.FC<TranslatorModuleProps> = ({
  appLang,
  dialect,
}) => {
  const [fromLang, setFromLang] = useState<'es' | 'qu'>('es');
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [activeEntry, setActiveEntry] = useState<DictionaryEntry | undefined>();
  const [suggestions, setSuggestions] = useState<DictionaryEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<TranslationHistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  // Load history from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch {
      // Local storage fallback
    }
  }, []);

  // Run offline translation whenever input changes
  useEffect(() => {
    if (!inputText.trim()) {
      setTranslatedText('');
      setActiveEntry(undefined);
      setSuggestions([]);
      return;
    }

    const res = translateOffline(inputText, fromLang, dialect);
    setTranslatedText(res.translated);
    setActiveEntry(res.entry);
    setSuggestions(res.suggestions);

    // Save to history if we have an exact dictionary match
    if (res.entry) {
      saveToHistory(inputText.trim(), res.translated, fromLang);
    }
  }, [inputText, fromLang, dialect]);

  const saveToHistory = (from: string, to: string, lang: 'es' | 'qu') => {
    setHistory(prev => {
      // Avoid duplicate top entry
      const filtered = prev.filter(h => h.fromText.toLowerCase() !== from.toLowerCase());
      const updated = [
        {
          id: Date.now().toString(),
          fromText: from,
          toText: to,
          fromLang: lang,
          timestamp: Date.now(),
        },
        ...filtered,
      ].slice(0, 8); // keep last 8 offline entries

      try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // storage fallback
      }
      return updated;
    });
  };

  const handleSwapLanguages = () => {
    audioService.playPop();
    const newFrom = fromLang === 'es' ? 'qu' : 'es';
    const oldInput = inputText;
    const oldTranslated = translatedText;

    setFromLang(newFrom);
    if (activeEntry) {
      setInputText(oldTranslated);
    } else {
      setInputText('');
      setTranslatedText('');
    }
  };

  const handleClear = () => {
    audioService.playPop();
    setInputText('');
    setTranslatedText('');
    setActiveEntry(undefined);
    setSuggestions([]);
  };

  const handleCopy = () => {
    if (!translatedText) return;
    audioService.playPop();
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlayInput = () => {
    if (!inputText) return;
    if (fromLang === 'es') {
      audioService.speakSpanish(inputText);
    } else {
      audioService.speakQuechua(inputText, dialect);
    }
  };

  const handlePlayOutput = () => {
    if (!translatedText) return;
    if (fromLang === 'es') {
      audioService.speakQuechua(translatedText, dialect);
    } else {
      audioService.speakSpanish(translatedText);
    }
  };

  const clearHistory = () => {
    audioService.playPop();
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch {}
  };

  // Quick suggestions for children
  const childQuickKeywords = fromLang === 'es'
    ? ['Hola', '¿Cómo estás?', 'Gracias', 'Perro', 'Gato', 'Llama', 'Sol', 'Papa', 'Agua', 'Mamá', 'Papá']
    : ['Allillanchu', 'Rimaykullayki', 'Añay', 'Llama', 'Kuntur', 'Inti', 'Papa', 'Sara', 'Yaku'];

  // Categories for dictionary tab
  const categories = ['todos', 'saludos', 'animales', 'familia', 'alimentos', 'naturaleza', 'cuerpo', 'escuela', 'emociones'];

  const filteredDictionary = QUECHUA_DICTIONARY.filter(item => {
    const matchesCat = selectedCategory === 'todos' || item.category === selectedCategory;
    const matchesQuery =
      !searchQuery ||
      item.quechua.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.spanish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.exampleSpanish.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Traductor Offline · Diccionario Local Verificado</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Fredoka']">
            {appLang === 'quechua'
              ? 'Runasimi ⇄ Castellano Tijraq'
              : 'Traductor Quechua ⇄ Español'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Variedad activa:{' '}
            <span className="font-bold text-amber-600 dark:text-amber-400">
              Quechua {dialect === 'chanka' ? 'Chanka (Ayacucho)' : 'Collao (Cusco/Puno)'}
            </span>
          </p>
        </div>

        {/* Direction Switcher Button */}
        <button
          onClick={handleSwapLanguages}
          className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md active:scale-95 transition whitespace-nowrap shrink-0 self-start sm:self-auto"
        >
          <span>{fromLang === 'es' ? 'Español' : 'Quechua'}</span>
          <ArrowLeftRight className="w-4 h-4" />
          <span>{fromLang === 'es' ? 'Quechua' : 'Español'}</span>
        </button>
      </div>

      {/* Translator Translation Box Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* INPUT BOX */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border-2 border-slate-200 dark:border-slate-700 focus-within:border-amber-400 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                {fromLang === 'es' ? 'Español (Texto de entrada)' : 'Quechua (Runasimi)'}
              </span>
              {inputText && (
                <button
                  onClick={handleClear}
                  className="p-1 rounded-lg text-slate-400 hover:text-red-500 transition"
                  title="Borrar texto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <textarea
              rows={4}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder={
                fromLang === 'es'
                  ? 'Escribe una palabra en español (ej: perro, mamá, gracias, agua)...'
                  : 'Qillqay runasimipi (ej: allillanchu, mama, inti, allqo)...'
              }
              className="w-full bg-transparent resize-none outline-none text-slate-900 dark:text-slate-100 font-medium text-base sm:text-lg placeholder:text-slate-400"
            />
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
            <button
              disabled={!inputText}
              onClick={handlePlayInput}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-amber-100 dark:hover:bg-amber-950 transition disabled:opacity-40"
            >
              <Volume2 className="w-4 h-4 text-amber-600" />
              <span>Escuchar</span>
            </button>
            <span className="text-[11px] text-slate-400">
              {inputText.length} caracteres
            </span>
          </div>
        </div>

        {/* OUTPUT BOX */}
        <div className="bg-gradient-to-b from-amber-50 to-orange-50/50 dark:from-slate-800 dark:to-slate-800/90 rounded-3xl p-5 border-2 border-amber-300 dark:border-amber-600 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                {fromLang === 'es' ? 'Quechua (Traducción)' : 'Español (Traducción)'}
              </span>
              {translatedText && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs font-bold text-amber-700 dark:text-amber-300 hover:text-amber-800 transition"
                  title="Copiar traducción"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="min-h-[100px] flex flex-col justify-center">
              {translatedText ? (
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-amber-950 dark:text-amber-100 font-['Fredoka']">
                    {translatedText}
                  </p>
                  {activeEntry && (
                    <div className="mt-2 space-y-1">
                      <span className="text-xs font-semibold text-amber-800/80 dark:text-amber-300">
                        Pronunciación: [{activeEntry.phonetic}]
                      </span>
                      {fromLang === 'es' && (
                        <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                          Ejemplo: {activeEntry.exampleQuechua} ({activeEntry.exampleSpanish})
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <span className="text-slate-400 text-sm italic">
                  {fromLang === 'es'
                    ? 'La traducción en quechua aparecerá aquí automáticamente.'
                    : 'La traducción en español aparecerá aquí automáticamente.'}
                </span>
              )}
            </div>
          </div>

          <div className="pt-2 border-t border-amber-200/60 dark:border-slate-700/60 flex items-center justify-between">
            <button
              disabled={!translatedText}
              onClick={handlePlayOutput}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition disabled:opacity-40 shadow-sm"
            >
              <Volume2 className="w-4 h-4" />
              <span>Escuchar traducción</span>
            </button>
            <span className="text-[11px] text-amber-800/70 dark:text-amber-300 font-medium">
              100% Sin internet
            </span>
          </div>
        </div>
      </div>

      {/* Quick Tap Words for Kids */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-2">
          {appLang === 'quechua' ? 'Usqhaylla akllay:' : 'Palabras sugeridas para niños:'}
        </span>
        <div className="flex flex-wrap gap-2">
          {childQuickKeywords.map(word => (
            <button
              key={word}
              onClick={() => {
                audioService.playPop();
                setInputText(word);
              }}
              className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-slate-700 border border-amber-200 dark:border-slate-600 text-xs font-bold text-amber-900 dark:text-amber-200 hover:bg-amber-100 active:scale-95 transition"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      {/* History and Searchable Dictionary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* RECENT LOCAL HISTORY (1 col) */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-800 dark:text-slate-100">
              <History className="w-4 h-4 text-amber-600" />
              <span>{appLang === 'quechua' ? 'Yuyariykuna' : 'Historial local'}</span>
            </div>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-[11px] text-slate-400 hover:text-red-500"
              >
                Limpiar
              </button>
            )}
          </div>

          {history.length > 0 ? (
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {history.map(item => (
                <div
                  key={item.id}
                  onClick={() => {
                    audioService.playPop();
                    setFromLang(item.fromLang);
                    setInputText(item.fromText);
                  }}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/60 hover:bg-amber-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 cursor-pointer transition text-xs"
                >
                  <div className="flex items-center justify-between text-slate-800 dark:text-slate-200 font-bold">
                    <span>{item.fromText}</span>
                    <span className="text-amber-600 dark:text-amber-400">→</span>
                    <span className="text-amber-700 dark:text-amber-300 font-['Fredoka']">
                      {item.toText}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic py-4 text-center">
              Las palabras que traduzcas se guardarán en este dispositivo.
            </p>
          )}
        </div>

        {/* INTEGRATED DICTIONARY (2 cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-800 dark:text-slate-100">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>{appLang === 'quechua' ? 'Simipirwa' : 'Diccionario Bilingüe'}</span>
              <span className="text-xs font-normal text-slate-500">
                ({filteredDictionary.length} entradas)
              </span>
            </div>

            {/* Filter categories */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
              {categories.slice(0, 5).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-amber-500 text-white font-bold'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar inside dictionary */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar palabra o frase en el diccionario..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs sm:text-sm outline-none focus:border-amber-400"
            />
          </div>

          {/* Dictionary Entries List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
            {filteredDictionary.map(entry => (
              <div
                key={entry.id}
                onClick={() => {
                  audioService.playPop();
                  setFromLang('es');
                  setInputText(entry.spanish.split('/')[0].trim());
                  audioService.speakQuechua(entry.quechua, dialect);
                }}
                className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-amber-400 bg-slate-50/60 dark:bg-slate-700/40 hover:bg-amber-50/40 cursor-pointer transition flex items-center justify-between"
              >
                <div>
                  <span className="block text-sm font-extrabold text-amber-900 dark:text-amber-200 font-['Fredoka']">
                    {entry.quechua}
                  </span>
                  <span className="block text-xs text-slate-600 dark:text-slate-300">
                    {entry.spanish}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    [{entry.phonetic}]
                  </span>
                </div>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    audioService.speakQuechua(entry.quechua, dialect);
                  }}
                  className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 hover:scale-105"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
