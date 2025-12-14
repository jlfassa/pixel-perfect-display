// Music Theory Data and Logic

export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const;
export const NOTES_FLAT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'] as const;

export type NoteName = typeof NOTES[number];
export type ChordQuality = 'major' | 'minor' | 'dominant' | 'diminished' | 'augmented' | 'suspended' | 'half-diminished';
export type ModeName = 'ionian' | 'dorian' | 'phrygian' | 'lydian' | 'mixolydian' | 'aeolian' | 'locrian';

export interface Mode {
  name: ModeName;
  displayName: string;
  intervals: number[];
  pattern: string;
  character: string;
  tensions: string[];
  avoidNotes: string[];
  chordType: string;
  relativePosition: number;
}

export const MODES: Mode[] = [
  {
    name: 'ionian',
    displayName: 'Ionian (Major)',
    intervals: [0, 2, 4, 5, 7, 9, 11],
    pattern: 'W-W-H-W-W-W-H',
    character: 'Bright, happy, stable',
    tensions: ['9', '13'],
    avoidNotes: ['4'],
    chordType: 'Maj7',
    relativePosition: 1,
  },
  {
    name: 'dorian',
    displayName: 'Dorian',
    intervals: [0, 2, 3, 5, 7, 9, 10],
    pattern: 'W-H-W-W-W-H-W',
    character: 'Minor with brightness, jazzy',
    tensions: ['9', '11', '13'],
    avoidNotes: [],
    chordType: 'm7',
    relativePosition: 2,
  },
  {
    name: 'phrygian',
    displayName: 'Phrygian',
    intervals: [0, 1, 3, 5, 7, 8, 10],
    pattern: 'H-W-W-W-H-W-W',
    character: 'Spanish, dark, exotic',
    tensions: ['11'],
    avoidNotes: ['b2', 'b6'],
    chordType: 'm7',
    relativePosition: 3,
  },
  {
    name: 'lydian',
    displayName: 'Lydian',
    intervals: [0, 2, 4, 6, 7, 9, 11],
    pattern: 'W-W-W-H-W-W-H',
    character: 'Dreamy, ethereal, floating',
    tensions: ['9', '#11', '13'],
    avoidNotes: [],
    chordType: 'Maj7#11',
    relativePosition: 4,
  },
  {
    name: 'mixolydian',
    displayName: 'Mixolydian',
    intervals: [0, 2, 4, 5, 7, 9, 10],
    pattern: 'W-W-H-W-W-H-W',
    character: 'Bluesy, rock, dominant',
    tensions: ['9', '13'],
    avoidNotes: ['4'],
    chordType: '7',
    relativePosition: 5,
  },
  {
    name: 'aeolian',
    displayName: 'Aeolian (Natural Minor)',
    intervals: [0, 2, 3, 5, 7, 8, 10],
    pattern: 'W-H-W-W-H-W-W',
    character: 'Sad, melancholic, natural',
    tensions: ['9', '11'],
    avoidNotes: ['b6'],
    chordType: 'm7',
    relativePosition: 6,
  },
  {
    name: 'locrian',
    displayName: 'Locrian',
    intervals: [0, 1, 3, 5, 6, 8, 10],
    pattern: 'H-W-W-H-W-W-W',
    character: 'Unstable, diminished, tense',
    tensions: ['11', 'b13'],
    avoidNotes: ['b2'],
    chordType: 'm7b5',
    relativePosition: 7,
  },
];

export interface ChordType {
  symbol: string;
  name: string;
  intervals: number[];
  quality: ChordQuality;
  tensions: string[];
  function?: string;
}

export const CHORD_TYPES: ChordType[] = [
  { symbol: 'Maj7', name: 'Major 7th', intervals: [0, 4, 7, 11], quality: 'major', tensions: ['9', '13', '#11'] },
  { symbol: 'Maj9', name: 'Major 9th', intervals: [0, 4, 7, 11, 14], quality: 'major', tensions: ['13', '#11'] },
  { symbol: '6', name: 'Major 6th', intervals: [0, 4, 7, 9], quality: 'major', tensions: ['9'] },
  { symbol: '6/9', name: 'Major 6/9', intervals: [0, 4, 7, 9, 14], quality: 'major', tensions: [] },
  { symbol: 'm7', name: 'Minor 7th', intervals: [0, 3, 7, 10], quality: 'minor', tensions: ['9', '11', '13'] },
  { symbol: 'm9', name: 'Minor 9th', intervals: [0, 3, 7, 10, 14], quality: 'minor', tensions: ['11', '13'] },
  { symbol: 'm6', name: 'Minor 6th', intervals: [0, 3, 7, 9], quality: 'minor', tensions: ['9'] },
  { symbol: 'mMaj7', name: 'Minor Major 7th', intervals: [0, 3, 7, 11], quality: 'minor', tensions: ['9', '11'] },
  { symbol: '7', name: 'Dominant 7th', intervals: [0, 4, 7, 10], quality: 'dominant', tensions: ['9', '13', 'b9', '#9', '#11', 'b13'] },
  { symbol: '9', name: 'Dominant 9th', intervals: [0, 4, 7, 10, 14], quality: 'dominant', tensions: ['13', '#11'] },
  { symbol: '13', name: 'Dominant 13th', intervals: [0, 4, 7, 10, 14, 21], quality: 'dominant', tensions: ['#11'] },
  { symbol: '7alt', name: 'Altered Dominant', intervals: [0, 4, 8, 10], quality: 'dominant', tensions: ['b9', '#9', '#11', 'b13'] },
  { symbol: '7#9', name: 'Dominant 7#9', intervals: [0, 4, 7, 10, 15], quality: 'dominant', tensions: ['b9', '#11', 'b13'] },
  { symbol: '7b9', name: 'Dominant 7b9', intervals: [0, 4, 7, 10, 13], quality: 'dominant', tensions: ['#9', '#11', 'b13'] },
  { symbol: 'dim7', name: 'Diminished 7th', intervals: [0, 3, 6, 9], quality: 'diminished', tensions: ['9', '11', 'b13'] },
  { symbol: 'm7b5', name: 'Half-Diminished', intervals: [0, 3, 6, 10], quality: 'half-diminished', tensions: ['9', '11', 'b13'] },
  { symbol: 'aug', name: 'Augmented', intervals: [0, 4, 8], quality: 'augmented', tensions: ['9', '#11'] },
  { symbol: 'aug7', name: 'Augmented 7th', intervals: [0, 4, 8, 10], quality: 'augmented', tensions: ['9', '#11'] },
  { symbol: 'sus4', name: 'Suspended 4th', intervals: [0, 5, 7], quality: 'suspended', tensions: ['9'] },
  { symbol: 'sus2', name: 'Suspended 2nd', intervals: [0, 2, 7], quality: 'suspended', tensions: [] },
  { symbol: '7sus4', name: 'Dominant 7sus4', intervals: [0, 5, 7, 10], quality: 'suspended', tensions: ['9', '13'] },
];

export interface HarmonicFunction {
  name: string;
  description: string;
  chords: string[];
  color: string;
}

export const HARMONIC_FUNCTIONS: HarmonicFunction[] = [
  {
    name: 'Tonic',
    description: 'Resolution, stability, home',
    chords: ['I', 'iii', 'vi'],
    color: 'chord-major',
  },
  {
    name: 'Subdominant',
    description: 'Motion away from tonic, preparation',
    chords: ['IV', 'ii'],
    color: 'chord-minor',
  },
  {
    name: 'Dominant',
    description: 'Tension, needs resolution to tonic',
    chords: ['V', 'vii°'],
    color: 'chord-dominant',
  },
];

export function getScaleNotes(root: string, mode: Mode): string[] {
  const rootIndex = NOTES.indexOf(root as NoteName);
  if (rootIndex === -1) {
    const flatIndex = NOTES_FLAT.indexOf(root as any);
    if (flatIndex === -1) return [];
    return mode.intervals.map(interval => NOTES[(flatIndex + interval) % 12]);
  }
  return mode.intervals.map(interval => NOTES[(rootIndex + interval) % 12]);
}

export function getChordNotes(root: string, chordType: ChordType): string[] {
  const rootIndex = NOTES.indexOf(root as NoteName);
  if (rootIndex === -1) return [];
  return chordType.intervals.map(interval => NOTES[(rootIndex + interval) % 12]);
}

export function getDiatonicChords(root: string): { numeral: string; chord: string; quality: ChordQuality }[] {
  const majorScaleChords = [
    { numeral: 'I', quality: 'major' as ChordQuality, suffix: 'Maj7' },
    { numeral: 'ii', quality: 'minor' as ChordQuality, suffix: 'm7' },
    { numeral: 'iii', quality: 'minor' as ChordQuality, suffix: 'm7' },
    { numeral: 'IV', quality: 'major' as ChordQuality, suffix: 'Maj7' },
    { numeral: 'V', quality: 'dominant' as ChordQuality, suffix: '7' },
    { numeral: 'vi', quality: 'minor' as ChordQuality, suffix: 'm7' },
    { numeral: 'vii°', quality: 'half-diminished' as ChordQuality, suffix: 'm7b5' },
  ];
  
  const majorScale = getScaleNotes(root, MODES[0]);
  
  return majorScaleChords.map((chord, index) => ({
    numeral: chord.numeral,
    chord: `${majorScale[index]}${chord.suffix}`,
    quality: chord.quality,
  }));
}

export function getSecondaryDominants(root: string): { target: string; dominant: string }[] {
  const diatonicChords = getDiatonicChords(root);
  const secondaryDominants: { target: string; dominant: string }[] = [];
  
  // V7/ii, V7/iii, V7/IV, V7/V, V7/vi
  const targets = [1, 2, 3, 4, 5]; // Indices of ii, iii, IV, V, vi
  
  targets.forEach(targetIndex => {
    const targetChord = diatonicChords[targetIndex];
    const targetRoot = targetChord.chord.match(/^[A-G][#b]?/)?.[0] || '';
    const targetNoteIndex = NOTES.indexOf(targetRoot as NoteName);
    if (targetNoteIndex !== -1) {
      const dominantRoot = NOTES[(targetNoteIndex + 7) % 12]; // Perfect 5th above
      secondaryDominants.push({
        target: targetChord.numeral,
        dominant: `${dominantRoot}7`,
      });
    }
  });
  
  return secondaryDominants;
}

export function getTritoneSubstitution(dominant: string): string {
  const root = dominant.match(/^[A-G][#b]?/)?.[0] || '';
  const rootIndex = NOTES.indexOf(root as NoteName);
  if (rootIndex === -1) return '';
  
  const tritoneIndex = (rootIndex + 6) % 12;
  const suffix = dominant.replace(/^[A-G][#b]?/, '');
  return `${NOTES[tritoneIndex]}${suffix}`;
}

export function getRelatedScales(chordSymbol: string): { scale: string; mode: Mode }[] {
  const root = chordSymbol.match(/^[A-G][#b]?/)?.[0] || '';
  const suffix = chordSymbol.replace(/^[A-G][#b]?/, '');
  
  const relatedScales: { scale: string; mode: Mode }[] = [];
  
  if (suffix.includes('Maj7') || suffix === '6' || suffix === '6/9') {
    relatedScales.push({ scale: `${root} Ionian`, mode: MODES[0] });
    relatedScales.push({ scale: `${root} Lydian`, mode: MODES[3] });
  } else if (suffix.includes('m7') && !suffix.includes('b5')) {
    relatedScales.push({ scale: `${root} Dorian`, mode: MODES[1] });
    relatedScales.push({ scale: `${root} Aeolian`, mode: MODES[5] });
    relatedScales.push({ scale: `${root} Phrygian`, mode: MODES[2] });
  } else if (suffix === '7' || suffix === '9' || suffix === '13') {
    relatedScales.push({ scale: `${root} Mixolydian`, mode: MODES[4] });
  } else if (suffix.includes('m7b5')) {
    relatedScales.push({ scale: `${root} Locrian`, mode: MODES[6] });
  } else if (suffix.includes('alt') || suffix.includes('#9') || suffix.includes('b9')) {
    relatedScales.push({ scale: `${root} Altered (Super Locrian)`, mode: MODES[6] });
  }
  
  return relatedScales;
}

export function analyzeProgression(chords: string[]): {
  key: string;
  analysis: { chord: string; numeral: string; function: string }[];
} {
  // Simple key detection - find the most likely key
  // This is a simplified version; a full implementation would be more complex
  
  if (chords.length === 0) return { key: 'C', analysis: [] };
  
  // Assume first chord is I or vi
  const firstChord = chords[0];
  const firstRoot = firstChord.match(/^[A-G][#b]?/)?.[0] || 'C';
  const isMinor = firstChord.includes('m') && !firstChord.includes('Maj');
  
  const key = isMinor ? `${NOTES[(NOTES.indexOf(firstRoot as NoteName) + 3) % 12]} Major` : `${firstRoot} Major`;
  
  return {
    key,
    analysis: chords.map(chord => ({
      chord,
      numeral: '?',
      function: 'Unknown',
    })),
  };
}
