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
            if (draggable) {
                const afterElement = getDragAfterElement(target, e.clientY);
                if (afterElement == null) {
                    target.appendChild(draggable);
                } else {
                    target.insertBefore(draggable, afterElement);
                }
                draggable.classList.remove('dragging', 'invisible');
            }
        });
    });
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
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
