const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const spriteContainer = document.getElementById("sprite-container");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const pokemonUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

const resetDisplay = () => {
  const sprite = document.getElementById("sprite");
  if (sprite) sprite.remove();

  // reset stats
  pokemonName.textContent = "";
  pokemonId.textContent = "";
  types.innerHTML = "";
  height.textContent = "";
  weight.textContent = "";
  hp.textContent = "";
  attack.textContent = "";
  defense.textContent = "";
  specialAttack.textContent = "";
  specialDefense.textContent = "";
  speed.textContent = "";
};

const fetchPokemon = async (input) => {
  try {
    const res = await fetch(pokemonUrl + input);
    const data = await res.json();
    return data;
  } catch (error) {
    resetDisplay();
    alert("Pokémon not found");
    console.log(error);
  }
};
const displayPokemon = async () => {
  const pokemon = await fetchPokemon(searchInput.value.toLowerCase());
  console.log(pokemon);
  pokemonName.textContent = pokemon.name;
  pokemonId.textContent = pokemon.id;
  weight.textContent = `Weight: ${pokemon.weight}`;
  height.textContent = `Height: ${pokemon.height}`;
  spriteContainer.innerHTML = `<img id="sprite" src=${pokemon.sprites.front_default} alt=${pokemon.name}>`;
  types.innerHTML = pokemon.types
    .map((element) => {
      return `<span class="type ${element.type.name}">${element.type.name}</span>`;
    })
    .join("");
  hp.textContent = pokemon.stats[0].base_stat;
  attack.textContent = pokemon.stats[1].base_stat;
  defense.textContent = pokemon.stats[2].base_stat;
  specialAttack.textContent = pokemon.stats[3].base_stat;
  specialDefense.textContent = pokemon.stats[4].base_stat;
  speed.textContent = pokemon.stats[5].base_stat;
};

const checkInput = () => {
  if (!searchInput.value) {
    return;
  }
  displayPokemon();
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInput();
});
searchBtn.addEventListener("click", () => {
  checkInput();
});
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkInput();
  }
});
