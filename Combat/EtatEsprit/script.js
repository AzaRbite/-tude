function checkAnswer(questionName, correctAnswer) {
    const checkboxes = document.querySelectorAll(`input[name="${questionName}"]`);
    let selectedAnswer = null;
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedAnswer = checkbox.value;
        }
    });

    const resultDiv = document.getElementById(`result-${questionName}`);
    if (selectedAnswer === correctAnswer) {
        resultDiv.textContent = 'Bonne réponse!';
        resultDiv.style.color = 'green';
    } else {
        resultDiv.textContent = 'Mauvaise réponse, essayez encore.';
        resultDiv.style.color = 'red';
    }

    // Désactiver les autres cases à cocher après vérification
    checkboxes.forEach((checkbox) => {
        checkbox.disabled = true;
    });
}
