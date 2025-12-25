// --- SONIDO INTERACTIVO BOTONES ---
document.addEventListener('DOMContentLoaded', function() {
  const clickSound = document.getElementById('audio-btn-click');
  const hoverSound = document.getElementById('audio-btn-hover');
  // Play click sound on all buttons
  document.querySelectorAll('button, .cv-nav-btn, .idioma-btn, .copy-email-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play();
      }
    });
    btn.addEventListener('mouseenter', () => {
      if (hoverSound) {
        hoverSound.currentTime = 0;
        hoverSound.play();
      }
    });
  });
});
// === CARGA DINÁMICA DE CONTENIDO SEGÚN IDIOMA ===
document.addEventListener('DOMContentLoaded', function() {
  // Estado de idioma: 'en' o 'es'. Por defecto, inglés.
  let currentLang = 'en';

  // Cargar idioma desde localStorage si existe
  if (localStorage.getItem('portfolioLang')) {
    currentLang = localStorage.getItem('portfolioLang');
  }

  function loadLanguage(lang) {
    const jsonFile = lang === 'es' ? 'index-es.json' : 'index.json';
    fetch(jsonFile)
      .then(res => res.json())
      .then(data => {
        // MENÚ
        if(document.querySelectorAll('.menu-link-text')[0]) document.querySelectorAll('.menu-link-text')[0].textContent = data.menu.designWork;
        if(document.querySelectorAll('.menu-link-scroll')[0]) document.querySelectorAll('.menu-link-scroll')[0].textContent = data.menu.designWorkScroll;
        if(document.querySelectorAll('.menu-link-text')[1]) document.querySelectorAll('.menu-link-text')[1].textContent = data.menu.threeDWork;
        if(document.querySelectorAll('.menu-link-scroll')[1]) document.querySelectorAll('.menu-link-scroll')[1].textContent = data.menu.threeDWorkScroll;
        if(document.querySelector('.menu-link-about .menu-link-text')) document.querySelector('.menu-link-about .menu-link-text').textContent = data.menu.about;
        // BUBBLES
        if(document.querySelector('#designWorkBubble .bubble-text')) document.querySelector('#designWorkBubble .bubble-text').textContent = data.bubbles.designWork.main;
        if(document.querySelector('#designWorkBubble .bubble-scroll-text')) document.querySelector('#designWorkBubble .bubble-scroll-text').textContent = data.bubbles.designWork.scroll;
        if(document.querySelector('#tdWorkBubble .bubble-text')) document.querySelector('#tdWorkBubble .bubble-text').textContent = data.bubbles.threeDWork.main;
        if(document.querySelector('#tdWorkBubble .bubble-scroll-text')) document.querySelector('#tdWorkBubble .bubble-scroll-text').textContent = data.bubbles.threeDWork.scroll;
        if(document.querySelector('.bubble a[href="about.html"]')) document.querySelector('.bubble a[href="about.html"]').textContent = data.bubbles.about;
        // FOOTER
        if(document.querySelector('.colofon')) document.querySelector('.colofon').innerHTML = data.footer.copyright + '<br>' + data.footer.designedBy;
        // Corregir bug: limpiar y poner solo el texto correcto en .contactame
        if(document.querySelector('.contactame')) {
          let contactDiv = document.querySelector('.contactame');
          // Elimina todos los nodos de texto y <br> hasta el primer elemento que no sea texto ni <br>
          while (contactDiv.firstChild && (contactDiv.firstChild.nodeType === 3 || contactDiv.firstChild.tagName === 'BR')) {
            contactDiv.removeChild(contactDiv.firstChild);
          }
          // Inserta el texto traducido (con saltos de línea si los hay)
          const lines = data.footer.contact.split('\n');
          lines.forEach((line, idx) => {
            if(idx > 0) contactDiv.insertBefore(document.createElement('br'), contactDiv.firstChild);
            contactDiv.insertBefore(document.createTextNode(line), contactDiv.firstChild);
          });
        }
        if(document.querySelector('#copyEmailBtn .label')) document.querySelector('#copyEmailBtn .label').innerHTML = data.footer.copyEmail + '<span class="email-text"> ' + data.footer.copyEmailLabel + '</span>';
        // MAIN
        if(document.querySelector('.subtitular')) document.querySelector('.subtitular').textContent = data.main.subtitle;
        if(document.getElementById('fijo')) document.getElementById('fijo').textContent = data.main.ido;
        // Lista de skills
        const skillsList = document.querySelectorAll('.content4 ul.youcan li');
        if(skillsList && data.main.skills && skillsList.length === data.main.skills.length) {
          data.main.skills.forEach((txt, i) => { skillsList[i].textContent = txt; });
        }
        // MISC
        // NO cambiar la flecha animada, solo el texto de "vibe with me" si existe
        if(document.querySelector('.bubble-vibe')) document.querySelector('.bubble-vibe').textContent = data.misc.vibeWithMe;
      });
    // Actualizar botones activos
    if(document.getElementById('btn-eng')) {
      document.getElementById('btn-eng').classList.toggle('idioma-btn--active', lang === 'en');
    }
    if(document.getElementById('btn-es')) {
      document.getElementById('btn-es').classList.toggle('idioma-btn--active', lang === 'es');
    }
  }

  // Inicializar idioma
  loadLanguage(currentLang);

  // Botones de idioma
  if(document.getElementById('btn-eng')) {
    document.getElementById('btn-eng').addEventListener('click', function() {
      if(currentLang !== 'en') {
        currentLang = 'en';
        localStorage.setItem('portfolioLang', 'en');
        loadLanguage('en');
      }
    });
  }
  if(document.getElementById('btn-es')) {
    document.getElementById('btn-es').addEventListener('click', function() {
      if(currentLang !== 'es') {
        currentLang = 'es';
        localStorage.setItem('portfolioLang', 'es');
        loadLanguage('es');
      }
    });
  }
});
// FORZAR SCROLL AL TOP AL CARGAR PÁGINAS
// Desactivar restauración automática del scroll del navegador
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Forzar scroll al top al cargar la página
window.addEventListener('beforeunload', function() {
  window.scrollTo(0, 0);
});

window.addEventListener('load', function() {
  window.scrollTo(0, 0);
});

// También al cambiar de página
document.addEventListener('DOMContentLoaded', function() {
  window.scrollTo(0, 0);
});

// Navegación unificada (siempre hace fade-in antes de navegar)
function navigateTo(url) {
  if (!url) return;
  // No fade-in: navigate immediately
  window.location.href = url;
}

// Setup navegación
function setupSimpleNavigation() {
  // Capturar TODOS los enlaces internos (mismo origen) que no son solo hash
  const links = Array.from(document.querySelectorAll('a[href]'));
  const sameOriginLinks = links.filter((link) => {
    const href = link.getAttribute('href');
    if (!href) return false;
    // Ignorar anchors puros y enlaces con target _blank o downloads
    if (href === '#' || href.startsWith('#') || link.target === '_blank' || link.hasAttribute('download')) return false;
    try {
      const url = new URL(link.href, window.location.href);
      return url.origin === window.location.origin;
    } catch {
      return false;
    }
  });

  sameOriginLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const url = link.href;
      navigateTo(url);
    });
  });
}

// Ejecutar SIEMPRE al cargar cualquier página
document.addEventListener('DOMContentLoaded', function() {
  // Set up navigation without any opacity-based transition overlay
  setTimeout(setupSimpleNavigation, 200);

  // If a custom cursor exists, hide the system cursor to show yours clearly
  const hasCustomCursor = !!document.getElementById('cursor');
  if (hasCustomCursor) {
    document.documentElement.style.cursor = 'none';
    document.body.style.cursor = 'none';
  } else {
    document.documentElement.style.cursor = '';
    document.body.style.cursor = '';
  }
  // Ensure cursor element is above smoother layers
  const cursorEl = document.getElementById('cursor');
  if (cursorEl) {
    cursorEl.style.zIndex = '10003';
  }
});

// Diagnostic: report whether GSAP and plugins are available
console.log('GSAP loaded?', typeof gsap !== 'undefined');
console.log('ScrollTrigger loaded?', typeof ScrollTrigger !== 'undefined');
console.log('ScrollSmoother loaded?', typeof ScrollSmoother !== 'undefined');

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Re-enable ScrollSmoother with safe gating
let smoother;
if (typeof gsap !== 'undefined' && typeof ScrollSmoother !== 'undefined') {
  gsap.registerPlugin(ScrollSmoother);
  try {
    smoother = ScrollSmoother.create({
      smooth: 1.2,
      effects: true,
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      normalizeScroll: true,
    });
    document.documentElement.classList.add('smoother-active');
  } catch (e) {
    console.error('ScrollSmoother init failed:', e);
    document.documentElement.classList.remove('smoother-active');
  }
} else {
  console.warn('ScrollSmoother not available — using native scroll');
  document.documentElement.classList.remove('smoother-active');
}


const cursor = document.getElementById("cursor");
const videoCursor = document.getElementById("video-cursor");
const cursorImg = cursor ? cursor.querySelector("img") : null;

let mouseX = 0;
let mouseY = 0;
let prevMouseX = 0;
let videoCursorX = 0;
let videoCursorY = 0;
let currentDirection = "right"; // Track current direction to avoid unnecessary src changes

if (cursor) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.top = e.clientY + "px";
    cursor.style.left = e.clientX + "px";
    
    // Guardar la posición anterior para detectar dirección
    prevMouseX = mouseX;
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
}

// Cambiar cursor al hacer click
if (cursorImg) {
  document.addEventListener("mousedown", () => {
    cursorImg.src = "SVG/click.svg";
  });

  document.addEventListener("mouseup", () => {
    cursorImg.src = "SVG/cursor.svg";
  });
}

// Control del wink GIF - reproducir una vez al hacer clic
const winkGif = document.getElementById("winkGif");
if (winkGif) {
  let isPlaying = false;
  const staticSrc = "video/wink2.png"; // Primer frame estático
  const animatedSrc = "video/wink2.gif"; // GIF animado
  
  winkGif.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevenir que el click se propague
    
    if (!isPlaying) {
      isPlaying = true;
      
      // Efecto de escala al hacer clic
      gsap.to(winkGif, {
        scale: 0.9,
        duration: 0.1,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(winkGif, {
            scale: 1,
            duration: 0.3,
            ease: "elastic.out(1, 0.5)"
          });
        }
      });
      
      // Cambiar a la versión animada del GIF
      winkGif.src = animatedSrc + "?t=" + new Date().getTime();
      
      // Volver a la imagen estática después de que termine la animación
      setTimeout(() => {
        winkGif.src = staticSrc;
        isPlaying = false;
        // Navegar a index solo si NO estamos ya en index
        const isIndexPage = (
          window.location.pathname.includes('index.html') ||
          window.location.pathname === '/' ||
          window.location.pathname === ''
        );
        if (!isIndexPage) {
          navigateTo('index.html');
        }
      }, 1000); // Duración del GIF - ajusta según necesites
    }
  });
}


// Menu Toggle con GSAP
const menuOverlay = document.getElementById("menuOverlay");
const menuToggle = document.getElementById("menuToggle");
const menuClose = document.getElementById("menuClose");
const menuItems = document.querySelectorAll(".menu-item");

let menuOpen = false;

function openMenu() {
  menuOpen = true;
  menuOverlay.classList.add("active");
  
  // Animar entrada del menú
  gsap.to(menuOverlay, {
    opacity: 1,
    duration: 0.4,
    ease: "power2.out"
  });
  
  // Animar items con stagger
  menuItems.forEach((item, index) => {
    gsap.to(item, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      delay: 0.1 + (index * 0.1),
      ease: "back.out(1.4)"
    });
    
    // Efecto de vibración sutil en hover
    item.addEventListener("mouseenter", () => {
      gsap.to(item, {
        x: 10,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    item.addEventListener("mouseleave", () => {
      gsap.to(item, {
        x: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });
}

function closeMenu() {
  menuOpen = false;
  
  // Animar salida de items con transición más suave
  menuItems.forEach((item, index) => {
    gsap.to(item, {
      opacity: 0,
      x: -100,
      duration: 0.6,
      delay: (menuItems.length - index - 1) * 0.08,
      ease: "power2.out"
    });
  });
  
  // Cerrar overlay con fade out más gradual para mostrar el fondo
  gsap.to(menuOverlay, {
    opacity: 0,
    duration: 0.8,
    delay: 0.3,
    ease: "power1.out",
    onComplete: () => {
      menuOverlay.classList.remove("active");
    }
  });
}

if (menuToggle) {
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!menuOpen) {
      openMenu();
    }
  });
}

if (menuClose) {
  menuClose.addEventListener("click", () => {
    closeMenu();
  });
}

// Cerrar al hacer click en un link del menú
menuItems.forEach(item => {
  const link = item.querySelector(".menu-link");
  if (link) {
    link.addEventListener("click", () => {
      closeMenu();
    });
  }
});


// Animación suave con delay para el video cursor
function animateVideoCursor() {
  if (videoCursor) {
    // Interpolación suave (lerp) - ajusta 0.1 para más/menos delay
    videoCursorX += (mouseX - videoCursorX) * 0.007;
    videoCursorY += (mouseY - videoCursorY) * 0.007;
    
    videoCursor.style.left = videoCursorX + "px";
    videoCursor.style.top = videoCursorY + "px";
    
    // Detectar dirección y cambiar gif + aplicar espejo
    if (mouseX < prevMouseX && currentDirection !== "left") {
      // Movimiento hacia la izquierda - cambiar a vuelta.gif y aplicar espejo
      videoCursor.src = "video/vuelta.gif";
      videoCursor.style.transform = "translate(-50%, -50%) scaleX(-1)";
      currentDirection = "left";
    } else if (mouseX > prevMouseX && currentDirection !== "right") {
      // Movimiento hacia la derecha - cambiar a run4.gif normal
      videoCursor.src = "video/run4.gif";
      videoCursor.style.transform = "translate(-50%, -50%) scaleX(1)";
      currentDirection = "right";
    }
  }
  
  requestAnimationFrame(animateVideoCursor);
}

animateVideoCursor();

// Dynamic opacity for <li> elements based on distance from #fijo
function updateListOpacities() {
  const fijoElement = document.querySelector('#fijo');
  const listItems = document.querySelectorAll('ul li');
  
  if (!fijoElement || !listItems.length) return;

  // Get the center position of #fijo
  const fijoRect = fijoElement.getBoundingClientRect();
  const fijoCenterY = fijoRect.top + fijoRect.height / 2;
  
  const distances = [];

  // Calculate all distances
  listItems.forEach((li) => {
    const liRect = li.getBoundingClientRect();
    const liCenterY = liRect.top + liRect.height / 2;
    const distance = Math.abs(fijoCenterY - liCenterY);
    distances.push(distance);
  });

  // Sort to find which items are closest
  const sortedIndices = Array.from({length: distances.length}, (_, i) => i)
    .sort((a, b) => distances[a] - distances[b]);

  // Assign opacity based on rank (closest = most opaque, with bigger steps)
  const numItems = listItems.length;
  listItems.forEach((li, index) => {
    const rank = sortedIndices.indexOf(index); // 0 = closest, numItems-1 = farthest
    // Create discrete opacity levels with bigger steps
    // Example: 1, 0.7, 0.5, 0.3, 0.15 for 5 items
    const opacity = Math.max(0.1, 1 - (rank / numItems) * 2);
    li.style.opacity = opacity;
  });

  // Request next frame update for dynamic responsiveness
  requestAnimationFrame(updateListOpacities);
}

// Start the opacity update loop
updateListOpacities();



// If core GSAP and ScrollTrigger are available, run animations
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {

  //LETRAS LOCAS

  // Only run SplitType if #heading exists (index page)
  const heading = document.querySelector('#heading');
  if (heading) {
    const text = new SplitType("#heading", { types: "chars" });
    gsap.set("#heading", { autoAlpha: 1 });

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxDist = Math.sqrt(vw * vw + vh * vh) + 300;
    text.chars.forEach(char => {
      const angle = gsap.utils.random(0, Math.PI * 2);
      const dist = maxDist;
      char.dataset.toX = Math.cos(angle) * dist;
      char.dataset.toY = Math.sin(angle) * dist;
    });
    if (text.chars && text.chars.length) {
      gsap.to(text.chars, {
        x: i => text.chars[i].dataset.toX,
        y: i => text.chars[i].dataset.toY,
        ease: "none",
        scrollTrigger: {
          trigger: "#smooth-wrapper",
          start: "top top",
          end: "100%",
          scrub: true
        }
      });
    }
  }



// // COLOR FONDO - animate CSS variables using their computed values (only on index page)
// if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
//   const rootStyles = getComputedStyle(document.documentElement);
//   const startBg = rootStyles.getPropertyValue('--bg').trim() || '#ffffff';
//   const accentColor = rootStyles.getPropertyValue('--accent').trim() || '#0d6efd';

//   // Ensure initial bg is set to the start value to avoid flashes
//   if (document.documentElement) {
//     gsap.set(document.documentElement, { '--bg': startBg });
//     gsap.fromTo(document.documentElement,
//       { '--bg': startBg },
//       {
//         '--bg': accentColor,
//         ease: "none",
//         immediateRender: false,
//         scrollTrigger: {
//           trigger: "#smooth-wrapper",
//           start: "top top",
//           end: "80%",
//           scrub: true
//         }
//       }
//     );
//   }
// }


// COLOR FONDO - animate CSS variables using their computed values (responsive for mobile)
if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
  const rootStyles = getComputedStyle(document.documentElement);
  const startBg = rootStyles.getPropertyValue('--bg').trim() || '#ffffff';
  const accentColor = rootStyles.getPropertyValue('--accent').trim() || '#0d6efd';

  // Detect mobile
  const isMobile = window.innerWidth <= 768;

  // Puedes personalizar el color final en móvil si lo deseas:
  const mobileAccent = accentColor; // o por ejemplo: '#f7e8ff'

  if (document.documentElement) {
    gsap.set(document.documentElement, { '--bg': startBg });
    gsap.fromTo(
      document.documentElement,
      { '--bg': startBg },
      {
        '--bg': isMobile ? mobileAccent : accentColor,
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
          trigger: "#smooth-wrapper",
          start: "top top",
          end: isMobile ? "25%" : "80%", // animación más corta en móvil
          scrub: true
        }
      }
    );
  }
}

// EFECTOS ESPECÍFICOS DE INDEX.HTML
console.log('Current pathname:', window.location.pathname);
console.log('Is index page:', window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname === '');

if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
  console.log('Executing index-specific effects...');
  
  // Definir accent color para efectos de índice
  const accentColor = '#0d6efd';
  
  // Verificar que el elemento fijo existe
  const fijoElement = document.querySelector('#fijo');
  console.log('Fijo element found:', fijoElement);

// ARROW OPACITY

if (document.querySelector('.header-down-arrow')) {
  gsap.fromTo('.header-down-arrow',
    { opacity: 1 },
    {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#smooth-wrapper',
        start: 'top 0%',
        end: '35%',
        scrub: true
      }
    }
  );
}


// SUBTITULAR OPACITY

if (document.querySelector('.subtitular')) {
  gsap.fromTo('.subtitular',
    { opacity: 1 },
    {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#smooth-wrapper',
        start: 'top 0%',
        end: '35%',
        scrub: true
      }
    }
  );
}

// Fade out titular while the accent background comes in (reversible on scroll)
if (document.querySelector('.titular')) {
  gsap.fromTo('.titular',
    { opacity: 1 },
    {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#smooth-wrapper',
        start: 'top -10%',
        end: '45%',
        scrub: true
      }
    }
  );
}

// Animate .youcan opacity synced with background color trigger
// Start invisible, fade in as background changes
if (document.querySelector('.youcan')) {
  gsap.fromTo('.youcan', 
    { opacity: 0 },
    {
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "#smooth-wrapper",
        start: "top -10%",
        end: "15%",
        scrub: true
      }
    }
  );
}
  // Bubble entrance: alternate left/right into center as each bubble reaches viewport center
  const bubbles = document.querySelectorAll('.bubble');
  if (bubbles && bubbles.length) {
    bubbles.forEach((bubble, index) => {
      const fromLeft = index % 2 === 0;
      gsap.fromTo(bubble,
        { x: fromLeft ? '-40vw' : '40vw' },
        {
          x: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bubble,
            start: 'top bottom',
            end: () => ScrollTrigger.maxScroll(window),
            scrub: true
          }
        }
      );
      const rotationDirection = index % 2 === 0 ? 1 : -1;
      bubble.addEventListener('mouseenter', (e) => {
        gsap.to(bubble, {
          scale: 1.08,
          rotation: 4 * rotationDirection,
          borderColor: '#0d6efd',
          backgroundColor: '#f0f7ff',
          duration: 0.4,
          ease: 'back.out(1.2)',
        });
      });
      bubble.addEventListener('mouseleave', () => {
        gsap.to(bubble, {
          scale: 1,
          rotation: 0,
          borderColor: '#000000',
          backgroundColor: 'white',
          duration: 0.4,
          ease: 'power2.out',
        });
      });
    });
  }


// Animate .container opacity synced with background color trigger
if (document.querySelector('.container')) {
  gsap.fromTo('.container', 
    { opacity: 0 },
    {
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "#smooth-wrapper",
        start: "top -10%",
        end: "15%",
        scrub: true
      }
    }
  );
}

// Fade background back to start color after bubbles (reversible with scrub)
// Only applies on desktop (>768px)
if (window.innerWidth > 768 && document.querySelector('.container')) {
  gsap.fromTo(document.documentElement, 
    { '--bg': accentColor },
    { 
      ease: "none",
      immediateRender: false,
      scrollTrigger: {
        trigger: ".container",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true
      }
    }
  );
}




// ESTRELLA SCROLL

gsap.registerPlugin(ScrollTrigger);

const svg = document.querySelector("#miSVG");
let currentRotation = 0;
if (svg) {
  ScrollTrigger.create({
    onUpdate: (self) => {
      const velocity = self.getVelocity();
      const rotationAmount = velocity / 300;
      currentRotation += rotationAmount;
      gsap.to(svg, {
        rotation: currentRotation,
        duration: 0.5,
        ease: "power2.out",
        transformOrigin: "50% 50%"
      });
    }
  });
}

  // ELEMENTO FIJO SCROLL
  // Dynamic end: pin until the 5th <li> ends (fallback to last)
  console.log('Setting up content4 pin...');
  const content4Element = document.querySelector('.content4');
  const fijoPin = document.querySelector('#fijo');
  if (content4Element && fijoPin) {
    ScrollTrigger.create({
      trigger: ".content4",
      start: () => window.matchMedia('(max-width: 768px)').matches ? 'center-=20 center' :  'center-=350 center',
      end: () => {
        const listItems = document.querySelectorAll('ul li');
        if (listItems.length > 0) {
          const targetLi = listItems[Math.min(4, listItems.length - 1)];
          const targetRect = targetLi.getBoundingClientRect();
          const contentRect = document.querySelector('.content4').getBoundingClientRect();
          const endValue = `+=${(targetRect.bottom + window.scrollY) - (contentRect.top + window.scrollY)}`;
          return endValue;
        }
        return 'bottom -80%';
      },
      pin: "#fijo",
      markers: false,
      invalidateOnRefresh: true,
      onUpdate: self => console.log('Pin progress:', self.progress),
      onToggle: self => console.log('Pin active:', self.isActive)
    });
  }

}

} // FIN DE EFECTOS ESPECÍFICOS DE INDEX.HTML

// Refresh ScrollTrigger después de inicialización
if (typeof ScrollTrigger !== 'undefined') {
  // Refresh after smoother so pins/triggers recalc correctly
  setTimeout(() => ScrollTrigger.refresh(), 0);
}
 
// COPY EMAIL BUTTON

  const email = "robleshaloui@gmail.com";
  const btn = document.getElementById("copyEmailBtn");
  const label = btn.querySelector(".label");
  const icon = btn.querySelector(".icon");

  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);

      btn.classList.add("copied");
      const isMobile = window.innerWidth <= 768;
      label.innerHTML = isMobile ? "COPIED" : "COPIED<span class=\"email-text\"> E-MAIL</span>";
      icon.textContent = "check";

      setTimeout(() => {
        btn.classList.remove("copied");
        label.innerHTML = isMobile ? "COPY<span class=\"email-text\"> E-MAIL</span>" : "COPY<span class=\"email-text\"> E-MAIL</span>";
        icon.textContent = "mail";
      }, 2000);
    } catch (err) {
      console.error("No se pudo copiar el email", err);
    }
  });