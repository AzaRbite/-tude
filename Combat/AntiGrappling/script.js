document.getElementById('easy-level').addEventListener('click', function() {
    document.getElementById('easy-mode').classList.remove('hidden');
    document.getElementById('advanced-mode').classList.add('hidden');
});

document.getElementById('advanced-level').addEventListener('click', function() {
    document.getElementById('advanced-mode').classList.remove('hidden');
    document.getElementById('easy-mode').classList.add('hidden');
});

// Fonctionnalité de drag and drop
const draggables = document.querySelectorAll('.draggable');
const dropTargets = document.querySelectorAll('.drop-target');

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    });
});

dropTargets.forEach(target => {
    target.addEventListener('dragover', e => {
        e.preventDefault();
        const draggable = document.querySelector('.dragging');
        target.appendChild(draggable);
    });
});

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
    const userOrder = Array.from(document.querySelectorAll('.drop-target'))
        .map(target => target.textContent.trim())
        .filter(text => text.length > 0);
    if (JSON.stringify(correctOrder) === JSON.stringify(userOrder)) {
        alert("Bravo ! Vous avez les étapes dans le bon ordre.");
    } else {
        alert("Veuillez réessayer. L'ordre n'est pas correct.");
    }
});

document.getElementById('validate-advanced').addEventListener('click', function() {
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
    const userOrder = Array.from(document.querySelectorAll('.input-columns input'))
        .map(input => input.value.trim())
        .filter(text => text.length > 0);
    if (JSON.stringify(correctOrder) === JSON.stringify(userOrder)) {
        alert("Bravo ! Vous avez les étapes dans le bon ordre.");
    } else {
        alert("Veuillez réessayer. L'ordre n'est pas correct.");
    }
});
