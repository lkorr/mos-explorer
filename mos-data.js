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
    description: 'Very flat meantone. Near 1/2-comma meantone, between flattone and 7edo. 11 fifths ~= 5/4, so the optimal generator is around 689.7c.' },

  { name: 'Pythagorean', mos: ['5L_2s'], genRange: [700, 703.44],
    commas: [], commaNames: [],
    wikiUrl: 'https://en.xen.wiki/w/Pythagorean_tuning',
    description: 'Pure 3/2 at 701.955¢. Near-just intonation of 3-limit. Basically all western music comes from this. <br> <br> Be careful when exploring tunings outside of this range. You may encounter critics who insist your music sounds "bad" and "out of tune" and you should "get a job" and to "stop living in your moms basement memorizing made up names all day". ' },

  { name: 'Parapyth', mos: ['5L_2s', '5L_7s', '12L_5s'], genRange: [703.44, 707.69],
    commas: ['352/351', '364/363'], commaNames: ['minthma', 'gentle comma'],
    wikiUrl: 'https://en.xen.wiki/w/Parapyth',
    description: 'Rank-3 (2.3.7.11.13). Near-pure, slightly sharp fifths with 7/11/13 mapping. Tempers out minthma and gentle comma. <br> <br> Technically parapyth is a rank-3 temperament, but the only alternative was to call this range "pepperoni" which I simply refuse to do.' },

  { name: 'Superpyth', mos: ['5L_2s', '5L_7s'], genRange: [707.69, 713.08],
    commas: ['64/63', '245/243'], commaNames: ['Archytas comma', 'sensamagic comma'],
    wikiUrl: 'https://en.xen.wiki/w/Superpyth',
    description: 'Sharp fifths. Two fifths = 8/7. Opposite of meantone. 22 and 27edo are quintissential superpyth tunings. Sounds snazzy - classic xen sound.' },

  { name: 'Ultrapyth', mos: ['5L_2s', '5L_7s'], genRange: [713.08, 720.0],
    commas: ['64/63'], commaNames: ['Archytas comma'],
    wikiUrl: 'https://en.xen.wiki/w/Archytas_clan#Ultrapyth',
    description: 'Very sharp fifths near 5edo. Extends oceanfront (2.3.7.13/5). 5/4 mapped to +14 fifths. <br> <br> The diatonic scale starts to collapse melodically here; composition may be tricky.<br> <br>  Some weird stuff can happen where the extremely small comma-step can give you a just 3/2 again, by correcting your very sharp superpyth fifth.' },

//  { name: 'Schismatic', mos: ['5L_2s', '5L_7s', '12L_5s'], genRange: [700.0, 701.5],
//    commas: ['32805/32768'], commaNames: ['schisma'],
//   wikiUrl: 'https://en.xen.wiki/w/Schismic',
 //   description: 'Tempers out the schisma. Nearly pure fifths. Eight fourths = 10/1.' },

  // === ANTI-DIATONIC (2L 5s) ===
  { name: 'Mavila', mos: ['2L_5s', '7L_2s', '7L_9s'], genRange: [670.0, 685.7],
    commas: ['135/128'], commaNames: ['major chroma'],
    wikiUrl: 'https://en.xen.wiki/w/Mavila',
    description: 'Anti-diatonic. The bees knees. Very flat fifths, four fifths = 6/5 instead of 5/4. <br> <br> In this range, major chords invert into minor chords and vice versa. Diminished chords become augmented chords. Timbre matters a lot here to compensate and navigate around the fact that your 3/2 is so flat. <br> Approximates some Gamelan tunings as well.' },

  { name: 'Mabila', mos: ['2L_5s', '2L_7s', '9L_7s'], genRange: [666.667, 670.0],
    commas: ['268435456/263671875'], commaNames: ['mabila comma'],
    wikiUrl: 'https://en.xen.wiki/w/Mabila_family',
    description: 'Flat fifths like mavila but three generators = 5/2. Ten bad fifths reach a good one. 9L 7s MOS has good triads. <br> <br> Basically mavila but you can consider it even flatter, I guess?' },

  { name: 'Wilsec', mos: ['2L_5s', '2L_7s', '2L_9s'], genRange: [533.3330, 540.0],
    commas: ['49/48'], commaNames: ['semaphoresma'],
    wikiUrl: 'https://en.xen.wiki/w/Semaphoresmic_clan#Wilsec',
    description: '2.3.7 subgroup. Divides the 12th harmonic into 8 equal parts. Tempers out 49/48, equating 7/6 and 8/7.' },

  { name: 'Casablanca', mos: ['2L_5s', '2L_7s', '2L_9s'], genRange: [540.0, 550.0],
    commas: ['126/125'], commaNames: ['starling comma'],
    wikiUrl: 'https://en.xen.wiki/w/Starling_temperaments#Casablanca',
    description: 'Starling family. Generator is a sharp 11/8 (~545¢). Two generators = 6/5.' },

  // === MOSH / NEUTRAL THIRDS (3L 4s) ===
  { name: 'Sixix', mos: ['3L_4s', '7L_3s'], genRange: [333.33, 338.46],
    commas: ['3125/2916'], commaNames: ['sixix comma'],
    wikiUrl: 'https://en.xen.wiki/w/Archytas_clan#Sixix',
    description: 'Sharp 6/5 generator. 3rd and 5th harmonics reached by going down, inverting typical chord construction.' },

  { name: 'Amity', mos: ['3L_4s', '7L_3s'], genRange: [338.46, 342.86],
    commas: ['1600000/1594323'], commaNames: ['amity comma'],
    wikiUrl: 'https://en.xen.wiki/w/Amity',
    description: 'Five generators = 4/3. Generator is a flat neutral third (~339¢). Works well in 39edo.' },

  { name: 'Mohajira', mos: ['3L_4s', '7L_3s'], genRange: [342.86, 350.0],
    commas: ['81/80', '121/120', '243/242'], commaNames: ['syntonic comma', 'biyatisma', 'rastma'],
    wikiUrl: 'https://en.xen.wiki/w/Mohajira',
    description: 'Neutral thirds temperament. <a href="https://en.xen.wiki/w/Dicot_family" target="_blank" style="color:#c49bd4;text-decoration:none">Dicot</a> tuning, e.g. this divides the fifth into 2 parts. <br> <br>  Think of this as the "flat" portion of neutral third temperaments, which when stacked, gives you meantone (the flat fifth temperament). Contains the just 11/9 neutral third, which is the lowest complexity neutral interval, which gives it extra sauce.' },

  { name: 'Hemififths', mos: ['3L_4s', '7L_3s', '10L_7s'], genRange: [350.0, 352.94],
    commas: ['5120/5103', '10976/10935'], commaNames: ['hemifamity comma', 'hemimage comma'],
    wikiUrl: 'https://en.xen.wiki/w/Hemififths',
    description: 'Dicot; Two generators = 3/2. Excellent no-fives temperament. <br> <br>  This is the "accurate" neutral third temperament, where stacking a third gives you a pythagorean fifth. Imagine the diatonic scale with pure fifths, and then just clone it and offset the clone by ~350c.' },

  { name: 'Suhajira', mos: ['3L_4s', '7L_3s', '10L_7s'], genRange: [352.94, 360.0],
    commas: ['243/242', '2401/2400'], commaNames: ['rastma', 'breedsma'],
    wikiUrl: 'https://en.xen.wiki/w/Rastmic_clan#Suhajira',
    description: 'Rastmic clan. <a href="https://en.xen.wiki/w/Dicot_family" target="_blank" style="color:#c49bd4;text-decoration:none">Dicot</a> tuning, e.g. this divides the fifth into 2 parts. <br> <br>  This is the "sharp" neutral third temperament, which when stacked, gives you superpyth fifths. Evil twin of mohajira.' },

  { name: 'Sephiroth', mos: ['3L_4s', '3L_7s', '3L_10s'], genRange: [360.0, 377.14],
    commas: ['65/64', '170/169', '221/220'], commaNames: ['wilsorma', '', ''],
    wikiUrl: 'https://en.xen.wiki/w/Chromatic_pairs#Sephiroth',
    description: 'A no-3s and no-7s restriction of magic. Generator is a sharp neutral third between 360¢ and 377¢ - so sharp that your fifth extends past 5edo into oneirotonic territory. <br> Think of it as simultaneously extremely sharp version of dicot, as well as the antidiatonic equivalent of magic. 2 generators gives you an ultra sharp "oneirotonic 3/2", and 5 generators will stack up to a super flat "antidiatonic 3/2". The 10-note MOS is the sweet spot. <br> <br>  Named after the final fantasy character. I know. ' },

  { name: 'Magic', mos: ['3L_4s', '3L_7s', '3L_10s'], genRange: [377.14, 385.0],
    commas: ['3125/3072'], commaNames: ['magic comma'],
    wikiUrl: 'https://en.xen.wiki/w/Magic_family',
    description: 'Five major thirds = a twelfth (3/1). Best 9-odd-limit in this complexity range.' },

  // === SMITONIC (4L 3s) ===

  { name: 'Myna', mos: ['4L_3s', '4L_7s', '4L_11s'], genRange: [307.0, 313.0],
    commas: ['126/125', '1728/1715'], commaNames: ['starling comma', 'orwellisma'],
    wikiUrl: 'https://en.xen.wiki/w/Myna',
    description: 'Minor third generator. Named after starling family (126/125).' },

  { name: 'Superkleismic', mos: ['4L_3s', '4L_7s'], genRange: [320.0, 323.08],
    commas: ['875/864'], commaNames: ['keema'],
    wikiUrl: 'https://en.xen.wiki/w/Shibboleth_family',
    description: 'Sharp minor third. Three generators = 7/4.' },

  { name: 'Orgone', mos: ['4L_3s', '4L_7s'], genRange: [323.08, 327.27],
    commas: ['65536/65219'], commaNames: ['orgonisma'],
    wikiUrl: 'https://en.xen.wiki/w/Orgone',
    description: '2.7.11 subgroup. Generator is ~77/64. Two generators = 16/11, three = 7/4.' },

  { name: 'Rarity', mos: ['4L_3s', '4L_7s'], genRange: [327.27, 333.33],
    commas: ['1035/1024', '16875/16606', '192375/188416'], commaNames: ['rarity comma', '16875/16606', '192375/188416'],
    wikiUrl: 'https://en.xen.wiki/w/No-sevens_subgroup_temperaments#Rarity',
    description: '2.3.5.19.23 subgroup. Generator is ~368/225. Offers a 7L 4s scale of reasonable hardness in the 5-limit among small edos. <br> <br> This temperament is especially unique and interesting in that theres <i> nothing good here at all </i>. In a world of crazy temperaments, just intervals and cluster chords, Rarity is a complete standout in that it just... fails to do what everything else does.' },

  // === PENTATONIC (2L 3s) ===

  // === ANTI-PENTATONIC (3L 2s) ===
  { name: 'Father', mos: ['3L_2s', '5L_3s'], genRange: [445.7, 461.5],
    commas: ['16/15'], commaNames: ['diatonic semitone'],
    wikiUrl: 'https://en.xen.wiki/w/Father_family',
    description: 'Tempers out 16/15, equating 5/4 with 4/3. Exotemperament.' },

  { name: 'Squares', mos: ['3L_2s', '3L_5s', '3L_8s'], genRange: [420.0, 428.57],
    commas: ['256/245'], commaNames: ['squares comma'],
    wikiUrl: 'https://en.xen.wiki/w/Squares',
    description: 'Four generators stack to = 8/3. Generator is a sharp sub-fourth (~426¢).' },

  { name: 'Hamity', mos: ['3L_2s', '3L_5s', '3L_8s'], genRange: [428.57, 432.0],
    commas: ['1600000/1594323', '5120/5103'], commaNames: ['amity comma', 'hemifamity comma'],
    wikiUrl: 'https://en.xen.wiki/w/Amity_family#Hamity',
    description: 'Amity family. Generator is a near-9/7 (~429–432¢). Five generators reach 3/2. Half-octave period variant of amity.' },

  { name: 'Novisept', mos: ['3L_5s', '8L_3s', '8L_11s'], genRange: [432.0, 436.36],
    commas: ['99/98', '154/153', '1309/1296'], commaNames: ['', '', ''],
    wikiUrl: 'https://en.xen.wiki/w/Novisept',
    description: '2.9.7.11.17 subgroup. Generator is ~434¢ (9/7), stacked 5 times until it becomes 7/4. 11 and 25edo are canonical tunings. <br> <br> Dont&#39t tell anyone, but I made this one up. I know, I know, but we had a gap in a temperament range here and it sounds kinda cool. Called Novisept because we&#39re stacking an interval with both 9 and 7 in it, until it becomes just 7.'},

  { name: 'Baldi', mos: ['1L_4s', '5L_1s', '6L_5s'], genRange: [200.0, 208.70],
    commas: ['225/224', '325/324', '640/637'], commaNames: ['septimal kleisma', 'lesser diesis', '640/637'],
    wikiUrl: 'https://en.xen.wiki/w/Subgroup_temperaments#Baldy',
    description: '2.9.5.7.13 subgroup. Derived from every other generator of garibaldi. Generator ~200–207¢. <br> <br> You can also just think of this as every other generator from pythagorean - so its a wholetone scale temperament. Just a biiig stack of wholetones, but with a weird comma-pump thing goin instead of wrapping back around like 6edo does.' },

  { name: 'Machine', mos: ['1L_4s', '5L_1s', '6L_5s'], genRange: [208.7, 218.18],
    commas: ['16807/16384'], commaNames: ['cloudy comma'],
    wikiUrl: 'https://en.xen.wiki/w/Subgroup_temperaments#Machine',
    description: '2.7 subgroup. Generator is a flat 8/7. Five generators = octave minus a comma.' },

  { name: 'Kumonga', mos: ['1L_4s', '5L_1s', '5L_6s'], genRange: [218.18, 222.22],
    commas: ['126/125'], commaNames: ['starling comma'],
    wikiUrl: 'https://en.xen.wiki/w/Starling_temperaments#Kumonga',
    description: 'Starling family. Generator is a sharp 8/7. Tempers out 126/125. <br> <br> Gonna be honest, theres nothing that interesting in this interval region. You cannot imagine how many strings I had to pull to find out what temperament could go here, the amount of research I had to do - and the result? Kumonga. Ok. <br> <br> Maybe you can make something work here. Prove these lousy tuning theorists wrong. I believe in you. ' },

  { name: 'Hemisensi', mos: ['1L_4s', '5L_1s', '5L_6s'], genRange: [222.22, 228.57],
    commas: ['78732/78125'], commaNames: ['sensipent comma'],
    wikiUrl: 'https://en.xen.wiki/w/Sensipent_family#Hemisensi',
    description: 'Sensipent family. Splits the 9/7 generator into two equal parts, each ~25/22.' },

  { name: 'Tricot / Slendric', mos: ['1L_4s', '5L_1s', '5L_6s'], genRange: [228.57, 240.0],
    commas: ['1029/1024'], commaNames: ['gamelisma'],
    wikiUrl: 'https://en.xen.wiki/w/Slendric',
    description: 'Three 8/7 generators = 3/2. 2.3.7 subgroup. Very accurate. <br> <br> Historically this temperament has been called slendric, because in the Indonesian Gamelan scale Slendro, some might say their fifth is ~roughly~ divided into 3 steps - even though the step sizes aren&#39t evenly spaced at all. <br> <br> It&#39s a bit chauvinistic if you ask me. Imagine if you will, an alien species coming to earth and they analyze all of western classical music theory. They then fly away and tell the rest of the universe that the earthlings play music in 7edo, and name 7edo "Diatonic". <br> <br> So just call it tricot, will you?' },

  { name: 'Glacier / Pentacot', mos: ['1L_7s', '8L_1s'], genRange: [137.0, 144.0],
    commas: [], commaNames: [],
    wikiUrl: 'https://en.xen.wiki/w/Glacier',
    description: 'Pentacot tuning (divides 3/2 into 5 steps). Generator ~137–144¢. <br> <br> Honestly, do me a favor and just call this pentacot.' },

  { name: 'Bohpier', mos: ['1L_7s', '8L_1s', '8L_9s'], genRange: [144, 146.94],
    commas: ['245/243', '3125/3087'], commaNames: ['sensamagic comma', 'gariboh comma'],
    wikiUrl: 'https://en.xen.wiki/w/Bohpier',
    description: 'Related to Bohlen-Pierce with octave period. 13 generators = 3rd harmonic, 19 = 5th, 23 = 7th. <br> <br> Basically someone took the bohlen pierce scale, where you divide 3/1 into 13 even steps, and fudged it up so that it fits into 12edo. Fun stuff.' },


  { name: 'Neptune', mos: ['2L_1s', '2L_3s', '2L_5s', '2L_7s'], genRange: [582.86, 587.76],
    commas: ['2401/2400'], commaNames: ['breedsma'],
    wikiUrl: 'https://en.xen.wiki/w/Gammic_family#Neptune',
    description: 'Gammic family. 7 bright generator stacks give you a fifth. Generator is a flat 7/5 tritone (~585¢). <br> <br> Named neptune because triton. Tritone. Get it? Anyways, this temperament is notable because its built on a near-just 7/5; otherwise, it is just terrible to compose in. Hats off to you if you make this one work.' },

  { name: 'Tritonic', mos: ['2L_1s', '2L_3s', '2L_5s'], genRange: [617.14, 624.0],
    commas: ['225/224'], commaNames: ['marvel comma'],
    wikiUrl: 'https://en.xen.wiki/w/Marvel_temperaments#Tritonic',
    description: 'Marvel family. Generator is a 10/7 tritone (~617.5¢). 5 generators = 6th harmonic. Pretty much at the absolute limit of listenable music. <br> <br> <i>&#39;Oops! All tritones!&#39;</i>' },

  { name: 'Alphatricot', mos: ['2L_1s', '2L_3s', '2L_5s', '2L_7s'], genRange: [628.57, 640.0],
    commas: [], commaNames: [],
    wikiUrl: 'https://en.xen.wiki/w/Alphatricot_family#Alphatricot',
    description: 'Divides 3/1 into 3 equal approximations of 13/9 (~636.6c). Generator ~628.5–640¢. <br> <br> This temperament used to just be called tricot. However it behaved completely differently from all over n-cot tunings, and instead of dividing 3/2 into 3, it divided 3/1 into 3.   <br> Which is dumb and I hate it. <br> So after endless complaining and petitioning on forums and wiki spaces, Tricot was renamed to Alphatricot (Alpha n-cot divides 3/1 into n), and Slendric is now correctly being named tricot.' },

  { name: 'A-team', mos: ['3L_2s', '5L_3s'], genRange: [461.5, 471.4],
    commas: ['225/224', '875/864'], commaNames: ['marvel comma', 'keema'],
    wikiUrl: 'https://en.xen.wiki/w/Subgroup_temperaments#A-team',
    description: '2.3.5.7 subgroup. Generator between 5\\13 and 11\\28. Tempers out 225/224 and 875/864. Prototypical oneirotonic (5L 3s) temperament. Works well for gamelan scales. <br> <br> Pretty dumb name - pretty cool sounds.' },

  { name: 'Buzzard', mos: ['3L_2s', '5L_3s', '5L_8s'], genRange: [471.4, 480.0],
    commas: [], commaNames: [],
    wikiUrl: 'https://en.xen.wiki/w/Buzzard',
    description: 'Alpha tetracot (splits 3/1 into 4 steps). Given 3/1 is split into 4 steps, if you put more than 4 steps in your scale you&#39ll get a fifth! Funny how that works out. <br> <br> Generator ~471.4–480¢. Prototypical hard oneirotonic(5L 3s) tuning. Works well for gamelan scales.' },


  { name: 'Kleismic', mos: ['4L_3s', '4L_7s', '4L_11s'], genRange: [313.0, 320.0],
    commas: [], commaNames: [],
    wikiUrl: 'https://en.xen.wiki/w/Kleismic_family',
    description: 'Alpha hexacot (splits 3/1 into 6 steps). Generator ~314.3–320¢.' },

  // === CHECKERTONIC (3L 5s) ===
  { name: 'Nusecond', mos: ['1L_6s', '7L_1s', '7L_8s', '8L_7s'], genRange: [146.94, 156.502],
    commas: ['126/125'], commaNames: ['starling comma'],
    wikiUrl: 'https://en.xen.wiki/w/Starling_temperaments#Nusecond',
    description: 'Starling family. Generator is ~49/45 neutral second. Two generators = 6/5. It&#39s made up of neutral seconds, if you could believe it.' },

  { name: 'Hemikleismic', mos: ['1L_6s', '7L_1s', '7L_8s', '8L_7s'], genRange: [156.502, 160.0],
    commas: ['4000/3969', '15625/15552'], commaNames: ['4000/3969', 'kleisma'],
    wikiUrl: 'https://en.xen.wiki/w/Kleismic_family#Hemikleismic',
    description: 'Kleismic family. Splits 6/5 in half, generating a neutral second of 35/32.' },

  { name: 'Porcupine', mos: ['1L_6s', '7L_1s', '7L_8s', '8L_7s'], genRange: [160.0, 166.67],
    commas: ['250/243'], commaNames: ['porcupine comma'],
    wikiUrl: 'https://en.xen.wiki/w/Porcupine',
    description: 'Two generators = 6/5, three = 4/3. ~163¢ generator.' },

  { name: 'Superpine', mos: ['7L_1s', '7L_8s', '8L_7s'], genRange: [166.67, 171.43],
    commas: ['250/243'], commaNames: ['porcupine comma'],
    wikiUrl: 'https://en.xen.wiki/w/Meantone_family#Superpine',
    description: 'Like porcupine but favors flat fifths. Generator is 1/3 of a fourth (~35/32). Needs 15-tone MOS (7L 8s) for harmonics beyond 3.' },

  { name: 'Sensamagic', mos: ['3L_5s', '8L_3s', '8L_11s'], genRange: [436.36, 442.11],
    commas: ['245/243'], commaNames: ['sensamagic comma'],
    wikiUrl: 'https://en.xen.wiki/w/Sensamagic',
    description: 'Tempers out 245/243. Two generators of ~440¢ approximate 6/5 + 9/7. Divides 3/2 into 7/6 and 10/9.' },

  { name: 'Sensi', mos: ['3L_5s', '8L_3s', '8L_11s'], genRange: [442.11, 445.7],
    commas: ['78732/78125'], commaNames: ['sensipent comma'],
    wikiUrl: 'https://en.xen.wiki/w/Sensipent_family',
    description: 'Half a major sixth generator. Two generators = 5/3, seven = 6/1.' },

  { name: 'Würschmidt', mos: ['3L_4s', '3L_7s', '3L_10s'], genRange: [385.0, 389.61],
    commas: ['393216/390625'], commaNames: ['Würschmidt comma'],
    wikiUrl: 'https://en.xen.wiki/w/Wurschmidt',
    description: 'Sharp major third generator. Eight generators = 6/1.' },

  { name: 'Magus', mos: ['3L_4s', '3L_7s', '3L_10s'], genRange: [389.61, 392.73],
    commas: ['245/243', '28672/28125'], commaNames: ['sensamagic comma', 'sazoquingu'],
    wikiUrl: 'https://en.xen.wiki/w/Sensamagic_clan#Magus',
    description: 'Sharper analogue of Würschmidt in the sensamagic clan. Generator is a sharp ~5/4. Three generators reach 128/125 short of the octave; eleven generators reach 3/2.' },

  // === GRAMITONIC (4L 5s) ===
  { name: 'Neominor', mos: ['4L_5s', '4L_9s', '4L_13s'], genRange: [280.0, 285.5],
    commas: ['2401/2400'], commaNames: ['breedsma'],
    wikiUrl: 'https://en.xen.wiki/w/Breedsmic_temperaments#Neominor',
    description: 'Breedsmic temperament. Generator is a subminor third. 4L 5s, 4L 9s, 4L 13s MOS family. <br> <br> <i> Breedsmic </i> Seriously who comes up with these names?  ' },

  { name: 'Orwell', mos: ['4L_5s', '4L_9s', '13L_9s'], genRange: [269.0, 275.0],
    commas: ['225/224', '1728/1715'], commaNames: ['marvel comma', 'orwellisma'],
    wikiUrl: 'https://en.xen.wiki/w/Orwell',
    description: 'Subminor third (7/6) generator. Seven generators = twelfth. Excellent 11-limit.' },

  { name: 'Semaphore', mos: ['5L_4s', '5L_9s'], genRange: [933.33, 960.0],
    commas: ['49/48'], commaNames: ['slendro diesis'],
    wikiUrl: 'https://en.xen.wiki/w/Semaphore_and_godzilla',
    description: 'Semi-fourth: two generators = 4/3. Equates 7/6 and 8/7.' },

  // === ARCHEOTONIC (6L 1s) ===
  { name: 'Tetracot', mos: ['6L_1s', '7L_6s', '7L_13s'], genRange: [171.43, 180.0],
    commas: ['20000/19683'], commaNames: ['tetracot comma'],
    wikiUrl: 'https://en.xen.wiki/w/Tetracot_family',
    description: 'Four generators = 3/2. Generator is a sub-major second (~176¢). EDOs: 27, 34, 41. <br> <br> The OG n-cot tuning. The name sounded so cool that we renamed a bunch of other temperaments in its wake. Sort of. To varying degrees of success.' },

  { name: 'Didacus', mos: ['6L_1s', '7L_6s', '13L_7s'], genRange: [180, 200.0],
    commas: ['3136/3125'], commaNames: ['hemimean comma'],
    wikiUrl: 'https://en.xen.wiki/w/Didacus',
    description: 'Tempers out 3136/3125. Generator is half a major third (half of 5/4).' },

  { name: 'Emka', mos: ['2L_9s', '2L_11s', '13L_2s'], genRange: [550.0, 553.8],
    commas: ['3136/3125', '5120/5103'], commaNames: ['hemimean comma', 'hemimean'],
    wikiUrl: 'https://en.xen.wiki/w/Hemimean_clan#Emka',
    description: 'Hemimean clan. Generator is near 11/8. 11 and 13 note MOS scales. <br> <br> Can make some pretty gnarly 11 and 13 limit sounds. Check out the 2L 7s scale if you want to scrunch some faces..' },

  { name: 'Thuja', mos: ['2L_11s', '2L_13s', '15L_2s'], genRange: [553.85, 560.0],
    commas: ['126/125', '65536/64827'], commaNames: ['starling comma', 'buzzardsmic comma'],
    wikiUrl: 'https://en.xen.wiki/w/Buzzardsmic_clan#Thuja',
    description: 'Buzzardsmic clan. Generator is ~11/8 (~558.6¢). Twelve generators reach 3/1. Starling tempered. 15 and 43edo are canonical tunings.' },

  { name: 'Octacot', mos: ['1L_13s', '14L_1s', '14L_13s'], genRange: [85.7, 90.0],
    commas: ['20000/19683'], commaNames: ['tetracot comma'],
    wikiUrl: 'https://en.xen.wiki/w/Tetracot_family#Octacot',
    description: 'Tetracot family. Eight generators = 3/2. Half of a tetracot generator.' },

  { name: 'Passion', mos: ['1L_11s', '12L_1s', '12L_13s'], genRange: [96.0, 100.0],
    commas: ['262144/253125'], commaNames: ['passion comma'],
    wikiUrl: 'https://en.xen.wiki/w/Passion_family#Passion',
    description: 'Near-12edo generator (~98¢). Twelve generators = octave minus a comma.... This would probably suck as a scale or temperament. Just use 12edo???.' },

  { name: 'Escape', mos: ['1L_20s', '21L_1s', '21L_22s'], genRange: [55.33, 57.2],
    commas: ['4294967296/4271484375'], commaNames: ['escapade comma'],
    wikiUrl: 'https://en.xen.wiki/w/Escapade_family#2.3.5.11_subgroup',
    description: 'Escapade family. Twenty-one generators = octave. Very small generator ~56¢. You can probably get some cool somewhat-detempered 21edo structures out of this.' },

  { name: 'Valentine', mos: ['1L_14s', '15L_1s', '15L_16s'], genRange: [75.0, 80.0],
    commas: ['6144/6125'], commaNames: ['porwell comma'],
    wikiUrl: 'https://en.xen.wiki/w/Valentine',
    description: 'Generator is ~77.1¢. Fifteen generators = 3/2. Excellent 11-limit accuracy. <br> <br> Probably too many generators to reach a fifth if you ask me but what can ya say.' },

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
  { name: 'Miracle', mos: ['1L_9s', '10L_1s', '10L_11s'], genRange: [114.29, 120.0],
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
  'Schismatic': '#da70d6', 'Mavila': '#20b2aa', 'Mabila': '#178a84', 'Wilsec': '#1aaa96', 'Casablanca': '#15968a',
  'Rarity': '#6a8aaa', 'Sixix': '#b080b0', 'Amity': '#c490c4', 'Mohajira': '#dda0dd', 'Hemififths': '#d4b0d4',
  'Suhajira': '#e8b4e8', 'Magic': '#ff69b4',
  'Hanson': '#98fb98', 'Myna': '#7ecf7e', 'Superkleismic': '#5aad5a', 'Orgone': '#4a9a6a',
  'Bohpier': '#a0c060', 'Nusecond': '#6abf3a', 'Hemikleismic': '#58cf20', 'Porcupine': '#7fff00', 'Superpine': '#5aab2e', 'Novisept': '#b8984c', 'Sensamagic': '#c9a84c', 'Sensi': '#e6c85e', 'Würschmidt': '#d4a030', 'Magus': '#c4922a',
  'Neominor': '#7fbfdf', 'Orwell': '#87ceeb', 'Semaphore': '#6495ed',
  'Augmented': '#87ceeb', 'Diminished': '#cd5c5c',
  'Tetracot': '#66cdaa', 'Didacus': '#4ab8a0', 'Emka': '#3ea090',
  'Baldi': '#d4b48e', 'Machine': '#e8c89e', 'Kumonga': '#d8b888', 'Hemisensi': '#d0a868', 'Tricot / Slendric': '#deb887', 'Glacier / Pentacot': '#c4a67a',   'Neptune': '#4169e1', 'Tritonic': '#c4b896', 'Alphatricot': '#d4aa70', 'Buzzard': '#c89e64', 'Thuja': '#b8944e', 'Kleismic': '#b0864c',
  'Father': '#f0e68c', 'A-team': '#e8d44d', 'Squares': '#e0825a', 'Hamity': '#d4724a', 'Bug': '#cd853f',
  'Chromatic Pyth.': '#ffd700',
  'Pajara': '#ff8c00', 'Srutal': '#e07800',
  'Blackwood': '#ba55d3', 'Lemba': '#d2691e', 'Hedgehog': '#8fbc8f',
  'Sephiroth': '#7b68ee',
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
  '3L_5s': 'Checkertonic', '5L_3s': 'Oneirotonic',
  '4L_5s': 'Gramitonic', '5L_4s': 'Semiquartal',
  '7L_1s': 'Pine', '1L_7s': 'Antipine',
  '8L_1s': 'Subneutralic', '1L_8s': 'Antisubneutralic',
  '7L_2s': 'Superdiatonic', '2L_7s': 'Balzano',
  '6L_3s': 'Hyrulic', '3L_6s': 'Tcherepninoid',
  '7L_3s': 'Dicoid', '3L_7s': 'Sephiroid',
  '5L_5s': 'Decanoid',
  '7L_4s': 'Undecoid', '4L_7s': 'Undecoid',
  '6L_5s': 'Undecoid', '5L_6s': 'Undecoid',
  '7L_5s': 'Chromatic', '5L_7s': 'Chromatic',
  '8L_3s': 'Flanatonic', '3L_8s': 'Isodiaphoric',
  '8L_4s': 'Triskaidecoid', '4L_8s': 'Triskaidecoid',
  '8L_5s': 'Triskaidecoid',
  '9L_1s': 'Sinatonic', '1L_9s': 'Antisinatonic',
  '10L_1s': 'Decatonic', '1L_10s': 'Antidecatonic',
  '10L_2s': 'Jaric', '2L_10s': 'Jaric',
  '7L_8s': 'Porcupinoid', '8L_7s': 'Porcupinoid',
  '7L_9s': 'Mavilic', '9L_7s': 'Mavilic',
  '10L_5s': 'Pentadecoid', '5L_10s': 'Pentadecoid',
  '10L_11s': 'Miracloid', '11L_10s': 'Miracloid',
  '9L_10s': 'Negric', '10L_9s': 'Negric',

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
  '3L_4s': ['Dalmatian', 'Galatian', 'Cilician', 'Bithynian', 'Pisidian', 'Illyrian', 'Lycian'],
  '4L_3s': ['Smitonic', 'Glamorganic', 'Aeolimic', 'Mixosmitic', 'Lydic', 'Dorimic', 'Phrygimic'],
  '2L_3s': ['Major pentatonic', 'Suspended', 'Blues minor', 'Minor pentatonic', 'Man Gong'],
  '3L_2s': ['Anti-pentatonic mode 1', 'Anti-pentatonic mode 2', 'Anti-pentatonic mode 3', 'Anti-pentatonic mode 4', 'Anti-pentatonic mode 5'],
  '5L_3s': ['Mode 1', 'Mode 2', 'Mode 3', 'Mode 4', 'Mode 5', 'Mode 6', 'Mode 7', 'Mode 8'],
  '3L_5s': ['Mode 1', 'Mode 2', 'Mode 3', 'Mode 4', 'Mode 5', 'Mode 6', 'Mode 7', 'Mode 8'],
  '7L_5s': ['Mode 1', 'Mode 2', 'Mode 3', 'Mode 4', 'Mode 5', 'Mode 6', 'Mode 7', 'Mode 8', 'Mode 9', 'Mode 10', 'Mode 11', 'Mode 12'],
};
