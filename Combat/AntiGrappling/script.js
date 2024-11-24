document.getElementById('easy-level').addEventListener('click', function() {
    document.getElementById('easy-mode').classList.remove('hidden');
    document.getElementById('advanced-mode').classList.add('hidden');
});

document.getElementById('advanced-level').addEventListener('click', function() {
    document.getElementById('advanced-mode').classList.remove('hidden');
    document.getElementById('easy-mode').classList.add('hidden');
});

function setupDragAndDrop() {
    const draggables = document.querySelectorAll('.draggable');
    const dropTargets = document.querySelectorAll('.order-column li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
            setTimeout(() => draggable.classList.add('invisible'), 0);
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging', 'invisible');
        });
    });

    dropTargets.forEach(target => {
        target.addEventListener('dragover', e => {
            e.preventDefault();
        });

        target.addEventListener('drop', e => {
            e.preventDefault();
            const draggable = document.querySelector('.dragging');
            if (draggable) {
                target.innerHTML = ''; // Vider le contenu actuel pour éviter les doublons
                target.appendChild(draggable);
                draggable.classList.remove('dragging', 'invisible');
            }
        });
    });
}

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

    const dropTargets = document.querySelectorAll('.order-column li');

    dropTargets.forEach((target, index) => {
        const draggable = target.querySelector('.draggable');
        const content = draggable ? draggable.textContent.trim() : '';
        
        // Réinitialiser les classes pour éviter les problèmes d'affichage
        target.classList.remove('correct', 'incorrect');

        if (content === correctOrder[index]) {
            target.classList.add('correct');
        } else if (content) { // Ne marquer que les cases non vides
            target.classList.add('incorrect');
        }
    });

    if (!document.getElementById('restart-button')) {
        const restartButton = document.createElement('button');
        restartButton.id = 'restart-button';
        restartButton.classList.add('button');
        restartButton.textContent = "Recommencer";

        restartButton.addEventListener('click', () => {
            // Réinitialiser les drop targets
            dropTargets.forEach(target => {
                target.innerHTML = ''; // Vider le contenu
                target.className = ''; // Reset class
                target.style.height = ''; // Réinitialiser la hauteur automatiquement
            });

            // Réinitialiser la colonne des éléments glissables
            const draggableStepsContainer = document.getElementById('draggable-steps');
            draggableStepsContainer.innerHTML = correctOrder.map(step => `<li draggable="true" class="draggable">${step}</li>`).join('');
            const originalItems = draggableStepsContainer.querySelectorAll('.draggable');
            originalItems.forEach(item => {
                item.className = 'draggable';
                item.style.backgroundColor = '';
            });

            document.querySelector('.order-column').style.backgroundColor = '#292929';

            setupDragAndDrop();
            restartButton.remove();
        });

        document.querySelector('.content').appendChild(restartButton);
    }
});

setupDragAndDrop();
