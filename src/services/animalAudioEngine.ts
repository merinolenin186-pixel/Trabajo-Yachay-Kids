/**
 * Offline Sensory Animal Sound Synthesizer (Web Audio API)
 * Generates rich, recognizable, child-friendly animal vocalizations
 * using formant filters, vibrato LFOs, harmonic oscillators, and shaped noise.
 */

export type AnimalSoundKey =
  | 'llama'
  | 'condor'
  | 'vicuna'
  | 'cuy'
  | 'puma'
  | 'fox'
  | 'dog'
  | 'cat';

function createNoiseBuffer(ctx: AudioContext, durationSec: number): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const length = Math.max(1, Math.floor(sampleRate * durationSec));
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  let lastOut = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    // Slight pink/brown warmth so breath/rumble isn't harsh
    lastOut = (lastOut + 0.08 * white) / 1.08;
    data[i] = lastOut * 2.8 + white * 0.25;
  }
  return buffer;
}

/**
 * Plays a realistic synthesized animal vocalization and returns its approximate duration in ms.
 */
export function synthesizeAnimalSound(ctx: AudioContext, key: string): number {
  const now = ctx.currentTime;
  const master = ctx.createGain();
  master.gain.setValueAtTime(0.85, now);
  master.connect(ctx.destination);

  const normalized = key.toLowerCase() as AnimalSoundKey;

  switch (normalized) {
    // 1. LLAMA: Warm nasal camelid hum + gentle double bleat ("Mmm-mmm")
    case 'llama': {
      const bleats = [
        { start: 0, dur: 0.42, base: 155, peak: 198, end: 170 },
        { start: 0.48, dur: 0.48, base: 165, peak: 215, end: 160 },
      ];
      bleats.forEach(b => {
        const t = now + b.start;
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        const formant = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc1.type = 'sawtooth';
        osc2.type = 'triangle';
        osc1.frequency.setValueAtTime(b.base, t);
        osc1.frequency.linearRampToValueAtTime(b.peak, t + b.dur * 0.45);
        osc1.frequency.linearRampToValueAtTime(b.end, t + b.dur);

        osc2.frequency.setValueAtTime(b.base * 1.5, t);
        osc2.frequency.linearRampToValueAtTime(b.peak * 1.5, t + b.dur * 0.45);
        osc2.frequency.linearRampToValueAtTime(b.end * 1.5, t + b.dur);

        // Gentle vocal tremor
        lfo.frequency.setValueAtTime(20, t);
        lfoGain.gain.setValueAtTime(8, t);
        lfo.connect(lfoGain);
        lfoGain.connect(osc1.frequency);

        formant.type = 'bandpass';
        formant.frequency.setValueAtTime(430, t);
        formant.frequency.linearRampToValueAtTime(620, t + b.dur * 0.5);
        formant.Q.setValueAtTime(3.2, t);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.32, t + 0.06);
        gain.gain.setValueAtTime(0.28, t + b.dur * 0.72);
        gain.gain.exponentialRampToValueAtTime(0.001, t + b.dur);

        osc1.connect(formant);
        osc2.connect(formant);
        formant.connect(gain);
        gain.connect(master);

        osc1.start(t);
        osc2.start(t);
        lfo.start(t);
        osc1.stop(t + b.dur + 0.03);
        osc2.stop(t + b.dur + 0.03);
        lfo.stop(t + b.dur + 0.03);
      });
      return 1000;
    }

    // 2. CÓNDOR: Powerful Andean wing gusts + high raptor wind cry
    case 'condor': {
      // Two slow majestic wingbeats (filtered air whoosh)
      const buffer = createNoiseBuffer(ctx, 1.35);
      [0, 0.46].forEach(offset => {
        const t = now + offset;
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(220, t);
        filter.frequency.exponentialRampToValueAtTime(680, t + 0.16);
        filter.frequency.exponentialRampToValueAtTime(190, t + 0.4);
        filter.Q.setValueAtTime(1.6, t);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.45, t + 0.14);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.42);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(master);
        noise.start(t);
        noise.stop(t + 0.44);
      });

      // Raptor sky call
      const callT = now + 0.25;
      const osc = ctx.createOscillator();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      const bp = ctx.createBiquadFilter();
      const callGain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1350, callT);
      osc.frequency.exponentialRampToValueAtTime(1950, callT + 0.18);
      osc.frequency.exponentialRampToValueAtTime(1020, callT + 0.72);

      lfo.frequency.setValueAtTime(14, callT);
      lfoGain.gain.setValueAtTime(35, callT);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      bp.type = 'bandpass';
      bp.frequency.setValueAtTime(1600, callT);
      bp.Q.setValueAtTime(2.5, callT);

      callGain.gain.setValueAtTime(0.001, callT);
      callGain.gain.linearRampToValueAtTime(0.18, callT + 0.08);
      callGain.gain.exponentialRampToValueAtTime(0.001, callT + 0.75);

      osc.connect(bp);
      bp.connect(callGain);
      callGain.connect(master);
      osc.start(callT);
      lfo.start(callT);
      osc.stop(callT + 0.78);
      lfo.stop(callT + 0.78);

      return 1050;
    }

    // 3. VICUÑA: Crisp high-pitched alert whinny ("Iii-iii!")
    case 'vicuna': {
      const pulses = [
        { start: 0, dur: 0.24, f1: 580, f2: 890 },
        { start: 0.27, dur: 0.24, f1: 630, f2: 960 },
        { start: 0.54, dur: 0.36, f1: 680, f2: 820 },
      ];
      pulses.forEach(p => {
        const t = now + p.start;
        const osc = ctx.createOscillator();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        const bp = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(p.f1, t);
        osc.frequency.exponentialRampToValueAtTime(p.f2, t + p.dur * 0.55);
        osc.frequency.exponentialRampToValueAtTime(p.f1 * 0.85, t + p.dur);

        lfo.frequency.setValueAtTime(28, t);
        lfoGain.gain.setValueAtTime(26, t);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);

        bp.type = 'bandpass';
        bp.frequency.setValueAtTime(1150, t);
        bp.Q.setValueAtTime(2.8, t);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.24, t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, t + p.dur);

        osc.connect(bp);
        bp.connect(gain);
        gain.connect(master);

        osc.start(t);
        lfo.start(t);
        osc.stop(t + p.dur + 0.02);
        lfo.stop(t + p.dur + 0.02);
      });
      return 950;
    }

    // 4. CUY (COBAYO): Cheerful guinea-pig "kuy-kuy-kuy!" whistles
    case 'cuy': {
      const squeaks = [
        { start: 0, dur: 0.16, fStart: 920, fPeak: 1750, fEnd: 1380 },
        { start: 0.21, dur: 0.17, fStart: 1020, fPeak: 1960, fEnd: 1520 },
        { start: 0.43, dur: 0.22, fStart: 1120, fPeak: 2150, fEnd: 1620 },
      ];
      squeaks.forEach(s => {
        const t = now + s.start;
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const bp = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc2.type = 'triangle';

        osc1.frequency.setValueAtTime(s.fStart, t);
        osc1.frequency.exponentialRampToValueAtTime(s.fPeak, t + s.dur * 0.55);
        osc1.frequency.exponentialRampToValueAtTime(s.fEnd, t + s.dur);

        osc2.frequency.setValueAtTime(s.fStart * 2, t);
        osc2.frequency.exponentialRampToValueAtTime(s.fPeak * 2, t + s.dur * 0.55);
        osc2.frequency.exponentialRampToValueAtTime(s.fEnd * 2, t + s.dur);

        bp.type = 'bandpass';
        bp.frequency.setValueAtTime(1650, t);
        bp.Q.setValueAtTime(2.2, t);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.28, t + 0.025);
        gain.gain.exponentialRampToValueAtTime(0.001, t + s.dur);

        osc1.connect(bp);
        osc2.connect(bp);
        bp.connect(gain);
        gain.connect(master);

        osc1.start(t);
        osc2.start(t);
        osc1.stop(t + s.dur + 0.02);
        osc2.stop(t + s.dur + 0.02);
      });
      return 700;
    }

    // 5. PUMA: Deep chesty feline growl/roar ("Grrrr")
    case 'puma': {
      const dur = 1.05;
      const oscLow = ctx.createOscillator();
      const oscMid = ctx.createOscillator();
      const flutter = ctx.createOscillator();
      const flutterGain = ctx.createGain();
      const noise = ctx.createBufferSource();
      noise.buffer = createNoiseBuffer(ctx, dur);

      const lp = ctx.createBiquadFilter();
      const noiseBp = ctx.createBiquadFilter();
      const oscGain = ctx.createGain();
      const noiseGain = ctx.createGain();

      oscLow.type = 'sawtooth';
      oscMid.type = 'sawtooth';
      oscLow.frequency.setValueAtTime(72, now);
      oscLow.frequency.linearRampToValueAtTime(92, now + 0.35);
      oscLow.frequency.exponentialRampToValueAtTime(58, now + dur);

      oscMid.frequency.setValueAtTime(112, now);
      oscMid.frequency.linearRampToValueAtTime(140, now + 0.35);
      oscMid.frequency.exponentialRampToValueAtTime(86, now + dur);

      // Guttural growl flutter (~27 Hz)
      flutter.frequency.setValueAtTime(27, now);
      flutterGain.gain.setValueAtTime(18, now);
      flutter.connect(flutterGain);
      flutterGain.connect(oscLow.frequency);
      flutterGain.connect(oscMid.frequency);

      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(260, now);
      lp.frequency.linearRampToValueAtTime(480, now + 0.3);
      lp.frequency.exponentialRampToValueAtTime(170, now + dur);
      lp.Q.setValueAtTime(2.4, now);

      oscGain.gain.setValueAtTime(0.001, now);
      oscGain.gain.linearRampToValueAtTime(0.36, now + 0.18);
      oscGain.gain.setValueAtTime(0.3, now + 0.55);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + dur);

      noiseBp.type = 'bandpass';
      noiseBp.frequency.setValueAtTime(320, now);
      noiseBp.Q.setValueAtTime(1.5, now);
      noiseGain.gain.setValueAtTime(0.001, now);
      noiseGain.gain.linearRampToValueAtTime(0.24, now + 0.22);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + dur);

      oscLow.connect(lp);
      oscMid.connect(lp);
      lp.connect(oscGain);
      oscGain.connect(master);

      noise.connect(noiseBp);
      noiseBp.connect(noiseGain);
      noiseGain.connect(master);

      oscLow.start(now);
      oscMid.start(now);
      flutter.start(now);
      noise.start(now);
      oscLow.stop(now + dur + 0.03);
      oscMid.stop(now + dur + 0.03);
      flutter.stop(now + dur + 0.03);
      noise.stop(now + dur + 0.03);

      return 1080;
    }

    // 6. ZORRO ANDINO (ATUQ): Playful canine yips + short night howl ("Waw-waw-auuu")
    case 'fox': {
      const yips = [
        { start: 0, dur: 0.19, f1: 420, f2: 860, f3: 330 },
        { start: 0.24, dur: 0.19, f1: 460, f2: 920, f3: 360 },
        { start: 0.5, dur: 0.45, f1: 480, f2: 710, f3: 380 },
      ];
      yips.forEach(y => {
        const t = now + y.start;
        const osc = ctx.createOscillator();
        const bp = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(y.f1, t);
        osc.frequency.exponentialRampToValueAtTime(y.f2, t + y.dur * 0.35);
        osc.frequency.exponentialRampToValueAtTime(y.f3, t + y.dur);

        bp.type = 'bandpass';
        bp.frequency.setValueAtTime(950, t);
        bp.Q.setValueAtTime(2.0, t);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.28, t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, t + y.dur);

        osc.connect(bp);
        bp.connect(gain);
        gain.connect(master);

        osc.start(t);
        osc.stop(t + y.dur + 0.02);
      });
      return 980;
    }

    // 7. PERRO (ALLQO): Friendly double bark
    case 'dog': {
      [0, 0.24].forEach(offset => {
        const t = now + offset;
        const osc = ctx.createOscillator();
        const lp = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(280, t);
        osc.frequency.exponentialRampToValueAtTime(460, t + 0.05);
        osc.frequency.exponentialRampToValueAtTime(175, t + 0.17);

        lp.type = 'lowpass';
        lp.frequency.setValueAtTime(1100, t);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.32, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

        osc.connect(lp);
        lp.connect(gain);
        gain.connect(master);

        osc.start(t);
        osc.stop(t + 0.2);
      });
      return 500;
    }

    // 8. GATO (MISI): Soft feline meow
    case 'cat': {
      const osc = ctx.createOscillator();
      const bp = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(460, now);
      osc.frequency.exponentialRampToValueAtTime(760, now + 0.22);
      osc.frequency.exponentialRampToValueAtTime(510, now + 0.62);

      bp.type = 'bandpass';
      bp.frequency.setValueAtTime(900, now);
      bp.frequency.linearRampToValueAtTime(1450, now + 0.25);
      bp.frequency.linearRampToValueAtTime(850, now + 0.62);
      bp.Q.setValueAtTime(2.5, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      osc.connect(bp);
      bp.connect(gain);
      gain.connect(master);

      osc.start(now);
      osc.stop(now + 0.68);
      return 700;
    }

    default:
      return 400;
  }
}
