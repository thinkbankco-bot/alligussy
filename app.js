/* ============================================================
   Alligussy — app.js
   Edit CONFIG before launch. Everything else is the cat.
   ============================================================ */
const CONFIG = {
  ticker: '$GUSSY',
  ca: '',            // contract address once launched (pump.fun)
  buyUrl: '',        // https://pump.fun/coin/<CA>
  chartUrl: '',      // https://dexscreener.com/solana/<CA>
  x: '',             // https://x.com/<handle>
  telegram: '',      // https://t.me/<group>
  siteUrl: 'https://thinkbankco-bot.github.io/alligussy',       // set by deploy_pages.sh
  milestone: 0,      // swamp map: 0 = Puddle … 5 = The Ocean; -1 = pre-launch
  petSeed: 48213,    // "everyone, allegedly"
};

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const rand = a => a[Math.floor(Math.random() * a.length)];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = matchMedia('(hover: none)').matches;
const store = {
  get(k, d) { try { const v = localStorage.getItem('ag_' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('ag_' + k, JSON.stringify(v)); } catch {} },
};

/* ---------- copy ---------- */
const TICKER = [
  'BREAKING: Gussy remains beloved',
  'HOOD STATUS: on',
  'WEATHER: swamp, with a chance of stare',
  'LOCAL CAT: refuses to confirm or deny alligator heritage',
  'PETITION: "Let Gussy take the hood off" reaches 0 signatures Gussy cares about',
  'TOAST PILLOW: still not for sale',
  'EXPERTS: "He is just a little guy"',
  'TREATS OWED: compounding',
  'GUSSY: did not blink during this broadcast',
  'FUN FACT: the teeth are felt. The feelings are real',
  'REMINDER: this is a cat in a costume. Act accordingly',
];
const TYPE_LINES = [
  'Half gator. All cat.',
  'Apex predator (emotionally).',
  'The hood does not come off.',
  'Warning: contains Gussy.',
  'Bite force: zero. Grip on your heart: total.',
  'He has never seen a swamp. He is the swamp.',
  'Beloved. Legally.',
];
const PET_LINES = [
  'Gussy allows it.', 'Gussy has noted the pet.', 'Purring, internally.', 'He leaned in. Slightly. You saw it.',
  'That was the spot.', 'Gussy blinked slowly. That means yes.', 'One more.', 'He is tolerating you. Fondly.',
  'The hood did not move. Good.', 'Gussy would like you to know he was already comfortable.',
];
const HOOD_LINES = [
  'The hood stays on.', 'Gussy has declined.', 'Nice try. Hood: still on.', 'The chin strap is structural.',
  'He looked at you. You stopped. Correct.', 'The hood is not a hat. The hood is a lifestyle.',
  'Removal request logged. Denied by the committee (Gussy).', 'You may as well try to remove the swamp from a gator.',
  'The hood is load-bearing.', 'Absolutely not.',
];
const STARE_LINES = [
  'Gussy is looking at you.',
  'Gussy knows what you did.',
  'Gussy forgives you.',
  'Gussy would like a treat now.',
  'Gussy is still looking at you.',
];
const ASK_ANSWERS = [
  '…', '*stares*', 'Gussy has heard you. Gussy is not moving.', 'Yes, after treats.', 'Ask the hood.',
  'No. But in a loving way.', 'The swamp says yes.', 'Gussy blinked once. Interpret that.', 'Chomp.',
  'That is between you and the toast pillow.', 'Gussy would, and did.', 'Signs point to beloved.',
  'He is thinking about it. He is thinking about treats.', 'Outlook: hooded.', 'Only if you pet him first.',
  'Gussy does not give financial advice. Gussy gives looks.', 'Yes, and he already knew you would ask.',
];
const MAIL = [
  ['Dear Gussy, I showed your picture to my therapist. She is a holder now.', 'Dana, Tampa'],
  ['I tried to say "Alligussy" out loud at work. HR has been informed. Worth it.', 'anonymous'],
  ['My wife said I love Gussy more than her. I said that is not a fair comparison. Gussy is beloved.', 'Marcus, 41'],
  ['Gussy is the only alligator I would let near my kids.', 'Florida Man (verified)'],
  ['I do not even like cats. I like Gussy.', 'a dog'],
  ['I have chased Gussy my whole life. Finally caught him. Holding forever.', 'early Beloved'],
  ['Dear Gussy, can you take the hood off for one photo? Just one. My grandmother thinks you look cold.', 'Priya, and her grandmother'],
  ['Everyone wants a piece of Gussy. I just want him to blink.', 'night shift'],
  ['Saw Gussy at 05:58. Was not planning to be awake. Have accepted it.', 'the owner, allegedly'],
];
const MEME_PRESETS = [
  ['WHEN SHE SAYS', 'THE HOOD STAYS ON'],
  ['ME WATCHING YOU', 'NOT BUY $GUSSY'],
  ['HE HAS NEVER SEEN A SWAMP', 'HE IS THE SWAMP'],
  ['BITE FORCE: 0 PSI', 'GRIP ON MY HEART: TOTAL'],
  ['POV: IT IS 05:58', 'AND HE IS ON YOUR CHEST'],
  ['"IT IS JUST A CAT IN A HAT"', 'GUSSY: *STARES*'],
  ['I AM NOT LIKE', 'OTHER GATORS'],
  ['GUSSY WOULD LIKE', 'A TREAT NOW'],
];
const FAQ = [
  ['Is Gussy a real alligator?', 'Gussy is a cat wearing an alligator hood with felt teeth. Legally and spiritually, that is enough.'],
  ['Why is the name Alligussy?', 'Alligator plus Gussy. Gussy is his name. We are aware of how it sounds. We are choosing peace.'],
  ['Can I pet Gussy?', 'See section 4. Consent is implied by the stare, which is the only form Gussy signs.'],
  ['Does the hood ever come off?', 'There is a counter on this page for exactly this question. Note the "successful" column.'],
  ['Is this financial advice?', 'No. It is a cat. Everything on this page about money is a fair-launch memecoin with no utility, and the cat has not read it.'],
  ['What does $GUSSY actually do?', 'It exists. Gussy also just exists, and look how that turned out for him.'],
  ['Who runs this?', 'A person who was bored. And Gussy, who was not consulted, and who would have said "..." anyway.'],
  ['What is the toast pillow?', 'The pillow in the photo. It has toast on it. It has witnessed everything. It is not for sale and never will be.'],
  ['Is Gussy okay?', 'Gussy is the most okay anyone has ever been. Please take care of yourselves too.'],
];

/* ---------- toast ---------- */
let toastT;
function toast(msg, ms = 2200) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), ms); }

/* ---------- links / CA ---------- */
function setupLinks() {
  const caEl = $('#ca');
  if (CONFIG.ca) { caEl.textContent = CONFIG.ca; caEl.classList.remove('tba'); }
  const copy = async () => {
    if (!CONFIG.ca) { toast('No CA yet. Gussy is still in the swamp.'); return; }
    try { await navigator.clipboard.writeText(CONFIG.ca); toast('CA copied. Be beloved.'); }
    catch { toast('Select and copy it manually. Gussy believes in you.'); }
  };
  $('#copyBtn').addEventListener('click', copy);
  $('#mobileCopy').addEventListener('click', copy);
  $('#caBox').addEventListener('click', e => { if (e.target.tagName !== 'BUTTON') copy(); });
  const buys = ['#navBuy', '#heroBuy', '#mobileBuy', '#buyBig', '#footBuy'].map(s => $(s));
  if (CONFIG.buyUrl) {
    buys.forEach(a => { a.href = CONFIG.buyUrl; a.target = '_blank'; a.rel = 'noopener'; });
    $('#buyStepLink').href = CONFIG.buyUrl;
    $('#buyNote').textContent = 'Opens pump.fun. Check the CA matches the one at the top of this page.';
  } else {
    $('#buyBig').classList.add('disabled');
    $('#buyBig').textContent = 'Launching soon';
    $('#buyBig').addEventListener('click', e => { e.preventDefault(); toast('Not launched yet. Pet the cat while you wait.'); });
  }
  if (CONFIG.chartUrl) { ['#chartLink', '#footChart'].forEach(s => { const a = $(s); a.href = CONFIG.chartUrl; a.hidden = false; }); }
  if (CONFIG.x) { const a = $('#footX'); a.href = CONFIG.x; a.hidden = false; }
  if (CONFIG.telegram) { const a = $('#footTg'); a.href = CONFIG.telegram; a.hidden = false; }
}

/* ---------- ticker ---------- */
function renderTicker() {
  const fmt = s => { const m = s.match(/^([A-Z][A-Z .&'!?-]{2,28}):\s*(.*)$/); return m ? `<b>${esc(m[1])}:</b> ${esc(m[2])}` : esc(s); };
  const html = TICKER.map(s => `<span>${fmt(s)}</span>`).join('');
  $('#tickerTrack').innerHTML = html + html;
  $('#tickerTrack').style.animationDuration = Math.max(60, TICKER.length * 7) + 's';
}

/* ---------- typewriter ---------- */
function typewriter() {
  const el = $('#typeLine'); if (reduceMotion) return;
  let i = 0;
  const run = async () => {
    const line = TYPE_LINES[i % TYPE_LINES.length]; i++;
    for (let n = el.textContent.length; n >= 0; n--) { el.textContent = el.textContent.slice(0, n); await wait(18); }
    for (let n = 1; n <= line.length; n++) { el.textContent = line.slice(0, n); await wait(38); }
    await wait(2600); run();
  };
  setTimeout(run, 2200);
}
const wait = ms => new Promise(r => setTimeout(r, ms));

/* ---------- nav ---------- */
function setupNav() {
  const b = $('#burger'), nav = $('#nav');
  b.addEventListener('click', () => { const open = nav.classList.toggle('open'); b.setAttribute('aria-expanded', open); });
  nav.addEventListener('click', e => { if (e.target.tagName === 'A') { nav.classList.remove('open'); b.setAttribute('aria-expanded', 'false'); } });
  const onScroll = () => $('#topbar').classList.toggle('scrolled', scrollY > 20);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
}

/* ---------- reveals + count-ups ---------- */
function setupReveals() {
  $$('.sec-head, .plaque > div, .nom, .steps li, .letter, .road li, .anatomy, .pet-copy, .ask-wrap > *').forEach((el, i) => { el.classList.add('rv'); el.style.transitionDelay = (i % 6) * 60 + 'ms'; });
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  $$('.rv').forEach(el => io.observe(el));
  const cio = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; cio.unobserve(e.target); const el = e.target, to = +el.dataset.count, suf = el.dataset.suffix || ''; const t0 = performance.now(); const step = t => { const p = Math.min(1, (t - t0) / 900), v = Math.round(to * (1 - Math.pow(1 - p, 3))); el.textContent = v + suf; if (p < 1) requestAnimationFrame(step); }; if (reduceMotion) el.textContent = to + suf; else requestAnimationFrame(step); }), { threshold: .5 });
  $$('[data-count]').forEach(el => cio.observe(el));
}

/* ---------- hero parallax ---------- */
function setupParallax() {
  if (reduceMotion) return;
  const planes = $$('.hero .plane'); const hero = $('#hero');
  let ticking = false;
  const upd = () => { ticking = false; const y = scrollY; if (y > hero.offsetHeight + 200) return; planes.forEach(p => { p.style.transform = `translate3d(0,${(y * +p.dataset.rate).toFixed(1)}px,0)`; }); };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true }); upd();
}

/* ---------- swamp canvas: lily pads + fireflies ---------- */
function setupSwamp() {
  const c = $('#swamp'), ctx = c.getContext('2d'); let W, H, dpr;
  const pads = [], flies = []; const mouse = { x: -999, y: -999 };
  const resize = () => { dpr = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight; c.width = W * dpr; c.height = H * dpr; c.style.width = W + 'px'; c.style.height = H + 'px'; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
  resize(); addEventListener('resize', resize);
  for (let i = 0; i < 14; i++) pads.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: 18 + Math.random() * 42, a: Math.random() * Math.PI * 2, vx: (Math.random() - .5) * .08, vy: (Math.random() - .5) * .08, ro: Math.random() * Math.PI * 2 });
  for (let i = 0; i < (isTouch ? 10 : 26); i++) flies.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, vx: 0, vy: 0, ph: Math.random() * Math.PI * 2, s: .5 + Math.random() });
  if (!isTouch) addEventListener('pointermove', e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  const drawPad = p => {
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.ro);
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, p.r, .35, Math.PI * 2 - .35); ctx.closePath();
    ctx.fillStyle = 'rgba(36,154,70,.07)'; ctx.fill(); ctx.strokeStyle = 'rgba(143,227,107,.12)'; ctx.lineWidth = 1; ctx.stroke(); ctx.restore();
  };
  let last = 0, visible = true;
  document.addEventListener('visibilitychange', () => { visible = !document.hidden; });
  const frame = t => {
    requestAnimationFrame(frame); if (!visible) return; if (t - last < 33) return; last = t;
    ctx.clearRect(0, 0, W, H);
    pads.forEach(p => { p.x += p.vx; p.y += p.vy; p.ro += .0008; if (p.x < -60) p.x = W + 60; if (p.x > W + 60) p.x = -60; if (p.y < -60) p.y = H + 60; if (p.y > H + 60) p.y = -60; drawPad(p); });
    flies.forEach(f => {
      f.ph += .03; const dx = mouse.x - f.x, dy = mouse.y - f.y, d = Math.hypot(dx, dy) || 1;
      if (d < 260) { f.vx += dx / d * .05; f.vy += dy / d * .05; }
      f.vx += (Math.random() - .5) * .08; f.vy += (Math.random() - .5) * .08; f.vx *= .96; f.vy *= .96;
      f.x += f.vx; f.y += f.vy; if (f.x < 0) f.x = W; if (f.x > W) f.x = 0; if (f.y < 0) f.y = H; if (f.y > H) f.y = 0;
      const a = .25 + .55 * (Math.sin(f.ph) * .5 + .5);
      ctx.beginPath(); ctx.arc(f.x, f.y, 1.4 * f.s, 0, Math.PI * 2); ctx.fillStyle = `rgba(198,245,166,${a})`; ctx.fill();
      ctx.beginPath(); ctx.arc(f.x, f.y, 6 * f.s, 0, Math.PI * 2); ctx.fillStyle = `rgba(143,227,107,${a * .12})`; ctx.fill();
    });
  };
  if (reduceMotion) { pads.forEach(drawPad); return; }
  requestAnimationFrame(frame);
}

/* ---------- the stare ---------- */
function setupStare() {
  const sec = $('#stare'), line = $('#stareLine'), secEl = $('#stareSec'), dots = $$('#stareDots li');
  let idx = 0, secs = store.get('stare', 0), inView = false, tick; secEl.textContent = secs;
  const setIdx = n => { if (n === idx) return; idx = n; line.classList.add('swap'); setTimeout(() => { line.textContent = STARE_LINES[n]; line.classList.remove('swap'); }, 220); dots.forEach((d, i) => d.classList.toggle('on', i <= n)); sec.className = 'stare p' + n; };
  const upd = () => { const r = sec.getBoundingClientRect(); const total = sec.offsetHeight - innerHeight; const p = Math.min(1, Math.max(0, -r.top / total)); setIdx(Math.min(4, Math.floor(p * 5))); };
  addEventListener('scroll', upd, { passive: true }); upd();
  const io = new IntersectionObserver(es => es.forEach(e => { inView = e.isIntersecting; clearInterval(tick); if (inView) tick = setInterval(() => { secs++; secEl.textContent = secs; if (secs % 10 === 0) store.set('stare', secs); }, 1000); }), { threshold: .3 });
  io.observe($('.stare-sticky'));
}

/* ---------- pet gussy ---------- */
function setupPet() {
  const cat = $('#petCat'), hearts = $('#hearts'), fill = $('#purrFill'), label = $('#purrLabel'), resp = $('#petResp');
  let you = store.get('pets', 0), tries = store.get('hood', 0), purr = 0, audio = null, osc = null, gain = null;
  const all = () => CONFIG.petSeed + you + Math.floor((Date.now() - 1760000000000) / 240000);
  const paint = () => { $('#petsYou').textContent = you.toLocaleString(); $('#petsAll').textContent = all().toLocaleString(); $('#hoodTries').textContent = tries; };
  paint(); setInterval(paint, 30000);
  const levels = ['dormant', 'faint', 'audible', 'rumbling', 'industrial', 'swamp-wide', 'transcendent'];
  const setPurr = () => { fill.style.width = Math.min(100, purr) + '%'; label.textContent = 'Purr level: ' + levels[Math.min(levels.length - 1, Math.floor(purr / 17))]; if (gain) gain.gain.setTargetAtTime(Math.min(.25, purr / 400), audio.currentTime, .1); };
  setInterval(() => { if (purr > 0) { purr = Math.max(0, purr - 1.2); setPurr(); } }, 250);
  const heart = (x, y) => { const h = document.createElement('span'); h.className = 'heart'; h.textContent = rand(['💚', '🤍', '💛', '🐊', '✨']); h.style.left = x + 'px'; h.style.top = y + 'px'; h.style.transform = `rotate(${(Math.random() - .5) * 40}deg)`; hearts.appendChild(h); setTimeout(() => h.remove(), 1400); };
  const pet = (x, y) => {
    you++; purr = Math.min(110, purr + 9); store.set('pets', you); paint(); setPurr();
    const r = cat.getBoundingClientRect(), s = hearts.getBoundingClientRect();
    if (x == null) { x = r.left + r.width * (.3 + Math.random() * .4); y = r.top + r.height * (.3 + Math.random() * .3); }
    for (let i = 0; i < 3; i++) heart(x - s.left + (Math.random() - .5) * 40, y - s.top + (Math.random() - .5) * 20);
    cat.classList.add('squish'); setTimeout(() => cat.classList.remove('squish'), 120);
    if (you % 5 === 0 || Math.random() < .3) resp.textContent = rand(PET_LINES);
    if (you === 100) toast('100 pets. Gussy has filed you under "acceptable".', 3200);
    if (you === 500) toast('500 pets. You are now part of the hood.', 3200);
  };
  cat.addEventListener('pointerdown', e => { e.preventDefault(); pet(e.clientX, e.clientY); });
  $('#petBtn').addEventListener('click', () => pet());
  $('#hoodBtn').addEventListener('click', () => { tries++; store.set('hood', tries); paint(); cat.classList.remove('shake'); void cat.offsetWidth; cat.classList.add('shake'); resp.textContent = rand(HOOD_LINES); if (tries === 10) toast('Ten attempts. The hood has noticed you.', 3000); if (tries === 50) toast('Fifty. At this point the hood is removing you.', 3200); });
  $('#purrToggle').addEventListener('click', function () {
    const on = this.getAttribute('aria-pressed') !== 'true';
    if (on) {
      try {
        if (!audio) { audio = new (window.AudioContext || window.webkitAudioContext)(); osc = audio.createOscillator(); const lfo = audio.createOscillator(), lg = audio.createGain(); gain = audio.createGain(); osc.type = 'sawtooth'; osc.frequency.value = 26; lfo.frequency.value = 22; lg.gain.value = 10; lfo.connect(lg); lg.connect(osc.frequency); const lp = audio.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 180; osc.connect(lp); lp.connect(gain); gain.connect(audio.destination); gain.gain.value = 0; osc.start(); lfo.start(); }
        audio.resume(); this.textContent = 'Purr sound: on'; this.setAttribute('aria-pressed', 'true'); if (purr < 20) { purr = 30; setPurr(); }
      } catch { toast('Your browser declined to purr.'); }
    } else { if (audio) audio.suspend(); this.textContent = 'Purr sound: off'; this.setAttribute('aria-pressed', 'false'); }
  });
}

/* ---------- stacking cards ---------- */
function setupStack() {
  const cards = $$('#dayStack .card'); const bar = 76;
  cards.forEach((c, i) => { c.style.top = bar + i * 14 + 'px'; c.style.zIndex = i + 1; });
  if (reduceMotion) return;
  const upd = () => { cards.forEach((c, i) => { const r = c.getBoundingClientRect(); const stuck = r.top <= bar + i * 14 + 1; const depth = cards.slice(i + 1).filter(n => n.getBoundingClientRect().top <= bar + 60).length; c.style.transform = stuck ? `scale(${1 - depth * .025}) translateY(${-depth * 4}px)` : ''; c.style.filter = depth ? `brightness(${1 - depth * .06})` : ''; }); };
  let t = false; addEventListener('scroll', () => { if (!t) { t = true; requestAnimationFrame(() => { t = false; upd(); }); } }, { passive: true }); upd();
}

/* ---------- fan mail ---------- */
function setupMail() {
  const grid = $('#mailGrid'); const mine = store.get('mail', []);
  const render = () => {
    const items = [...mine.map(m => ({ t: m, f: 'you, just now', mine: true })), ...MAIL.map(([t, f]) => ({ t, f }))];
    grid.innerHTML = items.map((m, i) => `<div class="letter${m.mine ? ' mine' : ''}" style="--rot:${((i * 7) % 5 - 2) * .8}deg">${esc(m.t)}<span class="from">— ${esc(m.f)}</span></div>`).join('');
  };
  render();
  $('#mailForm').addEventListener('submit', e => { e.preventDefault(); const v = $('#mailText').value.trim(); if (!v) return; mine.unshift(v); if (mine.length > 6) mine.pop(); store.set('mail', mine); render(); $('#mailText').value = ''; toast('Sent. Gussy read it. Gussy said nothing.'); });
}

/* ---------- meme lab + certificate ---------- */
function setupLab() {
  const cv = $('#labCanvas'), ctx = cv.getContext('2d'); let mode = 'meme';
  const img = new Image(); img.src = 'assets/gussy.jpg';
  const face = new Image(); face.src = 'assets/face.jpg';
  const fontReady = document.fonts ? document.fonts.load('700 60px Fredoka').then(() => document.fonts.load('30px "Special Elite"')) : Promise.resolve();
  const wrapText = (text, maxW, font) => { ctx.font = font; const words = text.split(' '), lines = []; let cur = ''; words.forEach(w => { const t = cur ? cur + ' ' + w : w; if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; }); if (cur) lines.push(cur); return lines; };
  const strokeLines = (lines, x, y, lh, font, fill, stroke, lw) => { ctx.font = font; ctx.textAlign = 'center'; ctx.lineJoin = 'round'; ctx.lineWidth = lw; ctx.strokeStyle = stroke; ctx.fillStyle = fill; lines.forEach((l, i) => { ctx.strokeText(l, x, y + i * lh); ctx.fillText(l, x, y + i * lh); }); };
  const drawMeme = () => {
    const top = $('#memeTop').value.toUpperCase(), bot = $('#memeBot').value.toUpperCase(), style = $('#memeStyle').value;
    ctx.clearRect(0, 0, 1080, 1080);
    if (style === 'impact') {
      ctx.drawImage(img, 0, 0, 1080, 1080);
      const f = '700 84px Fredoka';
      const tl = wrapText(top, 980, f), bl = wrapText(bot, 980, f);
      strokeLines(tl, 540, 110, 92, f, '#fff', '#000', 12);
      strokeLines(bl, 540, 1080 - 50 - (bl.length - 1) * 92, 92, f, '#fff', '#000', 12);
    } else if (style === 'field') {
      ctx.fillStyle = '#f3e8d3'; ctx.fillRect(0, 0, 1080, 1080);
      ctx.fillStyle = '#fffdf7'; ctx.fillRect(60, 60, 960, 960); ctx.strokeStyle = '#249a46'; ctx.lineWidth = 4; ctx.strokeRect(60, 60, 960, 960);
      ctx.drawImage(img, 110, 190, 560, 560); ctx.strokeStyle = '#15281f'; ctx.lineWidth = 3; ctx.strokeRect(110, 190, 560, 560);
      ctx.fillStyle = '#249a46'; ctx.font = '26px "Special Elite"'; ctx.textAlign = 'left'; ctx.fillText('SWAMP FIELD GUIDE · ENTRY 001', 110, 130);
      ctx.fillStyle = '#15281f'; ctx.font = '700 54px Fredoka'; wrapText(top || 'ALLIGUSSY', 860, '700 54px Fredoka').slice(0, 2).forEach((l, i) => ctx.fillText(l, 110, 850 + i * 60));
      ctx.font = '28px "Special Elite"'; ctx.fillStyle = '#3b5546'; wrapText(bot, 860, '28px "Special Elite"').slice(0, 2).forEach((l, i) => ctx.fillText(l, 110, 960 + i * 36));
      ctx.save(); ctx.translate(840, 360); ctx.rotate(-.2); ctx.font = '700 34px Fredoka'; ctx.fillStyle = '#249a46'; ctx.textAlign = 'center'; ctx.fillText('BELOVED', 0, 0); ctx.strokeStyle = '#249a46'; ctx.lineWidth = 5; ctx.strokeRect(-110, -40, 220, 60); ctx.restore();
      ctx.font = '20px "Special Elite"'; ctx.fillStyle = '#3b5546'; ctx.textAlign = 'left'; ['F. gatorensis', 'belovedus', 'Bite force: 0 PSI', 'Hood: permanent', 'Status: BL'].forEach((l, i) => ctx.fillText(l, 700, 470 + i * 36));
    } else {
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 1080, 1080);
      ctx.fillStyle = '#c8402f'; ctx.fillRect(0, 0, 1080, 150);
      ctx.fillStyle = '#fff'; ctx.font = '700 92px Fredoka'; ctx.textAlign = 'center'; ctx.fillText('THE SWAMP SUN', 540, 108);
      ctx.fillStyle = '#000'; ctx.font = '22px "Special Elite"'; ctx.fillText('WORLD EXCLUSIVE  ·  HOOD STILL ON  ·  SOURCES: THE PILLOW', 540, 185);
      ctx.drawImage(img, 60, 210, 600, 600);
      ctx.fillStyle = '#000'; ctx.font = '700 70px Fredoka'; ctx.textAlign = 'left'; wrapText(top, 380, '700 70px Fredoka').slice(0, 5).forEach((l, i) => ctx.fillText(l, 690, 290 + i * 76));
      ctx.font = '700 46px Fredoka'; ctx.fillStyle = '#c8402f'; wrapText(bot, 960, '700 46px Fredoka').slice(0, 3).forEach((l, i) => ctx.fillText(l, 60, 880 + i * 54));
      ctx.font = '22px "Special Elite"'; ctx.fillStyle = '#555'; ctx.fillText('Alligussy, pictured, declined to comment. $GUSSY', 60, 1040);
    }
  };
  const drawCert = () => {
    const name = ($('#certName').value.trim() || 'Bearer of this document'), rank = $('#certRank').value;
    ctx.clearRect(0, 0, 1080, 1080); ctx.fillStyle = '#fffdf7'; ctx.fillRect(0, 0, 1080, 1080);
    ctx.strokeStyle = '#249a46'; ctx.lineWidth = 14; ctx.strokeRect(40, 40, 1000, 1000); ctx.lineWidth = 3; ctx.strokeRect(66, 66, 948, 948);
    for (let i = 0; i < 4; i++) { ctx.save(); ctx.translate(i % 2 ? 1000 : 80, i < 2 ? 80 : 1000); ctx.fillStyle = '#249a46'; ctx.beginPath(); ctx.arc(0, 0, 16, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
    ctx.textAlign = 'center'; ctx.fillStyle = '#249a46'; ctx.font = '26px "Special Elite"'; ctx.fillText('THE SWAMP · OFFICE OF BELOVEDNESS', 540, 150);
    ctx.fillStyle = '#15281f'; ctx.font = '700 72px Fredoka'; ctx.fillText('Certificate of Belovedness', 540, 240);
    ctx.font = '26px "Special Elite"'; ctx.fillStyle = '#3b5546'; ctx.fillText('This certifies that', 540, 320);
    ctx.fillStyle = '#15281f'; ctx.font = '700 64px Fredoka'; wrapText(name, 880, '700 64px Fredoka').slice(0, 2).forEach((l, i) => ctx.fillText(l, 540, 400 + i * 70));
    ctx.strokeStyle = '#249a46'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(240, 430 + (wrapText(name, 880, '700 64px Fredoka').length - 1) * 70); ctx.lineTo(840, 430 + (wrapText(name, 880, '700 64px Fredoka').length - 1) * 70); ctx.stroke();
    ctx.font = '26px "Special Elite"'; ctx.fillStyle = '#3b5546'; ctx.fillText('has been seen by Gussy, and was not found wanting.', 540, 520);
    ctx.fillText('Rank conferred:', 540, 575); ctx.fillStyle = '#249a46'; ctx.font = '700 44px Fredoka'; ctx.fillText(rank.toUpperCase(), 540, 625);
    ctx.save(); ctx.beginPath(); ctx.arc(540, 800, 120, 0, Math.PI * 2); ctx.closePath(); ctx.clip(); ctx.drawImage(face, 420, 680, 240, 240); ctx.restore();
    ctx.strokeStyle = '#249a46'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(540, 800, 124, 0, Math.PI * 2); ctx.stroke();
    ctx.save(); ctx.translate(540, 800); for (let i = 0; i < 40; i++) { ctx.rotate(Math.PI / 20); ctx.fillStyle = '#249a46'; ctx.beginPath(); ctx.moveTo(0, -132); ctx.lineTo(8, -146); ctx.lineTo(-8, -146); ctx.closePath(); ctx.fill(); } ctx.restore();
    ctx.save(); ctx.translate(820, 820); ctx.rotate(-.25); ctx.strokeStyle = '#c8402f'; ctx.lineWidth = 5; ctx.strokeRect(-120, -42, 240, 84); ctx.fillStyle = '#c8402f'; ctx.font = '700 30px Fredoka'; ctx.fillText('HOOD: ON', 0, -4); ctx.font = '20px "Special Elite"'; ctx.fillText('VERIFIED', 0, 26); ctx.restore();
    const d = new Date(); const ser = 'AG-' + Math.abs([...name].reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 7)).toString(36).toUpperCase().padStart(6, '0');
    ctx.fillStyle = '#3b5546'; ctx.font = '22px "Special Elite"'; ctx.textAlign = 'left'; ctx.fillText('Date: ' + d.toISOString().slice(0, 10), 120, 960); ctx.textAlign = 'right'; ctx.fillText('Serial: ' + ser, 960, 960);
    ctx.textAlign = 'center'; ctx.font = '20px "Special Elite"'; ctx.fillText('Signed: ...   (Gussy)', 540, 1000);
  };
  const draw = () => mode === 'meme' ? drawMeme() : drawCert();
  const ready = () => fontReady.then(draw).catch(draw);
  img.onload = ready; face.onload = ready; if (img.complete) ready();
  ['#memeTop', '#memeBot', '#memeStyle', '#certName', '#certRank'].forEach(s => $(s).addEventListener('input', draw));
  $('#memePresets').innerHTML = MEME_PRESETS.map(([a, b], i) => `<button type="button" data-i="${i}">${esc(a)} / ${esc(b)}</button>`).join('');
  $('#memePresets').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const [a, c] = MEME_PRESETS[+b.dataset.i]; $('#memeTop').value = a; $('#memeBot').value = c; draw(); });
  $$('.tab').forEach(t => t.addEventListener('click', () => { mode = t.dataset.tab; $$('.tab').forEach(x => { x.classList.toggle('on', x === t); x.setAttribute('aria-selected', x === t); }); $('#memeControls').hidden = mode !== 'meme'; $('#certControls').hidden = mode !== 'cert'; draw(); }));
  $('#labDownload').addEventListener('click', () => { const a = document.createElement('a'); a.download = mode === 'meme' ? 'gussy-meme.png' : 'certificate-of-belovedness.png'; a.href = cv.toDataURL('image/png'); a.click(); toast(mode === 'meme' ? 'Saved. Post it. Tag no one.' : 'Certificate issued. Frame it.'); });
  const share = $('#labShare');
  const setShare = () => { const txt = mode === 'meme' ? `${$('#memeTop').value} ${$('#memeBot').value}. $GUSSY ${CONFIG.siteUrl}` : `I have been certified ${$('#certRank').value} by Gussy. The hood stays on. $GUSSY ${CONFIG.siteUrl}`; share.href = 'https://x.com/intent/post?text=' + encodeURIComponent(txt.trim()); };
  setShare(); ['#memeTop', '#memeBot', '#certRank'].forEach(s => $(s).addEventListener('input', setShare)); $$('.tab').forEach(t => t.addEventListener('click', setShare));
  share.addEventListener('click', () => toast('Download the PNG first, then attach it to the post.', 2800));
}

/* ---------- ask gussy ---------- */
function setupAsk() {
  const form = $('#askForm'), ans = $('#askAnswer'), lids = $('#lids'); let last = -1;
  const blink = () => { lids.classList.add('blink'); setTimeout(() => lids.classList.remove('blink'), 160); };
  if (!reduceMotion) setInterval(() => { if (Math.random() < .35) blink(); }, 2600);
  form.addEventListener('submit', e => {
    e.preventDefault(); const q = $('#askInput').value.trim(); if (!q) { ans.textContent = 'Gussy cannot answer a question you did not ask. Gussy respects that.'; return; }
    ans.classList.add('swap'); blink();
    setTimeout(() => { let i; do { i = Math.floor(Math.random() * ASK_ANSWERS.length); } while (i === last); last = i; let a = ASK_ANSWERS[i]; if (/hood/i.test(q)) a = 'The hood stays on.'; if (/treat/i.test(q)) a = 'Yes. Now. Immediately.'; if (/(sell|dump)/i.test(q)) a = 'Gussy will remember this.'; ans.textContent = a; ans.classList.remove('swap'); }, 900);
  });
}

/* ---------- faq ---------- */
function setupFaq() {
  $('#faqList').innerHTML = FAQ.map(([q, a], i) => `<div class="faq"><button aria-expanded="false" aria-controls="faqa${i}">${esc(q)}</button><div class="a" id="faqa${i}"><p>${esc(a)}</p></div></div>`).join('');
  $('#faqList').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const f = b.parentElement; const open = f.classList.toggle('open'); b.setAttribute('aria-expanded', open); });
}

/* ---------- swamp map ---------- */
function setupRoad() { $$('#road li').forEach((li, i) => { li.classList.toggle('done', i < CONFIG.milestone); li.classList.toggle('here', i === CONFIG.milestone); }); }

/* ---------- konami: gator mode ---------- */
function setupKonami() {
  const seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']; let i = 0;
  addEventListener('keydown', e => { i = e.key === seq[i] ? i + 1 : (e.key === seq[0] ? 1 : 0); if (i === seq.length) { i = 0; document.body.classList.toggle('gator'); toast(document.body.classList.contains('gator') ? 'GATOR MODE. The hood is now on you too.' : 'Gator mode off. The hood remains on Gussy.', 3000); } });
  let taps = 0, tt; $('.brand').addEventListener('click', e => { taps++; clearTimeout(tt); tt = setTimeout(() => taps = 0, 800); if (taps === 5) { e.preventDefault(); taps = 0; document.body.classList.toggle('gator'); toast('GATOR MODE.', 2000); } });
}

/* ---------- init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  setupLinks(); renderTicker(); typewriter(); setupNav(); setupReveals(); setupParallax(); setupSwamp();
  setupStare(); setupPet(); setupStack(); setupMail(); setupLab(); setupAsk(); setupFaq(); setupRoad(); setupKonami();
});
