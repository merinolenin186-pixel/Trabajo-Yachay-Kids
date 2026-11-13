import React, { useState } from 'react';
import { Volume2, X, Trash2, MessageSquarePlus, Sparkles, HeartHandshake } from 'lucide-react';
import { audioService } from '../../services/audioService';
import { AppLanguage, QuechuaDialect } from '../../types';

interface NonVerbalBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  appLang: AppLanguage;
  dialect: QuechuaDialect;
}

interface CaaCard {
  id: string;
  quechua: string;
  spanish: string;
  icon: string;
  category: 'basico' | 'necesidad' | 'emocion' | 'actividad';
  color: string;
}

const CAA_CARDS: CaaCard[] = [
  // Básicos
  { id: 'caa-si', quechua: 'Arí', spanish: 'Sí', icon: '👍', category: 'basico', color: 'bg-emerald-500 text-white' },
  { id: 'caa-no', quechua: 'Manam', spanish: 'No', icon: '👎', category: 'basico', color: 'bg-red-500 text-white' },
  { id: 'caa-gracias', quechua: 'Añay', spanish: 'Gracias', icon: '🙏', category: 'basico', color: 'bg-amber-500 text-white' },
  { id: 'caa-hola', quechua: 'Allillanchu', spanish: 'Hola / ¿Cómo estás?', icon: '👋', category: 'basico', color: 'bg-sky-500 text-white' },
  { id: 'caa-ayuda', quechua: 'Yanapaway', spanish: '¡Ayúdame, por favor!', icon: '🆘', category: 'basico', color: 'bg-rose-600 text-white' },

  // Necesidades Urgentes
  { id: 'caa-agua', quechua: 'Yakutam munani', spanish: 'Tengo sed, quiero agua', icon: '💧', category: 'necesidad', color: 'bg-blue-600 text-white' },
  { id: 'caa-comida', quechua: 'Mikhuytam munani', spanish: 'Tengo hambre, quiero comer', icon: '🥣', category: 'necesidad', color: 'bg-amber-600 text-white' },
  { id: 'caa-bano', quechua: 'Ispanayawashan', spanish: 'Quiero ir al baño', icon: '🚻', category: 'necesidad', color: 'bg-teal-600 text-white' },
  { id: 'caa-dolor', quechua: 'Nanawanmi', spanish: 'Me duele algo', icon: '🩹', category: 'necesidad', color: 'bg-red-600 text-white' },
  { id: 'caa-frio', quechua: 'Chiriyawashan', spanish: 'Tengo mucho frío', icon: '🥶', category: 'necesidad', color: 'bg-cyan-600 text-white' },
  { id: 'caa-dormir', quechua: 'Puñunayawashan', spanish: 'Tengo sueño, quiero descansar', icon: '😴', category: 'necesidad', color: 'bg-indigo-600 text-white' },

  // Emociones
  { id: 'caa-feliz', quechua: 'Kusisqam kani', spanish: 'Estoy feliz y contento', icon: '😄', category: 'emocion', color: 'bg-yellow-500 text-slate-950' },
  { id: 'caa-triste', quechua: 'Llakisqam kani', spanish: 'Estoy triste', icon: '😢', category: 'emocion', color: 'bg-slate-600 text-white' },
  { id: 'caa-molesto', quechua: 'Piñasqam kani', spanish: 'Estoy molesto', icon: '😠', category: 'emocion', color: 'bg-orange-600 text-white' },
  { id: 'caa-asustado', quechua: 'Mancharisqam kani', spanish: 'Tengo miedo / Estoy asustado', icon: '😨', category: 'emocion', color: 'bg-purple-600 text-white' },

  // Actividades
  { id: 'caa-jugar', quechua: 'Pukllaytam munani', spanish: 'Quiero jugar', icon: '⚽', category: 'actividad', color: 'bg-pink-600 text-white' },
  { id: 'caa-aprender', quechua: 'Yachaytam munani', spanish: 'Quiero aprender y pintar', icon: '🎨', category: 'actividad', color: 'bg-violet-600 text-white' },
  { id: 'caa-noentiendo', quechua: 'Manam intindinichu', spanish: 'No entiendo, explícame otra vez', icon: '❓', category: 'actividad', color: 'bg-amber-700 text-white' },
];

export const NonVerbalBoardModal: React.FC<NonVerbalBoardModalProps> = ({
  isOpen,
  onClose,
  appLang,
  dialect,
}) => {
  const [selectedCards, setSelectedCards] = useState<CaaCard[]>([]);

  if (!isOpen) return null;

  const handleTapCard = (card: CaaCard) => {
    audioService.playPop();
    // Instantly speak the card
    audioService.speakQuechua(card.quechua, dialect);
    setSelectedCards(prev => [...prev, card]);
  };

  const handleSpeakSentence = (targetLang: 'quechua' | 'spanish') => {
    audioService.playPop();
    if (selectedCards.length === 0) return;

    if (targetLang === 'quechua') {
      const sentence = selectedCards.map(c => c.quechua).join(', ');
      audioService.speakQuechua(sentence, dialect);
    } else {
      const sentence = selectedCards.map(c => c.spanish).join(', ');
      audioService.speakSpanish(sentence);
    }
  };

  const handleClearSentence = () => {
    audioService.playPop();
    setSelectedCards([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 shadow-2xl border-4 border-amber-400 text-slate-800 dark:text-slate-100 max-h-[94vh] flex flex-col space-y-4">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-amber-950 dark:text-amber-200 font-['Fredoka']">
                Tablero de Habla Inclusiva (CAA)
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Para personas o niños que no pueden hablar. Toca para que la app hable por ti.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition"
            aria-label="Cerrar tablero"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sentence Builder Strip */}
        <div className="p-3 rounded-2xl bg-amber-50 dark:bg-slate-800 border-2 border-amber-300 dark:border-slate-700 min-h-[76px] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1">
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>Frase construida (Toca para escuchar en voz alta):</span>
            </span>
            {selectedCards.length > 0 && (
              <button
                onClick={handleClearSentence}
                className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Borrar</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar min-h-[36px]">
            {selectedCards.length === 0 ? (
              <span className="text-xs text-slate-400 italic">
                Toca los pictogramas abajo para armar lo que quieres decir...
              </span>
            ) : (
              selectedCards.map((card, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-white dark:bg-slate-700 border border-amber-300 dark:border-slate-600 font-bold text-xs flex items-center gap-1.5 shadow-sm shrink-0 animate-in zoom-in-95"
                >
                  <span className="text-base">{card.icon}</span>
                  <span className="text-amber-900 dark:text-amber-200">{card.quechua}</span>
                  <span className="text-slate-500 text-[10px]">({card.spanish})</span>
                </div>
              ))
            )}
          </div>

          {selectedCards.length > 0 && (
            <div className="flex items-center gap-2 pt-2 border-t border-amber-200/60 dark:border-slate-700 mt-2">
              <button
                onClick={() => handleSpeakSentence('quechua')}
                className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-sm flex items-center justify-center gap-1.5 transition active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hablar en Quechua</span>
              </button>
              <button
                onClick={() => handleSpeakSentence('spanish')}
                className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-sm flex items-center justify-center gap-1.5 transition active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hablar en Español</span>
              </button>
            </div>
          )}
        </div>

        {/* Pictograms Grid */}
        <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {CAA_CARDS.map(card => (
            <button
              key={card.id}
              onClick={() => handleTapCard(card)}
              className="p-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-amber-400 bg-white dark:bg-slate-800/90 shadow-sm hover:shadow-md flex items-center gap-3 transition active:scale-90 text-left group"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-slate-700 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <div className="overflow-hidden flex-1">
                <span className="block text-sm font-extrabold text-slate-900 dark:text-white font-['Fredoka'] truncate">
                  {card.quechua}
                </span>
                <span className="block text-[11px] text-slate-600 dark:text-slate-300 line-clamp-1 leading-tight">
                  {card.spanish}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
