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
    const dropTargets = document.querySelectorAll('.drop-target');

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
            const existingItem = target.querySelector('.draggable');
            if (draggable) {
                if (existingItem) {
                    const parent = draggable.parentElement;
                    target.replaceChild(draggable, existingItem);
                    parent.appendChild(existingItem);
                } else {
                    target.appendChild(draggable);
                }
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

    const dropTargets = document.querySelectorAll('.drop-target li');

    dropTargets.forEach((target, index) => {
        const content = target.textContent.trim();
        if (content === correctOrder[index]) {
            target.classList.add('valid', 'correct');
            target.classList.remove('incorrect');
        } else {
            target.classList.add('valid', 'incorrect');
            target.classList.remove('correct');
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
                target.classList.remove('valid', 'correct', 'incorrect', 'dropped'); // Supprimer les classes
            });

            // Réinitialiser la colonne des éléments glissables
            const draggableStepsContainer = document.getElementById('draggable-steps');
            draggableStepsContainer.innerHTML = correctOrder.map(step => `<li draggable="true" class="draggable">${step}</li>`).join('');
            const originalItems = draggableStepsContainer.querySelectorAll('.draggable');
            originalItems.forEach(item => {
                item.style.backgroundColor = ''; // Supprimer le fond rouge
                item.classList.remove('dragging', 'invisible', 'dropped'); // Supprimer toutes les classes ajoutées
            });

            document.querySelector('.order-column').style.backgroundColor = '#292929';

            setupDragAndDrop();
            restartButton.remove();
        });

        document.querySelector('.content').appendChild(restartButton);
    }
});

setupDragAndDrop();
