document.addEventListener('DOMContentLoaded', function() {
    console.log("Menu de base chargé avec succès. Sélectionnez un cours pour commencer.");
    updateCurrentDate();
});

function updateCurrentDate() {
    const calendarEl = document.getElementById('calendar');
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('fr-FR', options);

    calendarEl.textContent = `Nous sommes le ${formattedDate}`;
}
