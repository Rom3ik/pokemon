import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_URL, environment} from '../../../environments/environment.prod';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseSpriteUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';

  constructor(private httpClient: HttpClient) {
  }

  getPokemonList(limit?: number, offset?: number): Observable<any> {
    return this.httpClient.get(BASE_URL + environment.endpoints.pokemonList + `?limit=${limit}` + `&offset=${offset}`);
  }

  searchPokemon(nameOrId: string): Observable<any> {
    return this.httpClient.get(BASE_URL + environment.endpoints.pokemon.replace(':nameOrId', nameOrId));
  }

  getPokemonImage(id: number) {
    return this.baseSpriteUrl + id + '.png';
  }

  getPokeId(poke): number {
    return poke.url.split('/')[6];
  }

  getPoke(id) {
    return this.httpClient.get(`${BASE_URL + environment.endpoints.pokemonList}${id}`);
  }
}
