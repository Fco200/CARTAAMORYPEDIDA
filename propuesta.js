/* =========================================================
   Lógica de la propuesta — Para Grisell Mariana Cruz Fuentes
   ========================================================= */

/* ---------- animación de entrada (anime.js) ---------- */
function animarEntrada() {
  if (typeof anime === 'undefined') return;

  anime({
    targets: '#gatoPrincipal',
    translateY: [40, 0],
    scale: [0.4, 1],
    opacity: [0, 1],
    duration: 900,
    easing: 'easeOutElastic(1, .6)'
  });

  anime({
    targets: '#ramoPrincipal',
    scale: [0, 1],
    rotate: [-30, 0],
    opacity: [0, 1],
    duration: 900,
    delay: 150,
    easing: 'easeOutBack'
  });

  // el gato se mece suavemente para siempre
  anime({
    targets: '#gatoPrincipal',
    rotate: [-7, 7],
    translateY: [0, -8],
    duration: 1700,
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine',
    delay: 1100
  });

  // el ramo flota
  anime({
    targets: '#ramoPrincipal',
    translateY: [0, -10],
    duration: 1500,
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine',
    delay: 1100
  });
}

if (typeof anime !== 'undefined') {
  document.addEventListener('DOMContentLoaded', animarEntrada);
}

/* ---------- modal del NO ---------- */
const frasesNo = [
  { c: '🥺', t: '¿Dijiste que no?', d: 'Uy… a este gatito se le cayó el ramo cuando te escuchó. ¿Segura, mi amor? A veces el corazón se equivoca con la primera respuesta. 🐾💔' },
  { c: '😿', t: '¿De verdad, Grisell?', d: 'Mira que aquí hay un ramo esperando tu mano y un gato dispuesto a ronronear solo para ti. ¿Le damos otra chance? 🥀' },
  { c: '🙈', t: 'Ay… eso sonó fuerte', d: 'Pero contigo soy paciente y terco. El botón “Sí” está brillando y creo que te llama bajito, ¿lo escuchas? 💗' },
  { c: '🐱💐', t: 'El gato no acepta un no', d: 'Dice que te va a esperar con su ramito todo lo que haga falta, con tal de verte sonreír. Sin presión… bueno, poquita. 💞' },
  { c: '💐', t: 'Mi último intento', d: 'Te propongo un trato: di que sí y te prometo el ramo, los chocolates, las risas y unos cuantos abrazos apretados. 🥰' }
];

let indiceNo = 0;
const overlay = document.getElementById('overlay');
const btnNo = document.getElementById('btnNo');

function abrirNo() {
  const f = frasesNo[Math.min(indiceNo, frasesNo.length - 1)];
  document.getElementById('caritaNo').textContent = f.c;
  document.getElementById('tituloNo').textContent = f.t;
  document.getElementById('textoNo').textContent = f.d;
  indiceNo++;
  overlay.classList.add('activo');

  // el botón del modal "No/volver" también se escapa si intentan tocarlo en general
  if (typeof anime !== 'undefined') {
    anime({ targets: '.modal', scale: [0.7, 1], duration: 500, easing: 'easeOutElastic(1, .7)' });
  }
}

function cerrarNo() {
  overlay.classList.remove('activo');
}

/* el botón "No…" se escapa y se hace más pequeñito cada vez */
let toquesNo = 0;
if (btnNo) {
  const asustarNo = () => {
    const dx = (Math.random() - 0.5) * 90;
    const dy = (Math.random() - 0.5) * 60;
    const escala = Math.max(0.55, 1 - toquesNo * 0.09);
    btnNo.style.transform = `translate(${dx}px, ${dy}px) scale(${escala})`;
    setTimeout(() => { btnNo.style.transform = `scale(${escala})`; }, 350);
    document.getElementById('btnSi').style.transform = `scale(${Math.min(1.35, 1 + toquesNo * 0.08)})`;
  };
  btnNo.addEventListener('mouseenter', () => { if (Math.random() < 0.6) asustarNo(); });
  btnNo.addEventListener('touchstart', asustarNo, { passive: true });
  btnNo.addEventListener('click', () => { toquesNo++; });
}

/* ---------- botón SÍ ---------- */
let intervaloFiesta = null;

function decirSi() {
  if (overlay) overlay.classList.remove('activo');
  const celeb = document.getElementById('celebracion');
  celeb.classList.add('activo');
  celeb.scrollTop = 0;

  iniciarFiesta();
}

/* ---------- confeti (canvas-confetti) ---------- */
function iniciarFiesta() {
  if (typeof confetti !== 'function') {
    // respaldo por si el CDN no carga
    for (let i = 0; i < 3; i++) setTimeout(() => caerEmojis(), i * 500);
    return;
  }

  const colores = ['#ff5c8a', '#ff8fb3', '#c084fc', '#ffd166', '#ffffff'];

  // formas de corazón y rosa (si la librería las soporta)
  let formas = colores;
  try {
    formas = [
      confetti.shapeFromText({ text: '❤️', scalar: 3 }),
      confetti.shapeFromText({ text: '💖', scalar: 3 }),
      confetti.shapeFromText({ text: '🌹', scalar: 3 })
    ];
  } catch (e) { formas = colores; }

  const lanzar = () => {
    // ráfaga central
    confetti({ particleCount: 60, spread: 90, origin: { y: 0.6 }, colors: colores, scalar: 1.1 });
    // lluvia de corazones
    confetti({ particleCount: 22, spread: 120, origin: { y: 0.4 }, shapes: formas, scalar: 1.6, startVelocity: 38 });
    // laterales
    confetti({ particleCount: 30, angle: 60, spread: 70, origin: { x: 0 }, colors: colores });
    confetti({ particleCount: 30, angle: 120, spread: 70, origin: { x: 1 }, colors: colores });
  };

  lanzar();
  setTimeout(lanzar, 500);
  if (!intervaloFiesta) intervaloFiesta = setInterval(lanzar, 1600);

  // animación de los ramos/gato de la celebración
  if (typeof anime !== 'undefined') {
    anime({ targets: '#ramoFinal', scale: [0, 1], rotate: ['-20deg', '0deg'], duration: 900, easing: 'easeOutBack' });
    anime({ targets: '#gatoFinal', scale: [0, 1], duration: 800, delay: 200, easing: 'easeOutElastic(1, .6)' });
    anime({ targets: '#gatoFinal', rotate: [-6, 6], duration: 1500, direction: 'alternate', loop: true, easing: 'easeInOutSine', delay: 900 });
  }
}

/* respaldo de emojis si canvas-confetti no carga */
function caerEmojis() {
  const partes = ['💖', '🌹', '✨', '💐', '🎉', '💕', '🌸', '⭐'];
  for (let i = 0; i < 24; i++) {
    const c = document.createElement('div');
    c.textContent = partes[Math.floor(Math.random() * partes.length)];
    c.style.cssText = `position:fixed;top:-30px;left:${Math.random() * 100}vw;z-index:70;pointer-events:none;font-size:${16 + Math.random() * 22}px;`;
    const dur = 2.6 + Math.random() * 2.4;
    c.animate(
      [{ transform: 'translateY(0) rotate(0)' }, { transform: 'translateY(110vh) rotate(720deg)' }],
      { duration: dur * 1000, easing: 'linear' }
    );
    document.body.appendChild(c);
    setTimeout(() => c.remove(), (dur + 1) * 1000);
  }
}
