document.addEventListener("DOMContentLoaded", function() {
    var svgObject = document.getElementById("svgImg");

    svgObject.addEventListener("load", function() {
        var svgDoc = svgObject.getSVGDocument();
        var infraOrbitalPoint = svgDoc.getElementById("Infra-orbital");

        // Assurez-vous que le point est visible avec une animation
        function activatePoint() {
            infraOrbitalPoint.style.fillOpacity = 1;
            infraOrbitalPoint.style.fill = 'red'; // Assurez-vous que le point est rouge
        }

        var feedbackElement = document.getElementById("feedback");

        svgDoc.addEventListener("click", function(e) {
            if (e.target === infraOrbitalPoint) {
                feedbackElement.textContent = "Bonne réponse !";
                feedbackElement.style.color = "#4caf50"; // Vert pour bonne réponse
                activatePoint();
                setTimeout(function() {
                    document.getElementById("question1").style.display = "none";
                    document.getElementById("question2").style.display = "block";
                    feedbackElement.textContent = ""; // Reset feedback
                }, 4000); // attendre 4 secondes avant de passer à la question suivante
            } else {
                feedbackElement.textContent = "Mauvaise réponse, réessayez !";
                feedbackElement.style.color = "#ff4c4c"; // Rouge pour mauvaise réponse
            }
        });

        // Montrez le point pendant la deuxième question
        activatePoint();
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
