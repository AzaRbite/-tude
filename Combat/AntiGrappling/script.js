document.getElementById('easy-level').addEventListener('click', function() {
    document.getElementById('easy-mode').classList.remove('hidden');
    document.getElementById('advanced-mode').classList.add('hidden');
    document.getElementById('validate').classList.remove('hidden');
});

document.getElementById('advanced-level').addEventListener('click', function() {
    document.getElementById('advanced-mode').classList.remove('hidden');
    document.getElementById('easy-mode').classList.add('hidden');
    document.getElementById('validate').classList.remove('hidden');
});

// Drag and drop functionality
const draggables = document.querySelectorAll('.draggable');
const dropZone = document.getElementById('drop-zone');

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    });
});

dropZone.addEventListener('dragover', e => {
    e.preventDefault();
    const afterElement = getDragAfterElement(dropZone, e.clientY);
    const draggable = document.querySelector('.dragging');
    if (afterElement == null) {
        dropZone.appendChild(draggable);
    } else {
        dropZone.insertBefore(draggable, afterElement);
    }
});

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

// Validation logic
document.getElementById('validate').addEventListener('click', function() {
    if (!document.getElementById('advanced-mode').classList.contains('hidden')) {
        // Check the order entered in the textarea
        const inputText = document.getElementById('input-steps').value.trim();
        // Compare with the correct sequence
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
        const userOrder = inputText.split('\n').map(step => step.trim());
        if (JSON.stringify(correctOrder) === JSON.stringify(userOrder)) {
            alert("Bravo ! Vous avez les étapes dans le bon ordre.");
        } else {
            alert("Veuillez réessayer. L'ordre n'est pas correct.");
        }
    } else {
        // Logic for validating drag and drop order
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
        const userOrder = Array.from(dropZone.children).map(item => item.textContent.trim());
        if (JSON.stringify(correctOrder) === JSON.stringify(userOrder)) {
            alert("Bravo ! Vous avez les étapes dans le bon ordre.");
        } else {
            alert("Veuillez réessayer. L'ordre n'est pas correct.");
        }
    }
});
