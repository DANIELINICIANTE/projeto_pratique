document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("formulario");
    const tableBody = document.querySelector("#agenda tbody");

    const existingNames = new Set();
    const existingTelefones = new Set();

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = form.elements.nome.value.trim();
        const telefone = form.elements.telefone.value.trim();

        if (!hasTwoNames(nome)) {
            alert("O nome deve conter pelo menos dois nomes.");
            return;
        }

        if (!isValidTelefone(telefone)) {
            alert("Número inválido.");
            return;
        }

        if (existingNames.has(nome) || existingTelefones.has(telefone)) {
            alert("Este nome ou telefone já está na agenda.");
            return;
        }

        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${nome}</td>
            <td>${telefone}</td>
        `;

        tableBody.appendChild(newRow);

        existingNames.add(nome);
        existingTelefones.add(telefone);

        form.reset();
    });

    function hasTwoNames(nome) {
        const parts = nome.split(" ");
        return parts.length >= 2;
    }

    function isValidTelefone(telefone) {
        return /^(\(?(?:0?[1-9]{2}\)?)[\s-]?)?(\(?9\d{4}\)?[\s-]?\d{4})$/.test(telefone);
    }
});
