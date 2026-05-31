const TEMPERAMENTS = [
  // === DIATONIC FAMILY (5L 2s) ===
  { name: 'Meantone', mos: ['5L_2s', '7L_5s', '12L_7s'], genRange: [694.77, 700.0],
    commas: ['81/80'], commaNames: ['syntonic comma'],
    wikiUrl: 'https://en.xen.wiki/w/Meantone',
    description: 'Tempers out 81/80. Quarter-comma ~696.6¢. Four fifths = major third (5/4).' },

  { name: 'Flattone', mos: ['5L_2s', '7L_5s', '12L_7s'], genRange: [690.9, 694.77],
    commas: ['81/80', '525/512'], commaNames: ['syntonic comma', 'avicennma'],
    wikiUrl: 'https://en.xen.wiki/w/Meantone_family#Flattone',
    description: 'Flat meantone. 7/4 maps to diminished seventh. ~695¢ fifth.' },

  { name: 'Deeptone', mos: ['5L_2s', '7L_5s'], genRange: [685.7, 690.9],
    commas: ['81/80'], commaNames: ['syntonic comma'],
    wikiUrl: 'https://en.xen.wiki/w/Deeptone',
    description: 'Very flat meantone. Near 1/2-comma meantone, between flattone and 7edo.' },

  { name: 'Pythagorean', mos: ['5L_2s'], genRange: [701.5, 702.4],
    commas: [], commaNames: [],
    wikiUrl: 'https://en.xen.wiki/w/Pythagorean_tuning',
    description: 'Pure 3/2 at 701.955¢. No commas tempered — just intonation of 3-limit.' },

  { name: 'Parapyth', mos: ['5L_2s', '5L_7s', '12L_5s'], genRange: [702.4, 705.88],
    commas: ['352/351', '364/363'], commaNames: ['minthma', 'gentle comma'],
    wikiUrl: 'https://en.xen.wiki/w/Parapyth',
    description: 'Rank-3 (2.3.7.11.13). Near-pure fifths with 7/11/13 mapping. Tempers out minthma and gentle comma.' },

  { name: 'Superpyth', mos: ['5L_2s', '5L_7s'], genRange: [705.88, 713.08],
    commas: ['64/63', '245/243'], commaNames: ['Archytas comma', 'sensamagic comma'],
    wikiUrl: 'https://en.xen.wiki/w/Superpyth',
    description: 'Sharp fifths. Two fifths = 8/7. Opposite of meantone.' },

  { name: 'Ultrapyth', mos: ['5L_2s', '5L_7s'], genRange: [713.08, 720.0],
    commas: ['64/63'], commaNames: ['Archytas comma'],
    wikiUrl: 'https://en.xen.wiki/w/Archytas_clan#Ultrapyth',
    description: 'Very sharp fifths near 5edo. Extends oceanfront (2.3.7.13/5). 5/4 mapped to +14 fifths.' },

  { name: 'Schismatic', mos: ['5L_2s', '5L_7s', '12L_5s'], genRange: [700.0, 701.5],
    commas: ['32805/32768'], commaNames: ['schisma'],
    wikiUrl: 'https://en.xen.wiki/w/Schismic',
    description: 'Tempers out the schisma. Nearly pure fifths. Eight fourths = 10/1.' },

  // === ANTI-DIATONIC (2L 5s) ===
  { name: 'Mavila', mos: ['2L_5s', '7L_2s', '7L_9s'], genRange: [670.0, 685.7],
    commas: ['135/128'], commaNames: ['major chroma'],
    wikiUrl: 'https://en.xen.wiki/w/Mavila',
    description: 'Anti-diatonic. Very flat fifths, four fifths = 6/5 instead of 5/4.' },

  { name: 'Mabila', mos: ['2L_5s', '2L_7s', '9L_7s'], genRange: [666.0, 670.0],
    commas: ['268435456/263671875'], commaNames: ['mabila comma'],
    wikiUrl: 'https://en.xen.wiki/w/Mabila_family',
    description: 'Flat fifths like mavila but three generators = 5/2. Ten bad fifths reach a good one. 9L 7s MOS has good triads.' },

  { name: 'Casablanca', mos: ['2L_5s', '2L_7s', '2L_9s'], genRange: [540.0, 550.0],
    commas: ['126/125'], commaNames: ['starling comma'],
    wikiUrl: 'https://en.xen.wiki/w/Starling_temperaments#Casablanca',
    description: 'Starling family. Generator is a sharp 11/8 (~545¢). Two generators = 6/5.' },

  // === MOSH / NEUTRAL THIRDS (3L 4s) ===
  { name: 'Mohajira', mos: ['3L_4s', '7L_3s'], genRange: [342.0, 353.0],
    commas: ['81/80', '121/120', '243/242'], commaNames: ['syntonic comma', 'biyatisma', 'rastma'],
    wikiUrl: 'https://en.xen.wiki/w/Mohajira',
    description: 'Neutral thirds temperament. <a href="https://en.xen.wiki/w/Dicot_family" target="_blank" style="color:#c49bd4;text-decoration:none">Dicot</a> tuning, e.g. this divides the fifth into 2 parts. Generator splits the fifth into two equal ~350¢ thirds.' },

  { name: 'Suhajira', mos: ['3L_4s', '7L_3s', '10L_7s'], genRange: [353.0, 365.0],
    commas: ['243/242', '2401/2400'], commaNames: ['rastma', 'breedsma'],
    wikiUrl: 'https://en.xen.wiki/w/Rastmic_clan#Suhajira',
    description: 'Rastmic clan. <a href="https://en.xen.wiki/w/Dicot_family" target="_blank" style="color:#c49bd4;text-decoration:none">Dicot</a> tuning, e.g. this divides the fifth into 2 parts. Sharp neutral third generator. Two generators = 3/2.' },

  { name: 'Magic', mos: ['3L_4s', '3L_7s', '3L_10s'], genRange: [377.0, 385.0],
    commas: ['3125/3072'], commaNames: ['magic comma'],
    wikiUrl: 'https://en.xen.wiki/w/Magic_family',
    description: 'Five major thirds = a twelfth (3/1). Best 9-odd-limit in this complexity range.' },

  // === SMITONIC (4L 3s) ===

  { name: 'Myna', mos: ['4L_3s', '4L_7s', '4L_11s'], genRange: [307.0, 313.0],
    commas: ['126/125', '1728/1715'], commaNames: ['starling comma', 'orwellisma'],
    wikiUrl: 'https://en.xen.wiki/w/Myna',
    description: 'Minor third generator. Named after starling family (126/125).' },

  { name: 'Superkleismic', mos: ['4L_3s', '4L_7s'], genRange: [320.0, 326.0],
    commas: ['875/864'], commaNames: ['keema'],
    wikiUrl: 'https://en.xen.wiki/w/Shibboleth_family',
    description: 'Sharp minor third. Three generators = 7/4.' },

  // === PENTATONIC (2L 3s) ===

  // === ANTI-PENTATONIC (3L 2s) ===
  { name: 'Father', mos: ['3L_2s', '5L_3s'], genRange: [454.0, 471.4],
    commas: ['16/15'], commaNames: ['diatonic semitone'],
    wikiUrl: 'https://en.xen.wiki/w/Father_family',
    description: 'Tempers out 16/15, equating 5/4 with 4/3. Exotemperament.' },

  { name: 'Squares', mos: ['3L_2s', '3L_5s', '3L_8s'], genRange: [420.0, 428.75],
    commas: ['256/245'], commaNames: ['squares comma'],
    wikiUrl: 'https://en.xen.wiki/w/Squares',
    description: 'Four generators = 7/2. Generator is a sharp sub-fourth (~426¢). Accurate 7-limit.' },

  { name: 'Machine', mos: ['1L_4s', '5L_1s', '6L_5s'], genRange: [211.765, 218.182],
    commas: ['16807/16384'], commaNames: ['cloudy comma'],
    wikiUrl: 'https://en.xen.wiki/w/Subgroup_temperaments#Machine',
    description: '2.7 subgroup. Generator is a flat 8/7. Five generators = octave minus a comma.' },

  { name: 'Tricot / Slendric', mos: ['1L_4s', '5L_1s', '5L_6s'], genRange: [218.182, 240.0],
    commas: ['1029/1024'], commaNames: ['gamelisma'],
    wikiUrl: 'https://en.xen.wiki/w/Slendric',
    description: 'Three 8/7 generators = 3/2. 2.3.7 subgroup. Very accurate.' },

  { name: 'Glacier / Pentacot', mos: ['1L_7s', '8L_1s'], genRange: [137.0, 144.0],
    commas: [], commaNames: [],
    wikiUrl: 'https://en.xen.wiki/w/Glacier',
    description: 'Pentacot tuning (divides 3/2 into 5 steps). Generator ~137–144¢.' },


  { name: 'Tritonic', mos: ['2L_1s', '2L_3s', '2L_5s'], genRange: [617.0, 624.0],
    commas: ['225/224'], commaNames: ['marvel comma'],
    wikiUrl: 'https://en.xen.wiki/w/Marvel_temperaments#Tritonic',
    description: 'Marvel family. Generator is a 10/7 tritone (~617.5¢). 5 generators = 6th harmonic.' },

  { name: 'Alpha Tricot', mos: ['2L_1s', '2L_3s', '2L_5s', '2L_7s'], genRange: [628.5, 640.0],
    commas: [], commaNames: [],
    wikiUrl: 'https://en.xen.wiki/w/Alphatricot_family#Alphatricot',
    description: 'Alpha ploidacot family. Generator ~628.5–640¢.' },

  { name: 'Buzzard', mos: ['3L_2s', '5L_3s', '5L_8s'], genRange: [471.4, 480.0],
    commas: [], commaNames: [],
    wikiUrl: 'https://en.xen.wiki/w/Buzzard',
    description: 'Alpha tetracot (splits 3/1 into 4 steps). Generator ~471.4–480¢.' },


  { name: 'Kleismic', mos: ['4L_3s', '4L_7s', '4L_11s'], genRange: [313.0, 320.0],
    commas: [], commaNames: [],
    wikiUrl: 'https://en.xen.wiki/w/Kleismic_family',
    description: 'Alpha hexacot (splits 3/1 into 6 steps). Generator ~314.3–320¢.' },

  // === SENSOID (3L 5s) ===
  { name: 'Porcupine', mos: ['1L_6s', '7L_1s', '7L_8s', '8L_7s'], genRange: [150.0, 171.43],
    commas: ['250/243'], commaNames: ['porcupine comma'],
    wikiUrl: 'https://en.xen.wiki/w/Porcupine',
    description: 'Two generators = 6/5, three = 4/3. ~163¢ generator.' },

  { name: 'Sensi', mos: ['3L_5s', '8L_3s', '8L_11s'], genRange: [435.0, 454.0],
    commas: ['78732/78125'], commaNames: ['sensipent comma'],
    wikiUrl: 'https://en.xen.wiki/w/Sensipent_family',
    description: 'Half a major sixth generator. Two generators = 5/3, seven = 6/1.' },

  { name: 'Würschmidt', mos: ['3L_4s', '3L_7s', '3L_10s'], genRange: [385.0, 390.0],
    commas: ['393216/390625'], commaNames: ['Würschmidt comma'],
    wikiUrl: 'https://en.xen.wiki/w/Wurschmidt',
    description: 'Sharp major third generator. Eight generators = 6/1.' },

  // === ORWELLOID (4L 5s) ===
  { name: 'Neominor', mos: ['4L_5s', '4L_9s', '4L_13s'], genRange: [280.0, 285.5],
    commas: ['2401/2400'], commaNames: ['breedsma'],
    wikiUrl: 'https://en.xen.wiki/w/Breedsmic_temperaments#Neominor',
    description: 'Breedsmic temperament. Generator is a subminor third. 4L 5s, 4L 9s, 4L 13s MOS family.' },

  { name: 'Orwell', mos: ['4L_5s', '4L_9s', '13L_9s'], genRange: [269.0, 275.0],
    commas: ['225/224', '1728/1715'], commaNames: ['marvel comma', 'orwellisma'],
    wikiUrl: 'https://en.xen.wiki/w/Orwell',
    description: 'Subminor third (7/6) generator. Seven generators = twelfth. Excellent 11-limit.' },

  { name: 'Semaphore', mos: ['5L_4s', '5L_9s'], genRange: [933, 960.0],
    commas: ['49/48'], commaNames: ['slendro diesis'],
    wikiUrl: 'https://en.xen.wiki/w/Semaphore_and_godzilla',
    description: 'Semi-fourth: two generators = 4/3. Equates 7/6 and 8/7.' },

  // === ARCHEOTONIC (6L 1s) ===
  { name: 'Tetracot', mos: ['6L_1s', '7L_6s', '7L_13s'], genRange: [171.43, 180.0],
    commas: ['20000/19683'], commaNames: ['tetracot comma'],
    wikiUrl: 'https://en.xen.wiki/w/Tetracot_family',
    description: 'Four generators = 3/2. Generator is a sub-major second (~176¢). EDOs: 27, 34, 41.' },

  { name: 'Didacus', mos: ['6L_1s', '7L_6s', '13L_7s'], genRange: [180, 200.0],
    commas: ['3136/3125'], commaNames: ['hemimean comma'],
    wikiUrl: 'https://en.xen.wiki/w/Didacus',
    description: 'Tempers out 3136/3125. Generator is half a major third (half of 5/4).' },

  { name: 'Emka', mos: ['2L_9s', '2L_11s', '13L_2s'], genRange: [550.0, 553.8],
    commas: ['3136/3125', '5120/5103'], commaNames: ['hemimean comma', 'hemimean'],
    wikiUrl: 'https://en.xen.wiki/w/Hemimean_clan#Emka',
    description: 'Hemimean clan. Generator is near 11/8. 11 and 13 note MOS scales.' },

  { name: 'Octacot', mos: ['1L_13s', '14L_1s', '14L_13s'], genRange: [85.7, 90.0],
    commas: ['20000/19683'], commaNames: ['tetracot comma'],
    wikiUrl: 'https://en.xen.wiki/w/Tetracot_family#Octacot',
    description: 'Tetracot family. Eight generators = 3/2. Half of a tetracot generator.' },

  { name: 'Passion', mos: ['1L_11s', '12L_1s', '12L_13s'], genRange: [96.0, 103.0],
    commas: ['262144/253125'], commaNames: ['passion comma'],
    wikiUrl: 'https://en.xen.wiki/w/Passion_family#Passion',
    description: 'Near-12edo generator (~98¢). Twelve generators = octave minus a comma. Chromatic 13-note MOS.' },

  { name: 'Escape', mos: ['1L_20s', '21L_1s', '21L_22s'], genRange: [55.33, 57.2],
    commas: ['4294967296/4271484375'], commaNames: ['escapade comma'],
    wikiUrl: 'https://en.xen.wiki/w/Escapade_family#2.3.5.11_subgroup',
    description: 'Escapade family. Twenty-one generators = octave. Very small generator ~56¢.' },

  { name: 'Valentine', mos: ['1L_14s', '15L_1s', '15L_16s'], genRange: [75.0, 80.0],
    commas: ['6144/6125'], commaNames: ['porwell comma'],
    wikiUrl: 'https://en.xen.wiki/w/Valentine',
    description: 'Generator is ~77.1¢. Fifteen generators = 3/2. Excellent 11-limit accuracy.' },

  // === TRIVIAL / SMALL ===
 // { name: 'Bug', mos: ['4L_1s', '4L_5s'], genRange: [240.0, 264.0],
 //   commas: ['27/25'], commaNames: ['large limma'],
 //   wikiUrl: 'https://en.xen.wiki/w/Bug_family',
 //   description: 'Equates 10/9 and 6/5. Exotemperament.' },

  // === NON-OCTAVE PERIOD (disabled — octave-period mapping not yet reliable) ===
  { name: 'Pajara', mos: ['1L_9s', '10L_1s'], genRange: [105.0, 115.0], disabled: true,
    commas: ['50/49', '64/63', '2048/2025'], commaNames: ['jubilisma', 'Archytas comma', 'diaschisma'],
    wikiUrl: 'https://en.xen.wiki/w/Pajara',
    description: 'Half-octave period (~600¢). Decatonic scales. 22edo optimal. Gen ~108¢.' },

  { name: 'Srutal', mos: ['1L_9s', '10L_1s'], genRange: [103.0, 106.0], disabled: true,
    commas: ['2048/2025', '126/125'], commaNames: ['diaschisma', 'starling comma'],
    wikiUrl: 'https://en.xen.wiki/w/Diaschismic_family',
    description: 'Diaschismic. Half-octave period. More accurate cousin of pajara. Gen ~104¢.' },

  { name: 'Blackwood', mos: ['5L_2s'], genRange: [716.0, 724.0], disabled: true,
    commas: ['256/243'], commaNames: ['Pythagorean limma'],
    wikiUrl: 'https://en.xen.wiki/w/Blackwood',
    description: '1/5-octave period. Very sharp ~720¢ fifth. Every note roots a triad.' },

  { name: 'Augmented', mos: ['1L_2s', '3L_1s'], genRange: [392.0, 400.0], disabled: true,
    commas: ['128/125'], commaNames: ['diesis'],
    wikiUrl: 'https://en.xen.wiki/w/Augmented_family',
    description: '1/3-octave period. Three 5/4 = octave. Major third generator ~400¢.' },

  { name: 'Diminished', mos: ['1L_3s', '4L_1s'], genRange: [293.0, 300.0], disabled: true,
    commas: ['648/625'], commaNames: ['major diesis'],
    wikiUrl: 'https://en.xen.wiki/w/Diminished_family',
    description: '1/4-octave period. Four 6/5 = octave. Minor third generator ~300¢.' },

  { name: 'Lemba', mos: ['1L_4s', '5L_1s'], genRange: [225.0, 237.0], disabled: true,
    commas: ['50/49', '525/512'], commaNames: ['jubilisma', 'avicennma'],
    wikiUrl: 'https://en.xen.wiki/w/Lemba',
    description: 'Half-octave period. Generator ~230¢ near golden ratio of half-octave.' },

  { name: 'Hedgehog', mos: ['1L_6s', '7L_1s'], genRange: [160.0, 170.0], disabled: true,
    commas: ['50/49', '245/243'], commaNames: ['jubilisma', 'sensamagic comma'],
    wikiUrl: 'https://en.xen.wiki/w/Porcupine_family',
    description: 'Half-octave period. Porcupine-family. 22edo is the canonical tuning.' },

  // === LARGER SCALES ===
  { name: 'Miracle', mos: ['1L_9s', '10L_1s', '10L_11s'], genRange: [111.0, 120.0],
    commas: ['225/224', '1029/1024'], commaNames: ['marvel comma', 'gamelisma'],
    wikiUrl: 'https://en.xen.wiki/w/Miracle',
    description: 'The secor (~116.7¢). Six secors = a fifth. Exceptional 11-limit efficiency.' },

  { name: 'Negri', mos: ['1L_8s', '9L_1s', '9L_10s'], genRange: [120.0, 137.0],
    commas: ['16875/16384'], commaNames: ['negri comma'],
    wikiUrl: 'https://en.xen.wiki/w/Negri',
    description: 'Large semitone generator. Four generators = 4/3.' },

  // === CHROMATIC (7L 5s / 5L 7s) ===
  //{ name: 'Chromatic Pyth.', mos: ['7L_5s'], genRange: [698.0, 704.0],
  //  commas: [], commaNames: [],
   // wikiUrl: 'https://en.xen.wiki/w/Pythagorean_tuning',
   // description: '12-note chromatic from stacked fifths.' },
];

const TEMP_COLORS = {
  'Meantone': '#50c878', 'Flattone': '#3da86a', 'Deeptone': '#2d8a55',
  'Pythagorean': '#ffd700', 'Parapyth': '#ffec40', 'Superpyth': '#ff6347', 'Ultrapyth': '#ff8247',
  'Schismatic': '#da70d6', 'Mavila': '#20b2aa', 'Mabila': '#178a84', 'Casablanca': '#15968a',
  'Mohajira': '#dda0dd',
  'Suhajira': '#e8b4e8', 'Magic': '#ff69b4',
  'Hanson': '#98fb98', 'Myna': '#7ecf7e', 'Superkleismic': '#5aad5a',
  'Porcupine': '#7fff00', 'Sensi': '#e6c85e', 'Würschmidt': '#d4a030',
  'Neominor': '#7fbfdf', 'Orwell': '#87ceeb', 'Semaphore': '#6495ed',
  'Augmented': '#87ceeb', 'Diminished': '#cd5c5c',
  'Tetracot': '#66cdaa', 'Didacus': '#4ab8a0', 'Emka': '#3ea090',
  'Machine': '#e8c89e', 'Tricot / Slendric': '#deb887', 'Glacier / Pentacot': '#c4a67a',   'Tritonic': '#c4b896', 'Alpha Tricot': '#d4aa70', 'Buzzard': '#c89e64', 'Kleismic': '#b0864c',
  'Father': '#f0e68c', 'Squares': '#e0825a', 'Bug': '#cd853f',
  'Chromatic Pyth.': '#ffd700',
  'Pajara': '#ff8c00', 'Srutal': '#e07800',
  'Blackwood': '#ba55d3', 'Lemba': '#d2691e', 'Hedgehog': '#8fbc8f',
  'Escape': '#a8d8ea', 'Octacot': '#56c9a0', 'Passion': '#d4637a', 'Valentine': '#ff6b81', 'Miracle': '#ff4500', 'Negri': '#9370db',
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
