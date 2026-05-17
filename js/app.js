const CATEGORIA_LABELS = {
  'una-razon': '🌸 Una Razón',
  'un-recuerdo': '💬 Un Recuerdo',
  'lo-que-queria-decirte': '🥹 Lo que quería decirte...'
};

const state = {
  categoriaActiva: 'una-razon',
  ultimaNotaId: null,
  isShaking: false,
  modalAbierto: false,
  notaActual: null
};

const jarWrapper = document.getElementById('jarWrapper');
const jarLabel = document.getElementById('jarLabel');
const noteModal = document.getElementById('noteModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalCard = document.getElementById('modalCard');
const modalChip = document.getElementById('modalChip');
const modalText = document.getElementById('modalText');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const categoryBtns = document.querySelectorAll('.category-btn');

function getNotasPorCategoria(categoria) {
  return NOTAS.filter(n => n.categoria === categoria);
}

function elegirNotaAleatoria(categoria, excluirId) {
  const pool = getNotasPorCategoria(categoria);
  if (pool.length === 0) return null;
  let candidatas = pool.filter(n => n.id !== excluirId);
  if (candidatas.length === 0) candidatas = pool;
  return candidatas[Math.floor(Math.random() * candidatas.length)];
}

function setJarDisabled(disabled) {
  jarWrapper.classList.toggle('jar-wrapper--disabled', disabled);
  if (disabled) {
    jarWrapper.setAttribute('aria-disabled', 'true');
  } else {
    jarWrapper.removeAttribute('aria-disabled');
  }
}

function abrirNota(nota) {
  if (!nota) return;
  state.notaActual = nota;
  state.modalAbierto = true;
  modalChip.textContent = CATEGORIA_LABELS[nota.categoria] || nota.categoria;
  modalText.textContent = nota.texto;
  noteModal.classList.remove('modal--closing');
  noteModal.classList.add('modal--visible');
  noteModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  setJarDisabled(true);
  modalCloseBtn.focus();
}

function cerrarNota() {
  if (!state.modalAbierto) return;
  if (state.notaActual) {
    state.ultimaNotaId = state.notaActual.id;
    state.notaActual = null;
  }
  noteModal.classList.add('modal--closing');
  noteModal.classList.remove('modal--visible');

  const onEnd = () => {
    noteModal.classList.remove('modal--closing');
    noteModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    state.modalAbierto = false;
    setJarDisabled(false);
  };

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  setTimeout(onEnd, reducedMotion ? 150 : 220);
}

function onJarInteraction() {
  if (state.isShaking || state.modalAbierto) return;

  const pool = getNotasPorCategoria(state.categoriaActiva);
  if (pool.length === 0) return;

  state.isShaking = true;
  setJarDisabled(true);
  jarWrapper.classList.add('jar-wrapper--shake');

  let shakeEnded = false;
  const onShakeEnd = () => {
    if (shakeEnded) return;
    shakeEnded = true;
    jarWrapper.classList.remove('jar-wrapper--shake');
    jarWrapper.removeEventListener('animationend', onShakeEnd);
    state.isShaking = false;

    const nota = elegirNotaAleatoria(state.categoriaActiva, state.ultimaNotaId);
    if (nota) {
      abrirNota(nota);
    } else {
      setJarDisabled(false);
    }
  };

  jarWrapper.addEventListener('animationend', onShakeEnd);
  setTimeout(onShakeEnd, 450);
}

function setCategoriaActiva(categoria) {
  state.categoriaActiva = categoria;

  categoryBtns.forEach(btn => {
    const active = btn.dataset.categoria === categoria;
    btn.setAttribute('aria-pressed', String(active));
  });

  jarWrapper.classList.add('jar-wrapper--pulse');
  setTimeout(() => jarWrapper.classList.remove('jar-wrapper--pulse'), 350);

  if (jarLabel) {
    jarLabel.innerHTML = `<span class="jar-category-hint__dot"></span> ${CATEGORIA_LABELS[categoria] || categoria}`;
  }
}

function initConfetti() {
  const field = document.getElementById('confettiField');
  if (!field) return;
  const colors = ['#f9a8d4', '#93c5fd', '#fde047', '#c4b5fd', '#fda4af'];
  const shapes = ['4px 6px', '3px 3px', '5px 4px', '2px 8px'];
  for (let i = 0; i < 32; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    const nearJar = i < 12;
    piece.style.left = `${nearJar ? 25 + Math.random() * 50 : Math.random() * 100}%`;
    if (nearJar) piece.style.opacity = '0.9';
    piece.style.width = shapes[i % shapes.length].split(' ')[0];
    piece.style.height = shapes[i % shapes.length].split(' ')[1];
    piece.style.background = colors[i % colors.length];
    piece.style.animationDuration = `${12 + Math.random() * 14}s`;
    piece.style.animationDelay = `${Math.random() * 12}s`;
    if (Math.random() > 0.5) piece.style.borderRadius = '50%';
    field.appendChild(piece);
  }
}

initConfetti();
setCategoriaActiva(state.categoriaActiva);

jarWrapper.addEventListener('click', (e) => {
  e.stopPropagation();
  onJarInteraction();
});

jarWrapper.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    onJarInteraction();
  }
});

categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    setCategoriaActiva(btn.dataset.categoria);
  });
});

modalCloseBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  cerrarNota();
});

modalCard.addEventListener('click', (e) => {
  e.stopPropagation();
});

modalBackdrop.addEventListener('click', (e) => {
  e.stopPropagation();
  cerrarNota();
});

noteModal.addEventListener('click', (e) => {
  if (e.target === noteModal) cerrarNota();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && state.modalAbierto) {
    cerrarNota();
  }
});
