export const BASE_URL = 'https://pokeapi.co/api/v2/';

export const environment = {
  production: true,
  endpoints: {
    pokemonList: 'pokemon/',
    pokemon: 'pokemon/:nameOrId',
    species: 'pokemon-species/:id'
  }
};
