const SESSION_KEY = 'kodr_admin_auth_ok';
const DRAFT_KEY = 'kodr_admin_draft';
const PREVIEW_KEY = 'kodr_site_preview';
const GH_CONFIG_KEY = 'kodr_gh_publisher';

const GRADIENT_PRESETS = [
  { name: 'Monolith Dark', start: '#16181D', end: '#313644' },
  { name: 'Kinetic Terracotta', start: '#1C1310', end: '#7C2D12' },
  { name: 'Blade & Oak', start: '#181512', end: '#4A3928' },
  { name: 'Cappuccino', start: '#4E3629', end: '#8C674E' },
  { name: 'Lash Velvet', start: '#27232C', end: '#584B63' },
  { name: 'Brand Slate', start: '#1E242B', end: '#3C4A57' },
  { name: 'Emerald Studio', start: '#11241E', end: '#245848' },
  { name: 'Royal Indigo', start: '#17192E', end: '#353C70' }
];

let siteData = null;

// SHA-256 хешування пароля (з резервним алгоритмом для локального запуску file://)
async function sha256Hex(message) {
  if (window.crypto && window.crypto.subtle) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  // Fallback SHA-256 для середовищ без crypto.subtle
  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }
  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  let result = '';
  const words = [];
  const asciiBitLength = message.length * 8;
  const hash = [];
  const k = [];
  let primeCounter = 0;
  const isComposite = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (let i = 0; i < 313; i += candidate) isComposite[i] = candidate;
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }
  message += '\x80';
  while ((message.length % 64) - 56) message += '\x00';
  for (let i = 0; i < message.length; i++) {
    const j = message.charCodeAt(i);
    words[i >> 2] |= j << (((3 - i) % 4) * 8);
  }
  words[words.length] = (asciiBitLength / maxWord) | 0;
  words[words.length] = asciiBitLength;
  for (let j = 0; j < words.length; ) {
    const w = words.slice(j, (j += 16));
    const oldHash = hash.slice(0);
    for (let i = 0; i < 64; i++) {
      const w15 = w[i - 15];
      const w2 = w[i - 2];
      const a = hash[0];
      const e = hash[4];
      const temp1 =
        hash[7] +
        (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) +
        ((e & hash[5]) ^ (~e & hash[6])) +
        k[i] +
        (w[i] =
          i < 16
            ? w[i]
            : (w[i - 16] +
                (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) +
                w[i - 7] +
                (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) |
              0);
      const temp2 =
        (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) +
        ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
      hash.unshift((temp1 + temp2) | 0);
      hash[4] = (hash[4] + temp1) | 0;
      hash.pop();
    }
    for (let i = 0; i < 8; i++) hash[i] = (hash[i] + oldHash[i]) | 0;
  }
  for (let i = 0; i < 8; i++) {
    for (let j = 3; j + 1; j--) {
      const b = (hash[i] >> (j * 8)) & 255;
      result += (b < 16 ? 0 : '') + b.toString(16);
    }
  }
  return result;
}

function escapeAttr(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function showAdminToast(text) {
  const toast = document.getElementById('admin-toast');
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3600);
}

function markDirty() {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(siteData));
  const ind = document.getElementById('unsaved-indicator');
  if (ind) {
    ind.textContent = 'Є неопубліковані зміни (чернетку збережено)';
    ind.className = 'status-badge dirty';
  }
}

function markSaved() {
  localStorage.removeItem(DRAFT_KEY);
  const ind = document.getElementById('unsaved-indicator');
  if (ind) {
    ind.textContent = 'Опубліковано на сайті';
    ind.className = 'status-badge saved';
  }
}

// Завантаження даних сайту
async function fetchSiteData() {
  let serverData = null;
  try {
    const res = await fetch(`site-data.json?v=${Date.now()}`, { cache: 'no-store' });
    if (res.ok) {
      serverData = await res.json();
    }
  } catch (e) {}

  const draftRaw = localStorage.getItem(DRAFT_KEY);
  if (draftRaw) {
    try {
      const parsedDraft = JSON.parse(draftRaw);
      if (serverData && serverData.auth) {
        parsedDraft.auth = serverData.auth;
      }
      siteData = parsedDraft;
      setTimeout(markDirty, 50);
      return;
    } catch (e) {}
  }

  siteData = serverData || {
    auth: {
      login: 'admin',
      passwordHash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92'
    },
    seo: { title: 'Kodr.studio', description: '' },
    appearance: {
      defaultTheme: 'dark',
      allowVisitorThemeSwitch: true,
      customColorsEnabled: false,
      customColors: {
        bgMain: '#0D0D10',
        bgAlt: '#131318',
        bgCard: '#18181F',
        textMain: '#F5F3EF',
        textMuted: '#9E9BA4',
        accent: '#DFC7A7',
        accentText: '#121110'
      }
    },
    header: { logoMain: 'Kodr', logoAccent: '.studio', ctaText: 'Обговорити проєкт', ctaLink: '#order', nav: [] },
    hero: { metrics: [] },
    services: { items: [], bundle: { visible: true } },
    portfolio: { filters: [], projects: [] },
    calculator: { items: [] },
    process: { steps: [] },
    faq: { items: [] },
    contacts: { cards: [], niches: [] },
    footer: { links: [] }
  };
}

// Утиліти доступу за шляхом "a.b.c"
function getByPath(obj, path) {
  return path.split('.').reduce((acc, part) => (acc ? acc[part] : undefined), obj);
}

function setByPath(obj, path, value) {
  const parts = path.split('.');
  const last = parts.pop();
  const target = parts.reduce((acc, part) => {
    if (!acc[part]) acc[part] = {};
    return acc[part];
  }, obj);
  target[last] = value;
}

// Авторизація
function initAuth() {
  const loginScreen = document.getElementById('login-screen');
  const adminApp = document.getElementById('admin-app');
  const loginForm = document.getElementById('login-form');
  const errorEl = document.getElementById('login-error');

  document.getElementById('toggle-pass-btn').addEventListener('click', () => {
    const inp = document.getElementById('login-password');
    inp.type = inp.type === 'password' ? 'text' : 'password';
  });

  if (sessionStorage.getItem(SESSION_KEY) === '1') {
    loginScreen.classList.add('hidden');
    adminApp.classList.remove('hidden');
    initAdminWorkspace();
    return;
  }

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const loginVal = document.getElementById('login-username').value.trim();
    const passVal = document.getElementById('login-password').value;
    const passHash = await sha256Hex(passVal);

    const expectedLogin = siteData.auth?.login || 'admin';
    const expectedHash =
      siteData.auth?.passwordHash || '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92';

    if (loginVal === expectedLogin && passHash === expectedHash) {
      sessionStorage.setItem(SESSION_KEY, '1');
      errorEl.classList.add('hidden');
      loginScreen.classList.add('hidden');
      adminApp.classList.remove('hidden');
      initAdminWorkspace();
    } else {
      errorEl.classList.remove('hidden');
    }
  });
}

// Перемикання вкладок
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      tabBtns.forEach((b) => b.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(targetId).classList.add('active');
    });
  });
}

// Прив'язка простих полів data-bind
function bindSimpleFields() {
  document.querySelectorAll('[data-bind]').forEach((el) => {
    const path = el.getAttribute('data-bind');
    const val = getByPath(siteData, path);

    if (el.type === 'checkbox') {
      el.checked = Boolean(val);
    } else {
      el.value = val ?? '';
    }

    el.addEventListener('input', () => {
      let newVal;
      if (el.type === 'checkbox') newVal = el.checked;
      else if (el.type === 'number') newVal = Number(el.value);
      else newVal = el.value;

      setByPath(siteData, path, newVal);
      markDirty();
    });
  });
}

// Рендер фільтрів портфоліо
function renderPortfolioFilters() {
  const container = document.getElementById('portfolio-filters-list');
  const filters = siteData.portfolio.filters || [];

  container.innerHTML = filters
    .map(
      (f, i) => `
      <div class="repeater-item">
        <div class="grid-2">
          <div class="field" style="margin:0;">
            <label>Системний код категорії (напр. web, brand, beauty)</label>
            <input type="text" value="${escapeAttr(f.id)}" data-f-idx="${i}" data-f-key="id" ${
              f.id === 'all' ? 'readonly' : ''
            }>
          </div>
          <div class="field" style="margin:0;">
            <label>Назва кнопки на сайті</label>
            <div style="display:flex; gap:8px;">
              <input type="text" value="${escapeAttr(f.label)}" data-f-idx="${i}" data-f-key="label">
              ${
                f.id !== 'all'
                  ? `<button type="button" class="btn btn-danger-outline btn-xs" data-del-filter="${i}">✕</button>`
                  : ''
              }
            </div>
          </div>
        </div>
      </div>`
    )
    .join('');

  container.querySelectorAll('input').forEach((inp) => {
    inp.addEventListener('input', () => {
      const idx = Number(inp.getAttribute('data-f-idx'));
      const key = inp.getAttribute('data-f-key');
      siteData.portfolio.filters[idx][key] = inp.value;
      markDirty();
      renderPortfolioProjects();
    });
  });

  container.querySelectorAll('[data-del-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-del-filter'));
      siteData.portfolio.filters.splice(idx, 1);
      markDirty();
      renderPortfolioFilters();
      renderPortfolioProjects();
    });
  });
}

// Рендер карток проєктів у портфоліо
function renderPortfolioProjects() {
  const container = document.getElementById('portfolio-projects-list');
  const projects = siteData.portfolio.projects || [];
  const categories = (siteData.portfolio.filters || []).filter((f) => f.id !== 'all');

  container.innerHTML = projects
    .map((p, i) => {
      const previewBg = p.imageUrl
        ? `background-image: linear-gradient(rgba(13,13,16,0.6), rgba(13,13,16,0.85)), url('${escapeAttr(
            p.imageUrl
          )}'); background-size: cover;`
        : `background: linear-gradient(135deg, ${escapeAttr(p.gradientStart || '#16181D')}, ${escapeAttr(
            p.gradientEnd || '#313644'
          )});`;

      const catOptions = categories
        .map(
          (c) =>
            `<option value="${escapeAttr(c.id)}" ${p.category === c.id ? 'selected' : ''}>${escapeAttr(
              c.label
            )}</option>`
        )
        .join('');

      const presetsHtml = GRADIENT_PRESETS.map(
        (pr) =>
          `<button type="button" class="preset-dot" title="${pr.name}" style="background:linear-gradient(135deg,${pr.start},${pr.end})" data-preset-idx="${i}" data-p-start="${pr.start}" data-p-end="${pr.end}"></button>`
      ).join('');

      return `
      <div class="project-admin-card">
        <div class="project-admin-head">
          <div>
            <strong>#${i + 1} • ${escapeAttr(p.title || 'Новий проєкт')}</strong>
          </div>
          <div class="repeater-controls">
            <label class="checkbox-label" style="margin-right:10px;">
              <input type="checkbox" data-p-idx="${i}" data-p-bool="visible" ${p.visible !== false ? 'checked' : ''}>
              <span>Показувати</span>
            </label>
            <button type="button" class="btn btn-outline btn-xs" data-move-proj="${i}" data-dir="-1" ${
              i === 0 ? 'disabled' : ''
            }>↑</button>
            <button type="button" class="btn btn-outline btn-xs" data-move-proj="${i}" data-dir="1" ${
              i === projects.length - 1 ? 'disabled' : ''
            }>↓</button>
            <button type="button" class="btn btn-danger-outline btn-xs" data-del-proj="${i}">Видалити</button>
          </div>
        </div>

        <div class="project-preview-strip" style="${previewBg}">
          <div>
            <small style="opacity:0.8;">${escapeAttr(p.mockupTag)}</small>
            <div style="font-family:'Unbounded',sans-serif; font-size:17px;">${escapeAttr(p.mockupTitle)}</div>
          </div>
          <span style="font-size:12px; opacity:0.85;">${escapeAttr(p.mockupSubtitle)}</span>
        </div>

        <div class="grid-3">
          <div class="field">
            <label>Категорія фільтру</label>
            <select data-p-idx="${i}" data-p-key="category">${catOptions}</select>
          </div>
          <div class="field">
            <label>Мітка ліворуч (тип проєкту)</label>
            <input type="text" value="${escapeAttr(p.metaLeft)}" data-p-idx="${i}" data-p-key="metaLeft">
          </div>
          <div class="field">
            <label>Мітка праворуч (термін)</label>
            <input type="text" value="${escapeAttr(p.metaRight)}" data-p-idx="${i}" data-p-key="metaRight">
          </div>
        </div>

        <div class="grid-3">
          <div class="field">
            <label>Тег на прев’ю-банері</label>
            <input type="text" value="${escapeAttr(p.mockupTag)}" data-p-idx="${i}" data-p-key="mockupTag">
          </div>
          <div class="field">
            <label>Великий заголовок на прев’ю</label>
            <input type="text" value="${escapeAttr(p.mockupTitle)}" data-p-idx="${i}" data-p-key="mockupTitle">
          </div>
          <div class="field">
            <label>Підзаголовок на прев’ю</label>
            <input type="text" value="${escapeAttr(p.mockupSubtitle)}" data-p-idx="${i}" data-p-key="mockupSubtitle">
          </div>
        </div>

        <div class="grid-2">
          <div class="field">
            <label>Назва картки проєкту</label>
            <input type="text" value="${escapeAttr(p.title)}" data-p-idx="${i}" data-p-key="title">
          </div>
          <div class="field">
            <label>Посилання на зображення/скриншот (необов’язково — замінить градієнт)</label>
            <input type="text" value="${escapeAttr(p.imageUrl)}" placeholder="https://..." data-p-idx="${i}" data-p-key="imageUrl">
          </div>
        </div>

        <div class="field">
          <label>Опис виконаної роботи</label>
          <textarea rows="2" data-p-idx="${i}" data-p-key="description">${escapeAttr(p.description)}</textarea>
        </div>

        <div class="grid-3">
          <div class="field">
            <label>Текст кнопки</label>
            <input type="text" value="${escapeAttr(p.btnText)}" data-p-idx="${i}" data-p-key="btnText">
          </div>
          <div class="field">
            <label>URL посилання кнопки</label>
            <input type="text" value="${escapeAttr(p.btnUrl)}" data-p-idx="${i}" data-p-key="btnUrl">
          </div>
          <div class="field">
            <label class="checkbox-label" style="margin-top:26px;">
              <input type="checkbox" data-p-idx="${i}" data-p-bool="newTab" ${p.newTab ? 'checked' : ''}>
              <span>Відкривати у новій вкладці</span>
            </label>
          </div>
        </div>

        <div class="grid-2">
          <div class="field" style="margin:0;">
            <label>Кольори градієнта прев’ю</label>
            <div style="display:flex; gap:10px; align-items:center;">
              <input type="color" value="${escapeAttr(p.gradientStart || '#16181D')}" data-p-idx="${i}" data-p-key="gradientStart" style="width:60px; height:36px; padding:2px;">
              <input type="color" value="${escapeAttr(p.gradientEnd || '#313644')}" data-p-idx="${i}" data-p-key="gradientEnd" style="width:60px; height:36px; padding:2px;">
              <div class="gradient-presets">${presetsHtml}</div>
            </div>
          </div>
        </div>
      </div>`;
    })
    .join('');

  container.querySelectorAll('[data-p-key]').forEach((el) => {
    el.addEventListener('input', () => {
      const idx = Number(el.getAttribute('data-p-idx'));
      const key = el.getAttribute('data-p-key');
      siteData.portfolio.projects[idx][key] = el.value;
      markDirty();
      if (key === 'gradientStart' || key === 'gradientEnd' || key === 'imageUrl') {
        renderPortfolioProjects();
      }
    });
  });

  container.querySelectorAll('[data-p-bool]').forEach((el) => {
    el.addEventListener('change', () => {
      const idx = Number(el.getAttribute('data-p-idx'));
      const key = el.getAttribute('data-p-bool');
      siteData.portfolio.projects[idx][key] = el.checked;
      markDirty();
    });
  });

  container.querySelectorAll('[data-preset-idx]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-preset-idx'));
      siteData.portfolio.projects[idx].gradientStart = btn.getAttribute('data-p-start');
      siteData.portfolio.projects[idx].gradientEnd = btn.getAttribute('data-p-end');
      siteData.portfolio.projects[idx].imageUrl = '';
      markDirty();
      renderPortfolioProjects();
    });
  });

  container.querySelectorAll('[data-move-proj]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-move-proj'));
      const dir = Number(btn.getAttribute('data-dir'));
      const arr = siteData.portfolio.projects;
      const target = idx + dir;
      if (target < 0 || target >= arr.length) return;
      [arr[idx], arr[target]] = [arr[target], arr[idx]];
      markDirty();
      renderPortfolioProjects();
    });
  });

  container.querySelectorAll('[data-del-proj]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-del-proj'));
      if (confirm('Видалити цей проєкт з портфоліо?')) {
        siteData.portfolio.projects.splice(idx, 1);
        markDirty();
        renderPortfolioProjects();
      }
    });
  });
}

// Універсальний рендер списків
function renderMetrics() {
  const container = document.getElementById('hero-metrics-list');
  const items = siteData.hero.metrics || [];
  container.innerHTML = items
    .map(
      (m, i) => `
      <div class="repeater-item">
        <div class="repeater-top">
          <span class="repeater-title">Перевага #${i + 1}</span>
          <button type="button" class="btn btn-danger-outline btn-xs" data-del-metric="${i}">Видалити</button>
        </div>
        <div class="grid-2">
          <div class="field" style="margin:0;"><label>Акцентне значення</label><input type="text" value="${escapeAttr(m.value)}" data-m-idx="${i}" data-m-key="value"></div>
          <div class="field" style="margin:0;"><label>Пояснення</label><input type="text" value="${escapeAttr(m.label)}" data-m-idx="${i}" data-m-key="label"></div>
        </div>
      </div>`
    )
    .join('');

  container.querySelectorAll('input').forEach((inp) => {
    inp.addEventListener('input', () => {
      siteData.hero.metrics[Number(inp.dataset.mIdx)][inp.dataset.mKey] = inp.value;
      markDirty();
    });
  });
  container.querySelectorAll('[data-del-metric]').forEach((btn) => {
    btn.addEventListener('click', () => {
      siteData.hero.metrics.splice(Number(btn.dataset.delMetric), 1);
      markDirty();
      renderMetrics();
    });
  });
}

function renderServices() {
  const container = document.getElementById('services-items-list');
  const items = siteData.services.items || [];
  container.innerHTML = items
    .map(
      (s, i) => `
      <div class="repeater-item">
        <div class="repeater-top">
          <span class="repeater-title">Картка послуги #${i + 1}</span>
          <button type="button" class="btn btn-danger-outline btn-xs" data-del-srv="${i}">Видалити</button>
        </div>
        <div class="grid-2">
          <div class="field"><label>Номер (напр. 01)</label><input type="text" value="${escapeAttr(s.num)}" data-s-idx="${i}" data-s-key="num"></div>
          <div class="field"><label>Назва послуги</label><input type="text" value="${escapeAttr(s.title)}" data-s-idx="${i}" data-s-key="title"></div>
        </div>
        <div class="field"><label>Опис послуги</label><textarea rows="2" data-s-idx="${i}" data-s-key="description">${escapeAttr(s.description)}</textarea></div>
        <div class="field" style="margin:0;"><label>Теги переваг (через кому)</label><input type="text" value="${escapeAttr((s.tags || []).join(', '))}" data-s-idx="${i}" data-s-tags="1"></div>
      </div>`
    )
    .join('');

  container.querySelectorAll('[data-s-key]').forEach((el) => {
    el.addEventListener('input', () => {
      siteData.services.items[Number(el.dataset.sIdx)][el.dataset.sKey] = el.value;
      markDirty();
    });
  });
  container.querySelectorAll('[data-s-tags]').forEach((el) => {
    el.addEventListener('input', () => {
      siteData.services.items[Number(el.dataset.sIdx)].tags = el.value
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
      markDirty();
    });
  });
  container.querySelectorAll('[data-del-srv]').forEach((btn) => {
    btn.addEventListener('click', () => {
      siteData.services.items.splice(Number(btn.dataset.delSrv), 1);
      markDirty();
      renderServices();
    });
  });
}

function renderCalculatorItems() {
  const container = document.getElementById('calc-items-list');
  const items = siteData.calculator.items || [];
  container.innerHTML = items
    .map(
      (c, i) => `
      <div class="repeater-item">
        <div class="repeater-top">
          <span class="repeater-title">Позиція калькулятора #${i + 1}</span>
          <div class="repeater-controls">
            <label class="checkbox-label" style="margin-right:8px;">
              <input type="checkbox" data-c-idx="${i}" data-c-bool="checked" ${c.checked ? 'checked' : ''}>
              <span>Обрана за замовчуванням</span>
            </label>
            <button type="button" class="btn btn-danger-outline btn-xs" data-del-calc="${i}">Видалити</button>
          </div>
        </div>
        <div class="grid-2">
          <div class="field"><label>Повна назва в картці</label><input type="text" value="${escapeAttr(c.title)}" data-c-idx="${i}" data-c-key="title"></div>
          <div class="field"><label>Коротка назва для підсумку</label><input type="text" value="${escapeAttr(c.shortName)}" data-c-idx="${i}" data-c-key="shortName"></div>
        </div>
        <div class="field"><label>Опис під назвою</label><input type="text" value="${escapeAttr(c.subtitle)}" data-c-idx="${i}" data-c-key="subtitle"></div>
        <div class="grid-3">
          <div class="field" style="margin:0;"><label>Ціна (число)</label><input type="number" value="${Number(c.price || 0)}" data-c-idx="${i}" data-c-num="price"></div>
          <div class="field" style="margin:0;"><label>Префікс ціни (напр. +)</label><input type="text" value="${escapeAttr(c.pricePrefix || '')}" data-c-idx="${i}" data-c-key="pricePrefix"></div>
          <div class="field" style="margin:0;"><label>Додає днів до терміну</label><input type="number" min="0" value="${Number(c.days || 0)}" data-c-idx="${i}" data-c-num="days"></div>
        </div>
      </div>`
    )
    .join('');

  container.querySelectorAll('[data-c-key]').forEach((el) => {
    el.addEventListener('input', () => {
      siteData.calculator.items[Number(el.dataset.cIdx)][el.dataset.cKey] = el.value;
      markDirty();
    });
  });
  container.querySelectorAll('[data-c-num]').forEach((el) => {
    el.addEventListener('input', () => {
      siteData.calculator.items[Number(el.dataset.cIdx)][el.dataset.cNum] = Number(el.value);
      markDirty();
    });
  });
  container.querySelectorAll('[data-c-bool]').forEach((el) => {
    el.addEventListener('change', () => {
      siteData.calculator.items[Number(el.dataset.cIdx)][el.dataset.cBool] = el.checked;
      markDirty();
    });
  });
  container.querySelectorAll('[data-del-calc]').forEach((btn) => {
    btn.addEventListener('click', () => {
      siteData.calculator.items.splice(Number(btn.dataset.delCalc), 1);
      markDirty();
      renderCalculatorItems();
    });
  });
}

function renderContactsAndFooter() {
  const cardsEl = document.getElementById('contacts-cards-list');
  const cards = siteData.contacts.cards || [];
  cardsEl.innerHTML = cards
    .map(
      (c, i) => `
      <div class="repeater-item">
        <div class="repeater-top">
          <span class="repeater-title">Контакт #${i + 1}: ${escapeAttr(c.title)}</span>
          <div class="repeater-controls">
            <label class="checkbox-label" style="margin-right:8px;">
              <input type="checkbox" data-cc-idx="${i}" data-cc-bool="highlight" ${c.highlight ? 'checked' : ''}>
              <span>Акцентна рамка</span>
            </label>
            <label class="checkbox-label" style="margin-right:8px;">
              <input type="checkbox" data-cc-idx="${i}" data-cc-bool="newTab" ${c.newTab ? 'checked' : ''}>
              <span>Нова вкладка</span>
            </label>
            <button type="button" class="btn btn-danger-outline btn-xs" data-del-cc="${i}">Видалити</button>
          </div>
        </div>
        <div class="grid-2">
          <div class="field"><label>Іконка (емодзі або символ)</label><input type="text" value="${escapeAttr(c.icon)}" data-cc-idx="${i}" data-cc-key="icon"></div>
          <div class="field"><label>Заголовок картки</label><input type="text" value="${escapeAttr(c.title)}" data-cc-idx="${i}" data-cc-key="title"></div>
          <div class="field" style="margin:0;"><label>Текст (номер телефону / нік)</label><input type="text" value="${escapeAttr(c.subtitle)}" data-cc-idx="${i}" data-cc-key="subtitle"></div>
          <div class="field" style="margin:0;"><label>Посилання (tel:+380..., https://t.me/..., https://instagram.com/...)</label><input type="text" value="${escapeAttr(c.url)}" data-cc-idx="${i}" data-cc-key="url"></div>
        </div>
      </div>`
    )
    .join('');

  cardsEl.querySelectorAll('[data-cc-key]').forEach((el) => {
    el.addEventListener('input', () => {
      siteData.contacts.cards[Number(el.dataset.ccIdx)][el.dataset.ccKey] = el.value;
      markDirty();
    });
  });
  cardsEl.querySelectorAll('[data-cc-bool]').forEach((el) => {
    el.addEventListener('change', () => {
      siteData.contacts.cards[Number(el.dataset.ccIdx)][el.dataset.ccBool] = el.checked;
      markDirty();
    });
  });
  cardsEl.querySelectorAll('[data-del-cc]').forEach((btn) => {
    btn.addEventListener('click', () => {
      siteData.contacts.cards.splice(Number(btn.dataset.delCc), 1);
      markDirty();
      renderContactsAndFooter();
    });
  });

  // Сфери діяльності
  const nichesEl = document.getElementById('niches-list');
  const niches = siteData.contacts.niches || [];
  nichesEl.innerHTML = niches
    .map(
      (n, i) => `
      <div style="display:flex; gap:8px;">
        <input type="text" value="${escapeAttr(n)}" data-niche-idx="${i}">
        <button type="button" class="btn btn-danger-outline btn-xs" data-del-niche="${i}">✕</button>
      </div>`
    )
    .join('');

  nichesEl.querySelectorAll('input').forEach((inp) => {
    inp.addEventListener('input', () => {
      siteData.contacts.niches[Number(inp.dataset.nicheIdx)] = inp.value;
      markDirty();
    });
  });
  nichesEl.querySelectorAll('[data-del-niche]').forEach((btn) => {
    btn.addEventListener('click', () => {
      siteData.contacts.niches.splice(Number(btn.dataset.delNiche), 1);
      markDirty();
      renderContactsAndFooter();
    });
  });

  // Посилання футера
  const fLinksEl = document.getElementById('footer-links-list');
  const fLinks = siteData.footer.links || [];
  fLinksEl.innerHTML = fLinks
    .map(
      (lnk, i) => `
      <div class="repeater-item">
        <div class="grid-2">
          <div class="field" style="margin:0;"><label>Текст у футері</label><input type="text" value="${escapeAttr(lnk.label)}" data-fl-idx="${i}" data-fl-key="label"></div>
          <div class="field" style="margin:0;"><label>URL посилання</label>
            <div style="display:flex; gap:8px;">
              <input type="text" value="${escapeAttr(lnk.url)}" data-fl-idx="${i}" data-fl-key="url">
              <button type="button" class="btn btn-danger-outline btn-xs" data-del-fl="${i}">✕</button>
            </div>
          </div>
        </div>
      </div>`
    )
    .join('');

  fLinksEl.querySelectorAll('[data-fl-key]').forEach((inp) => {
    inp.addEventListener('input', () => {
      siteData.footer.links[Number(inp.dataset.flIdx)][inp.dataset.flKey] = inp.value;
      markDirty();
    });
  });
  fLinksEl.querySelectorAll('[data-del-fl]').forEach((btn) => {
    btn.addEventListener('click', () => {
      siteData.footer.links.splice(Number(btn.dataset.delFl), 1);
      markDirty();
      renderContactsAndFooter();
    });
  });
}

function renderNavMenu() {
  const navEl = document.getElementById('header-nav-list');
  const items = siteData.header.nav || [];
  navEl.innerHTML = items
    .map(
      (n, i) => `
      <div class="repeater-item">
        <div class="grid-2">
          <div class="field" style="margin:0;"><label>Назва пункту меню</label><input type="text" value="${escapeAttr(n.label)}" data-nav-idx="${i}" data-nav-key="label"></div>
          <div class="field" style="margin:0;"><label>Якір або посилання</label>
            <div style="display:flex; gap:8px;">
              <input type="text" value="${escapeAttr(n.href)}" data-nav-idx="${i}" data-nav-key="href">
              <button type="button" class="btn btn-danger-outline btn-xs" data-del-nav="${i}">✕</button>
            </div>
          </div>
        </div>
      </div>`
    )
    .join('');

  navEl.querySelectorAll('[data-nav-key]').forEach((inp) => {
    inp.addEventListener('input', () => {
      siteData.header.nav[Number(inp.dataset.navIdx)][inp.dataset.navKey] = inp.value;
      markDirty();
    });
  });
  navEl.querySelectorAll('[data-del-nav]').forEach((btn) => {
    btn.addEventListener('click', () => {
      siteData.header.nav.splice(Number(btn.dataset.delNav), 1);
      markDirty();
      renderNavMenu();
    });
  });
}

function renderStepsAndFaq() {
  const stepsEl = document.getElementById('process-steps-list');
  const steps = siteData.process.steps || [];
  stepsEl.innerHTML = steps
    .map(
      (st, i) => `
      <div class="repeater-item">
        <div class="repeater-top">
          <span class="repeater-title">Етап #${i + 1}</span>
          <button type="button" class="btn btn-danger-outline btn-xs" data-del-step="${i}">Видалити</button>
        </div>
        <div class="grid-2">
          <div class="field"><label>Номер</label><input type="text" value="${escapeAttr(st.num)}" data-st-idx="${i}" data-st-key="num"></div>
          <div class="field"><label>Заголовок етапу</label><input type="text" value="${escapeAttr(st.title)}" data-st-idx="${i}" data-st-key="title"></div>
        </div>
        <div class="field" style="margin:0;"><label>Опис етапу</label><textarea rows="2" data-st-idx="${i}" data-st-key="description">${escapeAttr(st.description)}</textarea></div>
      </div>`
    )
    .join('');

  stepsEl.querySelectorAll('[data-st-key]').forEach((el) => {
    el.addEventListener('input', () => {
      siteData.process.steps[Number(el.dataset.stIdx)][el.dataset.stKey] = el.value;
      markDirty();
    });
  });
  stepsEl.querySelectorAll('[data-del-step]').forEach((btn) => {
    btn.addEventListener('click', () => {
      siteData.process.steps.splice(Number(btn.dataset.delStep), 1);
      markDirty();
      renderStepsAndFaq();
    });
  });

  const faqEl = document.getElementById('faq-items-list');
  const faqs = siteData.faq.items || [];
  faqEl.innerHTML = faqs
    .map(
      (fq, i) => `
      <div class="repeater-item">
        <div class="repeater-top">
          <span class="repeater-title">Питання #${i + 1}</span>
          <div class="repeater-controls">
            <label class="checkbox-label" style="margin-right:8px;">
              <input type="checkbox" data-fq-idx="${i}" data-fq-bool="open" ${fq.open ? 'checked' : ''}>
              <span>Розгорнуто за замовчуванням</span>
            </label>
            <button type="button" class="btn btn-danger-outline btn-xs" data-del-fq="${i}">Видалити</button>
          </div>
        </div>
        <div class="field"><label>Запитання</label><input type="text" value="${escapeAttr(fq.question)}" data-fq-idx="${i}" data-fq-key="question"></div>
        <div class="field" style="margin:0;"><label>Відповідь</label><textarea rows="2" data-fq-idx="${i}" data-fq-key="answer">${escapeAttr(fq.answer)}</textarea></div>
      </div>`
    )
    .join('');

  faqEl.querySelectorAll('[data-fq-key]').forEach((el) => {
    el.addEventListener('input', () => {
      siteData.faq.items[Number(el.dataset.fqIdx)][el.dataset.fqKey] = el.value;
      markDirty();
    });
  });
  faqEl.querySelectorAll('[data-fq-bool]').forEach((el) => {
    el.addEventListener('change', () => {
      siteData.faq.items[Number(el.dataset.fqIdx)].open = el.checked;
      markDirty();
    });
  });
  faqEl.querySelectorAll('[data-del-fq]').forEach((btn) => {
    btn.addEventListener('click', () => {
      siteData.faq.items.splice(Number(btn.dataset.delFq), 1);
      markDirty();
      renderStepsAndFaq();
    });
  });
}

// GitHub API інтеграція
function loadGhSettings() {
  try {
    const raw = localStorage.getItem(GH_CONFIG_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}

function initSettingsTab() {
  const gh = loadGhSettings();
  document.getElementById('gh-owner').value = gh.owner || 'handzyukrostuslav-cell';
  document.getElementById('gh-repo').value = gh.repo || '';
  document.getElementById('gh-branch').value = gh.branch || 'main';
  document.getElementById('gh-path').value = gh.path || 'site-data.json';
  document.getElementById('gh-token').value = gh.token || '';
  document.getElementById('sec-new-login').value = siteData.auth?.login || 'admin';

  document.getElementById('btn-save-gh').addEventListener('click', () => {
    const cfg = {
      owner: document.getElementById('gh-owner').value.trim(),
      repo: document.getElementById('gh-repo').value.trim(),
      branch: document.getElementById('gh-branch').value.trim() || 'main',
      path: document.getElementById('gh-path').value.trim() || 'site-data.json',
      token: document.getElementById('gh-token').value.trim()
    };
    localStorage.setItem(GH_CONFIG_KEY, JSON.stringify(cfg));
    showAdminToast('Налаштування GitHub збережено у браузері!');
  });

  document.getElementById('btn-test-gh').addEventListener('click', async () => {
    const cfg = loadGhSettings();
    if (!cfg.owner || !cfg.repo || !cfg.token) {
      alert('Заповніть логін GitHub, назву репозиторію та Token, потім натисніть «Зберегти налаштування GitHub».');
      return;
    }
    try {
      const res = await fetch(`https://api.github.com/repos/${cfg.owner}/${cfg.repo}`, {
        headers: {
          Authorization: `Bearer ${cfg.token}`,
          Accept: 'application/vnd.github+json'
        }
      });
      if (res.ok) {
        showAdminToast('✅ Підключення до репозиторію успішне!');
      } else {
        const err = await res.json();
        alert(`Помилка доступу (${res.status}): ${err.message || 'Перевірте Token і назву репозиторію'}`);
      }
    } catch (e) {
      alert('Помилка мережі при підключенні до GitHub.');
    }
  });

  document.getElementById('btn-update-auth').addEventListener('click', async () => {
    const newLogin = document.getElementById('sec-new-login').value.trim();
    const p1 = document.getElementById('sec-new-pass').value;
    const p2 = document.getElementById('sec-confirm-pass').value;

    if (!newLogin) {
      alert('Логін не може бути порожнім.');
      return;
    }
    if (p1 && p1 !== p2) {
      alert('Паролі не співпадають!');
      return;
    }
    if (p1 && p1.length < 4) {
      alert('Пароль має містити щонайменше 4 символи.');
      return;
    }

    if (!siteData.auth) siteData.auth = {};
    siteData.auth.login = newLogin;
    if (p1) {
      siteData.auth.passwordHash = await sha256Hex(p1);
    }
    document.getElementById('sec-new-pass').value = '';
    document.getElementById('sec-confirm-pass').value = '';
    markDirty();
    showAdminToast('Логін/пароль оновлено! Натисніть «Зберегти та опублікувати» у верхньому меню.');
  });

  document.getElementById('btn-download-json').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(siteData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'site-data.json';
    a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById('input-import-json').addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result);
        siteData = imported;
        markDirty();
        renderAllAdminSections();
        showAdminToast('Дані з файлу імпортовано! Натисніть «Зберегти та опублікувати».');
      } catch (err) {
        alert('Невірний формат JSON-файлу.');
      }
    };
    reader.readAsText(file);
  });

  document.getElementById('btn-reset-draft').addEventListener('click', () => {
    if (confirm('Скинути локальні незбережені зміни і завантажити версію з сайту?')) {
      localStorage.removeItem(DRAFT_KEY);
      location.reload();
    }
  });
}

// Публікація site-data.json напряму в GitHub
async function publishToGitHub() {
  const cfg = loadGhSettings();
  if (!cfg.owner || !cfg.repo || !cfg.token) {
    document.querySelector('[data-tab="tab-settings"]').click();
    alert(
      'Щоб публікувати зміни на живий сайт одним натисканням, спершу вкажіть назву репозиторію та GitHub Token у вкладці «Публікація і безпека».'
    );
    return;
  }

  const btn = document.getElementById('btn-publish-github');
  const origText = btn.textContent;
  btn.disabled = true;
  btn.textContent = '⏳ Публікація...';

  const apiUrl = `https://api.github.com/repos/${cfg.owner}/${cfg.repo}/contents/${cfg.path || 'site-data.json'}`;
  const headers = {
    Authorization: `Bearer ${cfg.token}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json'
  };

  try {
    let sha = undefined;
    const getRes = await fetch(`${apiUrl}?ref=${encodeURIComponent(cfg.branch || 'main')}`, {
      headers,
      cache: 'no-store'
    });
    if (getRes.ok) {
      const fileInfo = await getRes.json();
      sha = fileInfo.sha;
    }

    const jsonString = JSON.stringify(siteData, null, 2);
    const base64Content = btoa(unescape(encodeURIComponent(jsonString)));

    const putRes = await fetch(apiUrl, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: 'Оновлення контенту сайту через адмін-панель',
        content: base64Content,
        branch: cfg.branch || 'main',
        ...(sha ? { sha } : {})
      })
    });

    if (putRes.ok) {
      markSaved();
      showAdminToast('✅ Зміни опубліковано! Сайт оновиться для всіх за 15–30 секунд.');
    } else {
      const errData = await putRes.json();
      alert(`Не вдалося опублікувати (${putRes.status}): ${errData.message || 'Помилка GitHub API'}`);
    }
  } catch (e) {
    alert('Помилка з’єднання з GitHub API.');
  } finally {
    btn.disabled = false;
    btn.textContent = origText;
  }
}

function renderAllAdminSections() {
  bindSimpleFields();
  renderPortfolioFilters();
  renderPortfolioProjects();
  renderMetrics();
  renderServices();
  renderCalculatorItems();
  renderContactsAndFooter();
  renderNavMenu();
  renderStepsAndFaq();
}

function initAdminWorkspace() {
  initTabs();
  renderAllAdminSections();
  initSettingsTab();

  // Кнопки додавання елементів
  document.getElementById('btn-add-filter').addEventListener('click', () => {
    siteData.portfolio.filters.push({ id: `cat-${Date.now().toString().slice(-4)}`, label: 'Нова категорія' });
    markDirty();
    renderPortfolioFilters();
    renderPortfolioProjects();
  });

  document.getElementById('btn-add-project').addEventListener('click', () => {
    const firstCat = (siteData.portfolio.filters || []).find((f) => f.id !== 'all')?.id || 'web';
    siteData.portfolio.projects.unshift({
      id: `proj-${Date.now()}`,
      visible: true,
      category: firstCat,
      gradientStart: '#181512',
      gradientEnd: '#4A3928',
      imageUrl: '',
      mockupTag: 'Новий кейс',
      mockupTitle: 'Назва проєкту',
      mockupSubtitle: 'Короткий опис на банері',
      metaLeft: 'Сайт + Адмін-кабінет',
      metaRight: 'Термін: 2 дні',
      title: 'Новий реалізований проєкт',
      description: 'Опис виконаної роботи, функціоналу та результату для клієнта.',
      btnText: 'Відкрити живий сайт ↗',
      btnUrl: 'https://',
      newTab: true
    });
    markDirty();
    renderPortfolioProjects();
  });

  document.getElementById('btn-add-metric').addEventListener('click', () => {
    siteData.hero.metrics.push({ value: '100%', label: 'Нова перевага' });
    markDirty();
    renderMetrics();
  });

  document.getElementById('btn-add-service').addEventListener('click', () => {
    const nextNum = String((siteData.services.items?.length || 0) + 1).padStart(2, '0');
    siteData.services.items.push({
      num: nextNum,
      title: 'Нова послуга',
      description: 'Опис нової послуги для клієнтів.',
      tags: ['Швидкий запуск', 'Під ключ']
    });
    markDirty();
    renderServices();
  });

  document.getElementById('btn-add-calc').addEventListener('click', () => {
    siteData.calculator.items.push({
      id: `calc-${Date.now()}`,
      shortName: 'Додаткова опція',
      title: 'Назва додаткової послуги',
      subtitle: 'Короткий опис, що входить у вартість',
      price: 500,
      pricePrefix: '+',
      days: 1,
      checked: false
    });
    markDirty();
    renderCalculatorItems();
  });

  document.getElementById('btn-add-contact').addEventListener('click', () => {
    siteData.contacts.cards.push({
      icon: '📸',
      title: 'Написати в Instagram',
      subtitle: '@ваш_нік',
      url: 'https://instagram.com/',
      highlight: false,
      newTab: true
    });
    markDirty();
    renderContactsAndFooter();
  });

  document.getElementById('btn-add-niche').addEventListener('click', () => {
    siteData.contacts.niches.push('Нова сфера діяльності');
    markDirty();
    renderContactsAndFooter();
  });

  document.getElementById('btn-add-footer-link').addEventListener('click', () => {
    siteData.footer.links.push({ label: 'Instagram', url: 'https://instagram.com/', newTab: true });
    markDirty();
    renderContactsAndFooter();
  });

  document.getElementById('btn-add-nav').addEventListener('click', () => {
    siteData.header.nav.push({ label: 'Новий розділ', href: '#services' });
    markDirty();
    renderNavMenu();
  });

  document.getElementById('btn-add-step').addEventListener('click', () => {
    const nextNum = String((siteData.process.steps?.length || 0) + 1).padStart(2, '0');
    siteData.process.steps.push({ num: nextNum, title: 'Новий етап', description: 'Опис етапу роботи.' });
    markDirty();
    renderStepsAndFaq();
  });

  document.getElementById('btn-add-faq').addEventListener('click', () => {
    siteData.faq.items.push({ open: false, question: 'Нове запитання?', answer: 'Детальна відповідь для клієнтів.' });
    markDirty();
    renderStepsAndFaq();
  });

  // Кнопки верхньої панелі
  document.getElementById('btn-preview').addEventListener('click', () => {
    localStorage.setItem(PREVIEW_KEY, JSON.stringify(siteData));
    window.open('index.html?preview=1', '_blank', 'noopener');
  });

  document.getElementById('btn-publish-github').addEventListener('click', publishToGitHub);

  document.getElementById('btn-logout').addEventListener('click', () => {
    sessionStorage.removeItem(SESSION_KEY);
    location.reload();
  });
}

(async function bootstrapAdmin() {
  await fetchSiteData();
  initAuth();
})();