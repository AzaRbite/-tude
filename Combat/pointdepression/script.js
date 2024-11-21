document.addEventListener("DOMContentLoaded", function() {
    var svgObject = document.getElementById("svgImg");

    svgObject.addEventListener("load", function() {
        var svgDoc = svgObject.getSVGDocument();
        var infraOrbitalPoint = svgDoc.getElementById("Infra-orbital");

        if (infraOrbitalPoint) {
            infraOrbitalPoint.addEventListener("click", function() {
                var currentOpacity = infraOrbitalPoint.style.fillOpacity;
                if (currentOpacity == 0 || currentOpacity === '') {
                    infraOrbitalPoint.style.fillOpacity = 1; 
                    alert("Point Infra-orbital cliqué !");
                } else {
                    infraOrbitalPoint.style.fillOpacity = 0; 
                }
            });
        }
    });
});

function checkAnswer(choiceName, correctId) {
    var selected = document.querySelector(`input[name="${choiceName}"]:checked`);
    if (selected && selected.value === correctId) {
        alert("Bonne réponse !");
        document.getElementById("question1").style.display = "none";
        document.getElementById("question2").style.display = "block";
    } else {
        alert("Mauvaise réponse, réessayez !");
    }
}

function checkTextAnswer(inputId, correctAnswer) {
    var answerInput = document.getElementById(inputId);
    if (answerInput.value.trim() === correctAnswer) {
        alert("Bonne réponse !");
    } else {
        alert("Mauvaise réponse, réessayez !");
    }
}
