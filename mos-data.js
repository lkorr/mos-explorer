const TEMPERAMENTS = [
  // === DIATONIC FAMILY (5L 2s) ===
  { name: 'Meantone', mos: ['5L_2s', '7L_5s', '12L_7s'], genRange: [690.0, 700.0],
    commas: ['81/80'], commaNames: ['syntonic comma'],
    description: 'Tempers out 81/80. Quarter-comma ~696.6¢. Four fifths = major third (5/4).' },

  { name: 'Flattone', mos: ['5L_2s', '7L_5s', '12L_7s'], genRange: [691.0, 695.0],
    commas: ['81/80', '525/512'], commaNames: ['syntonic comma', 'avicennma'],
    description: 'Very flat meantone. 7/4 maps to diminished seventh. ~693¢ fifth.' },

  { name: 'Flattertone', mos: ['5L_2s', '7L_5s'], genRange: [688.0, 692.0],
    commas: ['81/80'], commaNames: ['syntonic comma'],
    description: 'Even flatter than flattone. Near 1/2-comma meantone.' },

  { name: 'Pythagorean', mos: ['5L_2s'], genRange: [701.5, 703.0],
    commas: [], commaNames: [],
    description: 'Pure 3/2 at 701.955¢. No commas tempered — just intonation of 3-limit.' },

  { name: 'Superpyth', mos: ['5L_2s', '5L_7s'], genRange: [704.0, 714.0],
    commas: ['64/63', '245/243'], commaNames: ['Archytas comma', 'sensamagic comma'],
    description: 'Sharp fifths. Two fifths = 8/7. Opposite of meantone.' },

  { name: 'Ultrapyth', mos: ['5L_2s', '5L_7s'], genRange: [714.0, 720.0],
    commas: ['64/63'], commaNames: ['Archytas comma'],
    description: 'Very sharp fifths near 5edo. Extends oceanfront (2.3.7.13/5). 5/4 mapped to +14 fifths.' },

  { name: 'Schismatic', mos: ['5L_2s', '5L_7s', '12L_5s'], genRange: [700.0, 701.5],
    commas: ['32805/32768'], commaNames: ['schisma'],
    description: 'Tempers out the schisma. Nearly pure fifths. Eight fourths = 10/1.' },

  // === ANTI-DIATONIC (2L 5s) ===
  { name: 'Mavila', mos: ['2L_5s', '7L_2s', '7L_9s'], genRange: [670.0, 686.0],
    commas: ['135/128'], commaNames: ['major chroma'],
    description: 'Anti-diatonic. Very flat fifths, four fifths = 6/5 instead of 5/4.' },

  // === MOSH / NEUTRAL THIRDS (3L 4s) ===
  { name: 'Mohajira', mos: ['3L_4s', '7L_3s'], genRange: [342.0, 353.0],
    commas: ['81/80', '121/120', '243/242'], commaNames: ['syntonic comma', 'biyatisma', 'rastma'],
    description: 'Neutral thirds temperament. Generator splits the fifth into two equal ~350¢ thirds.' },

  { name: 'Dicot', mos: ['3L_4s', '7L_3s'], genRange: [336.0, 342.0],
    commas: ['25/24'], commaNames: ['classical chromatic semitone'],
    description: 'Equates major and minor thirds. Two neutral thirds = a fifth.' },

  { name: 'Magic', mos: ['3L_4s', '3L_7s', '3L_10s'], genRange: [377.0, 385.0],
    commas: ['3125/3072'], commaNames: ['magic comma'],
    description: 'Five major thirds = a twelfth (3/1). Best 9-odd-limit in this complexity range.' },

  // === SMITONIC (4L 3s) ===
  { name: 'Hanson', mos: ['4L_3s', '4L_7s', '4L_11s'], genRange: [315.0, 319.0],
    commas: ['15625/15552'], commaNames: ['kleisma'],
    description: 'Six minor thirds = a twelfth. Near-microtemperament. ~317¢ generator.' },

  { name: 'Myna', mos: ['4L_3s', '4L_7s', '4L_11s'], genRange: [307.0, 313.0],
    commas: ['126/125', '1728/1715'], commaNames: ['starling comma', 'orwellisma'],
    description: 'Minor third generator. Named after starling family (126/125).' },

  { name: 'Superkleismic', mos: ['4L_3s', '4L_7s'], genRange: [320.0, 326.0],
    commas: ['875/864'], commaNames: ['keema'],
    description: 'Sharp minor third. Three generators = 7/4.' },

  // === PENTATONIC (2L 3s) ===

  // === ANTI-PENTATONIC (3L 2s) ===
  { name: 'Father', mos: ['3L_2s', '5L_3s'], genRange: [440.0, 465.0],
    commas: ['16/15'], commaNames: ['diatonic semitone'],
    description: 'Tempers out 16/15, equating 5/4 with 4/3. Exotemperament.' },

  { name: 'Slendric', mos: ['1L_4s', '5L_1s', '5L_6s'], genRange: [228.0, 240.0],
    commas: ['1029/1024'], commaNames: ['gamelisma'],
    description: 'Three 8/7 generators = 3/2. 2.3.7 subgroup. Very accurate.' },

  // === SENSOID (3L 5s) ===
  { name: 'Porcupine', mos: ['1L_6s', '7L_1s', '7L_8s', '8L_7s'], genRange: [158.0, 167.0],
    commas: ['250/243'], commaNames: ['porcupine comma'],
    description: 'Two generators = 6/5, three = 4/3. ~163¢ generator.' },

  { name: 'Sensi', mos: ['3L_5s', '8L_3s', '8L_11s'], genRange: [440.0, 448.0],
    commas: ['78732/78125'], commaNames: ['sensipent comma'],
    description: 'Half a major sixth generator. Two generators = 5/3, seven = 6/1.' },

  { name: 'Würschmidt', mos: ['3L_4s', '3L_7s', '3L_10s'], genRange: [385.0, 390.0],
    commas: ['393216/390625'], commaNames: ['Würschmidt comma'],
    description: 'Sharp major third generator. Eight generators = 6/1.' },

  // === ORWELLOID (4L 5s) ===
  { name: 'Orwell', mos: ['4L_5s', '4L_9s', '13L_9s'], genRange: [269.0, 275.0],
    commas: ['225/224', '1728/1715'], commaNames: ['marvel comma', 'orwellisma'],
    description: 'Subminor third (7/6) generator. Seven generators = twelfth. Excellent 11-limit.' },

  { name: 'Semaphore', mos: ['5L_4s', '5L_9s'], genRange: [247.0, 254.0],
    commas: ['49/48'], commaNames: ['slendro diesis'],
    description: 'Semi-fourth: two generators = 4/3. Equates 7/6 and 8/7.' },

  // === ARCHEOTONIC (6L 1s) ===
  { name: 'Tetracot', mos: ['6L_1s', '7L_6s', '7L_13s'], genRange: [174.0, 178.0],
    commas: ['20000/19683'], commaNames: ['tetracot comma'],
    description: 'Four generators = 3/2. Generator is a sub-major second (~176¢). EDOs: 27, 34, 41.' },

  // === TRIVIAL / SMALL ===
  { name: 'Bug', mos: ['4L_1s', '4L_5s'], genRange: [240.0, 260.0],
    commas: ['27/25'], commaNames: ['large limma'],
    description: 'Equates 10/9 and 6/5. Exotemperament.' },

  // === NON-OCTAVE PERIOD (disabled — octave-period mapping not yet reliable) ===
  { name: 'Pajara', mos: ['1L_9s', '10L_1s'], genRange: [105.0, 115.0], disabled: true,
    commas: ['50/49', '64/63', '2048/2025'], commaNames: ['jubilisma', 'Archytas comma', 'diaschisma'],
    description: 'Half-octave period (~600¢). Decatonic scales. 22edo optimal. Gen ~108¢.' },

  { name: 'Srutal', mos: ['1L_9s', '10L_1s'], genRange: [103.0, 106.0], disabled: true,
    commas: ['2048/2025', '126/125'], commaNames: ['diaschisma', 'starling comma'],
    description: 'Diaschismic. Half-octave period. More accurate cousin of pajara. Gen ~104¢.' },

  { name: 'Blackwood', mos: ['5L_2s'], genRange: [716.0, 724.0], disabled: true,
    commas: ['256/243'], commaNames: ['Pythagorean limma'],
    description: '1/5-octave period. Very sharp ~720¢ fifth. Every note roots a triad.' },

  { name: 'Augmented', mos: ['1L_2s', '3L_1s'], genRange: [392.0, 400.0], disabled: true,
    commas: ['128/125'], commaNames: ['diesis'],
    description: '1/3-octave period. Three 5/4 = octave. Major third generator ~400¢.' },

  { name: 'Diminished', mos: ['1L_3s', '4L_1s'], genRange: [293.0, 300.0], disabled: true,
    commas: ['648/625'], commaNames: ['major diesis'],
    description: '1/4-octave period. Four 6/5 = octave. Minor third generator ~300¢.' },

  { name: 'Lemba', mos: ['1L_4s', '5L_1s'], genRange: [225.0, 237.0], disabled: true,
    commas: ['50/49', '525/512'], commaNames: ['jubilisma', 'avicennma'],
    description: 'Half-octave period. Generator ~230¢ near golden ratio of half-octave.' },

  { name: 'Hedgehog', mos: ['1L_6s', '7L_1s'], genRange: [160.0, 170.0], disabled: true,
    commas: ['50/49', '245/243'], commaNames: ['jubilisma', 'sensamagic comma'],
    description: 'Half-octave period. Porcupine-family. 22edo is the canonical tuning.' },

  // === LARGER SCALES ===
  { name: 'Miracle', mos: ['1L_9s', '10L_1s', '10L_11s'], genRange: [115.0, 118.0],
    commas: ['225/224', '1029/1024'], commaNames: ['marvel comma', 'gamelisma'],
    description: 'The secor (~116.7¢). Six secors = a fifth. Exceptional 11-limit efficiency.' },

  { name: 'Negri', mos: ['1L_8s', '9L_1s', '9L_10s'], genRange: [123.0, 128.0],
    commas: ['16875/16384'], commaNames: ['negri comma'],
    description: 'Large semitone generator. Four generators = 4/3.' },

  // === CHROMATIC (7L 5s / 5L 7s) ===
  { name: 'Chromatic Pyth.', mos: ['7L_5s'], genRange: [698.0, 704.0],
    commas: [], commaNames: [],
    description: '12-note chromatic from stacked fifths.' },
];

const TEMP_COLORS = {
  'Meantone': '#50c878', 'Flattone': '#3da86a', 'Flattertone': '#2d8a55',
  'Pythagorean': '#ffd700', 'Superpyth': '#ff6347', 'Ultrapyth': '#ff8247',
  'Schismatic': '#da70d6', 'Mavila': '#20b2aa', 'Mohajira': '#dda0dd',
  'Dicot': '#c49bd4', 'Magic': '#ff69b4',
  'Hanson': '#98fb98', 'Myna': '#7ecf7e', 'Superkleismic': '#5aad5a',
  'Porcupine': '#7fff00', 'Sensi': '#e6c85e', 'Würschmidt': '#d4a030',
  'Orwell': '#87ceeb', 'Semaphore': '#6495ed',
  'Augmented': '#87ceeb', 'Diminished': '#cd5c5c',
  'Tetracot': '#66cdaa',
  'Slendric': '#deb887', 'Father': '#f0e68c', 'Bug': '#cd853f',
  'Chromatic Pyth.': '#ffd700',
  'Pajara': '#ff8c00', 'Srutal': '#e07800',
  'Blackwood': '#ba55d3', 'Lemba': '#d2691e', 'Hedgehog': '#8fbc8f',
  'Miracle': '#ff4500', 'Negri': '#9370db',
};

const MOS_NAMES = {
  '1L_1s': 'Trivial', '2L_1s': 'Tritonic', '1L_2s': 'Antritonic',
  '3L_1s': 'Tetric', '1L_3s': 'Tetric',
  '2L_3s': 'Pentatonic', '3L_2s': 'Anti-pentatonic',
  '4L_1s': 'Pentoid', '1L_4s': 'Pentoid',
  '5L_1s': 'Machinoid', '1L_5s': 'Hexoid',
  '2L_4s': 'Hexoid', '4L_2s': 'Hexoid',
  '3L_4s': 'Mosh', '4L_3s': 'Smitonic',
  '6L_1s': 'Archeotonic', '1L_6s': 'Onyx',
  '5L_2s': 'Diatonic', '2L_5s': 'Anti-diatonic',
  '3L_5s': 'Sensoid', '5L_3s': 'Oneirotonic',
  '4L_5s': 'Orwelloid', '5L_4s': 'Semiquartal',
  '7L_1s': 'Pine', '1L_7s': 'Antipine',
  '7L_2s': 'Superdiatonic', '2L_7s': 'Balzanoid',
  '6L_3s': 'Hyrulic', '3L_6s': 'Tcherepninoid',
  '7L_3s': 'Dicoid', '3L_7s': 'Dicoid',
  '5L_5s': 'Decanoid',
  '7L_4s': 'Undecoid', '4L_7s': 'Undecoid',
  '6L_5s': 'Undecoid', '5L_6s': 'Undecoid',
  '7L_5s': 'Chromatic', '5L_7s': 'Chromatic',
  '8L_3s': 'Sephiroid', '3L_8s': 'Sephiroid',
  '8L_4s': 'Triskaidecoid', '4L_8s': 'Triskaidecoid',
  '8L_5s': 'Triskaidecoid', '5L_8s': 'Triskaidecoid',
  '9L_1s': 'Sinatonic', '1L_9s': 'Antisinatonic',
  '10L_1s': 'Decatonic', '1L_10s': 'Antidecatonic',
  '10L_2s': 'Jaric', '2L_10s': 'Jaric',
  '7L_8s': 'Porcupinoid', '8L_7s': 'Porcupinoid',
  '7L_9s': 'Mavilic', '9L_7s': 'Mavilic',
  '10L_5s': 'Pentadecoid', '5L_10s': 'Pentadecoid',
  '10L_11s': 'Miracloid', '11L_10s': 'Miracloid',
  '9L_10s': 'Negric', '10L_9s': 'Negric',
  '12L_5s': 'Schismatoid', '5L_12s': 'Schismatoid',
  '12L_7s': 'Enneadecoid', '7L_12s': 'Enneadecoid',
  '4L_9s': 'Orwelloid', '9L_4s': 'Orwelloid',
  '4L_11s': 'Hansonoid', '11L_4s': 'Hansonoid',
  '8L_11s': 'Sensioid', '11L_8s': 'Sensioid',
  '13L_9s': 'Orwelloid', '9L_13s': 'Orwelloid',
};

// Mode names indexed by UDP order: index 0 = brightest (highest U|0), last = darkest (0|highest D)
const MODE_NAMES = {
  '5L_2s': ['Lydian', 'Ionian', 'Mixolydian', 'Dorian', 'Aeolian', 'Phrygian', 'Locrian'],
  '2L_5s': ['Anti-Locrian', 'Anti-Phrygian', 'Anti-Aeolian', 'Anti-Dorian', 'Anti-Mixolydian', 'Anti-Ionian', 'Anti-Lydian'],
  '3L_4s': ['Himal', 'Pamiri', 'Mohajira', 'Rast', 'Hijaz', 'Yakah', 'Buzurg'],
  '4L_3s': ['Smitonic', 'Glamorganic', 'Aeolimic', 'Mixosmitic', 'Lydic', 'Dorimic', 'Phrygimic'],
  '2L_3s': ['Major pentatonic', 'Suspended', 'Blues minor', 'Minor pentatonic', 'Man Gong'],
  '3L_2s': ['Anti-pentatonic mode 1', 'Anti-pentatonic mode 2', 'Anti-pentatonic mode 3', 'Anti-pentatonic mode 4', 'Anti-pentatonic mode 5'],
  '5L_3s': ['Mode 1', 'Mode 2', 'Mode 3', 'Mode 4', 'Mode 5', 'Mode 6', 'Mode 7', 'Mode 8'],
  '3L_5s': ['Mode 1', 'Mode 2', 'Mode 3', 'Mode 4', 'Mode 5', 'Mode 6', 'Mode 7', 'Mode 8'],
  '7L_5s': ['Mode 1', 'Mode 2', 'Mode 3', 'Mode 4', 'Mode 5', 'Mode 6', 'Mode 7', 'Mode 8', 'Mode 9', 'Mode 10', 'Mode 11', 'Mode 12'],
};
