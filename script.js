// Пріоритетний контакт для прийому заявок у Telegram
const TELEGRAM_URL = 'https://t.me/r_handziuk';

// 1. Перемикач кольорової гами сайту (Dark / Cappuccino / Light)
const themeButtons = document.querySelectorAll('.theme-btn');
themeButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const selectedTheme = btn.getAttribute('data-theme-val');
    document.documentElement.setAttribute('data-theme', selectedTheme);

    themeButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// 2. Підсвітка карток за курсором
document.querySelectorAll('.spotlight-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// 3. Мобільне меню
const burgerBtn = document.getElementById('burger-btn');
const mainNav = document.getElementById('main-nav');

burgerBtn.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => mainNav.classList.remove('open'));
});

// 4. Фільтрація робіт у портфоліо
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

// 5. Калькулятор вартості послуг
const checkboxes = document.querySelectorAll('.calc-checkbox');
const calcList = document.getElementById('calc-selected-list');
const calcTotalPrice = document.getElementById('calc-total-price');
const calcOldPrice = document.getElementById('calc-old-price');
const calcTotalDays = document.getElementById('calc-total-days');
const discountBadge = document.getElementById('calc-discount-badge');
const applyCalcBtn = document.getElementById('apply-calc-btn');
const servicesSummaryInput = document.getElementById('client-services-summary');

let currentSummaryText = '';

function updateCalculator() {
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
      li.innerHTML = `<span>${name}</span><strong>${price.toLocaleString('uk-UA')} грн</strong>`;
      calcList.appendChild(li);
    }
  });

  if (selectedItems.length === 0) {
    calcList.innerHTML = '<li style="color:var(--text-muted)">Оберіть хоча б одну послугу ліворуч</li>';
    calcTotalPrice.textContent = '0 грн';
    calcTotalDays.textContent = '—';
    discountBadge.classList.add('hidden');
    calcOldPrice.classList.add('hidden');
    currentSummaryText = 'Індивідуальний запит';
    return;
  }

  const hasBundleDiscount = selectedItems.length >= 3;
  const finalPrice = hasBundleDiscount ? Math.round(rawTotal * 0.85) : rawTotal;

  if (hasBundleDiscount) {
    discountBadge.classList.remove('hidden');
    calcOldPrice.classList.remove('hidden');
    calcOldPrice.textContent = `${rawTotal.toLocaleString('uk-UA')} грн`;
  } else {
    discountBadge.classList.add('hidden');
    calcOldPrice.classList.add('hidden');
  }

  calcTotalPrice.textContent = `${finalPrice.toLocaleString('uk-UA')} грн`;

  if (totalDays === 0) {
    calcTotalDays.textContent = 'Старт у день звернення';
  } else if (totalDays === 1) {
    calcTotalDays.textContent = '1 день';
  } else {
    calcTotalDays.textContent = `${totalDays}–${totalDays + 1} дні`;
  }

  currentSummaryText = `${selectedItems.join(' + ')} (${finalPrice.toLocaleString('uk-UA')} грн)`;
}

checkboxes.forEach((cb) => cb.addEventListener('change', updateCalculator));

applyCalcBtn.addEventListener('click', () => {
  servicesSummaryInput.value = currentSummaryText;
  document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
});

updateCalculator();

// 6. Відправка заявки в Telegram
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
  const services = servicesSummaryInput.value.trim();
  const contact = document.getElementById('client-contact').value.trim();
  const notes = document.getElementById('client-notes').value.trim();

  if (!contact) {
    alert('Вкажіть, будь ласка, ваш нік у Telegram або номер телефону.');
    return;
  }

  const brief =
    `Вітаю! Бажаю замовити проєкт на Kodr.studio:\n` +
    `• Сфера діяльності: ${niche}\n` +
    `• Обрані послуги: ${services}\n` +
    `• Контакт для зв’язку: ${contact}` +
    (notes ? `\n• Побажання: ${notes}` : '');

  if (navigator.clipboard) {
    navigator.clipboard.writeText(brief).catch(() => {});
  }

  showToast('Заявку скопійовано! Вставте її в чат Telegram (@r_handziuk).');
  window.open(TELEGRAM_URL, '_blank', 'noopener');
});

// 7. Плавна поява блоків при скролі
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));