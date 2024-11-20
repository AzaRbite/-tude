document.addEventListener('DOMContentLoaded', function() {
    const questions = [
       "Quelle est la capitale de la France ?",
       "Qu'est-ce que le DOM en JavaScript ?",
       "Décrivez la méthode CSS Flexbox.",
       // Ajoutez plus de questions ici
    ];

    let currentQuestionIndex = 0;

    const questionContainer = document.getElementById('question-container');
    const nextButton = document.getElementById('next-button');

    function showQuestion(index) {
        questionContainer.textContent = questions[index];
    }

    nextButton.addEventListener('click', function() {
        currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
        showQuestion(currentQuestionIndex);
    });

    // Affiche la première question
    showQuestion(currentQuestionIndex);
});
