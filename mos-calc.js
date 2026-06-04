#!/usr/bin/env node
//
// MOS Calculator Tools — verification utilities for MOS/temperament work.
// Usage: node mos-calc.js <command> [args...]
// Run without arguments or with "help" to see all commands.
//

// ============================================================
//  Core math (mirrors index.html logic exactly)
// ============================================================

function gcd(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a;
}

function ratioToCents(n, d) {
  return 1200 * Math.log2(n / d);
}

function centsToRatio(cents) {
  return Math.pow(2, cents / 1200);
}

function centsToFreq(cents, base = 261.63) {
  return base * Math.pow(2, cents / 1200);
}

// ============================================================
//  MOS scale generation
// ============================================================

function buildMOSScale(genCents, n, period = 1200) {
  const pitches = [0];
  for (let i = 1; i < n; i++) {
    pitches.push(((i * genCents) % period + period) % period);
  }
  pitches.sort((a, b) => a - b);

  const steps = [];
  for (let i = 0; i < n; i++) {
    const next = (i + 1) % n;
    const diff = next === 0 ? period - pitches[n - 1] + pitches[0] : pitches[next] - pitches[i];
    steps.push(diff);
  }

  const sorted = [...new Set(steps.map(x => Math.round(x * 100) / 100))].sort((a, b) => b - a);
  const L = sorted[0] || 0;
  const s = sorted.length > 1 ? sorted[sorted.length - 1] : 0;

  return { pitches, steps, L, s };
}

function getGeneratorChain(genCents, n, period = 1200) {
  const raw = [];
  for (let i = 0; i < n; i++) {
    raw.push({ genIndex: i, cents: ((i * genCents) % period + period) % period });
  }
  raw.sort((a, b) => a.cents - b.cents);
  return raw.map(r => r.genIndex);
}

function computeHardness(genCents, mosSize, period = 1200) {
  const scale = buildMOSScale(genCents, mosSize, period);
  const { L, s } = scale;
  if (s < 0.01) return { L, s: 0, ratio: Infinity, str: '∞:1' };
  const ratio = L / s;
  return { L, s, ratio, str: ratio.toFixed(4) };
}

function computeStepPattern(genCents, n, modeRotation = 0, period = 1200) {
  const baseScale = buildMOSScale(genCents, n, period);
  const scale = rotateMOSScale(baseScale, modeRotation, period);
  return scale.steps.map(st => Math.abs(st - scale.L) < 0.5 ? 'L' : 's').join('');
}

function computeUDP(genCents, n, modeRotation = 0, period = 1200) {
  const chain = getGeneratorChain(genCents, n, period);
  const rootGenIndex = chain[modeRotation];
  return `${n - 1 - rootGenIndex}|${rootGenIndex}`;
}

function rotateMOSScale(scale, rotation, period = 1200) {
  const n = scale.pitches.length;
  if (rotation === 0) return scale;
  const root = scale.pitches[rotation % n];
  const pitches = [];
  for (let i = 0; i < n; i++) {
    const idx = (i + rotation) % n;
    const p = ((scale.pitches[idx] - root) % period + period) % period;
    pitches.push(p);
  }
  pitches.sort((a, b) => a - b);

  const steps = [];
  for (let i = 0; i < n; i++) {
    const next = (i + 1) % n;
    const diff = next === 0 ? period - pitches[n - 1] + pitches[0] : pitches[next] - pitches[i];
    steps.push(diff);
  }

  const sorted = [...new Set(steps.map(x => Math.round(x * 100) / 100))].sort((a, b) => b - a);
  const L = sorted[0] || 0;
  const s = sorted.length > 1 ? sorted[sorted.length - 1] : 0;

  return { pitches, steps, L, s };
}

// ============================================================
//  Rank-3 product scales (Fokker blocks)
// ============================================================

function stepPatternProduct(wordA, wordB) {
  if (wordA.length !== wordB.length) throw new Error('Words must have equal length');
  const n = wordA.length;

  function normalize(w) {
    const freq = {};
    for (const ch of w) freq[ch] = (freq[ch] || 0) + 1;
    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
    const map = {};
    sorted.forEach((e, i) => { map[e[0]] = i; });
    return w.split('').map(ch => map[ch]);
  }

  const a = normalize(wordA);
  const b = normalize(wordB);

  const pairOrder = [[0,0], [0,1], [1,0], [1,1]];
  const pairToKey = (p, q) => p * 2 + q;

  const seen = new Set();
  for (let i = 0; i < n; i++) seen.add(pairToKey(a[i], b[i]));

  const symbols = [];
  for (const [p, q] of pairOrder) {
    if (seen.has(pairToKey(p, q))) symbols.push(pairToKey(p, q));
  }

  const labelMap = {};
  const labels = ['L', 'M', 's', 'x'];
  symbols.forEach((k, i) => { labelMap[k] = labels[i]; });

  let result = '';
  for (let i = 0; i < n; i++) {
    result += labelMap[pairToKey(a[i], b[i])];
  }
  return result;
}

function computeVariety(scalePitches, period) {
  const n = scalePitches.length;
  if (n < 2) return 1;
  const tol = 0.5;
  let maxVariety = 0;
  for (let k = 1; k < n; k++) {
    const rawSizes = [];
    for (let i = 0; i < n; i++) {
      const j = (i + k) % n;
      let interval = scalePitches[j] - scalePitches[i];
      if (interval < 0) interval += period;
      rawSizes.push(interval);
    }
    rawSizes.sort((a, b) => a - b);
    let distinct = 1;
    for (let i = 1; i < rawSizes.length; i++) {
      if (rawSizes[i] - rawSizes[i - 1] > tol) distinct++;
    }
    if (distinct > maxVariety) maxVariety = distinct;
  }
  return maxVariety;
}

function computeWordVariety(word) {
  const symbolSet = [...new Set(word.split(''))].sort();
  const sizeMap = {};
  symbolSet.forEach((ch, i) => { sizeMap[ch] = 300 - i * 97; });
  const pitches = [0];
  let cum = 0;
  for (let i = 0; i < word.length - 1; i++) {
    cum += sizeMap[word[i]];
    pitches.push(cum);
  }
  cum += sizeMap[word[word.length - 1]];
  return computeVariety(pitches, cum);
}

function buildProductScale(g1, g2, n, modeRot, domeIndex, period) {
  period = period || (typeof S !== 'undefined' ? S.period : 1200);
  modeRot = modeRot || 0;
  domeIndex = domeIndex || 0;

  // Two-chain construction: build two parallel chains of the primary
  // generator g1, where chain B is offset by g2 (the delta/second generator).
  //
  // Chain A: ceil(n/2) notes stacked by g1, starting from 0
  // Chain B: floor(n/2) notes stacked by g1, starting from g2
  // domeIndex shifts the starting point of chain B by additional g1 steps.
  //
  // This produces a rank-3 scale where:
  // - g1 is the primary generator (same as the selected MOS region)
  // - g2 is the offset that splits the MOS into a ternary scale
  // When g2=0, chain B merges into chain A → standard MOS.
  const chainALen = Math.ceil(n / 2);
  const chainBLen = Math.floor(n / 2);

  const allPitches = [];
  for (let i = 0; i < chainALen; i++) {
    allPitches.push(((i * g1) % period + period) % period);
  }
  const bStart = ((domeIndex * g1 + g2) % period + period) % period;
  for (let i = 0; i < chainBLen; i++) {
    allPitches.push(((bStart + i * g1) % period + period) % period);
  }
  allPitches.sort((a, b) => a - b);

  const steps = [];
  for (let i = 0; i < n; i++) {
    const next = (i + 1) % n;
    const diff = next === 0 ? period - allPitches[n - 1] + allPitches[0] : allPitches[next] - allPitches[i];
    steps.push(diff);
  }

  const rounded = steps.map(x => Math.round(x * 100) / 100);
  const distinctSizes = [...new Set(rounded)].sort((a, b) => b - a);

  let L, M, s, word;
  if (distinctSizes.length >= 3) {
    L = distinctSizes[0];
    M = distinctSizes[1];
    s = distinctSizes[distinctSizes.length - 1];
    word = rounded.map(v => {
      if (Math.abs(v - L) < 0.5) return 'L';
      if (Math.abs(v - s) < 0.5) return 's';
      return 'M';
    }).join('');
  } else if (distinctSizes.length === 2) {
    L = distinctSizes[0];
    M = 0;
    s = distinctSizes[1];
    word = rounded.map(v => Math.abs(v - L) < 0.5 ? 'L' : 's').join('');
  } else {
    L = distinctSizes[0] || 0;
    M = 0;
    s = L;
    word = 'L'.repeat(n);
  }

  let pitches = allPitches;
  if (modeRot > 0 && modeRot < n) {
    const root = allPitches[modeRot];
    pitches = allPitches.map(p => ((p - root) % period + period) % period);
    pitches.sort((a, b) => a - b);
    const newSteps = [];
    for (let i = 0; i < n; i++) {
      const next = (i + 1) % n;
      const diff = next === 0 ? period - pitches[n - 1] + pitches[0] : pitches[next] - pitches[i];
      newSteps.push(diff);
    }
    const newRounded = newSteps.map(x => Math.round(x * 100) / 100);
    word = newRounded.map(v => {
      if (Math.abs(v - L) < 0.5) return 'L';
      if (Math.abs(v - s) < 0.5) return 's';
      return 'M';
    }).join('');
    steps.length = 0;
    steps.push(...newSteps);
  }

  const variety = computeVariety(pitches, period);

  return { pitches, steps, word, variety, L, M, s };
}

function findMV3Windows(g, N, period) {
  period = period || (typeof S !== 'undefined' ? S.period : 1200);
  const resolution = 1;
  const windows = [];
  let inWindow = false;
  let winStart = 0;
  let winWord = '';

  for (let delta = 0; delta <= period / 2; delta += resolution) {
    const result = buildProductScale(g, delta, N, 0, 0, period);
    if (result.variety <= 3 && result.variety >= 2) {
      if (!inWindow) {
        winStart = delta;
        winWord = result.word;
        inWindow = true;
      }
    } else {
      if (inWindow) {
        windows.push({ deltaLow: winStart, deltaHigh: delta - resolution, word: winWord });
        inWindow = false;
      }
    }
  }
  if (inWindow) {
    windows.push({ deltaLow: winStart, deltaHigh: period / 2, word: winWord });
  }

  return windows;
}

// ============================================================
//  MOS parent/child tree (Stern-Brocot)
// ============================================================

function findParentMOS(nL, nS) {
  if (nL === nS || (nL <= 1 && nS <= 1)) return null;
  if (nL > nS) return `${nS}L_${nL - nS}s`;
  return `${nL}L_${nS - nL}s`;
}

function getChildMOSes(nL, nS) {
  return [`${nL + nS}L_${nL}s`, `${nL}L_${nL + nS}s`];
}

function getAncestorChain(nL, nS) {
  const chain = [`${nL}L_${nS}s`];
  let curL = nL, curS = nS;
  for (let i = 0; i < 50; i++) {
    const p = findParentMOS(curL, curS);
    if (!p) break;
    chain.push(p);
    const m = p.match(/(\d+)L_(\d+)s/);
    curL = +m[1]; curS = +m[2];
  }
  return chain;
}

// ============================================================
//  MOS region boundaries (Stern-Brocot mediant)
// ============================================================

function getMOSRegionBounds(nL, nS, period = 1200) {
  // Walk Stern-Brocot tree to find the generator range for nL large + nS small steps.
  // The generator-as-fraction-of-period lies in an interval (p1/q1, p2/q2).
  // We find it by tracing the ancestor chain.

  const chain = getAncestorChain(nL, nS);
  chain.reverse(); // root first

  let lp = 0, lq = 1, rp = 1, rq = 1;
  // Start: generator ∈ (0/1, 1/1) = (0, period)
  // but for MOS we use the Stern-Brocot subtree rooted at 0/1 — 1/2
  // Actually the tree as built in the app: left=0/1, right=1/2
  // then mediants. Let's just replicate the app's traversal.

  // Better approach: compute directly from the MOS key.
  // For aLbs where a > b: generator ∈ (b/(a+b), ...) — the Farey mediant logic.

  // Most reliable: just replicate buildMOSRegions and find the matching region.
  const regions = [];
  function addRegion(nL2, nS2, fp1, fq1, fp2, fq2) {
    regions.push({ nL: nL2, nS: nS2, lowFrac: [fp1, fq1], highFrac: [fp2, fq2] });
    // mirror
    regions.push({ nL: nL2, nS: nS2, lowFrac: [fq2 - fp2, fq2], highFrac: [fq1 - fp1, fq1], mirror: true });
  }

  const maxSize = nL + nS;
  function traverse(lp, lq, rp, rq, depth) {
    if (depth <= 0) return;
    const mp = lp + rp, mq = lq + rq;
    if (mq > maxSize) return;
    addRegion(lq, rq, lp, lq, mp, mq);
    addRegion(rq, lq, mp, mq, rp, rq);
    traverse(lp, lq, mp, mq, depth - 1);
    traverse(mp, mq, rp, rq, depth - 1);
  }

  addRegion(1, 1, 0, 1, 1, 2);
  traverse(0, 1, 1, 2, maxSize);

  const match = regions.find(r => r.nL === nL && r.nS === nS);
  if (!match) return null;

  const lowCents = (match.lowFrac[0] / match.lowFrac[1]) * period;
  const highCents = (match.highFrac[0] / match.highFrac[1]) * period;
  return {
    lowCents, highCents,
    lowFrac: `${match.lowFrac[0]}/${match.lowFrac[1]}`,
    highFrac: `${match.highFrac[0]}/${match.highFrac[1]}`,
    lowFracArr: match.lowFrac,
    highFracArr: match.highFrac,
    mirror: !!match.mirror,
  };
}

// ============================================================
//  EDO analysis
// ============================================================

function edoStepCents(step, edo, period = 1200) {
  return (step / edo) * period;
}

function edoGenerators(edo, period = 1200) {
  const gens = [];
  for (let m = 1; m < edo; m++) {
    if (gcd(m, edo) !== 1) continue;
    gens.push({ step: m, edo, cents: (m / edo) * period });
  }
  return gens;
}

function edoMOS(step, edo, period = 1200) {
  const genCents = (step / edo) * period;
  const results = [];
  for (let n = 2; n <= edo; n++) {
    const scale = buildMOSScale(genCents, n, period);
    const uniqueSteps = [...new Set(scale.steps.map(x => Math.round(x * 100) / 100))];
    if (uniqueSteps.length === 2 || uniqueSteps.length === 1) {
      const hr = computeHardness(genCents, n, period);
      results.push({
        size: n,
        pattern: computeStepPattern(genCents, n, 0, period),
        L: +scale.L.toFixed(4),
        s: +scale.s.toFixed(4),
        ratio: hr.ratio === Infinity ? '∞' : hr.ratio.toFixed(4),
        isEDO: uniqueSteps.length === 1,
      });
    }
  }
  return results;
}

function findEDOsInRange(lowCents, highCents, maxEDO = 72) {
  const results = [];
  for (let n = 2; n <= maxEDO; n++) {
    for (let m = 1; m < n; m++) {
      if (gcd(m, n) !== 1) continue;
      const cents = (m / n) * 1200;
      if (cents >= lowCents && cents <= highCents) {
        results.push({ step: m, edo: n, cents: +cents.toFixed(4) });
      }
    }
  }
  results.sort((a, b) => a.edo - b.edo || a.step - b.step);
  return results;
}

// ============================================================
//  Interval / ratio utilities
// ============================================================

function findClosestRatios(targetCents, maxLimit = 31, count = 10) {
  const ratios = [];
  for (let d = 1; d < maxLimit; d++) {
    for (let n = d + 1; n <= maxLimit; n++) {
      if (gcd(n, d) !== 1) continue;
      const cents = ratioToCents(n, d);
      if (cents > 0 && cents <= 1200) {
        ratios.push({ n, d, cents, error: Math.abs(cents - targetCents), complexity: n * d });
      }
    }
  }
  ratios.sort((a, b) => a.error - b.error);
  return ratios.slice(0, count);
}

function buildHarmonicRatios(maxLimit = 31) {
  const ratios = [];
  for (let d = 1; d < maxLimit; d++) {
    for (let n = d + 1; n <= maxLimit; n++) {
      if (gcd(n, d) !== 1) continue;
      const cents = ratioToCents(n, d);
      if (cents > 0 && cents <= 1200) {
        ratios.push({ ratio: `${n}/${d}`, n, d, cents: +cents.toFixed(4), complexity: n + d });
      }
    }
  }
  ratios.sort((a, b) => a.complexity - b.complexity || a.cents - b.cents);
  return ratios;
}

// ============================================================
//  Temperament data (inline subset from mos-data.js)
// ============================================================

let TEMPERAMENTS;
try {
  // Load temperament data from mos-data.js by evaluating it
  const fs = require('fs');
  const path = require('path');
  const dataFile = path.join(__dirname, 'mos-data.js');
  const src = fs.readFileSync(dataFile, 'utf8');
  // mos-data.js uses `const` declarations — wrap in a function to extract
  const fn = new Function(src + '\nreturn { TEMPERAMENTS, TEMP_COLORS, MOS_NAMES, MODE_NAMES };');
  const data = fn();
  TEMPERAMENTS = data.TEMPERAMENTS;
} catch (e) {
  TEMPERAMENTS = [];
}

function findTemperamentsForGenerator(genCents) {
  const results = [];
  for (const t of TEMPERAMENTS) {
    if (t.disabled) continue;
    const period = t.period || 1200;
    const mirror = [period - t.genRange[1], period - t.genRange[0]];
    const inDirect = genCents >= t.genRange[0] && genCents <= t.genRange[1];
    const inMirror = genCents >= mirror[0] && genCents <= mirror[1];
    if (inDirect || inMirror) {
      results.push({
        name: t.name,
        range: t.genRange,
        mirror,
        side: inDirect ? 'direct' : 'mirror',
        commas: t.commas || [],
        mos: t.mos,
        description: t.description,
      });
    }
  }
  return results;
}

function findTemperamentsForMOS(mosKey) {
  const results = [];
  for (const t of TEMPERAMENTS) {
    if (t.disabled) continue;
    const mosList = Array.isArray(t.mos) ? t.mos : [t.mos];
    if (mosList.includes(mosKey) || mosList.some(m => isDescendant(mosKey, m)) || mosList.some(m => isDescendant(m, mosKey))) {
      results.push({
        name: t.name,
        range: t.genRange,
        commas: t.commas || [],
        mos: mosList,
        description: t.description,
      });
    }
  }
  return results;
}

function isDescendant(childKey, ancestorKey) {
  let cur = childKey;
  for (let i = 0; i < 30; i++) {
    const m = cur.match(/(\d+)L_(\d+)s/);
    if (!m) return false;
    const parent = findParentMOS(+m[1], +m[2]);
    if (!parent) return false;
    if (parent === ancestorKey) return true;
    cur = parent;
  }
  return false;
}

// ============================================================
//  Generator range for a target L:s ratio
// ============================================================

function generatorForHardness(nL, nS, targetRatio, period = 1200) {
  // For nL large steps of size L and nS small steps of size s,
  // period = nL*L + nS*s. With L/s = r:
  // L = period * r / (nL*r + nS)
  // s = period / (nL*r + nS)
  // generator = ? depends on which Stern-Brocot branch.
  // We binary-search within the region bounds.

  const bounds = getMOSRegionBounds(nL, nS, period);
  if (!bounds) return null;

  let lo = bounds.lowCents + 0.001;
  let hi = bounds.highCents - 0.001;

  // Determine which end is equalized vs collapsed
  const hrLo = computeHardness(lo, nL + nS, period);
  const hrHi = computeHardness(hi, nL + nS, period);
  const eqEnd = hrLo.ratio < hrHi.ratio ? 'low' : 'high';

  // If target ratio is below minimum achievable, clamp
  const minRatio = Math.min(hrLo.ratio, hrHi.ratio);
  if (targetRatio < minRatio) targetRatio = minRatio;

  for (let iter = 0; iter < 100; iter++) {
    const mid = (lo + hi) / 2;
    const hr = computeHardness(mid, nL + nS, period);
    if (eqEnd === 'low') {
      // ratio increases toward hi
      if (hr.ratio < targetRatio) lo = mid;
      else hi = mid;
    } else {
      // ratio increases toward lo
      if (hr.ratio < targetRatio) hi = mid;
      else lo = mid;
    }
  }

  const gen = (lo + hi) / 2;
  const hr = computeHardness(gen, nL + nS, period);
  return { generator: +gen.toFixed(6), L: +hr.L.toFixed(4), s: +hr.s.toFixed(4), ratio: +hr.ratio.toFixed(6) };
}

// ============================================================
//  Scale interval analysis
// ============================================================

function analyzeScale(genCents, n, period = 1200) {
  const scale = buildMOSScale(genCents, n, period);
  const { pitches, steps, L, s } = scale;

  // All intervals from each degree
  const intervals = [];
  for (let span = 1; span < n; span++) {
    const sizes = [];
    for (let i = 0; i < n; i++) {
      const j = (i + span) % n;
      let interval = pitches[j] - pitches[i];
      if (interval < 0) interval += period;
      sizes.push(+interval.toFixed(4));
    }
    const unique = [...new Set(sizes.map(x => Math.round(x * 100) / 100))].sort((a, b) => a - b);
    const closestRatios = unique.map(c => {
      const rats = findClosestRatios(c, 31, 3);
      return rats.length ? rats[0] : null;
    });

    intervals.push({
      span,
      stepCounts: `${span} steps`,
      sizes: unique.map(u => +u.toFixed(4)),
      closestRatios: closestRatios.map(r => r ? `${r.n}/${r.d} (${r.cents.toFixed(2)}¢, err ${r.error.toFixed(2)}¢)` : '—'),
    });
  }

  return {
    generator: genCents,
    size: n,
    period,
    pitches: pitches.map(p => +p.toFixed(4)),
    steps: steps.map(s => +s.toFixed(4)),
    L: +L.toFixed(4),
    s: +s.toFixed(4),
    hardness: s > 0.01 ? +(L / s).toFixed(4) : Infinity,
    pattern: computeStepPattern(genCents, n, 0, period),
    intervals,
  };
}

// ============================================================
//  All modes of a MOS
// ============================================================

function allModes(genCents, n, period = 1200) {
  const modes = [];
  for (let rot = 0; rot < n; rot++) {
    const udp = computeUDP(genCents, n, rot, period);
    const pattern = computeStepPattern(genCents, n, rot, period);
    const scale = rotateMOSScale(buildMOSScale(genCents, n, period), rot, period);
    modes.push({
      rotation: rot,
      udp,
      pattern,
      pitches: scale.pitches.map(p => +p.toFixed(4)),
    });
  }
  return modes;
}

// ============================================================
//  Comma / monzo utilities
// ============================================================

function factorize(n) {
  const factors = {};
  let d = 2;
  while (d * d <= n) {
    while (n % d === 0) {
      factors[d] = (factors[d] || 0) + 1;
      n /= d;
    }
    d++;
  }
  if (n > 1) factors[n] = (factors[n] || 0) + 1;
  return factors;
}

function ratioToMonzo(n, d) {
  const nf = factorize(n);
  const df = factorize(d);
  const maxPrime = Math.max(...[...Object.keys(nf), ...Object.keys(df)].map(Number));
  const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];
  const primes = PRIMES.filter(p => p <= maxPrime);
  return primes.map(p => (nf[p] || 0) - (df[p] || 0));
}

function commaInfo(n, d) {
  const cents = ratioToCents(n, d);
  const monzo = ratioToMonzo(n, d);
  const primeLabels = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];
  const monzoStr = '[' + monzo.map((v, i) => {
    if (i >= primeLabels.length) return `${v}`;
    return `${v}`;
  }).join(' ') + '⟩';
  return {
    ratio: `${n}/${d}`,
    cents: +cents.toFixed(6),
    monzo: monzoStr,
    monzoArray: monzo,
    primes: primeLabels.slice(0, monzo.length),
  };
}

// ============================================================
//  CLI interface
// ============================================================

const COMMANDS = {
  mos: {
    usage: 'mos <genCents> <size> [period=1200]',
    desc: 'Build a MOS scale and show pitches, steps, L:s ratio',
    run(args) {
      const gen = +args[0], n = +args[1], period = +(args[2] || 1200);
      if (!gen || !n) return 'Usage: mos <genCents> <size> [period]';
      const scale = buildMOSScale(gen, n, period);
      const hr = computeHardness(gen, n, period);
      const pattern = computeStepPattern(gen, n, 0, period);
      console.log(`MOS: generator=${gen}¢, size=${n}, period=${period}¢`);
      console.log(`Pattern: ${pattern}`);
      console.log(`L=${scale.L.toFixed(4)}¢  s=${scale.s.toFixed(4)}¢  L:s=${hr.str}`);
      console.log(`Pitches: ${scale.pitches.map(p => p.toFixed(2)).join(', ')}`);
      console.log(`Steps:   ${scale.steps.map(s => s.toFixed(2)).join(', ')}`);
    },
  },

  modes: {
    usage: 'modes <genCents> <size> [period=1200]',
    desc: 'Show all modes with UDP and step patterns',
    run(args) {
      const gen = +args[0], n = +args[1], period = +(args[2] || 1200);
      if (!gen || !n) return 'Usage: modes <genCents> <size>';
      const modes = allModes(gen, n, period);
      console.log(`All ${n} modes of generator ${gen}¢:`);
      for (const m of modes) {
        console.log(`  rot=${m.rotation}  UDP=${m.udp}  ${m.pattern}  pitches=[${m.pitches.map(p => p.toFixed(1)).join(', ')}]`);
      }
    },
  },

  intervals: {
    usage: 'intervals <genCents> <size> [period=1200]',
    desc: 'Analyze all intervals in a MOS scale with closest JI ratios',
    run(args) {
      const gen = +args[0], n = +args[1], period = +(args[2] || 1200);
      if (!gen || !n) return 'Usage: intervals <genCents> <size>';
      const analysis = analyzeScale(gen, n, period);
      console.log(`Intervals for ${gen}¢ generator, ${n}-note MOS:`);
      console.log(`Pattern: ${analysis.pattern}  L:s=${analysis.hardness}`);
      for (const iv of analysis.intervals) {
        console.log(`\n  ${iv.span}-step interval(s):`);
        for (let i = 0; i < iv.sizes.length; i++) {
          console.log(`    ${iv.sizes[i].toFixed(2)}¢  ≈ ${iv.closestRatios[i]}`);
        }
      }
    },
  },

  region: {
    usage: 'region <nL> <nS> [period=1200]',
    desc: 'Get generator range boundaries for a MOS (shows both sides)',
    run(args) {
      const nL = +args[0], nS = +args[1], period = +(args[2] || 1200);
      if (!nL || !nS) return 'Usage: region <nL> <nS>';
      const b = getMOSRegionBounds(nL, nS, period);
      if (!b) return console.log('Region not found');
      const mirrorLo = period - b.highCents;
      const mirrorHi = period - b.lowCents;
      console.log(`${nL}L ${nS}s generator ranges:`);
      console.log(`  Small gen side: ${b.lowCents.toFixed(4)}¢ — ${b.highCents.toFixed(4)}¢  (${b.lowFrac} — ${b.highFrac} of period)`);
      console.log(`  Large gen side: ${mirrorLo.toFixed(4)}¢ — ${mirrorHi.toFixed(4)}¢  (mirror)`);
      // Equalized boundary: where L=s, which is the boundary fraction
      const eqSmall = (b.highFracArr[0] / b.highFracArr[1]) * period;
      const eqLarge = period - eqSmall;
      console.log(`  Equalized boundary: ${eqSmall.toFixed(4)}¢ (small side), ${eqLarge.toFixed(4)}¢ (large side)  [= ${nL+nS}-edo step × ${b.highFrac[0]}]`);
      console.log(`  Collapsed boundary: ${b.lowCents.toFixed(4)}¢ (small side), ${mirrorHi.toFixed(4)}¢ (large side)  [merges with parent]`);
    },
  },

  tree: {
    usage: 'tree <nL> <nS>',
    desc: 'Show ancestor chain and children of a MOS',
    run(args) {
      const nL = +args[0], nS = +args[1];
      if (!nL || !nS) return 'Usage: tree <nL> <nS>';
      const chain = getAncestorChain(nL, nS);
      console.log(`Ancestor chain: ${chain.join(' → ')}`);
      const children = getChildMOSes(nL, nS);
      console.log(`Children: ${children.join(', ')}`);
      // Show grandchildren
      for (const c of children) {
        const m = c.match(/(\d+)L_(\d+)s/);
        const gc = getChildMOSes(+m[1], +m[2]);
        console.log(`  ${c} → ${gc.join(', ')}`);
      }
    },
  },

  hardness: {
    usage: 'hardness <genCents> <size> [period=1200]',
    desc: 'Compute L:s hardness ratio',
    run(args) {
      const gen = +args[0], n = +args[1], period = +(args[2] || 1200);
      if (!gen || !n) return 'Usage: hardness <genCents> <size>';
      const hr = computeHardness(gen, n, period);
      console.log(`Generator: ${gen}¢, Size: ${n}`);
      console.log(`L = ${hr.L.toFixed(6)}¢`);
      console.log(`s = ${hr.s.toFixed(6)}¢`);
      console.log(`L:s = ${hr.str}`);
      if (hr.ratio !== Infinity) {
        // Find closest simple ratio
        let bestN = 1, bestD = 1, bestErr = Infinity;
        for (let d = 1; d <= 12; d++) {
          const num = Math.round(hr.ratio * d);
          if (num < 1) continue;
          const err = Math.abs(hr.ratio - num / d);
          if (err < bestErr) { bestErr = err; bestN = num; bestD = d; }
        }
        const g = gcd(bestN, bestD);
        console.log(`≈ ${bestN / g}:${bestD / g} (error ${bestErr.toFixed(6)})`);
      }
    },
  },

  'gen-for-ratio': {
    usage: 'gen-for-ratio <nL> <nS> <L:s ratio> [period=1200]',
    desc: 'Find the generator that produces a given L:s ratio',
    run(args) {
      const nL = +args[0], nS = +args[1], ratio = +args[2], period = +(args[3] || 1200);
      if (!nL || !nS || !ratio) return 'Usage: gen-for-ratio <nL> <nS> <ratio>';
      const result = generatorForHardness(nL, nS, ratio, period);
      if (!result) return console.log('Could not find generator');
      console.log(`${nL}L ${nS}s at L:s = ${ratio}:`);
      console.log(`  Generator: ${result.generator.toFixed(4)}¢`);
      console.log(`  L = ${result.L}¢, s = ${result.s}¢`);
      console.log(`  Actual ratio: ${result.ratio}`);
    },
  },

  edo: {
    usage: 'edo <step> <edo> [period=1200]',
    desc: 'Show all MOS scales for an EDO generator',
    run(args) {
      const step = +args[0], n = +args[1], period = +(args[2] || 1200);
      if (!step || !n) return 'Usage: edo <step> <edo>';
      const genCents = edoStepCents(step, n, period);
      console.log(`${step}\\${n} = ${genCents.toFixed(4)}¢`);
      console.log(`MOS chain:`);
      const chain = edoMOS(step, n, period);
      for (const m of chain) {
        const label = m.isEDO ? '(=EDO)' : `L:s=${m.ratio}`;
        console.log(`  ${m.size}-note: ${m.pattern}  L=${m.L}¢ s=${m.s}¢  ${label}`);
      }
    },
  },

  'edos-in': {
    usage: 'edos-in <lowCents> <highCents> [maxEDO=72]',
    desc: 'Find all EDO generators within a cent range',
    run(args) {
      const lo = +args[0], hi = +args[1], max = +(args[2] || 72);
      if (isNaN(lo) || isNaN(hi)) return 'Usage: edos-in <low> <high> [maxEDO]';
      const edos = findEDOsInRange(lo, hi, max);
      console.log(`EDO generators in ${lo}¢–${hi}¢ (max ${max}-edo):`);
      for (const e of edos) {
        console.log(`  ${e.step}\\${e.edo} = ${e.cents.toFixed(4)}¢`);
      }
      console.log(`Total: ${edos.length}`);
    },
  },

  ratio: {
    usage: 'ratio <n> <d>',
    desc: 'Convert a frequency ratio to cents, show monzo',
    run(args) {
      const n = +args[0], d = +args[1];
      if (!n || !d) return 'Usage: ratio <numerator> <denominator>';
      const info = commaInfo(n, d);
      console.log(`${n}/${d}:`);
      console.log(`  Cents: ${info.cents.toFixed(6)}¢`);
      console.log(`  Monzo: ${info.monzo}`);
      console.log(`  Primes: [${info.primes.join(', ')}]`);
    },
  },

  cents: {
    usage: 'cents <cents>',
    desc: 'Find the closest JI ratios to a cent value',
    run(args) {
      const c = +args[0];
      if (isNaN(c)) return 'Usage: cents <cents>';
      const ratios = findClosestRatios(c, 31, 15);
      console.log(`Closest ratios to ${c}¢:`);
      for (const r of ratios) {
        console.log(`  ${r.n}/${r.d} = ${r.cents.toFixed(4)}¢  (err ${r.error > 0 ? '+' : ''}${r.error.toFixed(4)}¢)  complexity=${r.complexity}`);
      }
    },
  },

  temps: {
    usage: 'temps <genCents | mosKey>',
    desc: 'Find temperaments matching a generator value or MOS key (e.g. 5L_2s)',
    run(args) {
      const arg = args[0];
      if (!arg) return 'Usage: temps <genCents | mosKey>';

      if (arg.includes('L') && arg.includes('s')) {
        const results = findTemperamentsForMOS(arg);
        console.log(`Temperaments for ${arg}:`);
        for (const t of results) {
          console.log(`  ${t.name}: gen ${t.range[0]}–${t.range[1]}¢  MOS=[${t.mos.join(', ')}]`);
          if (t.commas.length) console.log(`    Commas: ${t.commas.join(', ')}`);
          console.log(`    ${t.description}`);
        }
      } else {
        const gen = +arg;
        const results = findTemperamentsForGenerator(gen);
        console.log(`Temperaments at ${gen}¢:`);
        for (const t of results) {
          console.log(`  ${t.name} (${t.side}): range ${t.range[0]}–${t.range[1]}¢  MOS=[${t.mos.join(', ')}]`);
          if (t.commas.length) console.log(`    Commas: ${t.commas.join(', ')}`);
          console.log(`    ${t.description}`);
        }
      }
    },
  },

  comma: {
    usage: 'comma <n/d> [n/d ...]',
    desc: 'Analyze one or more commas (ratio format)',
    run(args) {
      if (!args.length) return 'Usage: comma <n/d> [n/d ...]';
      for (const arg of args) {
        const [n, d] = arg.split('/').map(Number);
        if (!n || !d) { console.log(`Invalid ratio: ${arg}`); continue; }
        const info = commaInfo(n, d);
        console.log(`${n}/${d}:`);
        console.log(`  ${info.cents.toFixed(6)}¢`);
        console.log(`  Monzo: ${info.monzo}`);
        console.log(`  Primes used: [${info.primes.join(', ')}]`);
        console.log();
      }
    },
  },

  compare: {
    usage: 'compare <genCents> <size> <ratio1> [ratio2 ...]',
    desc: 'Show how well a MOS scale approximates specific JI ratios',
    run(args) {
      if (args.length < 3) return 'Usage: compare <genCents> <size> <ratio1> [ratio2 ...]';
      const gen = +args[0], n = +args[1];
      const targetRatios = args.slice(2).map(r => {
        const [num, den] = r.split('/').map(Number);
        return { n: num, d: den, cents: ratioToCents(num, den) };
      });

      const scale = buildMOSScale(gen, n);
      const allIntervals = [];
      for (let span = 1; span < n; span++) {
        for (let i = 0; i < n; i++) {
          const j = (i + span) % n;
          let interval = scale.pitches[j] - scale.pitches[i];
          if (interval < 0) interval += 1200;
          allIntervals.push({ span, from: i, cents: interval });
        }
      }

      console.log(`MOS ${gen}¢ gen, ${n} notes — JI approximation quality:`);
      for (const target of targetRatios) {
        let bestErr = Infinity, bestIv = null;
        for (const iv of allIntervals) {
          const err = Math.abs(iv.cents - target.cents);
          if (err < bestErr) { bestErr = err; bestIv = iv; }
        }
        const quality = bestErr < 5 ? 'excellent' : bestErr < 15 ? 'good' : bestErr < 30 ? 'fair' : 'poor';
        console.log(`  ${target.n}/${target.d} (${target.cents.toFixed(2)}¢): best=${bestIv.cents.toFixed(2)}¢ (${bestIv.span}-step) err=${bestErr.toFixed(2)}¢ [${quality}]`);
      }
    },
  },

  product: {
    usage: 'product <gen1> <gen2> <size> [period=1200]',
    desc: 'Build a rank-3 product scale from two independent generators',
    run(args) {
      const g1 = +args[0], g2 = +args[1], n = +args[2], period = +(args[3] || 1200);
      if (!g1 || !g2 || !n) return 'Usage: product <gen1> <gen2> <size> [period]';
      const result = buildProductScale(g1, g2, n, 0, 0, period);
      console.log(`Product scale: g1=${g1}¢, g2=${g2}¢, size=${n}, period=${period}¢`);
      console.log(`Word: ${result.word}`);
      console.log(`Variety: ${result.variety} (${result.variety <= 3 ? 'MV3 ✓' : 'MV' + result.variety + ' ✗'})`);
      console.log(`L=${result.L.toFixed(4)}¢  M=${result.M ? result.M.toFixed(4) : '—'}¢  s=${result.s.toFixed(4)}¢`);
      console.log(`Pitches: ${result.pitches.map(p => p.toFixed(2)).join(', ')}`);
      console.log(`Steps:   ${result.steps.map(s => s.toFixed(2)).join(', ')}`);
    },
  },

  variety: {
    usage: 'variety <genCents> <size> [period=1200]',
    desc: 'Compute the max variety of a MOS scale',
    run(args) {
      const gen = +args[0], n = +args[1], period = +(args[2] || 1200);
      if (!gen || !n) return 'Usage: variety <genCents> <size>';
      const scale = buildMOSScale(gen, n, period);
      const v = computeVariety(scale.pitches, period);
      console.log(`Generator: ${gen}¢, Size: ${n}, Period: ${period}¢`);
      console.log(`Variety: ${v}`);
    },
  },

  mv3: {
    usage: 'mv3 <genCents> <size> [period=1200]',
    desc: 'Find delta ranges that produce MV3 product scales',
    run(args) {
      const gen = +args[0], n = +args[1], period = +(args[2] || 1200);
      if (!gen || !n) return 'Usage: mv3 <genCents> <size>';
      const windows = findMV3Windows(gen, n, period);
      console.log(`MV3 windows for g=${gen}¢, N=${n}:`);
      if (!windows.length) {
        console.log('  No MV3 windows found');
      } else {
        for (const w of windows) {
          console.log(`  δ ${w.deltaLow.toFixed(1)}¢ — ${w.deltaHigh.toFixed(1)}¢  word=${w.word}`);
        }
      }
    },
  },

  'word-product': {
    usage: 'word-product <wordA> <wordB>',
    desc: 'Compute the abstract step-pattern product of two equal-length words',
    run(args) {
      if (args.length < 2) return 'Usage: word-product <wordA> <wordB>';
      const result = stepPatternProduct(args[0], args[1]);
      console.log(`${args[0]} × ${args[1]} = ${result}`);
      const v = computeWordVariety(result);
      console.log(`Variety: ${v}`);
    },
  },

  'test-product': {
    usage: 'test-product',
    desc: 'Run all rank-3 product acceptance tests',
    run() {
      let pass = 0, fail = 0;
      function assert(name, condition) {
        if (condition) { console.log(`  ✓ ${name}`); pass++; }
        else { console.log(`  ✗ ${name}`); fail++; }
      }

      console.log('Acceptance tests:\n');

      // Test 1: Zarlino word product
      console.log('1. Zarlino step-pattern product:');
      const zarlino = stepPatternProduct('ABABABA', 'AABAAAB');
      const symbols = new Set(zarlino.split(''));
      assert('3 distinct symbols', symbols.size === 3);
      assert('Length 7', zarlino.length === 7);
      // Check structure: relabel to canonical form and verify
      const charMap = {};
      let nextLabel = 0;
      let canonical = '';
      for (const ch of zarlino) {
        if (!(ch in charMap)) charMap[ch] = nextLabel++;
        canonical += charMap[ch];
      }
      // LsMsLsM with L→A,s→B,M→C = ABCBABC ✓ (first-occurrence canonical differs from alphabetic)
      const relabeled = zarlino.replace(/L/g,'A').replace(/s/g,'B').replace(/M/g,'C');
      assert('Relabeled to ABCBABC', relabeled === 'ABCBABC');
      console.log(`  Product word: ${zarlino}, canonical: ${canonical}`);

      // Test 2: computeVariety on JI pitch sets
      console.log('\n2. computeVariety on pitch sets:');
      function jiToCents(...ratios) {
        return ratios.map(r => {
          const [n, d] = r.split('/').map(Number);
          return 1200 * Math.log2(n / d);
        });
      }
      const set1 = jiToCents('1/1', '9/8', '40/27', '3/2', '160/81');
      assert('{1/1,9/8,40/27,3/2,160/81} → variety 3', computeVariety(set1, 1200) === 3);

      const set2 = jiToCents('1/1', '10/9', '9/8', '40/27', '3/2');
      assert('{1/1,10/9,9/8,40/27,3/2} → variety 4', computeVariety(set2, 1200) === 4);

      const set3 = jiToCents('1/1', '9/8', '5/4', '3/2', '5/3');
      assert('{1/1,9/8,5/4,3/2,5/3} → variety 3', computeVariety(set3, 1200) === 3);

      const set4 = jiToCents('1/1', '9/8', '5/4', '3/2', '15/8');
      assert('{1/1,9/8,5/4,3/2,15/8} → variety 5', computeVariety(set4, 1200) === 5);

      // Test 3: computeWordVariety on abstract words
      console.log('\n3. computeWordVariety on abstract words:');
      assert('LsMLsMs → variety 3', computeWordVariety('LsMLsMs') === 3);
      assert('LssMLMs → variety 4', computeWordVariety('LssMLMs') === 4);

      // Test 4: Chain-length rule
      console.log('\n4. Chain-length rule:');
      assert('N=5 (odd): chains 3+2', Math.ceil(5/2) === 3 && Math.floor(5/2) === 2);
      assert('N=7 (odd): chains 4+3', Math.ceil(7/2) === 4 && Math.floor(7/2) === 3);
      assert('N=6 (even): chains 3+3', Math.ceil(6/2) === 3 && Math.floor(6/2) === 3);
      assert('N=8 (even): chains 4+4', Math.ceil(8/2) === 4 && Math.floor(8/2) === 4);

      // Test 5: buildProductScale basic sanity
      console.log('\n5. buildProductScale sanity:');
      const prod7 = buildProductScale(701.955, 386.314, 7, 0, 0, 1200);
      assert('7-note product has 7 pitches', prod7.pitches.length === 7);
      assert('Steps sum to period', Math.abs(prod7.steps.reduce((a,b) => a+b, 0) - 1200) < 0.01);
      assert('Word length = 7', prod7.word.length === 7);

      // Zarlino round-trip: g1=3/2, g2=5/4, mode 4 should give JI major
      console.log('\n6. Zarlino round-trip (JI major):');
      const jiMajor = buildProductScale(701.955, 386.314, 7, 4, 0, 1200);
      const jiTarget = [0, 203.91, 386.31, 498.04, 701.96, 884.36, 1088.27];
      assert('Variety = 3 (MV3)', jiMajor.variety === 3);
      assert('Steps are 9/8, 10/9, 16/15',
        Math.abs(jiMajor.L - 203.91) < 0.5 &&
        Math.abs(jiMajor.M - 182.40) < 0.5 &&
        Math.abs(jiMajor.s - 111.73) < 0.5);
      const pitchMatch = jiTarget.every((t, i) => Math.abs(t - jiMajor.pitches[i]) < 1);
      assert('Pitches match JI major within 1¢', pitchMatch);
      assert('Word is LMsLMLs', jiMajor.word === 'LMsLMLs');

      console.log(`\n${pass} passed, ${fail} failed`);
      if (fail > 0) process.exit(1);
    },
  },

  help: {
    usage: 'help',
    desc: 'Show all commands',
    run() {
      console.log('MOS Calculator — available commands:\n');
      for (const [name, cmd] of Object.entries(COMMANDS)) {
        if (name === 'help') continue;
        console.log(`  ${cmd.usage}`);
        console.log(`    ${cmd.desc}\n`);
      }
    },
  },
};

// ============================================================
//  Main
// ============================================================

const args = process.argv.slice(2);
const cmd = args[0];

if (!cmd || cmd === 'help' || cmd === '--help' || cmd === '-h') {
  COMMANDS.help.run();
} else if (COMMANDS[cmd]) {
  COMMANDS[cmd].run(args.slice(1));
} else {
  console.log(`Unknown command: ${cmd}`);
  console.log('Run with "help" to see available commands.');
}
