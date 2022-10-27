import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_URL, environment} from '../../../environments/environment.prod';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private httpClient: HttpClient) {
  }

  getPokemonList(): Observable<any> {
    return this.httpClient.get(BASE_URL + environment.endpoints.pokemonList);
  }

  getPokemon(name: string): Observable<any> {
    return this.httpClient.get(BASE_URL + environment.endpoints.pokemon.replace(':name', name));
  }


  getPokeId(poke): number {
    return poke.url.split('/')[6];
  }

  getPoke(id) {
    return this.httpClient.get(`${BASE_URL + environment.endpoints.pokemonList}${id}`).pipe(
      map(poke => poke)
    );
  }
}
