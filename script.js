const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('open', !isOpen);
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const progress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}, { passive: true });

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('contactForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent('Zapytanie o remont — WARSAW REMONT');
  const body = encodeURIComponent(
    `Imię i nazwisko: ${data.get('name')}\nKontakt: ${data.get('contact')}\n\nWiadomość:\n${data.get('message')}`
  );
  // Zmień ten adres na prawdziwy adres e-mail firmy.
  window.location.href = `mailto:eugene.voevutko@gmail.com?subject=${subject}&body=${body}`;
  document.getElementById('formStatus').textContent = 'Otwieramy aplikację pocztową. Jeśli nic się nie stało, napisz do nas bezpośrednio.';
});
