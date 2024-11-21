document.addEventListener("DOMContentLoaded", function() {
    var svgObject = document.getElementById("svgImg");

    svgObject.addEventListener("load", function() {
        var svgDoc = svgObject.getSVGDocument();
        var infraOrbitalPoint = svgDoc.getElementById("Infra-orbital");

        // S'assurer que le point commence caché
        infraOrbitalPoint.style.fillOpacity = 0;

        function activatePoint() {
            infraOrbitalPoint.style.fillOpacity = 1;
            infraOrbitalPoint.style.fill = 'red'; // S'assurer que le point est rouge
        }

        var feedback1Element = document.getElementById("feedback1");

        svgDoc.addEventListener("click", function(e) {
            if (e.target === infraOrbitalPoint) {
                feedback1Element.textContent = "Bonne réponse !";
                feedback1Element.style.color = "#4caf50"; // Vert pour bonne réponse
                activatePoint();
                setTimeout(function() {
                    document.getElementById("question1").style.display = "none";
                    document.getElementById("question2").style.display = "block";
                    feedback1Element.textContent = ""; // Réinitialiser le feedback
                }, 4000); // Attendre 4 secondes avant de passer à la question suivante
            } else {
                feedback1Element.textContent = "Mauvaise réponse, réessayez !";
                feedback1Element.style.color = "#ff4c4c"; // Rouge pour mauvaise réponse
            }
        });

        // Assurez-vous que le point est visible pour la deuxième question
        document.getElementById("question2").addEventListener('click', activatePoint);
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
