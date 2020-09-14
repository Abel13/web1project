const cardListContainer = document.getElementById("cardsList");

async function getPokemonData(pokemons) {
  const pokemonList = []


  for (const element of pokemons) {
    console.log("POKE", element)
    const pokemonResp = await fetch(element.url, {
      method: "GET",
    })
    const pokemonData = await pokemonResp.json();

    console.log(pokemonData.name)
    pokemonList.push(pokemonData)
  }

  console.log("JA PASSOu")
  return pokemonList
}

async function getAllPokemons() {
  const page = 1 * 30;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150`, {
    method: "GET",
  });

  const formattedRes = await response.json();

  pokemonList = await getPokemonData(formattedRes.results)

  console.log("OK", pokemonList)
  putInList(pokemonList);
}

function putInList(pokemons) {
  const pokemonList = pokemons.map((pokemon) => getCardObj(pokemon));

  pokemonList.map((pokemon) => {
    cardListContainer.innerHTML += pokemon;
  });
}

function getCardObj(pokemon) {
  console.log("POPO", pokemon.name)
  return `
      <div class="pokeCard col-sm-3">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif" alt="pokémon ${pokemon.name}" />
        <div class="cardInfosContainer">
          <h2 class="cardTitle">#${(pokemon.id).toString().padStart(3, '0')} ${pokemon.name}</h2>
          <div class="cardInfoLine">
            <p><b>Height:</b> ${pokemon.height}</p>
          </div>
          <div class="cardInfoLine">
            <p><b>weight:</b> ${pokemon.weight}</p>
          </div>
          <div class="cardInfoLine">
            <p><b>Habilidades:</b> ${pokemon.abilities.map(item => ` ${item.ability.name}`)}
            </p>
          </div>
        </div>
      </div>
    `;
}

getAllPokemons();