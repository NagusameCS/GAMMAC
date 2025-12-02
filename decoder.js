document.getElementById("verify-btn").addEventListener("click", () => {
  const input = document.getElementById("code-input").value;
  const resultArea = document.getElementById("result-area");
  const scoreDisplay = document.getElementById("score-display");
  const attemptsDisplay = document.getElementById("attempts-display");

  if (!input) {
    alert("Por favor ingresa un código.");
    return;
  }

  const code = parseInt(input, 10);
  
  // Decode: Score * 1000 + Attempts
  const percentage = Math.floor(code / 1000);
  const attempts = code % 1000;

  if (isNaN(percentage) || isNaN(attempts)) {
    alert("Código inválido.");
    return;
  }

  scoreDisplay.textContent = percentage + "%";
  attemptsDisplay.textContent = attempts;
  
  resultArea.style.display = "block";
});
