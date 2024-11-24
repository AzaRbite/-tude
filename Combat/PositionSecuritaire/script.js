document.addEventListener('DOMContentLoaded', function () {
    const questions = document.querySelectorAll('.question');
    let currentQuestion = 0;
    let errors = 0;

    function showQuestion(index) {
        questions.forEach((question, i) => {
            question.classList.toggle('hidden', i !== index);
        });
        document.getElementById('question-counter').textContent = `Question ${index + 1} de ${questions.length}`;
    }

    function showCorrection(questionElement, correctAnswer) {
        const selectedOption = questionElement.querySelector('input[type="radio"]:checked');
        if (selectedOption) {
            const feedback = document.createElement('div');
            feedback.style.marginTop = '10px';
            feedback.style.color = selectedOption.value === correctAnswer ? 'green' : 'red';
            feedback.textContent = selectedOption.value === correctAnswer ? 'Correct!' : `Incorrect! Réponse correcte: ${correctAnswer}`;
            questionElement.appendChild(feedback);

            if (selectedOption.value !== correctAnswer) {
                errors++;
            }
        }
    }

    function goToNextQuestion() {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            showQuestion(currentQuestion);
        } else {
            document.getElementById('submit-button').classList.remove('hidden');
        }
    }

    questions.forEach((question, index) => {
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
