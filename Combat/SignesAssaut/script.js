document.addEventListener('DOMContentLoaded', function() {
    const generateScenarioButton = document.getElementById('generate-scenario-button');
    const scenarioOutput = document.getElementById('scenario-output');

    generateScenarioButton.addEventListener('click', function() {
        const agentId = '01JDFQPX8N52632XWP99VTWJEY'; // Utiliser l'ID correct depuis Taskade
        const commandId = '/signesprecurseursassault'; // Vérifiez que cette commande est bien configurée

        // Exemple de requête à l'API (vous devrez ajuster en fonction de votre configuration serveur)
        fetch(`/api/generate_scenario/${agentId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            scenarioOutput.innerHTML = `<p>${data.result}</p>`;
        })
        .catch(error => {
            console.error('Erreur:', error);
            scenarioOutput.innerHTML = `<p style="color: red;">Une erreur s'est produite lors de la génération du scénario.</p>`;
        });
    });
});
