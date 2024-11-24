document.getElementById('quiz-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Exemple de traitement du formulaire
    const formData = new FormData(this);
    const answers = {};
    
    for (const [name, value] of formData.entries()) {
        answers[name] = value;
    }

    console.log('Réponses soumises:', answers);

    // Traitement et validation des réponses
    alert('Merci d\'avoir soumis le questionnaire !');
    this.reset();
});
