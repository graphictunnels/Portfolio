
function setThreeDLang(lang) {
  localStorage.setItem('portfolioLang', lang);
}

function updateThreeDTexts(lang) {
  const dataFile = lang === 'es' ? 'threeD-data-es.json' : 'threeD-data.json';
  fetch(dataFile)
    .then(res => res.json())
    .then(data => {
      // Main title and paragraph
      const mainTitle = document.getElementById('mainTitle');
      if (mainTitle) mainTitle.innerHTML = data.mainTitle;
      const mainParagraph = document.getElementById('mainParagraph');
      if (mainParagraph) mainParagraph.innerHTML = data.mainParagraph;
      // Navigation menu
      const navDesignWork = document.getElementById('navDesignWork');
      if (navDesignWork) navDesignWork.innerHTML = data.navDesignWork;
      const navDesignScroll = document.getElementById('navDesignScroll');
      if (navDesignScroll) navDesignScroll.innerHTML = data.navDesignScroll;
      const navAbout = document.getElementById('navAbout');
      if (navAbout) navAbout.innerHTML = data.navAbout;
      const navCoffee = document.getElementById('navCoffee');
      if (navCoffee) navCoffee.innerHTML = data.getCoffee;
      const navHome = document.getElementById('navHome');
      if (navHome) navHome.innerHTML = data.navHome;

      // Footer navigation
      const footerDesignWork = document.getElementById('footerDesignWork');
      if (footerDesignWork) footerDesignWork.innerHTML = data.navDesignWork;
      const footerDesignScroll = document.getElementById('footerDesignScroll');
      if (footerDesignScroll) footerDesignScroll.innerHTML = data.navDesignScroll;
      const footerAbout = document.getElementById('footerAbout');
      if (footerAbout) footerAbout.innerHTML = data.navAbout;
      // Botón GET COFFEE
      const getCoffeeBtnText = document.getElementById('getCoffeeBtnText');
      if (getCoffeeBtnText && data.getCoffee) getCoffeeBtnText.innerHTML = data.getCoffee;
      // Spotify Canva
      const spotifyCanva = document.getElementById('spotifyCanva');
      if (spotifyCanva) spotifyCanva.innerHTML = data.spotifyCanva;
      // Promo Animation
      const promoAnimation = document.getElementById('promoAnimation');
      if (promoAnimation) promoAnimation.innerHTML = data.promoAnimation;
      // Concept Art
      const conceptArt = document.getElementById('conceptArt');
      if (conceptArt) conceptArt.innerHTML = data.conceptArt;
      // Cover Design
      const coverDesign = document.getElementById('coverDesign');
      if (coverDesign) coverDesign.innerHTML = data.coverDesign;
      // Sticker Design
      const stickerDesign = document.getElementById('stickerDesign');
      if (stickerDesign) stickerDesign.innerHTML = data.stickerDesign;
      // Storyboard
      const storyboard = document.getElementById('storyboard');
      if (storyboard) storyboard.innerHTML = data.storyboard;
      // Blender paragraph
      const blenderParagraph = document.getElementById('blenderParagraph');
      if (blenderParagraph) blenderParagraph.innerHTML = data.blenderParagraph;
      // Character title and paragraph
      const characterTitle = document.getElementById('characterTitle');
      if (characterTitle) characterTitle.innerHTML = data.characterTitle;
      const characterParagraph = document.getElementById('characterParagraph');
      if (characterParagraph) characterParagraph.innerHTML = data.characterParagraph;
      // Game dev title, paragraph, extra
      const gameDevTitle = document.getElementById('gameDevTitle');
      if (gameDevTitle) gameDevTitle.innerHTML = data.gameDevTitle;
      const gameDevParagraph = document.getElementById('gameDevParagraph');
      if (gameDevParagraph) gameDevParagraph.innerHTML = data.gameDevParagraph;
      const gameDevExtra = document.getElementById('gameDevExtra');
      if (gameDevExtra) gameDevExtra.innerHTML = data.gameDevExtra;
      // Play button
      const playBtn = document.getElementById('playBtn');
      if (playBtn) playBtn.innerHTML = data.playBtn;
      // Game prop title and paragraph
      const gamePropTitle = document.getElementById('gamePropTitle');
      if (gamePropTitle) gamePropTitle.innerHTML = data.gamePropTitle;
      const gamePropParagraph = document.getElementById('gamePropParagraph');
      if (gamePropParagraph) gamePropParagraph.innerHTML = data.gamePropParagraph;
      // Visual brainstorming
      const visualBrainstorming = document.getElementById('visualBrainstorming');
      if (visualBrainstorming) visualBrainstorming.innerHTML = data.visualBrainstorming;
      // Clean sketch
      const cleanSketch = document.getElementById('cleanSketch');
      if (cleanSketch) cleanSketch.innerHTML = data.cleanSketch;
      // Experimental experience title and paragraph
      const expTitle = document.getElementById('expTitle');
      if (expTitle) expTitle.innerHTML = data.expTitle;
      const expParagraph = document.getElementById('expParagraph');
      if (expParagraph) expParagraph.innerHTML = data.expParagraph;
      // Play button 2
      const playBtn2 = document.getElementById('playBtn2');
      if (playBtn2) playBtn2.innerHTML = data.playBtn2;
      // Idioma buttons highlight
      const btnEng = document.getElementById('btn-eng-threeD');
      const btnEsp = document.getElementById('btn-es-threeD');
      if (btnEng) btnEng.classList.toggle('idioma-btn--active', lang === 'en');
      if (btnEsp) btnEsp.classList.toggle('idioma-btn--active', lang === 'es');
    });
}

document.addEventListener('DOMContentLoaded', function () {
  let lang = localStorage.getItem('portfolioLang') || 'en';
  updateThreeDTexts(lang);
  const btnEng = document.getElementById('btn-eng-threeD');
  const btnEsp = document.getElementById('btn-es-threeD');
  if (btnEng) btnEng.addEventListener('click', function () {
    setThreeDLang('en');
    updateThreeDTexts('en');
  });
  if (btnEsp) btnEsp.addEventListener('click', function () {
    setThreeDLang('es');
    updateThreeDTexts('es');
  });
});
