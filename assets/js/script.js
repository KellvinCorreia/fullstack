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

  /* --- Dynamic Projects Rendering --- */
  const projectsData = [
    {
      title: 'Portfolio',
      description:
        'Landing page desenvolvida com HTML, CSS e JavaScript, sem frameworks, focada em manipulação do DOM.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      image: 'assets/img/landing-page.png',
      repoLink: 'https://github.com/KellvinCorreia/portfolio',
      liveLink: 'https://kellvincorreia.github.io/portfolio/'
    },
    {
      title: 'Gromuse green market',
      description:
        'Landing page desenvolvida com HTML, CSS e JavaScript, sem frameworks, focada em design responsivo.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      image: 'assets/img/gromuse.png',
      repoLink: 'https://github.com/KellvinCorreia/gromuse-landing-page',
      liveLink: 'https://kellvincorreia.github.io/gromuse-landing-page/'
    },
    {
      title: 'Task Manager',
      description:
        'Aplicação para gerenciamento de tarefas.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      image: 'assets/img/to-do.png',
      repoLink: 'https://github.com/KellvinCorreia/ToDoList',
      liveLink: 'https://kellvincorreia.github.io/ToDoList/'
    }
  ];

  function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    projectsData.forEach(project => {
      const article = document.createElement('article');
      article.className = 'project-card';

      const previewDiv = document.createElement('div');
      previewDiv.className = 'project-preview';

      const img = document.createElement('img');
      img.className = 'project-img';
      img.src = project.image;
      img.alt = `Preview de ${project.title}`;
      previewDiv.appendChild(img);
      article.appendChild(previewDiv);

      const contentDiv = document.createElement('div');
      contentDiv.className = 'project-content';

      const tagsDiv = document.createElement('div');
      tagsDiv.className = 'tags';
      project.tags.forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.className = 'tag';
        tagSpan.textContent = tag;
        tagsDiv.appendChild(tagSpan);
      });
      contentDiv.appendChild(tagsDiv);

      const title = document.createElement('h3');
      title.className = 'project-title';
      title.textContent = project.title;
      contentDiv.appendChild(title);
      const desc = document.createElement('p');
      desc.className = 'project-text';
      desc.textContent = project.description;
      contentDiv.appendChild(desc);

      const footerDiv = document.createElement('div');
      footerDiv.className = 'project-footer';

      const codeLink = document.createElement('a');
      codeLink.href = project.repoLink;
      codeLink.target = '_blank';
      codeLink.className = 'project-link';
      codeLink.innerHTML = `
        <svg class="icon-sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>
        </svg>
        Code`;
      footerDiv.appendChild(codeLink);

      const liveLink = document.createElement('a');
      liveLink.href = project.liveLink;
      liveLink.target = '_blank';
      liveLink.className = 'project-link';
      liveLink.innerHTML = `
        Live
        <svg class="icon-sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>`;
      footerDiv.appendChild(liveLink);

      contentDiv.appendChild(footerDiv);
      article.appendChild(contentDiv);
      container.appendChild(article);
    });
  }

  renderProjects();

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
