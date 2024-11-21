document.addEventListener("DOMContentLoaded", function() {
    var svgObject = document.getElementById("svgImg");

    svgObject.addEventListener("load", function() {
        // Obtention du document SVG interne
        var svgDoc = svgObject.contentDocument;
        
        // Sélection du point par son ID
        var infraOrbitalPoint = svgDoc.getElementById("Infra-orbital");

        // Ajouter un événement au clic pour changer l'opacité
        infraOrbitalPoint.addEventListener("click", function() {
            var currentOpacity = infraOrbitalPoint.style.fillOpacity;

            if (currentOpacity == 0 || currentOpacity === '') {
                infraOrbitalPoint.style.fillOpacity = 1; // Rendre visible
                alert("Point Infra-orbital cliqué !");
            } else {
                infraOrbitalPoint.style.fillOpacity = 0; // Rendre invisible
            }
        });
    });
});

