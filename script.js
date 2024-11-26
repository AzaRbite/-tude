document.addEventListener('DOMContentLoaded', function() {
    console.log("Menu de base chargé avec succès. Sélectionnez un cours pour commencer.");
    generateCalendar();
});

function generateCalendar() {
    const calendarTable = document.getElementById('calendar-table');
    const month = 'décembre';
    const examDates = {
        5: [{ title: 'Enquête', time: '13h00', location: 'Local 301' }],
        11: [
            { title: 'Drogue', time: '09h00', location: 'Gym' },
            { title: 'Combat', time: '13h00', location: 'Gym' }
        ],
        12: [{ title: 'Activités Policières', location: 'Gym' }],
        16: [{ title: 'Personne en état de crise', time: '13h00', location: 'Local 207' }],
        17: [{ title: 'CSR', time: '13h00', location: 'Gym' }],
        19: [{ title: 'Santé mentale', time: '13h00', location: 'Local 207' }]
    };

    const daysInMonth = 31;

    const headerRow = document.createElement('tr');
    ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].forEach(day => {
        const th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
    });
    calendarTable.appendChild(headerRow);

    let currentDate = 1;
    const firstDayOfMonth = new Date(2024, 11, 1).getDay();

    for (let i = 0; i < 6; i++) {
        const weekRow = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            if (i === 0 && j < firstDayOfMonth || currentDate > daysInMonth) {
                weekRow.appendChild(cell);
            } else {
                cell.textContent = currentDate;
                if (examDates[currentDate]) {
                    cell.classList.add('exam-date');

                    // Crée l'info-bulle pour chaque date d'examen
                    const infoDiv = document.createElement('div');
                    infoDiv.classList.add('exam-info');
                    examDates[currentDate].forEach(exam => {
                        const examDetails = `<strong>Examen:</strong> ${exam.title}<br><strong>Heure:</strong> ${exam.time || ''}<br><strong>Lieu:</strong> ${exam.location}<br><br>`;
                        infoDiv.innerHTML += examDetails;
                    });
                    cell.appendChild(infoDiv);
                }
                weekRow.appendChild(cell);
                currentDate++;
            }
        }
        calendarTable.appendChild(weekRow);
    }
}
