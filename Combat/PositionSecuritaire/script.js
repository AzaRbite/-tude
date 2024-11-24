document.addEventListener('DOMContentLoaded', function () {
    const allQuestions = document.querySelectorAll('.question');
    const selectedQuestions = Array.from(allQuestions).sort(() => 0.5 - Math.random()).slice(0, 5);
    let currentQuestion = 0;
    let errors = 0;

    function showQuestion(index) {
        selectedQuestions.forEach((question, i) => {
            question.classList.toggle('hidden', i !== index);
        });
        document.getElementById('question-counter').textContent = `Question ${index + 1} de ${selectedQuestions.length}`;
    }

    function showCorrection(questionElement, correctAnswer) {
        const selectedOption = questionElement.querySelector('input[type="radio"]:checked');
        const feedback = document.createElement('div');
        feedback.style.marginTop = '10px';
        feedback.style.color = selectedOption && selectedOption.value === correctAnswer ? 'green' : 'red';
        feedback.textContent = selectedOption && selectedOption.value === correctAnswer ? 'Correct!' : `Incorrect! Réponse correcte: ${correctAnswer}`;
        questionElement.appendChild(feedback);

        if (!selectedOption || selectedOption.value !== correctAnswer) {
            errors++;
        }
    }

    function goToNextQuestion() {
        if (currentQuestion < selectedQuestions.length - 1) {
            currentQuestion++;
            showQuestion(currentQuestion);
        } else {
            document.getElementById('submit-button').classList.remove('hidden');
        }
    }

    selectedQuestions.forEach((question, index) => {
        question.querySelectorAll('input[type="radio"]').forEach(input => {
            input.addEventListener('change', () => {
                showCorrection(question, index === 0 ? 'Les pieds aux largeurs des épaules à 45 degrés' : 'Faux'); // Adaptez selon les bonnes réponses
                setTimeout(goToNextQuestion, 2000);
            });
        });
    });

    document.getElementById('quiz-form').addEventListener('submit', function (event) {
        event.preventDefault();
        alert(`Questionnaire terminé avec ${errors} erreur(s). Merci!`);
        this.reset();
        errors = 0;
        currentQuestion = 0;
        showQuestion(currentQuestion);
    });

    showQuestion(currentQuestion);
});
