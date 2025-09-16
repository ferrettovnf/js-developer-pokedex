
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail, pokeDetail2) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
 
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;

    pokemon.gender = pokeDetail.gender_rate;

    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);
    pokemon.habilities = abilities;

    const moves = pokeDetail.moves.map((moveSlot) => moveSlot.move.name);
    const movesType = pokeDetail.moves.map((moveSlot) => moveSlot.move.type);
    pokemon.movesType = movesType.slice(0,2);
    const [move, move1, move2, move3] = moves;
    pokemon.moves = moves.slice(0, 6);
    
    const movesPower = pokeDetail.stats.map((statSlot) => statSlot.base_stat);
    pokemon.movesPower = movesPower;

    pokemon.totalPower = movesPower.reduce((total, power) => total + power, 0);

    if(pokeDetail2)
    {
        const groups = pokeDetail2.egg_groups.map((group) => group.name);
        pokemon.groups = groups;
        const specie = pokeDetail2.genera.map((genera) => genera.genus);
        pokemon.specie = specie[7];
        pokemon.habitat = pokeDetail2.habitat.name;
        pokemon.color = pokeDetail2.color.name;

    }

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

// HTTP Request para detalhes do pokemon - segunda tela
pokeApi.getPokemonData = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    const url1 = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
    const fetchPromise1 = fetch(url).then(response => response.json());
    const fetchPromise2 = fetch(url1).then(response => response.json());

    return Promise.all([fetchPromise1, fetchPromise2])
        .then(([data1, data2]) => {return convertPokeApiDetailToPokemon(data1, data2);})
}