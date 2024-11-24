document.getElementById('easy-level').addEventListener('click', function() {
    document.getElementById('easy-mode').classList.remove('hidden');
    document.getElementById('advanced-mode').classList.add('hidden');
});

document.getElementById('advanced-level').addEventListener('click', function() {
    document.getElementById('advanced-mode').classList.remove('hidden');
    document.getElementById('easy-mode').classList.add('hidden');
});

function initializeDraggableSteps(containerId) {
    const steps = [
        "Abaissez votre centre de gravité",
        "Décidez du niveau de défense à utiliser",
        "Établir quel membre est libre",
        "Choisissez une cible",
        "Sélectionnez une technique de frappe",
        "Frappez pour assoupir votre agresseur",
        "Libérez-vous de la saisie, si nécessaire",
        "Attaque avec une combinaison de techniques",
        "Évaluer les dommages",
        "Évadez-vous ou attaquez à nouveau"
    ];

    const shuffledSteps = steps.sort(() => Math.random() - 0.5);
    const container = document.getElementById(containerId);
    container.innerHTML = shuffledSteps.map(step => `<li class="draggable" draggable="true">${step}</li>`).join('');
}

function initializeAdvancedInputZones() {
    const inputZone = document.getElementById('input-zone');
    inputZone.innerHTML = Array(10).fill(null).map((_, i) => `
        <li>
            <input type="text" placeholder="Étape ${i + 1}">
        </li>
    `).join('');
}

// Initialisation des modes
initializeDraggableSteps('draggable-steps');
initializeDraggableSteps('draggable-steps-advanced');
initializeAdvancedInputZones();
