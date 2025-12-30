// --- UNIVERSAL BUTTON SOUND EFFECTS ---
document.addEventListener('DOMContentLoaded', function() {
  // Inject audio elements if not present
  if (!document.getElementById('audio-btn-click')) {
    const clickAudio = document.createElement('audio');
    clickAudio.id = 'audio-btn-click';
    clickAudio.src = 'sounds/click.mp3';
    clickAudio.preload = 'auto';
    document.body.appendChild(clickAudio);
  }

  const clickSound = document.getElementById('audio-btn-click');
  const hoverSound = document.getElementById('audio-btn-hover');
  // Play click sound on all buttons and elements with role=button
  document.querySelectorAll('button, [role="button"], .cv-nav-btn, .idioma-btn, .copy-email-btn').forEach(btn => {
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
