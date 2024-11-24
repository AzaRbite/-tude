document.addEventListener('DOMContentLoaded', function() {
    const questions = document.querySelectorAll('.question');
    let currentQuestion = 0;
    let errors = 0;

    function showQuestion(index) {
        questions.forEach((question, i) => {
            question.classList.toggle('hidden', i !== index);
        });
    }

    function showCorrection(questionElement, correctAnswer) {
        const selectedOption = questionElement.querySelector('input[type="radio"]:checked');
        if (selectedOption) {
            const label = questionElement.querySelector(`label[for="${selectedOption.id}"]`);
            const feedback = document.createElement('span');
            feedback.style.display = 'block';
            feedback.style.marginTop = '10px';
            feedback.style.color = selectedOption.value === correctAnswer ? 'green' : 'red';
            feedback.textContent = selectedOption.value === correctAnswer ? 'Correct!' : `Incorrect! Correct answer: ${correctAnswer}`;
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

    document.getElementById('quiz-form').addEventListener('submit', function(event) {
        event.preventDefault();
        alert(`Questionnaire terminé avec ${errors} erreur(s). Merci!`);
        this.reset();
        errors = 0;
        currentQuestion = 0;
        showQuestion(currentQuestion);
    });

    questions.forEach((question, index) => {
        question.querySelectorAll('input[type="radio"]').forEach(input => {
            input.addEventListener('change', () => {
                showCorrection(question, index === 0 ? 'Les pieds aux largeurs des épaules à 45 degrés' : 'Faux'); // Adaptez selon les bonnes réponses
                setTimeout(goToNextQuestion, 2000);
            });
        });
    });

    showQuestion(currentQuestion);
});
