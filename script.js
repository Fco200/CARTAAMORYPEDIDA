/* =========================================================
   Script compartido — Para Grisell Mariana Cruz Fuentes
   ========================================================= */

/* ---------- corazones/pétalos flotantes de fondo ---------- */
(function iniciarFondo() {
  const emojis = ['❤️', '💕', '💖', '💗', '🌸', '💞', '🌹', '✨', '💘'];
  const contBg = document.getElementById('hearts-bg');
  if (!contBg) return;

  function crearCorazon() {
    const h = document.createElement('div');
    h.className = 'heart-bg';
    h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    h.style.left = Math.random() * 100 + 'vw';
    h.style.fontSize = (14 + Math.random() * 22) + 'px';
    const dur = 9 + Math.random() * 8;
    h.style.animationDuration = dur + 's';
    h.style.animationDelay = Math.random() * 4 + 's';
    contBg.appendChild(h);
    setTimeout(() => h.remove(), (dur + 5) * 1000);
  }

  for (let i = 0; i < 14; i++) setTimeout(crearCorazon, i * 380);
  setInterval(crearCorazon, 900);
})();

/* ---------- AOS (animaciones al hacer scroll) ---------- */
window.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 850, easing: 'ease-out-cubic', once: true, offset: 60 });
  } else {
    // si el CDN no carga, mostramos todo igual
    document.querySelectorAll('[data-aos]').forEach((el) => {
      el.removeAttribute('data-aos');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }
});

/* ---------- música ---------- */
function alternarMusica() {
  const audio = document.getElementById('audioMusica');
  const btn = document.getElementById('musica');
  if (!audio || !btn) return;
  if (audio.paused) {
    audio.volume = 0.35;
    audio.play()
      .then(() => { btn.textContent = '⏸️'; })
      .catch(() => { alert('Activa el audio en tu navegador para escuchar la música 🎵'); });
  } else {
    audio.pause();
    btn.textContent = '🎵';
  }
}
