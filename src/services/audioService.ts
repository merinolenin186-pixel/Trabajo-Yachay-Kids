/**
 * Yachay Kids - Audio & Pronunciation System
 * 100% Offline Web Audio API & Speech Synthesis
 */

import { synthesizeAnimalSound } from './animalAudioEngine';

class AudioService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private speechRate: number = 0.85; // slightly slower for young children

  private getAudioContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setSpeechRate(rate: number) {
    this.speechRate = Math.max(0.5, Math.min(1.5, rate));
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // --- SOUND EFFECTS (Web Audio API - Offline) ---

  // Cheerful Andean pentatonic chord (D4, F#4, A4, D5)
  public playSuccessSound() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      const notes = [293.66, 369.99, 440.0, 587.33]; // D major pentatonic triad + octave
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.48);
      });
    } catch (e) {
      console.warn('Audio effect playback error', e);
    }
  }

  // Gentle, friendly soft bounce (no jarring error sounds for children)
  public playErrorSound() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.25);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {
      console.warn('Audio effect error', e);
    }
  }

  // Soft wooden card flip click
  public playCardFlip() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.06);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {
      console.warn('Audio effect error', e);
    }
  }

  // Tactile bubble pop for buttons
  public playPop() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.04);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch (e) {
      console.warn('Audio effect error', e);
    }
  }

  // Escalating chime note for counting (1 to 10)
  public playCountNote(step: number) {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      const baseFreq = 261.63; // C4
      // Pentatonic scale steps
      const pentatonicIntervals = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24, 26, 28, 31, 33, 36, 38, 40, 43, 45];
      const semitone = pentatonicIntervals[(step - 1) % pentatonicIntervals.length] || 0;
      const freq = baseFreq * Math.pow(2, semitone / 12);

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.38);
    } catch (e) {
      console.warn('Audio effect error', e);
    }
  }

  // Sensory realistic animal vocalization (100% offline Web Audio synthesis)
  public playAnimalSound(animalType: string): number {
    if (this.isMuted) return 0;
    try {
      const ctx = this.getAudioContext();
      return synthesizeAnimalSound(ctx, animalType);
    } catch (e) {
      console.warn('Animal sound playback error', e);
      return 0;
    }
  }

  // Grand Andean celebratory victory fanfare
  public playFanfare() {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      // Quena-like festive melody (Kusisqa raymi)
      const melody = [
        { f: 440.0, d: 0.12 }, // A4
        { f: 523.25, d: 0.12 }, // C5
        { f: 587.33, d: 0.15 }, // D5
        { f: 659.25, d: 0.15 }, // E5
        { f: 783.99, d: 0.25 }, // G5
        { f: 880.0, d: 0.4 },  // A5
      ];

      let t = ctx.currentTime;
      melody.forEach(item => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.f, t);

        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + item.d * 1.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + item.d * 1.6);
        t += item.d;
      });
    } catch (e) {
      console.warn('Audio effect error', e);
    }
  }

  // --- PRONUNCIATION / SPEECH SYNTHESIS (Offline Native) ---

  /**
   * Speak Spanish text with child-friendly speed and inflection
   */
  public speakSpanish(text: string, onEnd?: () => void) {
    if (this.isMuted || !('speechSynthesis' in window)) {
      onEnd?.();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-PE'; // Peruvian Spanish preferred
      utterance.rate = this.speechRate;
      utterance.pitch = 1.05; // Slightly warm and cheerful

      // Try finding a Spanish voice
      const voices = window.speechSynthesis.getVoices();
      const spanishVoice =
        voices.find(v => v.lang.startsWith('es-PE')) ||
        voices.find(v => v.lang.startsWith('es-419')) ||
        voices.find(v => v.lang.startsWith('es'));
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }

      utterance.onend = () => onEnd?.();
      utterance.onerror = () => onEnd?.();

      window.speechSynthesis.speak(utterance);
    } catch {
      onEnd?.();
    }
  }

  /**
   * Speak Quechua with phonological adaptation
   * Quechua phonology:
   * - Stress is regular on the penultimate (second-to-last) syllable
   * - Trivocalic /a, i, u/
   * - Glottal / aspirated consonants in Collao, pure stops in Chanka
   * - Phonetic transliteration into phonetic syllables for SpeechSynthesis
   */
  public speakQuechua(text: string, dialect: 'chanka' | 'collao' = 'chanka', onEnd?: () => void) {
    if (this.isMuted) {
      onEnd?.();
      return;
    }

    // Play tactile activation sound
    this.playPop();

    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();

        // Convert Quechua orthography into phonetic equivalent for Latin TTS
        // Quechua "ll" is [ʎ], "ñ" is [ɲ], "q" is post-velar/uvular, "w" is [w], "y" is [j]
        // "h" is aspirated [h]
        let phoneticText = text
          .toLowerCase()
          .replace(/ch'/g, 'ch')
          .replace(/chh/g, 'ch')
          .replace(/k'/g, 'k')
          .replace(/kh/g, 'k')
          .replace(/p'/g, 'p')
          .replace(/ph/g, 'p')
          .replace(/t'/g, 't')
          .replace(/th/g, 't')
          .replace(/q'/g, 'j')
          .replace(/qh/g, 'j')
          .replace(/q/g, 'k');

        // Quechua stress rule: Penultimate syllable emphasis
        const utterance = new SpeechSynthesisUtterance(phoneticText);
        utterance.lang = 'es-PE';
        utterance.rate = this.speechRate * 0.9; // clear, deliberate pace
        utterance.pitch = 1.1;

        const voices = window.speechSynthesis.getVoices();
        const voice =
          voices.find(v => v.lang.startsWith('es-PE')) ||
          voices.find(v => v.lang.startsWith('es-419')) ||
          voices.find(v => v.lang.startsWith('es'));
        if (voice) {
          utterance.voice = voice;
        }

        utterance.onend = () => onEnd?.();
        utterance.onerror = () => onEnd?.();

        window.speechSynthesis.speak(utterance);
        return;
      } catch (e) {
        console.warn('Speech synthesis error, fallback to audio chime', e);
      }
    }

    // Fallback: Andean chime confirmation
    this.playSuccessSound();
    onEnd?.();
  }

  /**
   * Stop any current speech
   */
  public stop() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const audioService = new AudioService();
