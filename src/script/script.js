
const pokedex = document.getElementById('pokedex');

const pokeCache= {}
const fetchPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
    const res = await fetch(url);
    const data = await res.json();
    const pokemon = data.results.map((result, index) => ({
        ...result,
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
    }));
    console.log(data.results);
    displayPokemons(pokemon);
};

const displayPokemons = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map( creature =>`
        <li class="card" onclick="selectPokemon(${creature.id})">
            <img class="card-img" src="${creature.image}"/>
            <h2 class="card-name">${creature.name}</h2>
            <h3 class="card-id">${creature.id}</h3>
        </li>
        `).join('');
    pokedex.innerHTML = pokemonHTMLString;
};

const selectPokemon = async (id) => {
    if (!pokeCache[id]) {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const creature = await  res.json();
        pokeCache[id] = creature;
        displayPopup(creature);
    }
    displayPopup(pokeCache[id]);
};

const displayPopup = (creature) => {
    const type = creature.types.map((type) => 
    type.type.name).join(', ');
    const image = creature.sprites['front_default'];
    const htmlString = `
    <div class="popup">
        <button id="closeBtn" onclick="closePopup()">Close</button>
        <div class="card">
            <img class="card-img" src="${image}"/>
            <h2 class="card-name">${creature.name}</h2>
            <h3 class="card-id">${creature.id}</h3>
            <p><small>Altura: </small>${creature.height}  
            | <small>Peso: </small>${creature.weight} 
            | <small>Tipo: </small>${type}
        </div>
    </div>
    `;
    pokedex.innerHTML = htmlString + pokedex.innerHTML;
    console.log(htmlString)
};

const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
}

fetchPokemon()