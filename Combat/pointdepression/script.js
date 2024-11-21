document.addEventListener("DOMContentLoaded", function() {
    var svgObject = document.getElementById("svgImg").contentDocument;

    // Assurez-vous que le SVG est chargé
    svgObject.addEventListener("load", function() {
        var point1 = svgObject.getElementById("point1");

        point1.addEventListener('click', function() {
            alert("Point de pression cliqué !");
            point1.style.fill = 'red'; // Change la couleur pour confirmer le clic
        });
    });
});
