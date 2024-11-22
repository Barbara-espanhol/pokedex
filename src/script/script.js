
const pokedex = document.getElementById('pokedex');

console.log(pokedex);

const fetchPokemon = () => {
    
    const promises = [];
    for( let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }

    Promise.all(promises).then(results => {
        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            type: data.types.map((type) => type.type.name).join(', ')
        }));
        displayPokemons(pokemon);
    });
};

const displayPokemons = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map( creature =>`
        <li class="card">
            <h3 class="card-id">${creature.id}</h3>
            <img class="card-img" src="${creature.image}"/>
            <h2 class="card-name">${creature.name}</h2>
            <p class="card-type">${creature.type}</p>
        </li>
        `).join('')
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();