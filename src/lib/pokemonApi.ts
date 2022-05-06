class PokemonAPI {
  static baseURL = "https://pokeapi.co/api/v2";

  async getPokemons(pageUrl: string) {
    const pokemons = await fetch(
      `${pageUrl || `${PokemonAPI.baseURL}/pokemon`}`
    );

    if (!pokemons.ok) {
      throw new Error("Something went wrong");
    }

    return pokemons.json();
  }

  async getPokemon(pokemon: string) {
    const pokemonData = await fetch(`${PokemonAPI.baseURL}/pokemon/${pokemon}`);

    if (!pokemonData.ok) {
      throw new Error("Something went wrong");
    }

    return pokemonData.json();
  }
}

const pokemonApi = new PokemonAPI();

export default pokemonApi;
