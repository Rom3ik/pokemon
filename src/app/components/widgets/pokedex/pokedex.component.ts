import {Component, OnInit} from '@angular/core';
import {PokemonService} from '../../../core/services/pokemon.service';
import {combineLatest, Observable} from 'rxjs';
import {map, mergeMap, tap} from 'rxjs/operators';
import {Types} from '../../../core/enums/types';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit {
  pokeTypes = Types;
  pokemon$: Observable<any>;
  pokemons: any[] = [];

  constructor(
    private pokemonService: PokemonService,
  ) {
  }

  ngOnInit() {
    this.getPokemonList();
  }


  getPokemonList() {
    this.pokemon$ = this.pokemonService.getPokemonList()
      .pipe(
        map(res => res.results.map(poke => ({...poke, id: this.pokemonService.getPokeId(poke)}))),
        mergeMap(pokemon => combineLatest(pokemon.map(poke => poke = this.pokemonService.getPoke(poke.id)))),
        map((pokemon: any) => pokemon.map(poke => ({...poke, color: poke.types[0].type.name}))),
      );
  }

}
