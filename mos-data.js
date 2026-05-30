const TEMPERAMENTS = [
  { name: 'Meantone', mos: '5L_2s', genRange: [690.0, 700.0], description: 'Tempers out 81/80. Quarter-comma ~696.6¢.' },
  { name: 'Pythagorean', mos: '5L_2s', genRange: [701.5, 703.0], description: 'Pure 3/2 at 701.955¢.' },
  { name: 'Superpyth', mos: '5L_2s', genRange: [704.0, 714.0], description: 'Tempers out 64/63. Sharp fifths.' },
  { name: 'Schismatic', mos: '5L_2s', genRange: [700.0, 701.5], description: 'Tempers out 32805/32768.' },
  { name: 'Mavila', mos: '2L_5s', genRange: [521.0, 535.0], description: 'Anti-diatonic. Tempers out 135/128.' },
  { name: 'Mohajira', mos: '3L_4s', genRange: [342.0, 353.0], description: 'Neutral thirds. ~350¢ generator.' },
  { name: 'Porcupine', mos: '3L_5s', genRange: [158.0, 165.0], description: 'Tempers out 250/243. ~163¢ gen.' },
  { name: 'Augmented', mos: '3L_3s', genRange: [395.0, 405.0], description: 'Major third generator. Tempers out 128/125.' },
  { name: 'Slendric', mos: '3L_2s', genRange: [232.0, 240.0], description: '~233¢ gen. Tempers out 1029/1024.' },
  { name: 'Chromatic Pyth.', mos: '7L_5s', genRange: [698.0, 704.0], description: '12-note chromatic from stacked fifths.' },
  { name: 'Pajara', mos: '2L_8s', genRange: [105.0, 115.0], description: 'Half-octave period. Tempers out 2048/2025.' },
  { name: 'Blackwood', mos: '5L_5s', genRange: [238.0, 242.0], description: '1/5-octave period. Tempers out 256/243.' },
  { name: 'Bug', mos: '2L_1s', genRange: [370.0, 400.0], description: 'Large third generator. Simple temperament.' },
  { name: 'Father', mos: '3L_2s', genRange: [440.0, 465.0], description: 'Tempers out 16/15. ~460¢ gen.' },
];

const TEMP_COLORS = {
  'Meantone': '#50c878', 'Pythagorean': '#ffd700', 'Superpyth': '#ff6347',
  'Schismatic': '#da70d6', 'Mavila': '#20b2aa', 'Mohajira': '#dda0dd',
  'Porcupine': '#98fb98', 'Augmented': '#87ceeb', 'Slendric': '#deb887',
  'Chromatic Pyth.': '#ffd700', 'Pajara': '#ff8c00', 'Blackwood': '#ba55d3',
  'Bug': '#cd853f', 'Father': '#f0e68c',
};

const MOS_NAMES = {
  '1L_1s': 'Trivial', '2L_1s': 'Tritonic', '1L_2s': 'Antritonic',
  '3L_1s': 'Tetric', '1L_3s': 'Tetric',
  '2L_3s': 'Pentatonic', '3L_2s': 'Anti-pentatonic',
  '4L_1s': 'Pentoid', '1L_4s': 'Pentoid',
  '5L_1s': 'Machinoid', '1L_5s': 'Hexoid',
  '2L_4s': 'Hexoid', '4L_2s': 'Hexoid',
  '3L_4s': 'Mosh', '4L_3s': 'Smitonic',
  '6L_1s': 'Archeotonic', '1L_6s': 'Heptoid',
  '5L_2s': 'Diatonic', '2L_5s': 'Anti-diatonic',
  '3L_5s': 'Sensoid', '5L_3s': 'Oneirotonic',
  '4L_5s': 'Orwelloid', '5L_4s': 'Anti-orwelloid',
  '7L_2s': 'Superdiatonic', '2L_7s': 'Balzanoid',
  '6L_3s': 'Hyrulic', '3L_6s': 'Tcherepninoid',
  '7L_3s': 'Decoid', '3L_7s': 'Decoid',
  '5L_5s': 'Decanoid',
  '7L_4s': 'Undecoid', '4L_7s': 'Undecoid',
  '6L_5s': 'Undecoid', '5L_6s': 'Undecoid',
  '7L_5s': 'Chromatic', '5L_7s': 'Chromatic',
  '8L_3s': 'Sephiroid', '3L_8s': 'Sephiroid',
  '8L_5s': 'Triskaidecoid', '5L_8s': 'Triskaidecoid',
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
