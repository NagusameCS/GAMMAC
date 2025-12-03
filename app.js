const appRoot = document.getElementById("app");

const introCopy = "Ok estudiantes, la actividad de hoy es muy sencilla. Usen su hoja para hacer borradores o notas si lo necesitan. Al final, obtendrán un código que deben escribir en su hoja junto con su nombre. ¡No olviden poner su nombre en la hoja!";

const questions = [
  // 1. Safe Links (Multiple Choice)
  {
    id: "link-1",
    type: "choice",
    prompt: "Elige el sitio web más seguro:",
    options: ["http.ammazon.com", "https://amazon.com"],
    correctIndex: 1,
  },
  {
    id: "link-2",
    type: "choice",
    prompt: "¿Por qué el sitio anterior es más seguro?",
    options: ["Por la 's' de 'seguro' en https", "Por la pequeña cara (://)"],
    correctIndex: 1,
  },
  // 2. Link Sorting (Drag & Drop)
  {
    id: "link-sort",
    type: "sort",
    prompt: "Arrastra los links a la caja correcta",
    items: [
      { text: "https://google.com", category: "safe" },
      { text: "http.ganar-dinero.com", category: "unsafe" },
      { text: "https://banco.com", category: "safe" },
      { text: "www.g0ogle.com", category: "unsafe" },
      { text: "http://mi-blog.com", category: "less-safe" },
      { text: "http://juegos-gratis.net", category: "less-safe" },
      { text: "https://escuela.edu", category: "safe" },
      { text: "http://premio-gratis.site", category: "unsafe" }
    ]
  },
  // 3. Hardware (Rope Match)
  {
    id: "hw-match",
    type: "rope",
    prompt: "Conecta cada parte con lo que hace:",
    pairs: [
      { left: "Teclado", right: "Escribir" },
      { left: "Mouse", right: "Mover" },
      { left: "Pantalla", right: "Ver" }
    ]
  },
  // 3.1 Hardware Functions & Limitations
  {
    id: "hw-func-1",
    type: "choice",
    prompt: "¿Qué usas para hacer clic en cosas en la pantalla?",
    options: ["El Teclado", "El Mouse", "La Pantalla"],
    correctIndex: 1,
  },
  {
    id: "hw-limit-1",
    type: "stamper",
    prompt: "Decide si es Verdad o Falso:",
    statement: "La pantalla puede escuchar tus secretos.",
    options: ["Verdad", "Falso"],
    correctIndex: 1,
  },
  {
    id: "hw-limit-2",
    type: "stamper",
    prompt: "Decide si es Verdad o Falso:",
    statement: "El mouse sabe lo que estás pensando.",
    options: ["Verdad", "Falso"],
    correctIndex: 1,
  },
  {
    id: "hw-limit-3",
    type: "stamper",
    prompt: "Decide si es Verdad o Falso:",
    statement: "La computadora necesita electricidad para funcionar.",
    options: ["Verdad", "Falso"],
    correctIndex: 0,
  },
  {
    id: "hw-limit-4",
    type: "stamper",
    prompt: "Decide si es Verdad o Falso:",
    statement: "Puedes descargar más memoria RAM gratis en internet.",
    options: ["Verdad", "Falso"],
    correctIndex: 1,
  },
  // 4. Binary (Switches)
  {
    id: "bin-switch-1",
    type: "binary",
    prompt: "Enciende los interruptores para formar el número 5 (1 0 1)",
    target: [1, 0, 1]
  },
  {
    id: "bin-switch-2",
    type: "binary",
    prompt: "Forma el número 3 (0 1 1)",
    target: [0, 1, 1]
  },
  {
    id: "bin-switch-3",
    type: "binary",
    prompt: "Forma el número 6 (1 1 0)",
    target: [1, 1, 0]
  },
  {
    id: "bin-switch-4",
    type: "binary",
    prompt: "Forma el número 7 (1 1 1)",
    target: [1, 1, 1]
  },
  {
    id: "bin-switch-5",
    type: "binary",
    prompt: "Forma el número 1 (0 0 1)",
    target: [0, 0, 1]
  },
  {
    id: "bin-switch-6",
    type: "binary",
    prompt: "Forma el número 4 (1 0 0)",
    target: [1, 0, 0]
  },
  // 5. Scratch
  {
    id: "scratch-1",
    type: "scratch",
    prompt: "Encuentra la pieza que explica el bloque:",
    blockText: "Mover 10 pasos",
    options: ["Mueve al personaje", "Hace un sonido", "Cambia el fondo"],
    correctIndex: 0,
  },
  // 6. Typing Test
  {
    id: "typing-test",
    type: "typing",
    prompt: "Escribe las palabras que aparecen (30 segundos)",
    words: ["gato", "perro", "casa", "sol", "luna", "agua", "flor", "rojo", "azul", "mesa", "silla", "libro", "papel", "lapiz", "juego", "amigo", "feliz", "comer", "saltar", "correr"]
  },
  // 7. Circuit Game (Moved)
  {
    id: "circuit-intro",
    type: "circuit",
    prompt: "Conecta los bloques para activar el sistema y escapar.",
  },
  // 8. GAMMA
  {
    id: "gamma-best",
    type: "choice",
    prompt: "¿Es GAMMA Computación la mejor clase del mundo?",
    options: ["¡Sí, totalmente!", "¡Obvio que sí!"],
    correctIndex: [0, 1],
  },
];

const state = {
  currentQuestion: 0,
  attempts: [],
  feedback: "",
  processing: false,
  typingStats: { wpm: 0, accuracy: 0 }
};

function renderIntro() {
  state.currentQuestion = 0;
  state.attempts = [];
  state.feedback = "";

  appRoot.innerHTML = `
    <h1>Actividad rápida</h1>
    <p>${introCopy}</p>
    <div class="options">
      <button class="primary" id="start-btn">Comenzar</button>
      <button class="secondary" id="learn-btn" onclick="window.location.href='learnbinary/index.html'">Curso de Binario</button>
    </div>
    <small>Usa tu hoja si necesitas hacer notas.</small>
  `;

  document.getElementById("start-btn").addEventListener("click", () => {
    document.documentElement.requestFullscreen().catch(e => console.log(e));
    renderQuestion();
  });
}

function renderQuestion() {
  const question = questions[state.currentQuestion];
  
  // Common header
  let html = `
    <div class="step-label">Pregunta ${state.currentQuestion + 1} de ${questions.length}</div>
    <h1>${question.prompt}</h1>
  `;

  // Render body based on type
  if (question.type === "choice") {
    html += renderChoiceBody(question);
  } else if (question.type === "binary") {
    html += renderBinaryBody(question);
  } else if (question.type === "sort") {
    html += renderSortBody(question);
  } else if (question.type === "rope") {
    html += renderRopeBody(question);
  } else if (question.type === "typing") {
    html += renderTypingBody(question);
  } else if (question.type === "stamper") {
    html += renderStamperBody(question);
  } else if (question.type === "scratch") {
    html += renderScratchBody(question);
  } else if (question.type === "circuit") {
    html += renderCircuitBody(question);
  }

  // Feedback area
  html += `<div id="feedback-area">${state.feedback ? `<p class="feedback">${state.feedback}</p>` : ""}</div>`;
  
  appRoot.innerHTML = html;

  // Attach listeners based on type
  if (question.type === "choice") {
    attachChoiceListeners();
  } else if (question.type === "binary") {
    attachBinaryListeners(question);
  } else if (question.type === "sort") {
    attachSortListeners(question);
  } else if (question.type === "rope") {
    attachRopeListeners(question);
  } else if (question.type === "typing") {
    attachTypingListeners(question);
  } else if (question.type === "stamper") {
    attachStamperListeners(question);
  } else if (question.type === "scratch") {
    attachScratchListeners(question);
  } else if (question.type === "circuit") {
    attachCircuitListeners(question);
  }
}

// --- CHOICE LOGIC ---
function renderChoiceBody(question) {
  return `
    <div class="options">
      ${question.options
        .map(
          (option, index) => `
            <button class="answer" data-index="${index}">
              ${option}
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function attachChoiceListeners() {
  document.querySelectorAll("button.answer").forEach((button) => {
    button.addEventListener("click", onChoiceSelected);
  });
}

function onChoiceSelected(event) {
  const question = questions[state.currentQuestion];
  const selectedIndex = Number(event.currentTarget.dataset.index);
  
  const isCorrect = Array.isArray(question.correctIndex) 
    ? question.correctIndex.includes(selectedIndex)
    : selectedIndex === question.correctIndex;

  handleAnswer(question, question.options[selectedIndex], isCorrect);
}

// --- BINARY LOGIC ---
function renderBinaryBody(question) {
  return `
    <div class="binary-container">
      ${question.target.map((_, i) => `
        <div class="switch-wrapper">
          <div class="bulb" id="bulb-${i}"></div>
          <div class="switch" id="switch-${i}" data-index="${i}">
            <div class="switch-handle"></div>
          </div>
          <span>${Math.pow(2, question.target.length - 1 - i)}</span>
        </div>
      `).join('')}
    </div>
    <div class="check-btn-container">
      <button class="primary" id="check-binary">Verificar</button>
    </div>
  `;
}

function attachBinaryListeners(question) {
  const switches = document.querySelectorAll('.switch');
  const stateArr = new Array(question.target.length).fill(0);

  switches.forEach(sw => {
    sw.addEventListener('click', () => {
      const idx = sw.dataset.index;
      stateArr[idx] = stateArr[idx] === 0 ? 1 : 0;
      
      // Update UI
      sw.classList.toggle('active');
      document.getElementById(`bulb-${idx}`).classList.toggle('on');
    });
  });

  document.getElementById('check-binary').addEventListener('click', () => {
    const isCorrect = JSON.stringify(stateArr) === JSON.stringify(question.target);
    handleAnswer(question, stateArr.join(''), isCorrect);
  });
}

// --- SORT LOGIC ---
function renderSortBody(question) {
  // Shuffle indices for display
  const indices = question.items.map((_, i) => i);
  const shuffledIndices = indices.sort(() => Math.random() - 0.5);

  return `
    <div class="sort-container">
      <div class="drop-zone safe" data-type="safe">
        <div class="zone-label">Muy Seguro</div>
      </div>
      <div class="drop-zone less-safe" data-type="less-safe">
        <div class="zone-label">Poco Seguro</div>
      </div>
      <div class="drop-zone unsafe" data-type="unsafe">
        <div class="zone-label">Nada Seguro (Fake)</div>
      </div>
    </div>
    <div class="draggable-source" id="drag-source">
      ${shuffledIndices.map((i) => `
        <div class="draggable-item" draggable="true" id="drag-${i}" data-index="${i}">
          ${question.items[i].text}
        </div>
      `).join('')}
    </div>
    <div class="check-btn-container" style="margin-top: 20px;">
       <button class="primary" id="check-sort" style="display:none">Verificar</button>
    </div>
  `;
}

function attachSortListeners(question) {
  const items = document.querySelectorAll('.draggable-item');
  const zones = document.querySelectorAll('.drop-zone');
  let placed = {};

  items.forEach(item => {
    item.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', e.target.id);
      setTimeout(() => e.target.style.display = 'none', 0);
    });
    
    item.addEventListener('dragend', e => {
       e.target.style.display = 'block';
    });
  });

  zones.forEach(zone => {
    zone.addEventListener('dragover', e => e.preventDefault());
    zone.addEventListener('drop', e => {
      e.preventDefault();
      const id = e.dataTransfer.getData('text/plain');
      const draggable = document.getElementById(id);
      zone.appendChild(draggable);
      
      const idx = draggable.dataset.index;
      placed[idx] = zone.dataset.type;
      
      if (Object.keys(placed).length === question.items.length) {
        document.getElementById('check-sort').style.display = 'inline-block';
      }
    });
  });

  document.getElementById('check-sort').addEventListener('click', () => {
    let allCorrect = true;
    question.items.forEach((item, i) => {
      if (placed[i] !== item.category) allCorrect = false;
    });
    handleAnswer(question, "Sorted", allCorrect);
  });
}

// --- ROPE LOGIC ---
function renderRopeBody(question) {
  // Shuffle right side indices
  const indices = question.pairs.map((_, i) => i);
  const shuffledIndices = indices.sort(() => Math.random() - 0.5);

  return `
    <div class="rope-container" id="rope-area">
      <canvas class="rope-canvas" id="rope-canvas"></canvas>
      <div class="rope-column" id="col-left">
        ${question.pairs.map((p, i) => `<div class="rope-node" data-side="left" data-id="${i}">${p.left}</div>`).join('')}
      </div>
      <div class="rope-column" id="col-right">
        ${shuffledIndices.map((i) => `<div class="rope-node" data-side="right" data-id="${i}">${question.pairs[i].right}</div>`).join('')}
      </div>
    </div>
    <div class="check-btn-container">
      <button class="primary" id="check-rope" disabled>Verificar</button>
    </div>
  `;
}

function attachRopeListeners(question) {
  const canvas = document.getElementById('rope-canvas');
  const ctx = canvas.getContext('2d');
  const container = document.getElementById('rope-area');
  
  // Resize canvas
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;

  let selectedNode = null;
  let connections = []; // {leftId: id, rightId: id}

  const nodes = document.querySelectorAll('.rope-node');
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    connections.forEach(conn => {
      const leftEl = document.querySelector(`.rope-node[data-side="left"][data-id="${conn.leftId}"]`);
      const rightEl = document.querySelector(`.rope-node[data-side="right"][data-id="${conn.rightId}"]`);
      
      if(leftEl && rightEl) {
        const lRect = leftEl.getBoundingClientRect();
        const rRect = rightEl.getBoundingClientRect();
        const cRect = container.getBoundingClientRect();
        
        const x1 = lRect.right - cRect.left;
        const y1 = lRect.top + lRect.height/2 - cRect.top;
        const x2 = rRect.left - cRect.left;
        const y2 = rRect.top + rRect.height/2 - cRect.top;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.bezierCurveTo(x1 + 50, y1, x2 - 50, y2, x2, y2);
        ctx.stroke();
      }
    });
  }

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      if (node.classList.contains('matched')) return;

      if (!selectedNode) {
        selectedNode = node;
        node.classList.add('selected');
      } else {
        if (selectedNode === node) {
          selectedNode.classList.remove('selected');
          selectedNode = null;
          return;
        }
        
        const side1 = selectedNode.dataset.side;
        const side2 = node.dataset.side;
        
        if (side1 !== side2) {
          // Match!
          const leftId = side1 === 'left' ? selectedNode.dataset.id : node.dataset.id;
          const rightId = side1 === 'right' ? selectedNode.dataset.id : node.dataset.id;
          
          // Remove old connections for these nodes
          connections = connections.filter(c => c.leftId !== leftId && c.rightId !== rightId);
          connections.push({leftId, rightId});
          
          selectedNode.classList.remove('selected');
          selectedNode.classList.add('matched');
          node.classList.add('matched');
          selectedNode = null;
          
          draw();
          
          if (connections.length === question.pairs.length) {
            document.getElementById('check-rope').disabled = false;
          }
        }
      }
    });
  });

  document.getElementById('check-rope').addEventListener('click', () => {
    let correctCount = 0;
    connections.forEach(conn => {
      // Correct if leftId matches rightId
      if (conn.leftId === conn.rightId) correctCount++;
    });
    
    const allCorrect = correctCount === question.pairs.length;
    handleAnswer(question, "Ropes", allCorrect);
  });
}


// --- TYPING LOGIC ---
function renderTypingBody(question) {
  return `
    <div class="typing-container">
      <div class="word-display" id="word-display">Presiona una tecla para iniciar</div>
      <input type="text" class="typing-input" id="typing-input" autocomplete="off" spellcheck="false" placeholder="Escribe aquí...">
      <div class="timer-bar-container">
        <div class="timer-bar" id="timer-bar" style="width: 100%;"></div>
      </div>
      <div class="stats-preview" id="stats-preview"></div>
    </div>
  `;
}

function attachTypingListeners(question) {
  const input = document.getElementById('typing-input');
  const display = document.getElementById('word-display');
  const timerBar = document.getElementById('timer-bar');
  const statsPreview = document.getElementById('stats-preview');
  
  let started = false;
  let timeLeft = 30;
  let timerInterval;
  let currentWordIndex = 0;
  let correctChars = 0;
  let totalChars = 0;
  let wordsTyped = 0;
  
  // Shuffle words
  const words = [...question.words].sort(() => Math.random() - 0.5);
  
  function updateWord() {
    if (currentWordIndex < words.length) {
      display.textContent = words[currentWordIndex];
      // Reset animation
      display.style.animation = 'none';
      display.offsetHeight; /* trigger reflow */
      display.style.animation = 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    } else {
      display.textContent = "¡Bien hecho!";
      endGame();
    }
  }

  function endGame() {
    clearInterval(timerInterval);
    input.disabled = true;
    
    // Calculate stats
    const timeElapsed = 30 - timeLeft;
    const minutes = 30 / 60; // Fixed to 30s test for WPM calc standard
    const wpm = Math.round((correctChars / 5) / minutes) || 0;
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
    
    state.typingStats = { wpm, accuracy };
    
    statsPreview.textContent = `WPM: ${wpm} | Precisión: ${accuracy}%`;
    
    handleAnswer(question, `WPM: ${wpm}, Acc: ${accuracy}%`, true);
  }

  input.addEventListener('focus', (e) => {
    if (!started) {
      started = true;
      updateWord();
      
      timerInterval = setInterval(() => {
        timeLeft--;
        timerBar.style.width = `${(timeLeft / 30) * 100}%`;
        
        // Color logic based on elapsed time (30s total)
        // 0-12s (1/5, 2/5): Green
        // 12-24s (3/5, 4/5): Yellow
        // 24-30s (5/5): Red
        const elapsed = 30 - timeLeft;
        if (elapsed <= 12) {
             timerBar.style.backgroundColor = '#4caf50';
        } else if (elapsed <= 24) {
             timerBar.style.backgroundColor = '#ffeb3b';
        } else {
             timerBar.style.backgroundColor = '#f44336';
        }
        
        if (timeLeft <= 0) {
          endGame();
        }
      }, 1000);
    }
  });

  input.addEventListener('input', (e) => {
    const currentWord = words[currentWordIndex];
    const val = input.value.trim();
    
    if (val === currentWord) {
      correctChars += currentWord.length + 1; // +1 for space/enter equivalent
      totalChars += currentWord.length + 1;
      wordsTyped++;
      currentWordIndex++;
      input.value = '';
      updateWord();
    }
  });
  
  // Better accuracy tracking: count every keystroke
  input.addEventListener('keydown', (e) => {
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      totalChars++;
    }
  });
}

// --- STAMPER LOGIC ---
function renderStamperBody(question) {
  return `
    <div class="stamper-container">
      <div class="paper-doc" id="paper-doc">
        ${question.statement}
        <div class="stamp-mark" id="stamp-mark"></div>
      </div>
      <div class="stamp-controls">
        <button class="stamp-btn true" data-index="0">VERDAD</button>
        <button class="stamp-btn false" data-index="1">FALSO</button>
      </div>
    </div>
  `;
}

function attachStamperListeners(question) {
  const btns = document.querySelectorAll('.stamp-btn');
  const mark = document.getElementById('stamp-mark');
  
  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = Number(e.currentTarget.dataset.index);
      const text = idx === 0 ? "VERDAD" : "FALSO";
      const type = idx === 0 ? "true" : "false";
      
      // Visual stamp
      mark.textContent = text;
      mark.className = `stamp-mark visible ${type}`;
      
      // Logic
      const isCorrect = idx === question.correctIndex;
      handleAnswer(question, text, isCorrect);
    });
  });
}

// --- SCRATCH LOGIC ---
function renderScratchBody(question) {
  return `
    <div class="scratch-container">
      <div class="scratch-block">
        ${question.blockText}
      </div>
      <div class="scratch-options">
        ${question.options.map((opt, i) => `
          <div class="scratch-option" data-index="${i}">${opt}</div>
        `).join('')}
      </div>
    </div>
  `;
}

function attachScratchListeners(question) {
  const opts = document.querySelectorAll('.scratch-option');
  
  opts.forEach(opt => {
    opt.addEventListener('click', (e) => {
      const idx = Number(e.currentTarget.dataset.index);
      const isCorrect = idx === question.correctIndex;
      
      // Visual feedback
      if (isCorrect) {
        e.currentTarget.classList.add('correct');
      } else {
        e.currentTarget.classList.add('incorrect');
      }
      
      handleAnswer(question, question.options[idx], isCorrect);
    });
  });
}

// --- CIRCUIT GAME LOGIC ---
function renderCircuitBody(question) {
  return `
    <div class="circuit-container">
      <div class="circuit-game-area">
        <canvas id="circuit-canvas" width="600" height="400"></canvas>
        <div id="circuit-overlay" class="circuit-overlay">
            <div style="text-align: center;">
                <h2>NIVEL 1: RECOLECCIÓN DE DATOS</h2>
                <p>Presiona ESPACIO para comenzar</p>
            </div>
        </div>
      </div>
      <p>Instrucciones: Usa las flechas para moverte. Recolecta el <strong>DATO</strong> para abrir la puerta.</p>
    </div>
  `;
}



function attachCircuitListeners(question) {
  const overlay = document.getElementById("circuit-overlay");
  const canvas = document.getElementById("circuit-canvas");
  const ctx = canvas.getContext("2d");

  let gameActive = false;
  let gameWon = false;
  let currentLevel = 0;

  // Level Definitions
  const levels = [
    {
      // Level 1: Simple Jump
      platforms: [
        { x: 0, y: 380, w: 600, h: 20, type: "solid" }, // Floor
        { x: 100, y: 300, w: 100, h: 20, type: "solid" },
        { x: 300, y: 220, w: 100, h: 20, type: "solid" },
        { x: 500, y: 150, w: 100, h: 20, type: "solid" }
      ],
      item: { x: 530, y: 110, w: 20, h: 20, collected: false, label: "0" },
      door: { x: 50, y: 320, w: 40, h: 60, open: false },
      playerStart: { x: 20, y: 340 }
    },
    {
      // Level 2: Lava Pits
      platforms: [
        { x: 0, y: 380, w: 100, h: 20, type: "solid" },
        { x: 100, y: 380, w: 400, h: 20, type: "lava" },
        { x: 500, y: 380, w: 100, h: 20, type: "solid" },
        { x: 150, y: 300, w: 80, h: 20, type: "solid" },
        { x: 300, y: 220, w: 80, h: 20, type: "solid" },
        { x: 450, y: 140, w: 80, h: 20, type: "solid" }
      ],
      item: { x: 480, y: 100, w: 20, h: 20, collected: false, label: "1" },
      door: { x: 520, y: 320, w: 40, h: 60, open: false },
      playerStart: { x: 20, y: 340 }
    },
    {
      // Level 3: The Climb
      platforms: [
        { x: 0, y: 380, w: 600, h: 20, type: "lava" },
        { x: 0, y: 300, w: 100, h: 20, type: "solid" },
        { x: 200, y: 250, w: 80, h: 20, type: "solid" },
        { x: 400, y: 200, w: 80, h: 20, type: "solid" },
        { x: 200, y: 150, w: 80, h: 20, type: "solid" },
        { x: 50, y: 100, w: 100, h: 20, type: "solid" },
        { x: 480, y: 200, w: 80, h: 20, type: "solid" } // Door platform
      ],
      item: { x: 80, y: 60, w: 20, h: 20, collected: false, label: "BYTE" },
      door: { x: 500, y: 140, w: 40, h: 60, open: false },
      playerStart: { x: 20, y: 260 }
    }
  ];

  let currentMap = levels[currentLevel];

  // Game State
  const player = { x: 0, y: 0, w: 20, h: 20, vx: 0, vy: 0, speed: 3, jump: -12, grounded: false };
  const gravity = 0.4;
  const friction = 0.8;
  
  function resetPlayer() {
    player.x = currentMap.playerStart.x;
    player.y = currentMap.playerStart.y;
    player.vx = 0;
    player.vy = 0;
  }
  
  resetPlayer();

  const keys = {};

  const keyHandler = (e) => {
    if (!document.getElementById("circuit-canvas")) {
      window.removeEventListener("keydown", keyHandler);
      window.removeEventListener("keyup", keyUpHandler);
      return;
    }
    
    if (e.code === "Space" && !gameActive && !gameWon) {
        gameActive = true;
        overlay.classList.add("hidden");
        window.focus();
        return;
    }

    if (e.type === "keydown") {
        if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight", "Space"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
        keys[e.code] = true;
    } else {
        keys[e.code] = false;
    }
  };
  
  const keyUpHandler = (e) => keyHandler(e);

  window.addEventListener("keydown", keyHandler);
  window.addEventListener("keyup", keyUpHandler);

  function update() {
    if (!gameActive || gameWon) return;

    // Movement
    if (keys["ArrowLeft"]) player.vx -= 1;
    if (keys["ArrowRight"]) player.vx += 1;
    if (keys["ArrowUp"] && player.grounded) {
      player.vy = player.jump;
      player.grounded = false;
    }

    player.vx *= friction;
    player.vy += gravity;

    player.x += player.vx;
    player.y += player.vy;

    // Collision with platforms
    player.grounded = false;
    currentMap.platforms.forEach(p => {
      const dir = colCheck(player, p);
      if (dir) {
        if (p.type === "lava") {
          resetPlayer();
        } else if (dir === "b") {
          player.grounded = true;
        }
      }
    });

    // Boundaries
    if (player.x < 0) player.x = 0;
    if (player.x + player.w > canvas.width) player.x = canvas.width - player.w;
    if (player.y + player.h > canvas.height) { // Fall off reset
        resetPlayer();
    }
    
    // Item Collection
    if (!currentMap.item.collected) {
        if (
            player.x < currentMap.item.x + currentMap.item.w &&
            player.x + player.w > currentMap.item.x &&
            player.y < currentMap.item.y + currentMap.item.h &&
            player.y + player.h > currentMap.item.y
        ) {
            currentMap.item.collected = true;
            currentMap.door.open = true;
        }
    }

    // Door Interaction
    if (currentMap.door.open) {
        if (
          player.x < currentMap.door.x + currentMap.door.w &&
          player.x + player.w > currentMap.door.x &&
          player.y < currentMap.door.y + currentMap.door.h &&
          player.y + player.h > currentMap.door.y
        ) {
          // Level Complete
          if (currentLevel < levels.length - 1) {
              currentLevel++;
              currentMap = levels[currentLevel];
              resetPlayer();
              gameActive = false;
              overlay.classList.remove("hidden");
              overlay.innerHTML = `
                <div style="text-align: center;">
                    <h2>NIVEL ${currentLevel + 1}</h2>
                    <p>Presiona ESPACIO para continuar</p>
                </div>
              `;
          } else {
              gameWon = true;
              handleAnswer(question, "completed", true);
          }
        }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Platforms
    currentMap.platforms.forEach(p => {
      ctx.fillStyle = p.type === "lava" ? "#f00" : "#333";
      ctx.fillRect(p.x, p.y, p.w, p.h);
    });

    // Door
    ctx.fillStyle = currentMap.door.open ? "#0f0" : "#555"; // Green if open, Grey if closed
    ctx.fillRect(currentMap.door.x, currentMap.door.y, currentMap.door.w, currentMap.door.h);
    ctx.fillStyle = "#000";
    ctx.fillRect(currentMap.door.x + 5, currentMap.door.y + 5, currentMap.door.w - 10, currentMap.door.h - 5); // Door frame

    // Item
    if (!currentMap.item.collected) {
        ctx.fillStyle = "#FFD700"; // Gold
        ctx.beginPath();
        ctx.arc(currentMap.item.x + 10, currentMap.item.y + 10, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#000";
        ctx.font = "10px Arial";
        ctx.textAlign = "center";
        ctx.fillText(currentMap.item.label, currentMap.item.x + 10, currentMap.item.y + 14);
    }

    // Player (Robot)
    ctx.fillStyle = "#00f";
    ctx.fillRect(player.x, player.y, player.w, player.h);
    // Eyes
    ctx.fillStyle = "#fff";
    ctx.fillRect(player.x + 4, player.y + 4, 4, 4);
    ctx.fillRect(player.x + 12, player.y + 4, 4, 4);
  }

  function loop() {
    update();
    draw();
    if (!gameWon) requestAnimationFrame(loop);
  }

  loop();
}

function colCheck(shapeA, shapeB) {
  // get the vectors to check against
  const vX = (shapeA.x + (shapeA.w / 2)) - (shapeB.x + (shapeB.w / 2));
  const vY = (shapeA.y + (shapeA.h / 2)) - (shapeB.y + (shapeB.h / 2));
  // add the half widths and half heights of the objects
  const hWidths = (shapeA.w / 2) + (shapeB.w / 2);
  const hHeights = (shapeA.h / 2) + (shapeB.h / 2);
  let colDir = null;

  // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
  if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
    const oX = hWidths - Math.abs(vX);
    const oY = hHeights - Math.abs(vY);
    if (oX >= oY) {
      if (vY > 0) {
        colDir = "t";
        shapeA.y += oY;
      } else {
        colDir = "b";
        shapeA.y -= oY;
        shapeA.vy = 0; // Stop falling
      }
    } else {
      if (vX > 0) {
        colDir = "l";
        shapeA.x += oX;
      } else {
        colDir = "r";
        shapeA.x -= oX;
      }
    }
  }
  return colDir;
}

// --- COMMON HANDLER ---
function handleAnswer(question, answerValue, isCorrect) {
  if (state.processing) return;
  state.processing = true;

  state.attempts.push({
    questionId: question.id,
    selected: answerValue,
    correct: isCorrect,
  });

  if (isCorrect) {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  setTimeout(() => {
    state.processing = false;
    const isLastQuestion = state.currentQuestion === questions.length - 1;

    if (isLastQuestion) {
      renderSummary();
    } else {
      state.currentQuestion += 1;
      renderQuestion();
    }
  }, 1000);
}

function generateCode(percentage, attemptsCount, wpm = 0, accuracy = 0) {
  // Encoded: (Percentage + 17) * 42 + Attempts + (WPM * 100) + Accuracy
  // This creates a larger number but encodes all metrics
  // Example: (100+17)*42 + 8 + 4000 + 95 = 4922 + 4095 = 9017
  // Wait, 4000 + 95 is 4095. 4922 + 4095 = 9017.
  // If WPM is 0, Acc is 0: 4922.
  // If WPM is 100, Acc is 100: 4922 + 10000 + 100 = 15022.
  // Still 5 digits. Compact enough.
  return (percentage + 17) * 42 + attemptsCount + (wpm * 100) + accuracy;
}

function renderSummary() {
  const totalAttempts = state.attempts.length;
  const correctAttempts = state.attempts.filter((attempt) => attempt.correct).length;
  
  // Calculate percentage based on correct answers out of total questions
  const percentage = Math.round((correctAttempts / questions.length) * 100);
  
  const { wpm, accuracy } = state.typingStats || { wpm: 0, accuracy: 0 };
  const code = generateCode(percentage, totalAttempts, wpm, accuracy);

  let reviewHTML = `
    <details style="margin-top: 20px; border: 2px solid #000; padding: 10px; background: #fff; cursor: pointer; text-align: left;">
      <summary style="font-weight: bold; font-size: 1.2em; list-style: none; display: flex; justify-content: space-between; align-items: center;">
        <span>Ver Revisión de Respuestas</span>
        <span style="font-size: 0.8em;">▼</span>
      </summary>
      <div class="review-list" style="margin-top: 15px; border-top: 1px solid #ccc; padding-top: 10px;">
  `;
  
  questions.forEach((q, i) => {
      // Find the last attempt for this question (in case of duplicates, though logic prevents it now)
      const attempt = state.attempts.find(a => a.questionId === q.id);
      const isCorrect = attempt ? attempt.correct : false;
      let answerText = attempt ? attempt.selected : "Sin respuesta";
      
      // Format answer text for better readability if it's an object or array
      if (typeof answerText === 'object') answerText = JSON.stringify(answerText);

      reviewHTML += `
        <div class="review-item" style="border-bottom:1px solid #eee; padding:10px 0;">
            <div style="font-weight:bold;">${i+1}. ${q.prompt}</div>
            <div style="color: ${isCorrect ? 'green' : 'red'}">
                ${isCorrect ? 'Correcto' : `Incorrecto (Tu respuesta: ${answerText})`}
            </div>
        </div>
      `;
  });
  reviewHTML += '</div></details>';

  appRoot.innerHTML = `
    <h1>¡Actividad completada!</h1>
    <p>Tu calificación final es <strong>${percentage}%</strong>.</p>
    <p>Copia este código en tu hoja para que podamos verificar tu puntaje:</p>
    <div class="code-box">${code}</div>
    
    <div class="free-time-msg" style="margin: 30px 0; font-size: 1.5em; font-weight: bold; color: #000;">
        ¡Ok, ya tienen tiempo libre!
    </div>

    ${reviewHTML}

    <div class="options">
      <button class="primary" id="restart-btn">Volver a empezar</button>
      <div style="width: 100%; display: flex; justify-content: center; margin-top: 20px;">
        <button id="bonus-game-btn" style="background: none; border: none; cursor: pointer; padding: 10px; transition: transform 0.2s;" title="Jugar Bug Blaster">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="8" y="6" width="8" height="14" rx="4"></rect>
                <path d="m19 7-3 3"></path>
                <path d="m5 7 3 3"></path>
                <path d="m19 19-3-3"></path>
                <path d="m5 19 3-3"></path>
                <path d="M2 12h6"></path>
                <path d="M22 12h-6"></path>
            </svg>
        </button>
      </div>
    </div>
  `;

  document.getElementById("restart-btn").addEventListener("click", renderIntro);
  document.getElementById("bonus-game-btn").addEventListener("click", renderBonusGame);
}

function renderBonusGame() {
  appRoot.innerHTML = `
    <h1>Bug Blaster: NEON EDITION</h1>
    <div class="bonus-game-container">
      <div class="bonus-game-ui">
        <span>Puntaje: <span id="bonus-score">0</span></span>
        <button id="bonus-back-btn" style="padding: 2px 8px; font-size: 12px;">Salir</button>
      </div>
      <canvas id="bonus-canvas" width="600" height="400"></canvas>
    </div>
    <p>Usa las flechas Izquierda/Derecha para moverte y Espacio para disparar.</p>
  `;

  document.getElementById("bonus-back-btn").addEventListener("click", renderSummary);

  const canvas = document.getElementById("bonus-canvas");
  const ctx = canvas.getContext("2d");
  const scoreEl = document.getElementById("bonus-score");

  let score = 0;
  let gameOver = false;
  let player = { x: 280, y: 360, w: 30, h: 30, color: "#0ff" };
  let bullets = [];
  let enemies = [];
  let particles = [];
  let stars = [];
  let keys = {};
  let frame = 0;
  let shake = 0;

  // Init Stars
  for(let i=0; i<50; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      speed: 0.5 + Math.random() * 2
    });
  }

  const keyHandler = (e) => {
    if (!document.getElementById("bonus-canvas")) {
      window.removeEventListener("keydown", keyHandler);
      window.removeEventListener("keyup", keyUpHandler);
      return;
    }
    keys[e.code] = true;
  };
  const keyUpHandler = (e) => keys[e.code] = false;

  window.addEventListener("keydown", keyHandler);
  window.addEventListener("keyup", keyUpHandler);

  function spawnEnemy() {
    const x = Math.random() * (canvas.width - 30);
    // Enemies have different types now
    const type = Math.random() > 0.8 ? 'fast' : 'normal';
    enemies.push({ 
      x, 
      y: -30, 
      w: 30, 
      h: 30, 
      speed: type === 'fast' ? 4 : 2,
      type: type,
      hp: type === 'fast' ? 1 : 2,
      angle: 0
    });
  }

  function createExplosion(x, y, color) {
    for(let i=0; i<10; i++) {
      particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        life: 1.0,
        color: color
      });
    }
  }

  function update() {
    if (gameOver) return;
    frame++;

    // Screen Shake decay
    if (shake > 0) shake *= 0.9;
    if (shake < 0.5) shake = 0;

    // Player Movement
    if (keys["ArrowLeft"] && player.x > 0) player.x -= 5;
    if (keys["ArrowRight"] && player.x + player.w < canvas.width) player.x += 5;
    
    // Shoot
    if (keys["Space"] && frame % 8 === 0) {
      bullets.push({ x: player.x + player.w/2 - 2, y: player.y, w: 4, h: 10, speed: 10 });
    }

    // Update Stars
    stars.forEach(s => {
      s.y += s.speed;
      if (s.y > canvas.height) {
        s.y = 0;
        s.x = Math.random() * canvas.width;
      }
    });

    // Update Bullets
    bullets.forEach((b, i) => {
      b.y -= b.speed;
      if (b.y < 0) bullets.splice(i, 1);
    });

    // Update Particles
    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.05;
      if (p.life <= 0) particles.splice(i, 1);
    });

    // Update Enemies
    if (frame % 50 === 0) spawnEnemy();
    enemies.forEach((e, i) => {
      e.y += e.speed;
      e.angle += 0.1;
      
      // Wobble effect
      e.x += Math.sin(e.angle) * 2;

      // Collision with player
      if (
        player.x < e.x + e.w &&
        player.x + player.w > e.x &&
        player.y < e.y + e.h &&
        player.y + player.h > e.y
      ) {
        gameOver = true;
        createExplosion(player.x, player.y, "#0ff");
        shake = 20;
        setTimeout(() => {
            alert("¡Juego terminado! Puntaje: " + score);
            renderSummary();
        }, 100);
      }

      // Collision with bullets
      bullets.forEach((b, bi) => {
        if (
          b.x < e.x + e.w &&
          b.x + b.w > e.x &&
          b.y < e.y + e.h &&
          b.y + b.h > e.y
        ) {
          e.hp--;
          bullets.splice(bi, 1);
          createExplosion(b.x, b.y, "#ff0");
          
          if (e.hp <= 0) {
            enemies.splice(i, 1);
            score += e.type === 'fast' ? 20 : 10;
            scoreEl.textContent = score;
            shake = 5;
            createExplosion(e.x, e.y, "#f00");
          }
        }
      });

      if (e.y > canvas.height) {
        enemies.splice(i, 1); 
      }
    });

    draw();
    requestAnimationFrame(update);
  }

  function draw() {
    ctx.save();
    
    // Apply Shake
    if (shake > 0) {
      const dx = (Math.random() - 0.5) * shake;
      const dy = (Math.random() - 0.5) * shake;
      ctx.translate(dx, dy);
    }

    // Background
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Stars
    ctx.fillStyle = "#fff";
    stars.forEach(s => {
      ctx.globalAlpha = Math.random();
      ctx.fillRect(s.x, s.y, s.size, s.size);
    });
    ctx.globalAlpha = 1.0;

    // Player (Retro Ship)
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.moveTo(player.x + player.w/2, player.y);
    ctx.lineTo(player.x + player.w, player.y + player.h);
    ctx.lineTo(player.x + player.w/2, player.y + player.h - 5);
    ctx.lineTo(player.x, player.y + player.h);
    ctx.closePath();
    ctx.fill();
    // Engine flame
    if (frame % 4 < 2) {
        ctx.fillStyle = "#f00";
        ctx.beginPath();
        ctx.moveTo(player.x + player.w/2 - 5, player.y + player.h);
        ctx.lineTo(player.x + player.w/2 + 5, player.y + player.h);
        ctx.lineTo(player.x + player.w/2, player.y + player.h + 10);
        ctx.fill();
    }

    // Bullets (Laser beams)
    ctx.fillStyle = "#ff0";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#ff0";
    bullets.forEach(b => ctx.fillRect(b.x, b.y, b.w, b.h));
    ctx.shadowBlur = 0;

    // Enemies (Glitch Bugs)
    enemies.forEach(e => {
      ctx.fillStyle = e.type === 'fast' ? "#ff00ff" : "#ff0000";
      ctx.save();
      ctx.translate(e.x + e.w/2, e.y + e.h/2);
      // ctx.rotate(e.angle); // Spin? Maybe too much
      
      // Draw Bug Shape
      ctx.fillRect(-e.w/2, -e.h/2, e.w, e.h);
      // Eyes
      ctx.fillStyle = "#fff";
      ctx.fillRect(-10, -5, 5, 5);
      ctx.fillRect(5, -5, 5, 5);
      // Glitch artifacts
      if (Math.random() > 0.9) {
        ctx.fillStyle = "#0f0";
        ctx.fillRect((Math.random()-0.5)*30, (Math.random()-0.5)*30, 20, 5);
      }
      
      ctx.restore();
    });

    // Particles
    particles.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life;
      ctx.fillRect(p.x, p.y, 4, 4);
    });
    ctx.globalAlpha = 1.0;

    ctx.restore();
  }

  update();
}

// --- DEBUG CHEATS ---
window.cheats = {
  next: () => {
    if (state.currentQuestion < questions.length - 1) {
      state.currentQuestion++;
      renderQuestion();
      console.log(`Skipped to question ${state.currentQuestion + 1}`);
    } else {
      renderSummary();
      console.log("Skipped to summary");
    }
  },
  goto: (index) => {
    if (index >= 0 && index < questions.length) {
      state.currentQuestion = index;
      renderQuestion();
      console.log(`Jumped to question ${index + 1}`);
    } else {
      console.error(`Invalid index. Max: ${questions.length - 1}`);
    }
  },
  end: () => {
    renderSummary();
    console.log("Jumped to summary");
  }
};
console.log("Cheats enabled! Use cheats.next(), cheats.goto(i), or cheats.end()");

renderIntro();
