
function setDesignLang(lang) {
  localStorage.setItem('portfolioLang', lang);
}

function updateDesignTexts(lang) {
  const dataFile = lang === 'es' ? 'design-data-es.json' : 'design-data.json';
  fetch(dataFile)
    .then(res => res.json())
    .then(data => {
      // Botón GET COFFEE (footer)
      const getCoffeeBtnText = document.getElementById('getCoffeeBtnText');
      if (getCoffeeBtnText && data.getCoffeeBtn) getCoffeeBtnText.textContent = data.getCoffeeBtn;
      // Tesis principal
      const thesisTextDiv = document.getElementById('designThesisText');
      if (thesisTextDiv && data.thesisText) {
        thesisTextDiv.innerHTML =
          data.thesisText.lines.map(line => `${line}<br>`).join('') +
          '<hr class="design-thesis-hr">' +
          `<span class="design-thesis-sub">${data.thesisText.subtitle}</span>`;
      }
      // Before redesign
      const beforeRedesign = document.querySelector('.cv-container--design .row.mb-4 .design-paragraph');
      if (beforeRedesign) beforeRedesign.innerHTML = data.beforeRedesign;
      // Logo paragraph
      const logoParagraph = document.querySelector('.cv-container--design .row.mb-3 .design-paragraph');
      if (logoParagraph) logoParagraph.innerHTML = data.logoParagraph;
      // Logo legends
      const legendOriginal = document.querySelector('.legend-pair .detail');
      if (legendOriginal) legendOriginal.textContent = data.logoLegendOriginal;
      const legendModified = document.querySelector('.legend-modified-col .detail');
      if (legendModified) legendModified.textContent = data.logoLegendModified;
      // Logo font paragraph
      const logoFontParagraph = document.querySelector('.cv-container--design .row.mb-3.align-items-stretch .order-2 .design-paragraph');
      if (logoFontParagraph) logoFontParagraph.innerHTML = data.logoFontParagraph;
      // Bookmark caption
      const bookmarkCaption = document.querySelector('img[alt="Compluinforma Logo"] ~ .container-fluid .caption-text');
      if (bookmarkCaption) bookmarkCaption.textContent = data.bookmarkCaption;
      // Credential caption
      const credentialCaption = document.querySelector('img[alt="Logo"] ~ .container-fluid .caption-text');
      if (credentialCaption) credentialCaption.textContent = data.credentialCaption;
      // Manual paragraph
      // Manual and handbook paragraphs (robust selector by order)
      const manualParagraphEl = document.getElementById('manualParagraph');
      if (manualParagraphEl) manualParagraphEl.innerHTML = data.manualParagraph;
      const handbookParagraphEl = document.getElementById('handbookParagraph');
      if (handbookParagraphEl) handbookParagraphEl.innerHTML = data.handbookParagraph;
      // Instagram feed caption (robusto por id)
      const instagramFeedCaption = document.getElementById('instagramFeedCaption');
      if (instagramFeedCaption) instagramFeedCaption.textContent = data.instagramFeedCaption;
      // Instagram carousel caption
      // Fix: Use robust selector for the carousel caption (row 4, col 2)
      const carouselCol2 = document.querySelector('#carouselRow4Col2b');
      if (carouselCol2) {
        const carouselCaption = carouselCol2.parentElement.querySelector('.caption-row .caption-text');
        if (carouselCaption && data.instagramCarouselCaption) carouselCaption.textContent = data.instagramCarouselCaption;
      }

      // Web caption
      const webCaption = document.querySelector('#carouselCapturaWeb ~ .caption-row .caption-text');
      if (webCaption) webCaption.textContent = data.webCaption;
      // Web paragraph
      const webParagraph = document.querySelector('#carouselCapturaWeb').parentElement.parentElement.nextElementSibling.querySelector('.design-paragraph');
      if (webParagraph) webParagraph.innerHTML = data.webParagraph;
      // Stats web caption
      const statsWebCaption = document.querySelector('img[src="SVG/grafico2.svg"] ~ .row .caption-text');
      if (statsWebCaption) statsWebCaption.textContent = data.statsWebCaption;
      // Stats Instagram caption
      const statsInstagramCaption = document.querySelector('img[src="SVG/grafico1.svg"] ~ .row .caption-text');
      if (statsInstagramCaption) statsInstagramCaption.textContent = data.statsInstagramCaption;
      // Thesis honours paragraph
      const thesisHonoursParagraph = Array.from(document.querySelectorAll('.cv-container--design .row.mb-3.align-items-stretch .design-paragraph')).find(el => el.innerHTML.includes('Honours') || el.innerHTML.includes('Matrícula') || el.innerHTML.includes('maximum and extraordinary grade') || el.innerHTML.includes('máxima y extraordinaria calificación'));
      if (thesisHonoursParagraph) thesisHonoursParagraph.innerHTML = data.thesisHonoursParagraph;
      // Nav buttons (footer)
      const navBtns = document.querySelectorAll('.cv-nav-btn-row .cv-nav-btn');
      if (navBtns[0]) {
        navBtns[0].querySelector('.bubble-text').textContent = data.nav3dwork;
        navBtns[0].querySelector('.bubble-scroll-text').textContent = data.nav3dworkScroll;
      }

      // Botón ABOUT/SOBRE MI (usando id para robustez)
      const aboutBtnText = document.getElementById('aboutBtnText');
      if (aboutBtnText) aboutBtnText.textContent = data.navAbout;
      // Asegura que solo el último botón (HOME) tenga el icono de casa
      if (navBtns.length > 0) {
        const homeBtn = navBtns[navBtns.length - 1];
        if (homeBtn) homeBtn.innerHTML = '<i class="bi bi-house-fill"></i>';
      }

      // Menu bocadillo (overlay)
      if(document.getElementById('navThreeDWork')) document.getElementById('navThreeDWork').textContent = data.nav3dwork;
      if(document.getElementById('navThreeDWorkScroll')) document.getElementById('navThreeDWorkScroll').textContent = data.nav3dworkScroll;
      if(document.getElementById('navAbout')) document.getElementById('navAbout').textContent = data.navAbout;
      if(document.getElementById('navCoffee')) document.getElementById('navCoffee').textContent = data.navCoffee;
      if(document.getElementById('navHome')) document.getElementById('navHome').textContent = data.navHome;

      // === DAMNED BABIES SECTION ===
      // Paragraph
      const damnedParagraph = document.querySelector('.damned-paragraph');
      if (damnedParagraph && data.damnedParagraph) damnedParagraph.innerHTML = data.damnedParagraph;
      // Reel caption
      const damnedReelCaption = document.getElementById('damnedReelCaption');
      if (damnedReelCaption && data.damnedReelCaption) damnedReelCaption.textContent = data.damnedReelCaption;
      // Promo pics caption
      const damnedPromoPicsCaption = document.getElementById('damnedPromoPicsCaption');
      if (damnedPromoPicsCaption && data.damnedPromoPicsCaption) damnedPromoPicsCaption.textContent = data.damnedPromoPicsCaption;
      // Rotate caption
      const damnedRotateCaption = document.getElementById('damnedRotateCaption');
      if (damnedRotateCaption && data.damnedRotateCaption) damnedRotateCaption.textContent = data.damnedRotateCaption;
      // Color sketches caption
      const damnedColorSketchesCaption = document.getElementById('damnedColorSketchesCaption');
      if (damnedColorSketchesCaption && data.damnedColorSketchesCaption) damnedColorSketchesCaption.textContent = data.damnedColorSketchesCaption;
      // First sketch caption
      const damnedFirstSketchCaption = document.getElementById('damnedFirstSketchCaption');
      if (damnedFirstSketchCaption && data.damnedFirstSketchCaption) damnedFirstSketchCaption.textContent = data.damnedFirstSketchCaption;
      // Inspiration paragraph
      const damnedInspirationParagraph = document.getElementById('damnedInspirationParagraph');
      if (damnedInspirationParagraph && data.damnedInspirationParagraph) damnedInspirationParagraph.innerHTML = data.damnedInspirationParagraph;
      // Process paragraph
      const damnedProcessParagraph = document.getElementById('damnedProcessParagraph');
      if (damnedProcessParagraph && data.damnedProcessParagraph) damnedProcessParagraph.innerHTML = data.damnedProcessParagraph;
      // Process caption
      const damnedProcessCaption = document.getElementById('damnedProcessCaption');
      if (damnedProcessCaption && data.damnedProcessCaption) damnedProcessCaption.textContent = data.damnedProcessCaption;
      // Nav design work (botón)
      const navDesignWorkBtn = document.getElementById('threeDWorkBtn');
      if (navDesignWorkBtn && data.damnedNavDesignWork) {
        const bubbleText = navDesignWorkBtn.querySelector('.bubble-text');
        if (bubbleText) bubbleText.textContent = data.damnedNavDesignWork;
      }
      // Footer
      const colofon = document.querySelector('.footer-about .colofon');
      if (colofon) colofon.innerHTML = `${data.footerCopyright} <br />${data.footerDesignedBy}`;
      const contactame = document.querySelector('.footer-about .contactame');
      if (contactame) contactame.childNodes[0].nodeValue = data.footerContact.split('\n')[0] + ' ';
      const copyBtn = document.getElementById('copyEmailBtn');
      if (copyBtn) {
        const label = copyBtn.querySelector('.label');
        const emailText = copyBtn.querySelector('.email-text');
        if (label) label.childNodes[0].nodeValue = data.footerCopyEmail;
        if (emailText) emailText.textContent = ' ' + data.footerCopyEmailLabel;
      }
      // Activar botón idioma actual
      const btnEng = document.getElementById('btn-eng-design');
      const btnEsp = document.getElementById('btn-es-design');
      if (btnEng) btnEng.classList.toggle('idioma-btn--active', lang === 'en');
      if (btnEsp) btnEsp.classList.toggle('idioma-btn--active', lang === 'es');
    });
}

document.addEventListener('DOMContentLoaded', function() {
  let lang = localStorage.getItem('portfolioLang') || 'en';
  updateDesignTexts(lang);
  const btnEng = document.getElementById('btn-eng-design');
  const btnEsp = document.getElementById('btn-es-design');
  if (btnEng) {
    btnEng.addEventListener('click', function() {
      if (lang !== 'en') {
        lang = 'en';
        setDesignLang('en');
        updateDesignTexts('en');
      }
    });
  }
  if (btnEsp) {
    btnEsp.addEventListener('click', function() {
      if (lang !== 'es') {
        lang = 'es';
        setDesignLang('es');
        updateDesignTexts('es');
      }
    });
  }
});
// Pintado dinámico de datos para design.html

function getCurrentLang() {
  if (localStorage.getItem('portfolioLang')) {
    return localStorage.getItem('portfolioLang');
  }
  return 'en';
}

const lang = getCurrentLang();
const dataFile = lang === 'es' ? 'design-data-es.json' : 'design-data.json';
fetch(dataFile)
  .then(res => res.json())
  .then(data => {
    // Pintar texto de la tesis
    const thesisTextDiv = document.getElementById('designThesisText');
    if (thesisTextDiv && data.thesisText) {
      thesisTextDiv.innerHTML =
        data.thesisText.lines.map(line => `${line}<br>`).join('') +
        '<hr class="design-thesis-hr">' +
        `<span class="design-thesis-sub">${data.thesisText.subtitle}</span>`;
    }
    // Pintar logo (opcional, si quieres hacerlo dinámico)
    const logoImg = document.querySelector('img[alt="Compluinforma Logo"]');
    if (logoImg && data.logoSrc) {
      logoImg.src = data.logoSrc;
    }
  });
