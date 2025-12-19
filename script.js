document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  const savedTheme = localStorage.getItem('theme') || 'dark';
  root.setAttribute('data-theme', savedTheme);

  themeBtn.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  const copyWrapper = document.getElementById('copy-email-hero');
  const email = 'kellvin.correia@gmail.com';

  function triggerSuccessEffect() {
    if (!copyWrapper) return;
    copyWrapper.classList.add('success');
    setTimeout(() => {
      copyWrapper.classList.remove('success');
    }, 2000);
  }

  if (copyWrapper) {
    copyWrapper.addEventListener('click', () => {
      navigator.clipboard.writeText(email).then(triggerSuccessEffect);
    });
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const hiddenElements = document.querySelectorAll(
    '.hero, .section-header, .project-card, .skill-card'
  );
  hiddenElements.forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
  });
  
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isExpanded = navLinks.classList.contains('active');
      mobileBtn.setAttribute('aria-expanded', isExpanded);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
});

function updateYear() {
  const currentYear = new Date().getFullYear();
  document.getElementById('current-year').textContent = currentYear;
}
updateYear();
