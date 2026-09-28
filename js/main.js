(() => {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('menu');

  // Solid nav background once the hero is scrolled past
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.style.overflow = open ? 'hidden' : '';
  };
  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });

  // Reveal on scroll + animated counters
  const animateCount = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const start = performance.now();
    const duration = 1600;
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString('pt-BR') + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      const counter = entry.target.querySelector('[data-count]');
      if (counter) animateCount(counter);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // Gallery lightbox
  const lightbox = document.getElementById('lightbox');
  const lbImg = lightbox.querySelector('img');
  document.querySelectorAll('.gallery__item').forEach((item) => {
    item.addEventListener('click', () => {
      lbImg.src = item.dataset.full;
      lbImg.alt = item.querySelector('img').alt;
      lightbox.showModal();
    });
  });
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.closest('.lightbox__close')) lightbox.close();
  });

  // Contact form: validates, then opens WhatsApp with the message (no backend needed)
  const form = document.getElementById('contact-form');
  const status = form.querySelector('.form__status');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('[required]').forEach((field) => {
      const ok = field.value.trim() !== '' && field.checkValidity();
      field.classList.toggle('is-invalid', !ok);
      if (!ok) valid = false;
    });
    if (!valid) {
      status.style.color = '#c0392b';
      status.textContent = 'Preencha os campos obrigatórios.';
      return;
    }
    const data = new FormData(form);
    const text = `Olá! Sou ${data.get('nome')} (${data.get('email')}${data.get('telefone') ? ', ' + data.get('telefone') : ''}).\n` +
      `Assunto: ${data.get('assunto')}\n\n${data.get('mensagem')}`;
    window.open(`https://wa.me/5500000000000?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    status.style.color = '';
    status.textContent = 'Obrigado! Abrimos o WhatsApp para você concluir o envio.';
    form.reset();
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
