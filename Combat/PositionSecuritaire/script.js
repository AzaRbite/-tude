document.addEventListener('DOMContentLoaded', function() {
    const questions = document.querySelectorAll('.question');
    let currentQuestion = 0;

    function showQuestion(index) {
        questions.forEach((question, i) => {
            if (i === index) {
                question.classList.remove('hidden');
            } else {
                question.classList.add('hidden');
            }
        });

        document.getElementById('next-button').classList.toggle('hidden', index === questions.length - 1);
        document.getElementById('submit-button').classList.toggle('hidden', index !== questions.length - 1);
    }

    document.getElementById('next-button').addEventListener('click', function() {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            showQuestion(currentQuestion);
        }
    });

    document.getElementById('quiz-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const answers = {};

        for (const [name, value] of formData.entries()) {
            answers[name] = value;
        }

        console.log('Réponses soumises:', answers);

        alert('Merci d\'avoir soumis le questionnaire !');
        this.reset();
        currentQuestion = 0;
        showQuestion(currentQuestion);
    });

    showQuestion(currentQuestion);
});
