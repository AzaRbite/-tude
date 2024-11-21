document.addEventListener("DOMContentLoaded", function() {
    var svgObject = document.getElementById("svgImg");

    svgObject.addEventListener("load", function() {
        var svgDoc = svgObject.getSVGDocument();
        var infraOrbitalPoint = svgDoc.getElementById("Infra-orbital");

        // Réinitialiser le message de feedback
        var feedbackElement = document.getElementById("feedback");
        feedbackElement.textContent = "";

        svgDoc.addEventListener("click", function(e) {
            if (e.target === infraOrbitalPoint) {
                feedbackElement.textContent = "Bonne réponse !";
                feedbackElement.style.color = "#4caf50"; // Vert pour bonne réponse
                document.getElementById("question1").style.display = "none";
                document.getElementById("question2").style.display = "block";
            } else {
                feedbackElement.textContent = "Mauvaise réponse, réessayez !";
                feedbackElement.style.color = "#ff4c4c"; // Rouge pour mauvaise réponse
            }
        });
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
