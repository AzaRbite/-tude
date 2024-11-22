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
            // Supprimez la logique de réarrangement automatique
        });

        target.addEventListener('drop', () => {
            const draggable = document.querySelector('.dragging');
            if (draggable) {
                // Conserve l'affichage dans l'ordre de dépôt sans réarrangement
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
            dropTargets.forEach(target => {
                target.textContent = '';
                target.classList.remove('valid', 'correct', 'incorrect');
            });
            document.getElementById('draggable-steps').innerHTML = correctOrder.map(step => `<li draggable="true" class="draggable">${step}</li>`).join('');
            document.querySelector('.order-column').style.backgroundColor = '#292929'; // Réinitialiser la couleur de fond
            setupDragAndDrop();
            restartButton.remove();
        });

        document.querySelector('.content').appendChild(restartButton);
    }
});

setupDragAndDrop();
