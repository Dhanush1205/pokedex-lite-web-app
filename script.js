const pokemonCount = 24;
let pokedex = {};
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let currentPage = 1;
let totalPages = 5;

window.onload = async function() {
    await loadPokemonList(currentPage);
}

async function loadPokemonList(page) {
    const pokemonListDiv = document.getElementById('pokemon-list');
    pokemonListDiv.innerHTML = '';
    const startIndex = (page - 1) * pokemonCount + 1;
    const endIndex = page * pokemonCount;

    for (let i = startIndex; i <= endIndex; i++) {
        await getPokemon(i);
        let pokemon = document.createElement('div');
        pokemon.classList.add('pokemon-card');
        pokemon.innerHTML = `
            <img src="${pokedex[i].img}" alt="${pokedex[i].name}">
            <h3>${pokedex[i].name.toUpperCase()}</h3>
        `;
        pokemon.addEventListener('click', () => showPokemonDetail(i));
        pokemonListDiv.append(pokemon);
    }

    updatePagination();
}

async function getPokemon(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();

    const pokemon = {
        name: data.name,
        img: data.sprites.front_default,
        types: data.types.map(type => type.type.name),
        desc: await getPokemonDescription(data.species.url)
    };

    pokedex[id] = pokemon;
}

async function getPokemonDescription(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text;
}

function showPokemonDetail(id) {
    const pokemon = pokedex[id];
    document.getElementById('detail-img').src = pokemon.img;
    document.getElementById('detail-name').innerText = pokemon.name.toUpperCase();
    document.getElementById('detail-types').innerText = pokemon.types.join(', ').toUpperCase();
    document.getElementById('detail-desc').innerText = pokemon.desc;
    document.getElementById('fav-btn').innerText = favorites.includes(id) ? 'Remove from Favorites' : 'Add to Favorites';

    document.getElementById('pokemon-detail').style.display = 'block';
}

function closeDetail() {
    document.getElementById('pokemon-detail').style.display = 'none';
}

function toggleFavorite() {
    const pokemonId = document.getElementById('detail-name').innerText.toLowerCase();
    const index = Object.keys(pokedex).find(id => pokedex[id].name.toLowerCase() === pokemonId);

    if (favorites.includes(index)) {
        favorites = favorites.filter(id => id !== index);
    } else {
        favorites.push(index);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    document.getElementById('fav-btn').innerText = favorites.includes(index) ? 'Remove from Favorites' : 'Add to Favorites';
}

function searchPokemon() {
    const query = document.getElementById('search').value.toLowerCase();
    const filteredPokemon = Object.keys(pokedex).filter(id => pokedex[id].name.toLowerCase().includes(query));
    displayFilteredPokemon(filteredPokemon);
}

function filterByType() {
    const selectedType = document.getElementById('type-filter').value;
    const filteredPokemon = Object.keys(pokedex).filter(id => {
        return selectedType ? pokedex[id].types.includes(selectedType) : true;
    });
    displayFilteredPokemon(filteredPokemon);
}

function displayFilteredPokemon(filteredPokemon) {
    const pokemonListDiv = document.getElementById('pokemon-list');
    pokemonListDiv.innerHTML = '';
    filteredPokemon.forEach(id => {
        let pokemon = document.createElement('div');
        pokemon.classList.add('pokemon-card');
        pokemon.innerHTML = `
            <img src="${pokedex[id].img}" alt="${pokedex[id].name}">
            <h3>${pokedex[id].name.toUpperCase()}</h3>
        `;
        pokemon.addEventListener('click', () => showPokemonDetail(id));
        pokemonListDiv.append(pokemon);
    });
}

function updatePagination() {
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

function goToNextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        loadPokemonList(currentPage);
    }
}

function goToPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        loadPokemonList(currentPage);
    }
}
