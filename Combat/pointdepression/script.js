document.addEventListener("DOMContentLoaded", function() {
    var svgObject = document.getElementById("svgImg");

    svgObject.addEventListener("load", function() {
        var svgDoc = svgObject.getSVGDocument();
        var infraOrbitalPoint = svgDoc.getElementById("Infra-orbital");

        // Ajoute une classe pour l'animation visuelle
        infraOrbitalPoint.setAttribute('id', 'infra-orbital-highlight');

        var feedbackElement = document.getElementById("feedback");

        svgDoc.addEventListener("click", function(e) {
            if (e.target === infraOrbitalPoint) {
                feedbackElement.textContent = "Bonne réponse !";
                feedbackElement.style.color = "#4caf50"; // Vert pour bonne réponse
                infraOrbitalPoint.classList.add("active");
                setTimeout(function() {
                    document.getElementById("question1").style.display = "none";
                    document.getElementById("question2").style.display = "block";
                    feedbackElement.textContent = ""; // Reset feedback
                    infraOrbitalPoint.classList.remove("active");
                }, 4000); // attendre 4 secondes avant de passer à la question suivante
            } else {
                feedbackElement.textContent = "Mauvaise réponse, réessayez !";
                feedbackElement.style.color = "#ff4c4c"; // Rouge pour mauvaise réponse
            }
        });

        // Assurez-vous que le point est mis en évidence pour la deuxième question
        infraOrbitalPoint.classList.add("active");
    });
});

function checkTextAnswer(inputId, correctAnswer) {
    var answerInput = document.getElementById(inputId);
    var feedbackElement = document.getElementById("question2-feedback");
    if (answerInput.value.trim() === correctAnswer) {
        feedbackElement.textContent = "Bonne réponse !";
        feedbackElement.style.color = "#4caf50";
    } else {
        feedbackElement.textContent = "Mauvaise réponse, réessayez !";
        feedbackElement.style.color = "#ff4c4c";
    }
}
