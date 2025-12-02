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
      { text: "http://juegos-gratis.net", category: "less-safe" }
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
  // 5. Scratch
  {
    id: "scratch-1",
    type: "choice",
    prompt: "¿Para qué sirve el bloque 'Mover 10 pasos' en Scratch?",
    options: ["Para mover al personaje", "Para reproducir un sonido", "Para cambiar el fondo"],
    correctIndex: 0,
  },
  // 6. Typing Test
  {
    id: "typing-test",
    type: "typing",
    prompt: "Escribe las palabras que aparecen (30 segundos)",
    words: ["gato", "perro", "casa", "sol", "luna", "agua", "flor", "rojo", "azul", "mesa", "silla", "libro", "papel", "lapiz", "juego", "amigo", "feliz", "comer", "saltar", "correr"]
  },
  // 7. GAMMA
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
    </div>
    <small>Recuerda: escribe tus respuestas en la hoja antes de elegirlas aquí.</small>
  `;

  document.getElementById("start-btn").addEventListener("click", () => {
    renderQuestion();
  });
}

function renderQuestion() {
  const question = questions[state.currentQuestion];
  
  // Common header
  let html = `
    <div class="step-label">Pregunta ${state.currentQuestion + 1} de ${questions.length}</div>
    <h1>${question.prompt}</h1>
    <p class="helper">Completa la actividad en tu hoja y aquí.</p>
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
        <div class="zone-label">Muy Seguro (HTTPS)</div>
      </div>
      <div class="drop-zone less-safe" data-type="less-safe">
        <div class="zone-label">Poco Seguro (HTTP)</div>
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

  input.addEventListener('input', (e) => {
    if (!started) {
      started = true;
      updateWord();
      
      timerInterval = setInterval(() => {
        timeLeft--;
        timerBar.style.width = `${(timeLeft / 30) * 100}%`;
        
        if (timeLeft <= 0) {
          endGame();
        }
      }, 1000);
    }

    const currentWord = words[currentWordIndex];
    const val = input.value.trim();
    
    if (val === currentWord) {
      correctChars += currentWord.length + 1; // +1 for space/enter equivalent
      totalChars += currentWord.length + 1;
      wordsTyped++;
      currentWordIndex++;
      input.value = '';
      updateWord();
    } else {
      // Simple accuracy tracking on keypress could be more complex, 
      // but here we just track total chars typed vs correct words length at end?
      // Let's track total chars based on input length changes? 
      // Actually, let's just count total chars as length of words attempted + errors.
      // For simplicity in this "game", let's just count total chars as what they typed.
    }
  });
  
  // Better accuracy tracking: count every keystroke
  input.addEventListener('keydown', (e) => {
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      totalChars++;
    }
  });
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

// ...existing code...

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

  let reviewHTML = '<div class="review-container" style="margin-top:20px; text-align:left; max-width: 600px; margin-left: auto; margin-right: auto;"><h3>Revisión:</h3>';
  questions.forEach((q, i) => {
      // Find the last attempt for this question (in case of duplicates, though logic prevents it now)
      const attempt = state.attempts.find(a => a.questionId === q.id);
      const isCorrect = attempt ? attempt.correct : false;
      let answerText = attempt ? attempt.selected : "Sin respuesta";
      
      // Format answer text for better readability if it's an object or array
      if (typeof answerText === 'object') answerText = JSON.stringify(answerText);

      reviewHTML += `
        <div class="review-item" style="border-bottom:1px solid #000; padding:10px 0;">
            <div style="font-weight:bold;">${i+1}. ${q.prompt}</div>
            <div style="color: ${isCorrect ? 'green' : 'red'}">
                ${isCorrect ? 'Correcto' : `Incorrecto (Tu respuesta: ${answerText})`}
            </div>
        </div>
      `;
  });
  reviewHTML += '</div>';

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
    </div>
  `;

  document.getElementById("restart-btn").addEventListener("click", renderIntro);
}

renderIntro();
