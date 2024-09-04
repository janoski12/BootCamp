document.addEventListener('DOMContentLoaded', () => {
    const detailsContainer = document.getElementById('details');
    const ranges = document.querySelectorAll('.range');

    // Añadir evento de hover para cada rango
    ranges.forEach(range => {
        range.addEventListener('mouseenter', () => {
            const rangeText = range.dataset.range.split('-');
            const start = parseInt(rangeText[0]);
            const end = parseInt(rangeText[1]);
            loadCharacters(start, end);
        });
    });

    function* characterGenerator(start, end) {
        for (let i = start; i <= end; i++) {
            yield fetchCharacter(i);
        }
    }

    async function fetchCharacter(id) {
        const response = await fetch(`https://swapi.dev/api/people/${id}/`);
        return response.json();
    }

    async function loadCharacters(start, end) {
        // Limpiar el contenedor de detalles antes de cargar nuevos personajes
        detailsContainer.innerHTML = '';

        const generator = characterGenerator(start, end);
        for (let characterPromise of generator) {
            const character = await characterPromise;
            displayCharacter(character);
        }
    }

    function displayCharacter(character) {
        // Crear un nuevo div para cada personaje y agregarlo al contenedor de detalles
        const characterElement = document.createElement('div');
        characterElement.classList.add('detail-item', 'mb-3', 'p-3', 'border', 'rounded');

        characterElement.innerHTML = `
            <strong>${character.name}</strong><br>
            Altura: ${character.height} cm<br>
            Peso: ${character.mass} kg
        `;

        detailsContainer.appendChild(characterElement);
    }
});
