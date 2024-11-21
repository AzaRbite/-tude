function checkAnswers() {
    const q1 = document.getElementById('q1').value;
    const q2 = document.getElementById('q2').value;
    const q3 = document.getElementById('q3').value;

    let score = 0;
    let totalQuestions = 3;

    if (q1 === "Inconscience du danger") score++;
    if (q2 === "Rouge") score++;
    if (q3 === "Rouge") score++;

    const results = document.getElementById('results');
    results.innerHTML = `<p>Vous avez obtenu ${score} sur ${totalQuestions}!</p>`;
}

