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

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => triggerSuccessEffect())
        .catch(err => {
          console.error('Clipboard API failed:', err);
          fallbackCopy(text);
        });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) triggerSuccessEffect();
    } catch (err) {
      console.error('Fallback copy error:', err);
    }

    document.body.removeChild(textArea);
  }

  if (copyWrapper) {
    copyWrapper.addEventListener('click', () => {
      copyToClipboard(email);
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
});

function updateYear() {
  const currentYear = new Date().getFullYear();
  document.getElementById('current-year').textContent = currentYear;
}
updateYear();
