// Резервна конфігурація (спрацює, якщо сайт відкрито локально без сервера)
const DEFAULT_SITE_DATA = {
  seo: {
    title: 'Kodr.studio — Сайти для онлайн-запису та розробка логотипів',
    description:
      'Створюю сайти для онлайн-запису та розробляю фірмові логотипи. Запускаю сайт під ключ з особистим адмін-кабінетом і сповіщеннями в Telegram за 2–3 дні — без щомісячної плати за хостинг.'
  },
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
  header: {
    logoMain: 'Kodr',
    logoAccent: '.studio',
    ctaText: 'Обговорити проєкт',
    ctaLink: '#order',
    nav: [
      { label: 'Послуги', href: '#services' },
      { label: 'Приклади робіт', href: '#portfolio' },
      { label: 'Калькулятор', href: '#calculator' },
      { label: 'Етапи роботи', href: '#process' },
      { label: 'Питання', href: '#faq' }
    ]
  },
  hero: {
    statusVisible: true,
    statusColor: 'green',
    statusText: 'Відкритий до нових проєктів на цей тиждень',
    styleHint: 'Оберіть бажану кольорову гаму сайту у верхньому меню',
    titleBefore: 'Створюю ',
    titleAccent: 'сайти для онлайн-запису',
    titleAfter: ' та розробляю фірмові логотипи',
    subtitle:
      'Допомагаю майстрам б’юті-сфери та локальним брендам гідно презентувати свої послуги й зручно приймати клієнтів. Запускаю сайт під ключ з особистим адмін-кабінетом і сповіщеннями в Telegram за 2–3 дні — без щомісячної плати за хостинг.',
    primaryBtnText: 'Розрахувати вартість',
    primaryBtnLink: '#calculator',
    secondaryBtnText: 'Переглянути приклади робіт',
    secondaryBtnLink: '#portfolio',
    metrics: [
      { value: '2–3 дні', label: 'Термін запуску готового сайту' },
      { value: '0 грн / міс', label: 'Без щомісячної абонплати за сайт' },
      { value: 'Адмін-кабінет', label: 'Зручне керування записами та графіком' },
      { value: '100%', label: 'Бездоганний вигляд на будь-якому смартфоні' }
    ]
  },
  services: {
    eyebrow: 'Послуги',
    title: 'Чим я можу допомогти вашому бізнесу',
    subtitle: 'Ви можете замовити одну конкретну послугу або поєднати всі три для комплексного запуску',
    items: [
      {
        num: '01',
        title: 'Розробка логотипа та фірмової палітри',
        description:
          'Створюю витончений та впізнаваний логотип, який гармонійно виглядає на аватарці, візитці чи банері. Підбираю 2–3 фірмові кольори та шрифти, щоб ваш бренд мав цілісний і професійний вигляд.',
        tags: ['2 варіанти на вибір', 'Файли без фону (PNG)', 'Підбір кольорів бренду']
      },
      {
        num: '02',
        title: 'Сайт для онлайн-запису під ключ з адмін-акаунтом',
        description:
          'Сучасний сайт для шапки профілю з прайсом, відгуками та вибором вільного часу. У комплекті налаштовую закритий адмін-кабінет, де ви самостійно переглядаєте заявки та керуєте вільними годинами в графіку.',
        tags: ['Особистий адмін-кабінет', 'Онлайн-вибір дати й часу', 'Без абонплати за хостинг']
      },
      {
        num: '03',
        title: 'Підключення миттєвих сповіщень у Telegram',
        description:
          'Налаштовую пряму передачу заявок із сайту у ваш Telegram. Щойно клієнт оформлює запис, ви одразу отримуєте сповіщення з його ім’ям, контактами, обраною послугою та часом візиту.',
        tags: ['Миттєві сповіщення в чат', 'Не потрібно постійно перевіряти сайт', 'Зручний зв’язок із клієнтом']
      }
    ],
    bundle: {
      visible: true,
      eyebrow: 'Комплексна пропозиція',
      title: 'Знижка 15% при замовленні комплексу з 3 послуг',
      description:
        'Якщо вам потрібен логотип, сайт з адмін-кабінетом і підключення сповіщень у Telegram — оберіть їх у калькуляторі нижче, і знижка розрахується автоматично.',
      btnText: 'Розрахувати вартість →',
      btnLink: '#calculator'
    }
  },
  portfolio: {
    eyebrow: 'Портфоліо',
    title: 'Реалізовані проєкти',
    filters: [
      { id: 'all', label: 'Усі приклади' },
      { id: 'web', label: 'Готові сайти' },
      { id: 'brand', label: 'Логотипи та айдентика' }
    ],
    projects: [
      {
        id: 'proj-1',
        visible: true,
        category: 'web',
        gradientStart: '#16181D',
        gradientEnd: '#313644',
        imageUrl: '',
        mockupTag: 'E-Commerce • Мінімалізм',
        mockupTitle: 'MONOLITH',
        mockupSubtitle: 'Інтернет-магазин гаджетів та акустики',
        metaLeft: 'Магазин + Адмін-кабінет',
        metaRight: 'Термін: 3 дні',
        title: 'MONOLITH — інтернет-магазин техніки',
        description:
          'Розробив сучасний інтернет-магазин із вибором кольору товарів, кошиком, промокодами, перевіркою ТТН та адмін-панеллю для керування каталогом.',
        btnText: 'Відкрити живий сайт ↗',
        btnUrl: 'https://handzyukrostuslav-cell.github.io/monolith-store/',
        newTab: true
      },
      {
        id: 'proj-2',
        visible: true,
        category: 'web',
        gradientStart: '#1C1310',
        gradientEnd: '#7C2D12',
        imageUrl: '',
        mockupTag: 'Фітнес-клуб • Розклад',
        mockupTitle: 'KINETIC.CLUB',
        mockupSubtitle: 'Тренажерний зал та групові студії',
        metaLeft: 'Сайт + Адмін-кабінет',
        metaRight: 'Термін: 3 дні',
        title: 'KINETIC.CLUB — сайт фітнес-простору',
        description:
          'Створив сайт спортзалу з живим розкладом групових тренувань, контролем вільних місць, конструктором абонементів та фітнес-калькулятором.',
        btnText: 'Відкрити живий сайт ↗',
        btnUrl: 'https://handzyukrostuslav-cell.github.io/kinetic-club/',
        newTab: true
      },
      {
        id: 'proj-3',
        visible: true,
        category: 'web',
        gradientStart: '#181512',
        gradientEnd: '#4A3928',
        imageUrl: '',
        mockupTag: 'Барбершоп • Онлайн-запис',
        mockupTitle: 'BLADE & OAK',
        mockupSubtitle: 'Чоловічі стрижки • Вибір майстра',
        metaLeft: 'Сайт + Адмін-кабінет',
        metaRight: 'Термін: 2 дні',
        title: 'BLADE & OAK — сайт чоловічого барбершопу',
        description:
          'Розробив стильний сайт барбершопу з прайсом послуг, вибором майстра й вільного часу, калькулятором вартості та кабінетом адміністратора.',
        btnText: 'Відкрити живий сайт ↗',
        btnUrl: 'https://handzyukrostuslav-cell.github.io/blade-and-oak/',
        newTab: true
      },
      {
        id: 'proj-4',
        visible: true,
        category: 'web',
        gradientStart: '#4E3629',
        gradientEnd: '#8C674E',
        imageUrl: '',
        mockupTag: 'Кав’ярня',
        mockupTitle: 'Zerno.bar',
        mockupSubtitle: 'Спешелті-кав’ярня • Меню та бронь',
        metaLeft: 'Меню + Бронювання',
        metaRight: 'Термін: 2 дні',
        title: 'Zerno.bar — сайт спешелті-кав’ярні',
        description:
          'Створив теплий сайт кав’ярні з інтерактивним меню напоїв, кошиком передзамовлення з собою, бронюванням столиків та адмін-кабінетом баристи.',
        btnText: 'Відкрити живий сайт ↗',
        btnUrl: 'https://handzyukrostuslav-cell.github.io/zerno-bar/',
        newTab: true
      },
      {
        id: 'proj-5',
        visible: true,
        category: 'web',
        gradientStart: '#27232C',
        gradientEnd: '#584B63',
        imageUrl: '',
        mockupTag: 'Б’юті-студія',
        mockupTitle: 'STUDIO_M_LASH',
        mockupSubtitle: 'Нарощення вій • Онлайн-запис',
        metaLeft: 'Сайт + Адмін-кабінет',
        metaRight: 'Термін: 2 дні',
        title: 'STUDIO_M_LASH — сайт студії нарощення вій',
        description:
          'Створив зручний сайт для запису клієнтів зі смартфона з можливістю самостійно закривати зайняті години та керувати статусами заявок.',
        btnText: 'Відкрити живий сайт ↗',
        btnUrl: 'https://handzyukrostuslav-cell.github.io/studio-m-lash/',
        newTab: true
      },
      {
        id: 'proj-6',
        visible: true,
        category: 'brand',
        gradientStart: '#1E242B',
        gradientEnd: '#3C4A57',
        imageUrl: '',
        mockupTag: 'Логотип та айдентика',
        mockupTitle: 'Логотип та фірмова палітра',
        mockupSubtitle: 'Фірмові кольори • Шрифти • Файли PNG',
        metaLeft: 'Айдентика бренду',
        metaRight: 'Термін: 1 день',
        title: 'Розробка логотипа та фірмової палітри',
        description:
          'Створюю гармонійний логотип у фірмових кольорах бренду з підбором шрифтів та передачею всіх файлів без фону для оформлення профілю й візиток.',
        btnText: 'Обговорити замовлення →',
        btnUrl: '#order',
        newTab: false
      }
    ]
  },
  calculator: {
    eyebrow: 'Розрахунок вартості',
    title: 'Калькулятор послуг',
    subtitle: 'Оберіть потрібні позиції — система автоматично розрахує підсумкову вартість та орієнтовний термін виконання',
    currency: 'грн',
    discountMinCount: 3,
    discountPercent: 15,
    applyBtnText: 'Перенести в заявку',
    items: [
      {
        id: 'calc-1',
        shortName: 'Розробка логотипа та палітри',
        title: 'Розробка логотипа та фірмової палітри',
        subtitle: '2 варіанти логотипа, файли без фону та підбір кольорів',
        price: 600,
        pricePrefix: '',
        days: 1,
        checked: true
      },
      {
        id: 'calc-2',
        shortName: 'Сайт для онлайн-запису + адмін-акаунт',
        title: 'Сайт для онлайн-запису під ключ з адмін-акаунтом',
        subtitle: 'Адаптація під смартфон, прайс, відгуки, вибір годин і панель майстра',
        price: 1400,
        pricePrefix: '',
        days: 2,
        checked: true
      },
      {
        id: 'calc-3',
        shortName: 'Підключення сповіщень у Telegram',
        title: 'Підключення миттєвих сповіщень у Telegram',
        subtitle: 'Усі заявки з сайту одразу надходять у ваш Telegram',
        price: 400,
        pricePrefix: '+',
        days: 0,
        checked: true
      }
    ]
  },
  process: {
    eyebrow: 'Порядок співпраці',
    title: 'Як відбувається робота над вашим проєктом',
    steps: [
      {
        num: '01',
        title: 'Знайомство та обговорення деталей',
        description:
          'Ви ділитеся назвою проєкту (а якщо її ще немає — я допоможу підібрати вдалу назву для вашого бренду), переліком послуг із цінами, контактами та побажаннями щодо кольорів.'
      },
      {
        num: '02',
        title: 'Розробка логотипа та концепції',
        description:
          'Готую варіанти логотипа, підбираю гармонійну палітру кольорів та узгоджую з вами структуру майбутнього сайту.'
      },
      {
        num: '03',
        title: 'Створення сайту та налаштування',
        description:
          'Верстаю сайт, налаштовую особистий адмін-кабінет, підключаю сповіщення в Telegram і ретельно перевіряю кожну функцію зі смартфона.'
      },
      {
        num: '04',
        title: 'Запуск та передача проєкту',
        description:
          'Публікую сайт в інтернеті, передаю вам посилання, усі файли логотипа, доступ до адмін-кабінету та зрозумілу інструкцію з користування.'
      }
    ]
  },
  faq: {
    eyebrow: 'Питання та відповіді',
    title: 'Відповіді на часті запитання',
    items: [
      {
        open: true,
        question: 'Чи потрібно щомісяця оплачувати роботу сайту?',
        answer:
          'Ні. Я розміщую сайт на надійному безкоштовному хостингу GitHub Pages. Ви оплачуєте розробку один раз і користуєтеся сайтом без жодних щомісячних платежів.'
      },
      {
        open: false,
        question: 'Як працює адмін-акаунт на сайті?',
        answer:
          'У вас буде окрема закрита сторінка з паролем. Там ви бачите список усіх клієнтів, які записалися, можете змінювати статус запису (підтверджено або виконано) та одним натисканням закривати години чи дні, коли не приймаєте.'
      },
      {
        open: false,
        question: 'Як я дізнаюся про новий запис на сайті?',
        answer:
          'При підключенні сповіщень у Telegram заявка миттєво надходить вам у чат одразу після того, як клієнт натисне кнопку «Записатися». У базовій версії сайту клієнту також пропонується одразу надіслати сформований запис вам у месенджер.'
      },
      {
        open: false,
        question: 'Що робити, якщо з часом зміняться ціни або додадуться нові послуги?',
        answer:
          'Ви можете у будь-який момент написати мені в Telegram (@r_handziuk) або зателефонувати за номером 068 476 37 32 — я оперативно оновлю прайс, графік чи додам нові відгуки ваших клієнтів.'
      }
    ]
  },
  contacts: {
    eyebrow: 'Контакти',
    title: 'Залиште заявку або зв’яжіться зі мною напряму',
    description:
      'Я на зв’язку щодня. <strong>Найпріоритетніше та найшвидше приймаю заявки в Telegram</strong> — пишіть одразу у чат або заповніть коротку форму праворуч (текст звернення скопіюється автоматично для відправки).',
    telegramUrl: 'https://t.me/r_handziuk',
    telegramHandle: '@r_handziuk',
    cards: [
      {
        icon: '✈',
        title: 'Написати в Telegram (найпріоритетніше)',
        subtitle: '@r_handziuk • t.me/r_handziuk',
        url: 'https://t.me/r_handziuk',
        highlight: true,
        newTab: true
      },
      {
        icon: '💬',
        title: 'Написати у Viber',
        subtitle: '068 476 37 32',
        url: 'viber://chat?number=%2B380684763732',
        highlight: false,
        newTab: false
      },
      {
        icon: '✆',
        title: 'Зателефонувати',
        subtitle: '068 476 37 32',
        url: 'tel:+380684763732',
        highlight: false,
        newTab: false
      }
    ],
    niches: [
      'Майстер манікюру / педикюру',
      'Нарощення вій / Бровист',
      'Косметолог / Масажист',
      'Перукар / Барбер',
      'Інші послуги / локальний бренд'
    ],
    submitBtnText: 'Скопіювати заявку та відкрити Telegram',
    directBtnText: 'Написати напряму в Telegram (@r_handziuk)',
    toastMessage: 'Заявку скопійовано! Вставте її в чат Telegram (@r_handziuk).',
    briefTemplate:
      'Вітаю! Бажаю замовити проєкт на Kodr.studio:\n• Сфера діяльності: {niche}\n• Обрані послуги: {services}\n• Контакт для зв’язку: {contact}{notes}'
  },
  footer: {
    copyright: '© 2026 Kodr.studio',
    links: [
      { label: 'Telegram: @r_handziuk', url: 'https://t.me/r_handziuk', newTab: true },
      { label: 'Тел: 068 476 37 32', url: 'tel:+380684763732', newTab: false }
    ],
    backTopText: 'Наверх ↑'
  }
};

let activeSiteData = DEFAULT_SITE_DATA;
let currentSummaryText = '';

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function hexToRgba(hex, alpha) {
  const clean = (hex || '#DFC7A7').replace('#', '');
  if (clean.length !== 6) return `rgba(223, 199, 167, ${alpha})`;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Завантаження конфігурації (з підтримкою режиму передперегляду з адмінки)
async function loadSiteConfiguration() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('preview') === '1') {
    const previewRaw = localStorage.getItem('kodr_site_preview');
    if (previewRaw) {
      try {
        return JSON.parse(previewRaw);
      } catch (e) {}
    }
  }

  try {
    const response = await fetch(`site-data.json?v=${Date.now()}`, { cache: 'no-store' });
    if (response.ok) {
      return await response.json();
    }
  } catch (e) {}

  return DEFAULT_SITE_DATA;
}

// Застосування теми та кастомних кольорів
function applyAppearance(appearance) {
  const theme = appearance?.defaultTheme || 'dark';
  document.documentElement.setAttribute('data-theme', theme);

  const themeButtons = document.querySelectorAll('.theme-btn');
  themeButtons.forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-theme-val') === theme);
  });

  const switcher = document.getElementById('theme-switcher');
  if (switcher) {
    switcher.classList.toggle('hidden-el', appearance?.allowVisitorThemeSwitch === false);
  }

  const rootStyle = document.documentElement.style;
  if (appearance?.customColorsEnabled && appearance?.customColors) {
    const c = appearance.customColors;
    rootStyle.setProperty('--bg-main', c.bgMain);
    rootStyle.setProperty('--bg-alt', c.bgAlt);
    rootStyle.setProperty('--bg-card', c.bgCard);
    rootStyle.setProperty('--text-main', c.textMain);
    rootStyle.setProperty('--text-muted', c.textMuted);
    rootStyle.setProperty('--accent', c.accent);
    rootStyle.setProperty('--accent-text', c.accentText);
    rootStyle.setProperty('--spotlight', hexToRgba(c.accent, 0.12));
    rootStyle.setProperty('--header-bg', hexToRgba(c.bgMain, 0.9));
  } else {
    ['--bg-main', '--bg-alt', '--bg-card', '--text-main', '--text-muted', '--accent', '--accent-text', '--spotlight', '--header-bg'].forEach(
      (prop) => rootStyle.removeProperty(prop)
    );
  }
}

// Рендер усього сайту
function renderSite(data) {
  activeSiteData = data;

  // 1. SEO
  if (data.seo?.title) {
    document.title = data.seo.title;
  }
  const metaDesc = document.getElementById('seo-description');
  if (metaDesc && data.seo?.description) {
    metaDesc.setAttribute('content', data.seo.description);
  }

  // 2. Оформлення
  applyAppearance(data.appearance);

  // 3. Шапка
  if (data.header) {
    document.getElementById('logo-main').textContent = data.header.logoMain || '';
    document.getElementById('logo-accent').textContent = data.header.logoAccent || '';
    document.getElementById('footer-logo-main').textContent = data.header.logoMain || '';
    document.getElementById('footer-logo-accent').textContent = data.header.logoAccent || '';

    const ctaBtn = document.getElementById('header-cta');
    ctaBtn.textContent = data.header.ctaText || 'Обговорити проєкт';
    ctaBtn.setAttribute('href', data.header.ctaLink || '#order');

    const navEl = document.getElementById('main-nav');
    if (Array.isArray(data.header.nav)) {
      navEl.innerHTML = data.header.nav
        .map((item) => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`)
        .join('');
      navEl.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => navEl.classList.remove('open'));
      });
    }
  }

  // 4. Головний екран (Hero)
  if (data.hero) {
    const statusPill = document.getElementById('hero-status-pill');
    statusPill.classList.toggle('hidden-el', data.hero.statusVisible === false);

    const statusDot = document.getElementById('hero-status-dot');
    statusDot.className = 'pulse-dot';
    if (data.hero.statusColor === 'yellow') statusDot.classList.add('status-yellow');
    if (data.hero.statusColor === 'red') statusDot.classList.add('status-red');

    document.getElementById('hero-status-text').textContent = data.hero.statusText || '';

    const hintEl = document.getElementById('hero-style-hint');
    hintEl.textContent = data.hero.styleHint || '';
    hintEl.classList.toggle('hidden-el', !data.hero.styleHint || data.appearance?.allowVisitorThemeSwitch === false);

    document.getElementById('hero-title').innerHTML =
      `${escapeHtml(data.hero.titleBefore || '')}<span class="accent-text">${escapeHtml(
        data.hero.titleAccent || ''
      )}</span>${escapeHtml(data.hero.titleAfter || '')}`;

    document.getElementById('hero-subtitle').textContent = data.hero.subtitle || '';

    const primaryBtn = document.getElementById('hero-primary-btn');
    primaryBtn.textContent = data.hero.primaryBtnText || '';
    primaryBtn.setAttribute('href', data.hero.primaryBtnLink || '#calculator');

    const secondaryBtn = document.getElementById('hero-secondary-btn');
    secondaryBtn.textContent = data.hero.secondaryBtnText || '';
    secondaryBtn.setAttribute('href', data.hero.secondaryBtnLink || '#portfolio');

    const metricsEl = document.getElementById('hero-metrics');
    if (Array.isArray(data.hero.metrics)) {
      metricsEl.innerHTML = data.hero.metrics
        .map(
          (m) => `
          <div class="metric-item">
            <strong>${escapeHtml(m.value)}</strong>
            <span>${escapeHtml(m.label)}</span>
          </div>`
        )
        .join('');
    }
  }

  // 5. Послуги
  if (data.services) {
    document.getElementById('services-eyebrow').textContent = data.services.eyebrow || '';
    document.getElementById('services-title').textContent = data.services.title || '';
    document.getElementById('services-subtitle').textContent = data.services.subtitle || '';

    const servicesGrid = document.getElementById('services-grid');
    let cardsHtml = (data.services.items || [])
      .map(
        (srv) => `
        <article class="bento-card spotlight-card reveal">
          <div>
            <div class="card-num">${escapeHtml(srv.num)}</div>
            <h3>${escapeHtml(srv.title)}</h3>
            <p>${escapeHtml(srv.description)}</p>
          </div>
          <ul class="card-tags">
            ${(srv.tags || []).map((tag) => `<li>${escapeHtml(tag)}</li>`).join('')}
          </ul>
        </article>`
      )
      .join('');

    if (data.services.bundle && data.services.bundle.visible !== false) {
      const b = data.services.bundle;
      cardsHtml += `
        <article class="bento-card bento-wide spotlight-card reveal">
          <div class="bento-wide-content">
            <span class="eyebrow">${escapeHtml(b.eyebrow)}</span>
            <h3>${escapeHtml(b.title)}</h3>
            <p>${escapeHtml(b.description)}</p>
          </div>
          <div class="bento-wide-action">
            <a href="${escapeHtml(b.btnLink || '#calculator')}" class="btn btn-primary">${escapeHtml(b.btnText)}</a>
          </div>
        </article>`;
    }
    servicesGrid.innerHTML = cardsHtml;
  }

  // 6. Портфоліо
  if (data.portfolio) {
    document.getElementById('portfolio-eyebrow').textContent = data.portfolio.eyebrow || '';
    document.getElementById('portfolio-title').textContent = data.portfolio.title || '';

    const filtersEl = document.getElementById('portfolio-filters');
    const filters = data.portfolio.filters || [{ id: 'all', label: 'Усі приклади' }];
    filtersEl.innerHTML = filters
      .map(
        (f, idx) =>
          `<button type="button" class="filter-btn ${idx === 0 ? 'active' : ''}" data-filter="${escapeHtml(
            f.id
          )}">${escapeHtml(f.label)}</button>`
      )
      .join('');

    const portfolioGrid = document.getElementById('portfolio-grid');
    const visibleProjects = (data.portfolio.projects || []).filter((p) => p.visible !== false);

    portfolioGrid.innerHTML = visibleProjects
      .map((proj) => {
        const hasImg = Boolean(proj.imageUrl && proj.imageUrl.trim());
        const previewStyle = hasImg
          ? `background-image: url('${escapeHtml(proj.imageUrl.trim())}');`
          : `background: linear-gradient(135deg, ${escapeHtml(proj.gradientStart || '#16181D')}, ${escapeHtml(
              proj.gradientEnd || '#313644'
            )});`;

        const targetAttrs = proj.newTab ? 'target="_blank" rel="noopener"' : '';

        return `
        <article class="project-card spotlight-card reveal" data-category="${escapeHtml(proj.category)}">
          <div class="project-preview ${hasImg ? 'has-image' : ''}" style="${previewStyle}">
            <div class="browser-dots"><span></span><span></span><span></span></div>
            <div class="preview-mockup">
              <span class="mockup-tag">${escapeHtml(proj.mockupTag)}</span>
              <h4>${escapeHtml(proj.mockupTitle)}</h4>
              <p>${escapeHtml(proj.mockupSubtitle)}</p>
            </div>
          </div>
          <div class="project-body">
            <div>
              <div class="project-meta">
                <span>${escapeHtml(proj.metaLeft)}</span>
                <span>${escapeHtml(proj.metaRight)}</span>
              </div>
              <h3>${escapeHtml(proj.title)}</h3>
              <p>${escapeHtml(proj.description)}</p>
            </div>
            <a href="${escapeHtml(proj.btnUrl || '#order')}" ${targetAttrs} class="btn btn-outline btn-full">
              ${escapeHtml(proj.btnText || 'Детальніше')}
            </a>
          </div>
        </article>`;
      })
      .join('');

    bindPortfolioFilters();
  }

  // 7. Калькулятор
  if (data.calculator) {
    document.getElementById('calc-eyebrow').textContent = data.calculator.eyebrow || '';
    document.getElementById('calc-title').textContent = data.calculator.title || '';
    document.getElementById('calc-subtitle').textContent = data.calculator.subtitle || '';
    document.getElementById('apply-calc-btn').textContent = data.calculator.applyBtnText || 'Перенести в заявку';

    const currency = data.calculator.currency || 'грн';
    const calcOptionsEl = document.getElementById('calc-options');
    calcOptionsEl.innerHTML = (data.calculator.items || [])
      .map(
        (item) => `
        <label class="calc-item">
          <input
            type="checkbox"
            class="calc-checkbox"
            data-name="${escapeHtml(item.shortName || item.title)}"
            data-price="${Number(item.price) || 0}"
            data-days="${Number(item.days) || 0}"
            ${item.checked ? 'checked' : ''}
          >
          <div class="calc-item-box">
            <div>
              <h4>${escapeHtml(item.title)}</h4>
              <span>${escapeHtml(item.subtitle)}</span>
            </div>
            <div class="calc-price">${escapeHtml(item.pricePrefix || '')}${Number(item.price || 0).toLocaleString(
              'uk-UA'
            )} ${escapeHtml(currency)}</div>
          </div>
        </label>`
      )
      .join('');

    document.querySelectorAll('.calc-checkbox').forEach((cb) => {
      cb.addEventListener('change', updateCalculator);
    });
    updateCalculator();
  }

  // 8. Етапи роботи
  if (data.process) {
    document.getElementById('process-eyebrow').textContent = data.process.eyebrow || '';
    document.getElementById('process-title').textContent = data.process.title || '';

    document.getElementById('steps-grid').innerHTML = (data.process.steps || [])
      .map(
        (step) => `
        <div class="step-card reveal">
          <span class="step-num">${escapeHtml(step.num)}</span>
          <h4>${escapeHtml(step.title)}</h4>
          <p>${escapeHtml(step.description)}</p>
        </div>`
      )
      .join('');
  }

  // 9. Часті запитання (FAQ)
  if (data.faq) {
    document.getElementById('faq-eyebrow').textContent = data.faq.eyebrow || '';
    document.getElementById('faq-title').textContent = data.faq.title || '';

    document.getElementById('faq-list').innerHTML = (data.faq.items || [])
      .map(
        (faq) => `
        <details class="faq-item" ${faq.open ? 'open' : ''}>
          <summary>${escapeHtml(faq.question)}</summary>
          <p>${escapeHtml(faq.answer)}</p>
        </details>`
      )
      .join('');
  }

  // 10. Контакти та форма
  if (data.contacts) {
    document.getElementById('contacts-eyebrow').textContent = data.contacts.eyebrow || '';
    document.getElementById('contacts-title').textContent = data.contacts.title || '';
    document.getElementById('contacts-description').innerHTML = data.contacts.description || '';

    document.getElementById('direct-contacts').innerHTML = (data.contacts.cards || [])
      .map((card) => {
        const targetAttrs = card.newTab ? 'target="_blank" rel="noopener"' : '';
        return `
        <a href="${escapeHtml(card.url)}" ${targetAttrs} class="contact-card ${
          card.highlight ? 'highlight-contact' : ''
        }">
          <span class="contact-icon">${escapeHtml(card.icon)}</span>
          <div>
            <strong>${escapeHtml(card.title)}</strong>
            <span>${escapeHtml(card.subtitle)}</span>
          </div>
        </a>`;
      })
      .join('');

    const nicheSelect = document.getElementById('client-niche');
    if (Array.isArray(data.contacts.niches) && data.contacts.niches.length > 0) {
      nicheSelect.innerHTML = data.contacts.niches
        .map((niche) => `<option value="${escapeHtml(niche)}">${escapeHtml(niche)}</option>`)
        .join('');
    }

    document.getElementById('form-submit-btn').textContent =
      data.contacts.submitBtnText || 'Скопіювати заявку та відкрити Telegram';

    const directBtn = document.getElementById('form-direct-btn');
    directBtn.textContent = data.contacts.directBtnText || 'Написати напряму в Telegram';
    directBtn.setAttribute('href', data.contacts.telegramUrl || 'https://t.me/r_handziuk');

    document.getElementById('client-services-summary').value = currentSummaryText;
  }

  // 11. Футер
  if (data.footer) {
    const linksHtml = (data.footer.links || [])
      .map((lnk) => {
        const targetAttrs = lnk.newTab ? 'target="_blank" rel="noopener"' : '';
        return `<a href="${escapeHtml(lnk.url)}" ${targetAttrs} style="text-decoration:underline;">${escapeHtml(
          lnk.label
        )}</a>`;
      })
      .join(' • ');

    document.getElementById('footer-info').innerHTML = `${escapeHtml(data.footer.copyright || '')}${
      linksHtml ? ' • ' + linksHtml : ''
    }`;
    document.getElementById('footer-back-top').textContent = data.footer.backTopText || 'Наверх ↑';
  }

  initSpotlightCards();
  initRevealObserver();
}

// Перемикач кольорової гами сайту для відвідувачів
document.querySelectorAll('.theme-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const selectedTheme = btn.getAttribute('data-theme-val');
    ['--bg-main', '--bg-alt', '--bg-card', '--text-main', '--text-muted', '--accent', '--accent-text', '--spotlight', '--header-bg'].forEach(
      (prop) => document.documentElement.style.removeProperty(prop)
    );
    document.documentElement.setAttribute('data-theme', selectedTheme);

    document.querySelectorAll('.theme-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Підсвітка карток за курсором
function initSpotlightCards() {
  document.querySelectorAll('.spotlight-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// Мобільне меню
const burgerBtn = document.getElementById('burger-btn');
const mainNav = document.getElementById('main-nav');
burgerBtn.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

// Фільтрація робіт у портфоліо
function bindPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden-card');
        } else {
          card.classList.add('hidden-card');
        }
      });
    });
  });
}

// Калькулятор вартості послуг
function updateCalculator() {
  const checkboxes = document.querySelectorAll('.calc-checkbox');
  const calcList = document.getElementById('calc-selected-list');
  const calcTotalPrice = document.getElementById('calc-total-price');
  const calcOldPrice = document.getElementById('calc-old-price');
  const calcTotalDays = document.getElementById('calc-total-days');
  const discountBadge = document.getElementById('calc-discount-badge');

  const currency = activeSiteData.calculator?.currency || 'грн';
  const minCount = Number(activeSiteData.calculator?.discountMinCount ?? 3);
  const discountPercent = Number(activeSiteData.calculator?.discountPercent ?? 15);

  let rawTotal = 0;
  let totalDays = 0;
  const selectedItems = [];

  calcList.innerHTML = '';

  checkboxes.forEach((cb) => {
    if (cb.checked) {
      const name = cb.getAttribute('data-name');
      const price = Number(cb.getAttribute('data-price'));
      const days = Number(cb.getAttribute('data-days'));

      rawTotal += price;
      totalDays += days;
      selectedItems.push(name);

      const li = document.createElement('li');
      li.innerHTML = `<span>${escapeHtml(name)}</span><strong>${price.toLocaleString('uk-UA')} ${escapeHtml(
        currency
      )}</strong>`;
      calcList.appendChild(li);
    }
  });

  if (selectedItems.length === 0) {
    calcList.innerHTML = '<li style="color:var(--text-muted)">Оберіть хоча б одну послугу ліворуч</li>';
    calcTotalPrice.textContent = `0 ${currency}`;
    calcTotalDays.textContent = '—';
    discountBadge.classList.add('hidden');
    calcOldPrice.classList.add('hidden');
    currentSummaryText = 'Індивідуальний запит';
    return;
  }

  const hasBundleDiscount = discountPercent > 0 && selectedItems.length >= minCount;
  const finalPrice = hasBundleDiscount ? Math.round(rawTotal * (1 - discountPercent / 100)) : rawTotal;

  if (hasBundleDiscount) {
    discountBadge.textContent = `Знижка ${discountPercent}% за замовлення від ${minCount} послуг`;
    discountBadge.classList.remove('hidden');
    calcOldPrice.classList.remove('hidden');
    calcOldPrice.textContent = `${rawTotal.toLocaleString('uk-UA')} ${currency}`;
  } else {
    discountBadge.classList.add('hidden');
    calcOldPrice.classList.add('hidden');
  }

  calcTotalPrice.textContent = `${finalPrice.toLocaleString('uk-UA')} ${currency}`;

  if (totalDays === 0) {
    calcTotalDays.textContent = 'Старт у день звернення';
  } else if (totalDays === 1) {
    calcTotalDays.textContent = '1 день';
  } else {
    calcTotalDays.textContent = `${totalDays}–${totalDays + 1} дні`;
  }

  currentSummaryText = `${selectedItems.join(' + ')} (${finalPrice.toLocaleString('uk-UA')} ${currency})`;
}

document.getElementById('apply-calc-btn').addEventListener('click', () => {
  document.getElementById('client-services-summary').value = currentSummaryText;
  document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
});

// Відправка заявки в Telegram
const orderForm = document.getElementById('order-form');
const toast = document.getElementById('toast');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}

orderForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const niche = document.getElementById('client-niche').value;
  const services = document.getElementById('client-services-summary').value.trim();
  const contact = document.getElementById('client-contact').value.trim();
  const notes = document.getElementById('client-notes').value.trim();

  if (!contact) {
    alert('Вкажіть, будь ласка, ваш нік у Telegram або номер телефону.');
    return;
  }

  const template =
    activeSiteData.contacts?.briefTemplate ||
    'Вітаю! Бажаю замовити проєкт:\n• Сфера діяльності: {niche}\n• Обрані послуги: {services}\n• Контакт для зв’язку: {contact}{notes}';

  const brief = template
    .replace('{niche}', niche)
    .replace('{services}', services)
    .replace('{contact}', contact)
    .replace('{notes}', notes ? `\n• Побажання: ${notes}` : '');

  if (navigator.clipboard) {
    navigator.clipboard.writeText(brief).catch(() => {});
  }

  const toastText =
    activeSiteData.contacts?.toastMessage ||
    `Заявку скопійовано! Вставте її в чат Telegram (${activeSiteData.contacts?.telegramHandle || '@r_handziuk'}).`;
  const telegramUrl = activeSiteData.contacts?.telegramUrl || 'https://t.me/r_handziuk';

  showToast(toastText);
  window.open(telegramUrl, '_blank', 'noopener');
});

// Плавна поява блоків при скролі
function initRevealObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

// Ініціалізація сайту
(async function initSite() {
  const data = await loadSiteConfiguration();
  renderSite(data);
})();