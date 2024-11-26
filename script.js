document.addEventListener('DOMContentLoaded', function() {
    console.log("Menu de base chargé avec succès. Sélectionnez un cours pour commencer.");
    generateCalendar();
});

function generateCalendar() {
    const calendarTable = document.getElementById('calendar-table');
    const month = 'décembre';
    const examDates = {
        5: 'Enquête',
        11: 'Drogue en matinée et Combat en après-midi',
        12: 'Activités Policières',
        16: 'Personne en état de crise',
        17: 'CSR',
        18: 'Santé mentale'
    };

    const daysInMonth = 31; // Nombre de jours pour décembre

    // Crée l'en-tête du calendrier
    const headerRow = document.createElement('tr');
    ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].forEach(day => {
        const th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
    });
    calendarTable.appendChild(headerRow);

    let currentDate = 1;
    const firstDayOfMonth = new Date(2024, 11, 1).getDay(); // 1er décembre 2024

    // Remplissez le calendrier
    for (let i = 0; i < 6; i++) { // Jusqu'à 6 semaines d'affichage
        const weekRow = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            if (i === 0 && j < firstDayOfMonth || currentDate > daysInMonth) {
                // Ajouter des cellules vides pour remplir la première semaine et après le dernier jour du mois
                weekRow.appendChild(cell);
            } else {
                cell.textContent = currentDate;
                if (examDates[currentDate]) {
                    cell.classList.add('exam-date');
                    cell.title = examDates[currentDate]; // Ajoute un titre pour l'info-bulle
                }
                weekRow.appendChild(cell);
                currentDate++;
            }
        }
        calendarTable.appendChild(weekRow);
    }
}
