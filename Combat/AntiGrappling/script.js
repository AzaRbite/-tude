document.getElementById('easy-level').addEventListener('click', function() {
    document.getElementById('easy-mode').classList.remove('hidden');
    document.getElementById('advanced-mode').classList.add('hidden');
});

document.getElementById('advanced-level').addEventListener('click', function() {
    document.getElementById('advanced-mode').classList.remove('hidden');
    document.getElementById('easy-mode').classList.add('hidden');
});

// Fonctionnalité de drag and drop
function setupDragAndDrop() {
    const draggables = document.querySelectorAll('.draggable');
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
    });

    const dropTargets = document.querySelectorAll('.drop-target');
    dropTargets.forEach(target => {
        target.addEventListener('dragover', e => {
            e.preventDefault();
            const draggable = document.querySelector('.dragging');
            target.appendChild(draggable);
        });
    });
}

// Logique de validation
document.getElementById('validate-easy').addEventListener('click', function() {
    const correctOrder = [
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
    const dropTargets = document.querySelectorAll('.drop-target');
    
    dropTargets.forEach((target, index) => {
        const content = target.textContent.trim();
        if (content === correctOrder[index]) {
            target.classList.add('valid', 'correct');
        } else {
            target.classList.add('valid', 'incorrect');
        }
    });

    const restartButton = document.createElement('button');
    restartButton.classList.add('button');
    restartButton.textContent = "Recommencer";
    restartButton.addEventListener('click', () => {
        dropTargets.forEach(target => {
            target.textContent = '';
            target.classList.remove('valid', 'correct', 'incorrect');
        });
        document.getElementById('draggable-steps').innerHTML = correctOrder.map(step => `<li draggable="true" class="draggable">${step}</li>`).join('');
        setupDragAndDrop(); // Remet en place les événements de drag and drop
        restartButton.remove();
    });

    document.querySelector('.content').appendChild(restartButton);
});

// Initialisation du drag and drop
setupDragAndDrop();
