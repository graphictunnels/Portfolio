
function renderTeachingWork(teachingWork, sectionTitles) {
  const container = document.getElementById('teachingWorkContainer');
  if (!container || !teachingWork) return;
  let html = '';
  if(sectionTitles && sectionTitles.teachingWork && document.querySelector('.cv-section-title')) {
    document.querySelectorAll('.cv-section-title').forEach(el => {
      if(el.textContent.trim().toUpperCase() === 'TEACHING WORK' || el.textContent.trim().toUpperCase() === 'DOCENCIA') el.textContent = sectionTitles.teachingWork;
    });
  }
  teachingWork.forEach(item => {
    html += `
      <div class="cv-item">
        <div class="cv-item-title">${item.title}</div>
        <div class="cv-item-subtitle">${item.institution}</div>
        <p class="cv-paragraph">${item.description}</p>
      </div>
    `;
  });
  container.innerHTML = html;
}
function updateMenuTextsAbout(lang) {
  const jsonFile = lang === 'es' ? 'index-es.json' : 'index.json';
  fetch(jsonFile)
    .then(res => res.json())
    .then(data => {
      if(document.getElementById('navDesignWork')) document.getElementById('navDesignWork').textContent = data.menu.designWork;
      if(document.getElementById('navDesignScroll')) document.getElementById('navDesignScroll').textContent = data.menu.designWorkScroll;
      if(document.getElementById('navThreeDWork')) document.getElementById('navThreeDWork').textContent = data.menu.threeDWork;
      if(document.getElementById('navThreeDWorkScroll')) document.getElementById('navThreeDWorkScroll').textContent = data.menu.threeDWorkScroll;
      if(document.getElementById('navCoffee')) document.getElementById('navCoffee').textContent = data.menu.getCoffee;
      if(document.querySelector('.menu-link-about .menu-link-text')) document.querySelector('.menu-link-about .menu-link-text').textContent = data.menu.home;
    });
}
async function loadCVData() {
  try {
    const response = await fetch('cv-data.json');
    const data = await response.json();
    
    renderIntro(data.intro);
    renderEducation(data.education);
    renderExperience(data.experience);
    renderVoluntary(data.voluntary);
    renderPublications(data.publications);
    renderExhibitions(data.exhibitions);
    renderFellowships(data.fellowships);
    renderAwards(data.awards);


    requestAnimationFrame(() => {
      try {
        if (window.ScrollTrigger) {
          ScrollTrigger.refresh();
        }
        if (window.ScrollSmoother && ScrollSmoother.get()) {
          ScrollSmoother.get().refresh();
        }
      } catch (e) {
        console.warn('Refresh after CV render failed:', e);
      }
    });
  } catch (error) {
    console.error('Error loading CV data:', error);
  }
}

function renderIntro(intro, sectionTitles, languages) {
  const logoContainer = document.getElementById('cvTitleLogo');
  const textContainer = document.getElementById('cvIntroText');
  const softwareContainer = document.getElementById('cvSoftwareLang');
  logoContainer.innerHTML = `<img src="${intro.logoImage}" alt="${intro.logoAlt}" class="cv-logo-img">`;
  textContainer.innerHTML = `
    <div class="cv-text">${intro.text}</div>
    <div class="cv-languages-box">
      <ul class="cv-languages-list">
        ${(languages || [
          'Native <span class="lang-highlight">Spanish</span>',
          'Proficient <span class="lang-highlight">English</span>',
          'Advanced <span class="lang-highlight">Korean</span>',
          'Intermediate <span class="lang-highlight">Japanese</span>'
        ]).map(l => `<li>${l}</li>`).join('')}
      </ul>
    </div>
  `;
  softwareContainer.innerHTML = `<img src="${intro.softwareImage}" alt="${intro.softwareAlt}" class="cv-software-img">`;
}

function renderEducation(education, sectionTitles) {
  const container = document.getElementById('educationContainer');
  let html = '';
  if(sectionTitles && sectionTitles.education && document.querySelector('.cv-section-title')) {
    document.querySelectorAll('.cv-section-title').forEach(el => {
      if(el.textContent.trim().toUpperCase() === 'EDUCATION') el.textContent = sectionTitles.education;
    });
  }
  education.forEach(item => {
    html += `
      <div class="cv-item">
        <div class="cv-item-title">${item.title}</div>
        <div class="cv-item-subtitle">${item.institution}</div>
    `;
    if (item.highlights && item.highlights.length > 0) {
      html += '<ul class="cv-list">';
      item.highlights.forEach(highlight => {
        html += `<li>${highlight}</li>`;
      });
      html += '</ul>';
    }
    if (item.additionalInfo && item.additionalInfo.length > 0) {
      item.additionalInfo.forEach(info => {
        html += `<p class="cv-paragraph">${info}</p>`;
      });
    }
    html += '</div>';
  });
  container.innerHTML = html;
}

function renderExperience(experience, sectionTitles) {
  const container = document.getElementById('experienceContainer');
  let html = '';
  if(sectionTitles && sectionTitles.experience && document.querySelector('.cv-section-title')) {
    document.querySelectorAll('.cv-section-title').forEach(el => {
      if(el.textContent.trim().toUpperCase() === 'EXPERIENCE') el.textContent = sectionTitles.experience;
    });
  }
  experience.forEach(item => {
    html += `
      <div class="cv-item">
        <div class="cv-item-title">${item.title}</div>
        <div class="cv-item-subtitle">${item.company}</div>
        <p class="cv-paragraph">${item.description}</p>
      </div>
    `;
  });
  container.innerHTML = html;
}

function renderVoluntary(voluntary, sectionTitles) {
  const container = document.getElementById('voluntaryContainer');
  let html = '';
  if(sectionTitles && sectionTitles.voluntary && document.querySelector('.cv-section-title')) {
    document.querySelectorAll('.cv-section-title').forEach(el => {
      if(el.textContent.trim().toUpperCase() === 'VOLUNTARY WORK') el.textContent = sectionTitles.voluntary;
    });
  }
  voluntary.forEach(item => {
    html += `
      <div class="cv-item">
        <div class="cv-item-title">${item.title}</div>
        <div class="cv-item-subtitle">${item.organization}</div>
        <p class="cv-paragraph">${item.description}</p>
      </div>
    `;
  });
  container.innerHTML = html;
}

function renderPublications(publications, sectionTitles) {
  const container = document.getElementById('publicationsContainer');
  let html = '';
  if(sectionTitles && sectionTitles.publications && document.querySelector('.cv-section-title')) {
    document.querySelectorAll('.cv-section-title').forEach(el => {
      if(el.textContent.trim().toUpperCase() === 'PUBLICATIONS') el.textContent = sectionTitles.publications;
    });
  }
  publications.forEach(item => {
    html += `
      <div class="cv-item">
        <div class="cv-item-title">${item.title}</div>
        <div class="cv-item-subtitle">${item.details}</div>
        <p class="cv-paragraph">${item.publisher}</p>
        ${item.link ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer" class="cv-link">Watch it here</a>` : ''}
      </div>
    `;
  });
  container.innerHTML = html;
}

function renderExhibitions(exhibitions, sectionTitles) {
  const container = document.getElementById('exhibitionsContainer');
  let html = '';
  if(sectionTitles && sectionTitles.exhibitions && document.querySelector('.cv-section-title')) {
    document.querySelectorAll('.cv-section-title').forEach(el => {
      if(el.textContent.trim().toUpperCase() === 'EXHIBITIONS') el.textContent = sectionTitles.exhibitions;
    });
  }
  exhibitions.forEach(item => {
    html += `
      <div class="cv-item">
        <div class="cv-item-title">${item.title}</div>
        <div class="cv-item-subtitle">${item.location}</div>
        <p class="cv-paragraph">${item.description}</p>
      </div>
    `;
  });
  container.innerHTML = html;
}

function renderFellowships(fellowships, sectionTitles) {
  const container = document.getElementById('fellowshipsContainer');
  if (!container || !fellowships) return;
  let html = '';

  let titleKey = sectionTitles.fellowships ? 'fellowships' : (sectionTitles.scholarships ? 'scholarships' : null);
  if(titleKey && sectionTitles[titleKey] && document.querySelector('.cv-section-title')) {
    document.querySelectorAll('.cv-section-title').forEach(el => {
      if(['FELLOWSHIPS','BECAS'].includes(el.textContent.trim().toUpperCase())) el.textContent = sectionTitles[titleKey];
    });
  }
  fellowships.forEach(item => {
    html += `
      <div class="cv-item">
        <div class="cv-item-title">${item.title}</div>
        <div class="cv-item-subtitle">${item.institution}</div>
        <p class="cv-paragraph">${item.description}</p>
      </div>
    `;
  });
  container.innerHTML = html;
}

function renderAwards(awards, sectionTitles) {
  const container = document.getElementById('awardsContainer');
  if (!container || !awards) return;
  let html = '';
  if(sectionTitles && sectionTitles.awards && document.querySelector('.cv-section-title')) {
    document.querySelectorAll('.cv-section-title').forEach(el => {
      if(el.textContent.trim().toUpperCase() === 'AWARDS') el.textContent = sectionTitles.awards;
    });
  }
  awards.forEach(item => {
    html += `
      <div class="cv-item">
        <div class="cv-item-title">${item.title}</div>
        <div class="cv-item-subtitle">${item.institution}</div>
        <p class="cv-paragraph">${item.description}</p>
      </div>
    `;
  });
  container.innerHTML = html;
}


function getAboutLang() {
  if (localStorage.getItem('portfolioLang')) return localStorage.getItem('portfolioLang');
  return 'en';
}

function setAboutLang(lang) {
  localStorage.setItem('portfolioLang', lang);
}


function updateFooterAbout(lang) {
  const jsonFile = lang === 'es' ? 'index-es.json' : 'index.json';
  fetch(jsonFile)
    .then(res => res.json())
    .then(data => {

      const colofon = document.querySelector('.footer-about .colofon');
      const contactame = document.querySelector('.footer-about .contactame');
      const copyBtn = document.getElementById('copyEmailBtn');
      if (colofon) {
        colofon.innerHTML = `${data.footer.copyright} <br />${data.footer.designedBy}`;
      }
      if (contactame) {
        contactame.childNodes[0].nodeValue = data.footer.contact.split('\n')[0] + ' ';
      }
      if (copyBtn) {
        const label = copyBtn.querySelector('.label');
        const emailText = copyBtn.querySelector('.email-text');
        if (label) label.childNodes[0].nodeValue = data.footer.copyEmail;
        if (emailText) emailText.textContent = ' ' + data.footer.copyEmailLabel;
      }
    });
}

function updateAllSectionTitles(sectionTitles) {
  const mapping = {
    education: ['EDUCATION', 'FORMACIÓN'],
    awards: ['AWARDS', 'PREMIOS'],
    exhibitions: ['EXHIBITIONS', 'EXPOSICIONES'],
    publications: ['PUBLICATIONS', 'PUBLICACIONES'],
    experience: ['EXPERIENCE', 'EXPERIENCIA'],
    voluntary: ['VOLUNTARY WORK', 'VOLUNTARIADO'],
    teachingWork: ['TEACHING WORK', 'DOCENCIA'],
    fellowships: ['FELLOWSHIPS', 'BECAS'],

  };
  document.querySelectorAll('.cv-section-title').forEach(el => {
    for (const key in mapping) {
      if (mapping[key].includes(el.textContent.trim().toUpperCase())) {
        if (sectionTitles[key]) el.textContent = sectionTitles[key];
      }
    }
  });
}

function updateCVNavBtnRow(lang) {
  const jsonFile = lang === 'es' ? 'index-es.json' : 'index.json';
  fetch(jsonFile)
    .then(res => res.json())
    .then(data => {
      // Botón Design Work
      const designWorkBtn = document.getElementById('designWorkBtn');
      if (designWorkBtn) {
        const bubbleText = designWorkBtn.querySelector('.bubble-text');
        const bubbleScroll = designWorkBtn.querySelector('.bubble-scroll-text');
        if (bubbleText) bubbleText.textContent = data.bubbles.designWork.main;
        if (bubbleScroll) bubbleScroll.textContent = data.bubbles.designWork.scroll;
      }
      // Botón 3D Work
      const threeDWorkBtn = document.getElementById('threeDWorkBtn');
      if (threeDWorkBtn) {
        const bubbleText = threeDWorkBtn.querySelector('.bubble-text');
        const bubbleScroll = threeDWorkBtn.querySelector('.bubble-scroll-text');
        if (bubbleText) bubbleText.textContent = data.bubbles.threeDWork.main;
        if (bubbleScroll) bubbleScroll.textContent = data.bubbles.threeDWork.scroll;
      }
      // Botón GET COFFEE
      const getCoffeeBtnText = document.getElementById('getCoffeeBtnText');
      if (getCoffeeBtnText && data.menu && data.menu.getCoffee) getCoffeeBtnText.textContent = data.menu.getCoffee;
    });
}

async function loadCVDataLang(lang) {
  try {
    updateMenuTextsAbout(lang);
    updateFooterAbout(lang);
    updateCVNavBtnRow(lang);
    const file = lang === 'es' ? 'cv-data-es.json' : 'cv-data.json';
    const response = await fetch(file);
    const data = await response.json();
    renderIntro(data.intro, data.sectionTitles, data.languages);
    renderEducation(data.education, data.sectionTitles);
    renderExperience(data.experience, data.sectionTitles);
    if (data.teachingWork) renderTeachingWork(data.teachingWork, data.sectionTitles);
    if (data.voluntary) renderVoluntary(data.voluntary, data.sectionTitles);
    if (data.publications) renderPublications(data.publications, data.sectionTitles);
    if (data.exhibitions) renderExhibitions(data.exhibitions, data.sectionTitles);

    if (data.fellowships) {
      renderFellowships(data.fellowships, data.sectionTitles);
    } else if (data.scholarships) {
      renderFellowships(data.scholarships, data.sectionTitles);
    }
    if (data.awards) {
      renderAwards(data.awards, data.sectionTitles);
    } else if (data.premios) {
      renderAwards(data.premios, data.sectionTitles);
    }
    if (data.sectionTitles) updateAllSectionTitles(data.sectionTitles);

    if(document.getElementById('btn-eng-about')) {
      document.getElementById('btn-eng-about').classList.toggle('idioma-btn--active', lang === 'en');
    }
    if(document.getElementById('btn-es-about')) {
      document.getElementById('btn-es-about').classList.toggle('idioma-btn--active', lang === 'es');
    }
    // Refrescar GSAP/Smoother
    requestAnimationFrame(() => {
      try {
        if (window.ScrollTrigger) ScrollTrigger.refresh();
        if (window.ScrollSmoother && ScrollSmoother.get()) ScrollSmoother.get().refresh();
      } catch (e) {}
    });
  } catch (error) {
    console.error('Error loading CV data:', error);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  let lang = getAboutLang();
  loadCVDataLang(lang);
  if(document.getElementById('btn-eng-about')) {
    document.getElementById('btn-eng-about').addEventListener('click', function() {
      if(lang !== 'en') {
        lang = 'en';
        setAboutLang('en');
        loadCVDataLang('en');
      }
    });
  }
  if(document.getElementById('btn-es-about')) {
    document.getElementById('btn-es-about').addEventListener('click', function() {
      if(lang !== 'es') {
        lang = 'es';
        setAboutLang('es');
        loadCVDataLang('es');
      }
    });
  }
});
