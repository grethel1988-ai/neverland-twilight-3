/* ===== 永無島的黃昏：影子、時鐘與不沉之船 — 遊戲主程式 ===== */
(() => {
'use strict';
const $ = s => document.querySelector(s);
const IMG = n => `assets/img/${n}.webp`;
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.random() * a.length | 0];

/* ---------- 角色與台詞 ---------- */
const PARTNERS = {
  peter: { name: '彼得潘', img: 'peter_pan', tag: '失去影子的飛翔少年',
    hello: '嘿！雖然我的影子被虎克那傢伙鎖在海盜船上，現在只能半飄在空中……但只要有你在，我們在太陽下山前一定能把影子搶回來！',
    right: ['太帥啦！我感覺影子剛剛激動地跳了一下，連我的飛行力氣都恢復三分了！', '哈哈哈！看到沒有？這才是永無島最自由、最聰明的破咒身手！', '幹得漂亮！虎克那老傢伙要是看到這題被你秒殺，鐵鉤都要氣歪了！', '耶——！等找回我的影子，我第一個帶你飛上星空最高的那朵雲！'],
    wrong: ['哎呀，我的身體又往上飄了一點……沒關係，深呼吸，我們再瞄準一次！', '別灰心！連我抓自己的影子都撲空過好幾次呢，下一題一定行！', '哼，這一定是虎克跟史密設下的文字障眼法，才騙不到我們第二次！', '放輕鬆～想一想快樂的事，不被錯誤綁住，才是真正的永無島勇士！'] },
  wendy: { name: '溫蒂', img: 'wendy_darling', tag: '擅長故事與思辨的姊姊',
    hello: '你好，我是溫蒂。黃昏的文字結界雖然複雜，但只要像讀故事一樣理清脈絡，沒有解不開的謎題喔！',
    right: ['太精彩了！你的邏輯比我讀過的任何一本冒險小說都要清晰呢！', '答對了！我已經想好今晚回樹屋後，要把你破咒的英姿寫成第一章了！', '好棒！連躲在帳篷後面的麥克和他的獨眼小熊都在偷偷替你鼓掌喔！', '真了不起！虎克船長日誌裡的矛盾，完全逃不過你的眼睛！'],
    wrong: ['別著急，越是長篇的謎題越需要靜下心。我陪你把線索再梳理一次！', '沒關係的，每個偉大的傳奇故事裡，主角都會在轉折處停下來思考一下。', '深呼吸～哪怕夕陽正在下山，只要我們不慌亂，黑巫術就困不住我們！', '別難過，媽媽常說：「看穿錯誤的瞬間，就是智慧發光的時候喔！」'] },
  john: { name: '約翰', img: 'john_darling', tag: '握雨傘推眼鏡的小智囊',
    hello: '咳咳，在下約翰·達林。（推眼鏡）面對海盜船上的高階文字結界，唯有嚴謹的邏輯與我的雨傘可以與之抗衡！',
    right: ['（推眼鏡）精闢！這番推論簡直無懈可擊，容我脫帽向你致敬！', '完全正確！根據我的精密計算，海盜的防線已經被你瓦解百分之二十五了！', '太優雅了！用智商碾壓海盜，這才是真正的紳士戰術！', '精彩絕倫！這題的解析我必須立刻收錄進《永無島戰役備忘錄》！'],
    wrong: ['唔……（推眼鏡）一定是夕陽的反光害我眼鏡起霧了，絕不是我們的失誤！', '冷靜！真正的智囊就算踩中海盜的文字陷阱，姿勢也依然要保持優雅！', '根據我的分析，出題的海盜肯定沒有好好讀過辭典，我們下一題扳回一城！', '別慌張，握緊雨傘、重新檢視前後文邏輯，破綻就在字裡行間！'] },
  tink: { name: '奇妙仙子', img: 'tinker_bell', angry: 'tinker_bell_annoyed', tag: '傲嬌發光的仙塵精靈',
    hello: '叮鈴鈴！聽好了，要不是為了救彼得的影子，我才不會隨便幫你帶路呢！……跟緊我的金色仙塵，不准落後喔！',
    right: ['哼！算、算你有點本事啦！本仙子特別賞你一把雙倍閃亮的仙塵！✨', '叮鈴～！剛剛那題連我都差點猶豫了一下……你、你還滿厲害的嘛！', '做得好！看在你這麼努力救彼得的份上，我決定把你列為頭號夥伴！', '哇喔！這題破得真漂亮，我的仙塵都開心到變成彩虹金了！'],
    wrong: ['叮叮叮！！錯了啦！你看我氣得整個人都發出紅光了！快振作起來！', '笨蛋笨蛋！再被虎克的爛謎題騙到，我就真的把你變成森林裡的癩蛤蟆喔！', '哼！我的仙塵可是在跟夕陽賽跑耶！……好啦，拍拍翅膀，再給你一次機會！', '氣死我了！這一定是史密亂寫的錯字害你的，下一題幫我狠狠教訓他們！'] },
};
const CAST = {
  peter: 'peter_pan', wendy: 'wendy_darling', john: 'john_darling',
  tink: 'tinker_bell', tinkAngry: 'tinker_bell_annoyed',
  tiger: 'tiger_lily', michael: 'michael_darling',
  slightly: 'slightly', tootles: 'tootles', cubby: 'nibs', twins: 'the_twins',
  smee: 'pirate_smee', hook: 'captain_hook', croc: 'giant_crocodile', boys: 'lost_boys'
};

/* ---------- 關卡設定（四關完整劇情） ---------- */
const STAGES = [
  { name: '第一關　印第安部落的危機', short: '印第安部落', bg: 'native_american_camp', inds: ['4-Ⅲ-1', '4-Ⅲ-2', '4-Ⅲ-3', '四字語詞'],
    story: [
      { who: '圖特斯', img: 'tootles', side: 'left', text: '不好了！（穿著臭鼬裝驚慌地絆倒在地）海盜史密帶著水手趁夜襲擊了印第安部落，搶走了記載影子下落的古老卷軸！' },
      { who: '麥克', img: 'michael', side: 'left', text: '嗚嗚……（緊緊抱著少了一隻眼睛的泰迪熊，躲在帳篷後面瑟瑟發抖）海盜還在營火旁留下一堆看不懂的怪字……' },
      { who: '虎蓮公主', img: 'tiger', side: 'right', text: '別怕！（手臂上的古老幾何刺青微微發光，俐落地攤開地圖）史密留下的紙條裡藏著海盜撤退的暗號。' },
      { who: '約翰', img: 'john', side: 'left', text: '（冷靜地推了推眼鏡、握緊雨傘）{name}，請協助我們解開營地的「字音字形與成語暗號」，分析出海盜逃跑的方向！' } ] },
  { name: '第二關　迷霧森林的考驗', short: '迷霧森林', bg: 'misty_forest', inds: ['5-Ⅲ-2', '5-Ⅲ-3'],
    story: [
      { who: '旁白', text: '穿過印第安部落後，一行人來到精靈森林的入口。奇妙仙子在空中飛舞，身後飄散著閃閃發亮的金色仙塵——' },
      { who: '奇妙仙子', img: 'tinkAngry', angry: true, side: 'right', text: '叮叮叮！！（發現大家沒帶彼得潘來，整個人氣得發出刺眼的紅光！）你們竟然把彼得一個人留在半空中？我不幫你們帶路了！' },
      { who: '史萊特利', img: 'slightly', side: 'left', text: '仙子姊姊息怒啊！我和穿熊裝的庫比摘了森林裡最甜的果實要送給妳呢！' },
      { who: '奇妙仙子', img: 'tink', side: 'right', text: '哼！除非 {name} 能解開森林古樹上刻著的「標點、修辭與文意謎題」證明你們的智慧，否則我就把你們通通變成癩蛤蟆！' } ] },
  { name: '第三關　骷髏礁石窟的尾隨者', short: '骷髏礁石窟', bg: 'coastal_scene_in_neverland', inds: ['5-Ⅲ-4', '5-Ⅲ-5', '5-Ⅲ-6'],
    story: [
      { who: '雙胞胎', img: 'twins', side: 'left', text: '（拉了拉你的衣角，指向陰暗的水面）快看骷髏礁旁邊！那、那是什麼龐然大物？！' },
      { who: '滴答鱷魚', img: 'croc', side: 'right', text: '滴答……滴答……（墨綠色的沼澤鱗甲在月光下閃爍，巨顎似笑非笑地微張，腹部透出機械大鬧鐘的規律微光）' },
      { who: '溫蒂', img: 'wendy', side: 'left', text: '大家別慌，是吞下鬧鐘的滴答鱷魚！牠最執著的獵物是虎克船長，我們可以利用牠的「滴答聲」作掩護，嚇退守在水路的海盜！' },
      { who: '約翰', img: 'john', side: 'left', text: '{name}，快解開礁石上的「事實與觀點、議論文與摘要機關」，正確引導巨鱷游向海盜巡邏艇，否則我們也會變成牠的點心！' } ] },
  { name: '第四關　快樂羅傑號的終極對決', short: '快樂羅傑號', bg: 'captain_hook_s_cabin', inds: ['5-Ⅲ-8', '5-Ⅲ-11'],
    story: [
      { who: '旁白', text: '落日只剩最後一絲餘暉。黑色的海盜旗在夜風中獵獵作響，你們終於潛入了不沉之船「快樂羅傑號」的船艙與甲板！' },
      { who: '虎克船長', img: 'hook', side: 'right', text: '哼哼哼……（優雅地擦拭著冰冷的鐵鉤）太遲了，小鬼們！彼得潘的影子已經被我的「矛盾之語」鎖在桅杆下，太陽一下山就永遠解不開了！' },
      { who: '彼得潘', img: 'peter', side: 'left', text: '虎克，你別得意！失落男孩與達林家的夥伴們，幫我拖住海盜——{name}，虎克桌上的航海日誌就交給你了！' },
      { who: '溫蒂', img: 'wendy', side: 'left', text: '這是最後的決戰了！請透過「因果推論與高階閱讀思辨」看穿日誌與多元文本背後的真相，一舉斬斷束縛影子的黑巫術鎖鏈！' } ] },
];
const ENDING = [
  { who: '旁白', text: '鏘——！當最後一道思辨謎題解開，黑巫術鎖鏈瞬間碎裂成點點星光，彼得潘的影子飛奔回他的腳下！' },
  { who: '彼得潘', img: 'peter', side: 'left', text: '哈哈！我的影子回來了！（帥氣地一躍而起，在星空中自在盤旋）謝謝你，{name}！你給了永無島最棒的自由之翼！' },
  { who: '滴答鱷魚', img: 'croc', side: 'right', text: '滴答、滴答、滴答——！（巨鱷張開大嘴衝上甲板，眼神狡黠地鎖定虎克船長）' },
  { who: '虎克船長', img: 'hook', side: 'right', text: '哇啊啊——！是那隻該死的鱷魚！史密，救命啊——！（狼狽地噗通一聲跳進大海）' },
  { who: '奇妙仙子', img: 'tink', side: 'left', text: '叮鈴鈴～太陽下山前任務大成功！{name}，這張最高榮譽的永無島傳奇證書，是屬於你的！✨' }
];
const PROLOGUE = '永無島的星空原本總是閃耀著無憂無慮的光芒，直到這個黃昏，危險悄然而至。\n「彼得！你的影子跑去哪裡了？」溫蒂驚呼道。虎克船長利用黑巫術在海盜船「快樂羅傑號」設下文字結界，奪走並封印了彼得潘的影子！一旦夕陽完全沉入海平面，黑巫術將永久固化，彼得潘將永遠失去飛行的能力。\n約翰推了推眼鏡、握緊雨傘，麥克也抱緊了少了一隻眼睛的泰迪熊。為了在太陽下山前奪回影子，立刻踏上這場橫跨永無島的國語文解謎冒險吧！';
const DIFF = { 25: { name: '暮光水手', lives: 5 }, 40: { name: '斬影劍士', lives: 7 }, 50: { name: '不沉船長', lives: 10 } };
const COMPASS_COLORS = [['#ffd24c', '#9e6b0b'], ['#52e5c7', '#117a65'], ['#ff756b', '#a82030']];
const gummy = (k, lost) => {
  const [c, d] = COMPASS_COLORS[k % 3];
  return `<svg class="gummy compass${lost ? ' lost' : ''}" viewBox="0 0 40 44" aria-hidden="true"><circle cx="20" cy="4" r="3" fill="none" stroke="${c}" stroke-width="2"/><circle cx="20" cy="24" r="17" fill="${c}" stroke="${d}" stroke-width="2"/><circle cx="20" cy="24" r="13.5" fill="#1e122a" stroke="${d}" stroke-width="1"/><path d="M20 12 L20 15 M20 33 L20 36 M8 24 L11 24 M29 24 L32 24" stroke="#ffe79a" stroke-width="1.5" stroke-linecap="round"/><polygon points="20,13 23.5,24 20,21.5 16.5,24" fill="#ff5c72"/><polygon points="20,35 23.5,24 20,26.5 16.5,24" fill="#fff8eb"/><circle cx="20" cy="24" r="2.2" fill="${c}"/></svg>`;
};
const IND_NAME = {
  '4-Ⅲ-1': '常用國字與多音字',
  '4-Ⅲ-2': '字形結構與部件',
  '4-Ⅲ-3': '辭典擴充與詞義詞性',
  '5-Ⅲ-2': '標點符號表達效果',
  '5-Ⅲ-3': '讀懂文本與修辭句型',
  '5-Ⅲ-4': '客觀事實與主觀觀點',
  '5-Ⅲ-5': '議論文本特徵',
  '5-Ⅲ-6': '摘要策略與篇章結構',
  '5-Ⅲ-8': '因果推論與思辨',
  '5-Ⅲ-11': '多元文本閱讀題組',
  '四字語詞': '成語與四字語詞'
};
const TYPE_NAME = { mc: '選擇題', match: '拖曳配對', fill: '拖曳填空', cat: '分類題', order: '排序題' };

/* ---------- 狀態 ---------- */
const S = { name: '', n: 0, partner: null, qs: [], i: 0, right: 0, lives: 0, stage: -1, answered: false };

/* ---------- 畫面切換 ---------- */
function show(id) { document.querySelectorAll('.screen').forEach(s => s.classList.toggle('active', s.id === id)); }
function setBg(n) { $('#bg').style.backgroundImage = `url(${IMG(n)})`; }

/* ---------- 打字機 ---------- */
let typeTimer = null, typeDone = null;
function typeText(el, text, speed = 28) {
  clearInterval(typeTimer); el.textContent = ''; let k = 0;
  return new Promise(res => {
    typeDone = () => { clearInterval(typeTimer); el.textContent = text; typeDone = null; res(); };
    typeTimer = setInterval(() => { el.textContent = text.slice(0, ++k); if (k >= text.length) typeDone && typeDone(); }, speed);
  });
}

/* ---------- 封面 ---------- */
function initTitle() {
  setBg('cover'); show('scr-title'); typeText($('#prologue'), PROLOGUE, 30);
  document.querySelectorAll('.diff').forEach(b => b.onclick = () => {
    document.querySelectorAll('.diff').forEach(x => x.classList.remove('on')); b.classList.add('on'); S.n = +b.dataset.n; $('#title-err').textContent = '';
  });
  $('#btn-start').onclick = () => {
    const nm = $('#inp-name').value.trim();
    if (!nm) { $('#title-err').textContent = '⚠ 請先輸入你的名字，彼得潘與夥伴們才知道要叫誰喔！'; $('#inp-name').focus(); return; }
    if (!S.n) { $('#title-err').textContent = '⚠ 請選擇一種冒險難度！'; return; }
    S.name = nm; initPartner();
  };
  $('#inp-name').onkeydown = e => { if (e.key === 'Enter') $('#btn-start').click(); };
}

/* ---------- 選夥伴 ---------- */
function initPartner() {
  show('scr-partner'); setBg('lost_boys_underground_home');
  const g = $('#partner-grid'); g.innerHTML = '';
  Object.entries(PARTNERS).forEach(([k, p]) => {
    const c = document.createElement('button'); c.className = 'pcard'; c.id = 'partner-' + k;
    c.innerHTML = `<img src="${IMG(p.img)}" alt="${p.name}"><div class="pc-cap"><b>${p.name}</b><small>${p.tag}</small></div>`;
    c.onclick = () => {
      g.querySelectorAll('.pcard').forEach(x => x.classList.remove('on')); c.classList.add('on');
      S.partner = k; $('#pv-name').textContent = p.name; typeText($('#pv-text'), p.hello); $('#btn-partner-go').disabled = false;
    };
    g.appendChild(c);
  });
  $('#btn-partner-go').onclick = startGame;
}

/* ---------- 抽題（指標保證機制：每個學習表現至少 1 題 + 3 組閱讀與拖拉模組） ---------- */
function buildQuiz(n) {
  const all = [...BANK_MC.map(q => ({ ...q })), ...BANK_DRAG.map(q => ({ ...q }))];
  const inds = [...new Set(all.map(q => q.ind))];
  const chosen = new Set();
  // 1) 每個學習表現指標至少 1 題（優先交替抽拖拉題與選擇題，確保題型多元）
  shuffle(inds).forEach((ind, k) => {
    const pool = all.filter(q => q.ind === ind);
    const drags = pool.filter(q => q.type !== 'mc');
    chosen.add(k % 2 === 0 && drags.length ? pick(drags) : pick(pool));
  });
  // 2) 拖拉題約占 30%（涵蓋配對、填空、分類、句子與成語重組）
  const dragTarget = Math.round(n * 0.3);
  for (const q of shuffle(all.filter(q => q.type !== 'mc'))) {
    if ([...chosen].filter(x => x.type !== 'mc').length >= dragTarget) break;
    chosen.add(q);
  }
  // 3) 其餘以選擇題補足（各指標輪流抽，避免單一指標題數過多）
  const mcBy = {};
  shuffle(all.filter(q => q.type === 'mc' && !chosen.has(q))).forEach(q => (mcBy[q.ind] = mcBy[q.ind] || []).push(q));
  let keys = shuffle(Object.keys(mcBy));
  while (chosen.size < n && keys.length) {
    keys = keys.filter(k => mcBy[k].length);
    for (const k of keys) {
      if (chosen.size >= n) break;
      chosen.add(mcBy[k].pop());
    }
  }
  // 4) 依四個關卡分組，同一篇閱讀短文的題目排在一起
  const stageOf = q => {
    const idx = STAGES.findIndex(s => s.inds.includes(q.ind));
    return idx >= 0 ? idx : 0;
  };
  const list = [...chosen].slice(0, n);
  const out = [];
  STAGES.forEach((_, si) => {
    const grp = shuffle(list.filter(q => stageOf(q) === si));
    grp.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    grp.forEach(q => { q.stage = si; out.push(q); });
  });
  return out;
}

function startGame() {
  S.qs = buildQuiz(S.n); S.i = 0; S.right = 0; S.stage = -1; S.lives = DIFF[S.n].lives;
  const p = PARTNERS[S.partner]; $('#fb-name').textContent = p.name; setFace(p.img);
  nextQuestion();
}

/* ---------- 劇情播放 ---------- */
function playStory(lines, bg, banner) {
  return new Promise(res => {
    show('scr-story'); setBg(bg); $('#st-banner').textContent = banner; $('#st-banner').hidden = !banner;
    const L = $('#st-left'), R = $('#st-right'); L.className = 'stand left'; R.className = 'stand right';
    let k = 0;
    const step = async () => {
      if (typeDone) { typeDone(); return; }
      if (k >= lines.length) { $('#scr-story').onclick = null; res(); return; }
      const ln = lines[k++];
      const text = ln.text.replace(/\{name\}/g, S.name);
      $('#st-name').textContent = ln.who;
      if (ln.img) {
        const el = ln.side === 'left' ? L : R, other = ln.side === 'left' ? R : L;
        el.style.backgroundImage = `url(${IMG(CAST[ln.img])})`;
        el.className = `stand ${ln.side} show${ln.angry ? ' angry' : ''}`;
        if (other.classList.contains('show')) other.classList.add('dim');
      }
      typeText($('#st-text'), text);
    };
    $('#scr-story').onclick = step; step();
  });
}

/* ---------- 題目流程 ---------- */
async function nextQuestion() {
  if (S.i >= S.qs.length) return finish();
  const q = S.qs[S.i];
  if (q.stage !== S.stage) {
    S.stage = q.stage; const st = STAGES[S.stage];
    await playStory(st.story, st.bg, st.name);
    setBg(st.bg); $('#hud-stage').textContent = st.short;
  }
  show('scr-quiz'); renderQuestion(q);
}

function updateHud() {
  $('#hud-bar').style.width = (S.i / S.qs.length * 100) + '%';
  $('#hud-count').textContent = `第 ${S.i + 1} / ${S.qs.length} 題`;
  $('#hud-score').textContent = Math.round(S.right / S.qs.length * 100);
  $('#hud-name').textContent = '🧭 ' + S.name;
  $('#hud-diff').textContent = DIFF[S.n].name;
  const life = $('#hud-life');
  if (DIFF[S.n].lives) {
    const L = DIFF[S.n].lives;
    life.innerHTML = Array.from({ length: L }, (_, k) => gummy(k, k >= S.lives)).join('');
  } else life.innerHTML = '';
}

function setFace(img, mood) {
  const f = $('#fb-face');
  f.style.backgroundImage = `url(${IMG(img)})`;
  f.className = 'face' + (mood ? ' ' + mood : '');
}

function renderQuestion(q) {
  S.answered = false; updateHud();
  const gh = $('#ghost'); if (gh) { gh.hidden = true; gh.style.display = 'none'; gh.textContent = ''; }
  $('#q-tag').textContent = `${IND_NAME[q.ind] || q.ind}｜${TYPE_NAME[q.type]}`;
  $('#q-text').textContent = q.q;
  const ps = $('#passage');
  if (q.passage) {
    ps.hidden = false;
    $('#ps-title').textContent = q.title || '閱讀文本';
    $('#ps-text').textContent = q.passage;
  } else ps.hidden = true;
  $('#btn-next').hidden = true;
  $('#btn-check').hidden = q.type === 'mc';
  $('#btn-check').disabled = true;
  const p = PARTNERS[S.partner]; setFace(p.img);
  $('#fb-text').textContent = q.type === 'mc' ? '仔細看清楚題目與選項，找出正確答案吧！' : '把答案卡片拖到框框裡（也可以先點卡片、再點框框）！';
  const area = $('#q-area'); area.innerHTML = '';
  if (q.type === 'mc') renderMC(q, area); else renderDrag(q, area);
}

/* 選擇題 */
function renderMC(q, area) {
  const order = shuffle([0, 1, 2, 3]);
  const box = document.createElement('div'); box.className = 'opts';
  order.forEach((oi, k) => {
    const b = document.createElement('button'); b.className = 'opt'; b.id = 'opt-' + k;
    b.innerHTML = `<span class="k">${'ABCD'[k]}</span><span></span>`;
    b.lastChild.textContent = q.opts[oi];
    b.dataset.oi = oi;
    b.onclick = () => {
      if (S.answered) return;
      const ok = oi === q.ans;
      box.querySelectorAll('.opt').forEach(x => { x.disabled = true; });
      b.classList.add(ok ? 'right' : 'wrong');
      judge(ok, q);
    };
    box.appendChild(b);
  });
  area.appendChild(box);
  S.reveal = () => box.querySelector(`[data-oi="${q.ans}"]`).click();
}

/* 拖拉題 */
let selChip = null;
const charEm = s => Math.max(1.2, [...String(s)].reduce((w, c) => w + (c.charCodeAt(0) > 255 ? 1 : 0.58), 0));
function makeChip(text) {
  const c = document.createElement('div');
  c.className = 'chip'; c.textContent = text; c.dataset.v = text;
  c.style.setProperty('--cw', charEm(text).toFixed(2) + 'em');
  bindChip(c); return c;
}
function renderDrag(q, area) {
  const zones = [];
  const mkDrop = (expect, cap = 1) => {
    const d = document.createElement('div');
    d.className = 'drop'; d.dataset.cap = cap;
    if (cap === 1 && expect && expect.length) {
      const w = Math.max(...expect.map(charEm));
      d.style.setProperty('--w', w.toFixed(2) + 'em');
    }
    zones.push({ el: d, expect, cap }); return d;
  };
  let chips = [];
  if (q.type === 'match') {
    const maxPair = Math.max(...q.pairs.map(([l, r]) => charEm(l) + charEm(r)));
    const g = document.createElement('div');
    g.className = 'match-grid' + (maxPair > 13 ? ' wide-pairs' : '');
    q.pairs.forEach(([l, r]) => {
      const row = document.createElement('div'); row.className = 'mrow';
      row.innerHTML = `<span class="lbl"></span><span class="arr">→</span>`;
      row.firstChild.textContent = l;
      row.appendChild(mkDrop([r]));
      g.appendChild(row);
    });
    area.appendChild(g); chips = q.pairs.map(p => p[1]);
  } else if (q.type === 'fill') {
    const t = document.createElement('div'); t.className = 'fill-text';
    const parts = q.text.split('{}');
    parts.forEach((s, k) => {
      t.appendChild(document.createTextNode(s));
      if (k < parts.length - 1) t.appendChild(mkDrop([q.answers[k]]));
    });
    area.appendChild(t); chips = [...q.answers, ...(q.distract || [])];
  } else if (q.type === 'cat') {
    const row = document.createElement('div'); row.className = 'cat-row';
    q.cats.forEach((c, ci) => {
      const col = document.createElement('div'); col.className = 'cat';
      col.innerHTML = '<h4></h4>'; col.firstChild.textContent = c;
      const exp = q.items.filter(it => it[1] === ci).map(it => it[0]);
      col.appendChild(mkDrop(exp, exp.length));
      row.appendChild(col);
    });
    area.appendChild(row); chips = q.items.map(it => it[0]);
  } else if (q.type === 'order') {
    const row = document.createElement('div'); row.className = 'order-row';
    q.items.forEach((it, k) => {
      const d = mkDrop([it]); d.dataset.i = k + 1;
      row.appendChild(d);
    });
    area.appendChild(row); chips = q.items.slice();
  }
  const pool = document.createElement('div'); pool.className = 'pool'; pool.id = 'pool';
  let sh = shuffle(chips);
  if (q.type === 'order' && sh.join() === chips.join()) sh = sh.reverse();
  sh.forEach(t => pool.appendChild(makeChip(t)));
  area.appendChild(pool);
  S.zones = zones; S.pool = pool;
  const chk = $('#btn-check');
  S.refresh = () => { chk.disabled = !zones.every(z => z.el.querySelectorAll('.chip').length >= z.cap); };
  chk.onclick = () => {
    if (S.answered) return;
    let ok = true;
    zones.forEach(z => {
      const got = [...z.el.querySelectorAll('.chip')].map(c => c.dataset.v).sort().join('|');
      const good = got === z.expect.slice().sort().join('|');
      z.el.classList.add(good ? 'ok' : 'ng');
      if (!good) ok = false;
    });
    chk.hidden = true; judge(ok, q);
  };
  S.reveal = () => {
    zones.forEach(z => {
      z.el.innerHTML = '';
      z.expect.forEach(v => {
        const c = [...pool.children].find(x => x.dataset.v === v);
        z.el.appendChild(c || makeChip(v));
      });
    });
    S.refresh();
  };
}

function placeChip(chip, target) {
  if (S.answered) return;
  if (target && target.classList.contains('drop')) {
    const cap = +target.dataset.cap, inside = target.querySelectorAll('.chip');
    if (inside.length >= cap) S.pool.appendChild(inside[0]);
    target.appendChild(chip);
  } else S.pool.appendChild(chip);
  S.refresh && S.refresh();
}
function bindChip(c) {
  c.addEventListener('pointerdown', e => {
    if (S.answered) return;
    e.preventDefault();
    const sx = e.clientX, sy = e.clientY; let dragging = false; const ghost = $('#ghost');
    const move = ev => {
      if (!dragging && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 6) {
        dragging = true; ghost.textContent = c.textContent; ghost.hidden = false; ghost.style.display = 'inline-flex'; c.style.opacity = .35;
      }
      if (dragging) {
        ghost.style.left = ev.clientX + 'px'; ghost.style.top = ev.clientY + 'px';
        document.querySelectorAll('.drop.hover').forEach(d => d.classList.remove('hover'));
        const t = document.elementFromPoint(ev.clientX, ev.clientY);
        const d = t && t.closest('.drop'); if (d) d.classList.add('hover');
      }
    };
    const up = ev => {
      window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
      document.querySelectorAll('.drop.hover').forEach(d => d.classList.remove('hover'));
      ghost.hidden = true; ghost.style.display = 'none'; ghost.textContent = ''; c.style.opacity = '';
      if (dragging) {
        if (ev.type === 'pointercancel') return;
        const t = document.elementFromPoint(ev.clientX, ev.clientY);
        const d = t && t.closest('.drop');
        if (d) placeChip(c, d); else if (t && t.closest('.pool')) placeChip(c, null);
        if (selChip) { selChip.classList.remove('sel'); selChip = null; }
      } else {
        if (c.parentElement.classList.contains('drop')) { placeChip(c, null); return; }
        if (selChip === c) { c.classList.remove('sel'); selChip = null; return; }
        if (selChip) selChip.classList.remove('sel'); selChip = c; c.classList.add('sel');
      }
    };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
  });
}
document.addEventListener('click', e => {
  const d = e.target.closest('.drop');
  if (d && selChip && !e.target.closest('.chip')) {
    selChip.classList.remove('sel'); placeChip(selChip, d); selChip = null;
  }
});

/* ---------- 判定 ---------- */
function judge(ok, q) {
  S.answered = true;
  const p = PARTNERS[S.partner];
  if (ok) { S.right++; burst(); setFace(p.img, 'happy'); }
  else { if (DIFF[S.n].lives) S.lives--; setFace(p.angry || p.img, p.angry ? 'angry' : ''); }
  const line = pick(ok ? p.right : p.wrong).replace(/\{name\}/g, S.name);
  const fb = $('#fb-text'); fb.textContent = (ok ? '⭕ ' : '❌ ') + line;
  updateHud();
  const nb = $('#btn-next'); nb.hidden = false;
  const dead = DIFF[S.n].lives && S.lives <= 0;
  nb.textContent = dead ? '……' : (S.i === S.qs.length - 1 ? '完成冒險 ▶' : '下一題 ▶');
  nb.onclick = () => { if (dead) return gameOver(); S.i++; nextQuestion(); };
}

function gameOver() {
  show('scr-over'); const p = PARTNERS[S.partner];
  $('#over-face').style.backgroundImage = `url(${IMG(p.angry || p.img)})`;
  $('#over-text').textContent = `${p.name}：「${S.name}，航海羅盤都被黑巫術震碎了……但夕陽還沒完全落下，重整旗鼓，我們一定能奪回彼得的影子！」（答對 ${S.right} 題）`;
  $('#btn-retry').onclick = () => startGame();
}

async function finish() {
  $('#hud-bar').style.width = '100%';
  await playStory(ENDING, 'neverland', '尋影成功！');
  showCert();
}
function showCert() {
  show('scr-cert'); setBg('neverland');
  const total = S.qs.length || S.n, rate = S.right / total;
  $('#c-name').textContent = S.name || '冒險者';
  $('#c-partner').textContent = PARTNERS[S.partner || 'peter'].name;
  $('#c-diff').textContent = DIFF[S.n || 25].name;
  $('#c-right').textContent = S.right; $('#c-total').textContent = total;
  $('#c-score').textContent = Math.round(rate * 100);
  $('#c-rank').textContent = rate >= .9 ? '★★★ 永無島黃金羅盤勳章 ★★★' : rate >= .7 ? '★★ 破曉斬影榮譽勳章 ★★' : '★ 暮光勇氣航行勳章 ★';
  const d = new Date(); $('#c-date').textContent = `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`;
  burst(80);
  $('#btn-print').onclick = () => window.print();
  $('#btn-again').onclick = () => startGame();
}

/* ---------- 仙塵粒子 ---------- */
const cv = $('#dust'), cx = cv.getContext('2d'); let parts = [];
function resize() { cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio; }
addEventListener('resize', resize); resize();
for (let k = 0; k < 60; k++) parts.push({ x: Math.random(), y: Math.random(), r: Math.random() * 2 + .5, vy: Math.random() * .0006 + .0002, t: Math.random() * 6, life: Infinity });
function burst(n = 40) { for (let k = 0; k < n; k++) parts.push({ x: .5 + (Math.random() - .5) * .4, y: .45, r: Math.random() * 3 + 1, vx: (Math.random() - .5) * .012, vy: -Math.random() * .012, t: 0, life: 90, g: true }); }
(function loop() {
  cx.clearRect(0, 0, cv.width, cv.height);
  parts = parts.filter(p => p.life > 0);
  for (const p of parts) {
    if (p.g) { p.x += p.vx; p.y += p.vy; p.vy += .0003; p.life--; } else { p.y -= p.vy; p.t += .03; if (p.y < -.02) p.y = 1.02; }
    const a = p.g ? p.life / 90 : (Math.sin(p.t) + 1) / 2 * .8 + .2;
    const X = (p.x + (p.g ? 0 : Math.sin(p.t) * .003)) * cv.width, Y = p.y * cv.height, R = p.r * devicePixelRatio;
    const gr = cx.createRadialGradient(X, Y, 0, X, Y, R * 3); gr.addColorStop(0, `rgba(255,235,160,${a})`); gr.addColorStop(1, 'rgba(255,160,70,0)');
    cx.fillStyle = gr; cx.beginPath(); cx.arc(X, Y, R * 3, 0, 7); cx.fill();
  }
  requestAnimationFrame(loop);
})();

/* ---------- 開發者快捷鍵 F2 / F3 / F4（僅本地開發） ---------- */
const isLocal = ['localhost', '127.0.0.1', ''].includes(location.hostname) || location.protocol === 'file:';
function devMsg(t) { const d = $('#dev'); d.textContent = '[DEV] ' + t; d.hidden = false; clearTimeout(devMsg.t); devMsg.t = setTimeout(() => d.hidden = true, 1800); }
addEventListener('keydown', e => {
  if (!isLocal || !['F2', 'F3', 'F4'].includes(e.key)) return;
  e.preventDefault();
  const quizOn = $('#scr-quiz').classList.contains('active');
  if (e.key === 'F2') { if (quizOn && !S.answered && S.reveal) { S.reveal(); devMsg('F2 顯示答案'); } }
  if (e.key === 'F3') {
    if (!S.qs.length) return devMsg('請先開始遊戲');
    const nx = S.qs.findIndex((q, k) => k > S.i && q.stage > S.stage);
    S.i = nx < 0 ? S.qs.length : nx; devMsg('F3 跳到下一關'); nextQuestion();
  }
  if (e.key === 'F4') { if (!S.name) S.name = $('#inp-name').value.trim() || '測試員'; if (!S.n) S.n = 25; if (!S.partner) S.partner = 'peter'; devMsg('F4 直達證書'); showCert(); }
});

/* 預載圖片 */
['cover', 'neverland', 'native_american_camp', 'misty_forest', 'coastal_scene_in_neverland', 'captain_hook_s_cabin', 'lost_boys_underground_home', ...Object.values(CAST)].forEach(n => { const i = new Image(); i.src = IMG(n); });

if (isLocal) window.__dbg = { S, show, setBg, renderQuestion, gameOver, showCert, playStory, STAGES, DIFF, PARTNERS, judge };
initTitle();
})();
