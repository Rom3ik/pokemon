import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PokemonService} from '../../../core/services/pokemon.service';
import {combineLatest, Observable, throwError} from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged, finalize,
  map,
  mergeMap,
  switchMap,
  tap
} from 'rxjs/operators';
import {Types} from '../../../core/enums/types';
import {SubSink} from 'subsink';
import {IonInfiniteScroll} from '@ionic/angular';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(IonInfiniteScroll) infinity: IonInfiniteScroll;
  searchControl = new FormControl();
  pokeTypes = Types;
  pokemon$: Observable<any>;
  pokemons: any[] = [];
  offset = 0;
  subs = new SubSink();

  constructor(
    private pokemonService: PokemonService,
  ) {
  }

  ngOnInit() {
    this.getPokemonList();
  }


  ngAfterViewInit() {
    this.searchPokemon();
  }

  trackById(pokemon: any) {
    return pokemon.id;
  }

  getPokemonList(loadMore: boolean = false, event?: any) {
    if (loadMore) {
      this.offset += 21;
    }
    this.subs.add(
      this.pokemonService.getPokemonList(21, this.offset)
        .pipe(
          map(res => res.results.map(poke => ({...poke, id: this.pokemonService.getPokeId(poke)}))),
          mergeMap(pokemon => combineLatest(pokemon.map(poke => poke = this.pokemonService.getPoke(poke.id)))),
          map((pokemon: any) => pokemon.map(poke => ({
            ...poke,
            color: poke.types[0].type.name,
            image: this.pokemonService.getPokemonImage(poke.id)
          }))),
          tap((data) => {
            if (this.offset > 0) {
              this.pokemons = [...this.pokemons, ...data];
            } else {
              this.pokemons = data;
            }
          }),
        ).subscribe()
    );
    if (event) {
      event.target.complete();
    }
    if (this.offset >= 1154) {
      this.infinity.disabled = true;
    }
  }


  searchPokemon() {
    this.searchControl.valueChanges
      .pipe(
        map(q => q),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((q: any) => this.pokemonService.searchPokemon(q)
          .pipe(
            map(pokemon => ({
              ...pokemon, color: pokemon.types[0].type.name,
              image: this.pokemonService.getPokemonImage(pokemon.id)
            }))
          )),
        finalize(() => {
          this.searchPokemon();
        }),
        catchError(err => throwError(err))
      ).subscribe(res => {
      this.pokemons = [res];
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
