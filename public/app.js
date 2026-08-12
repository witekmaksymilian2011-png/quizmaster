function joinQuiz() {
  const code = document.getElementById("code").value.trim();
  const name = document.getElementById("name").value.trim();
  const error = document.getElementById("error");

  if (!code || !name) {
    error.style.display = "block";
    error.textContent = "Wpisz kod quizu oraz swoje imię.";
    return;
  }

  error.style.display = "block";
  error.style.background = "#ecfdf3";
  error.style.color = "#047857";
  error.textContent = `Gotowe, ${name}! Kod quizu: ${code}.`;
}

function teacherLogin() {
  alert("Panel nauczyciela będzie dostępny wkrótce.");
}
