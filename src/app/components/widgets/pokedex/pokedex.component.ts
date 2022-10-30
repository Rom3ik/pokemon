import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PokemonService} from '../../../core/services/pokemon.service';
import {combineLatest, EMPTY, Observable, of, throwError} from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged, filter, finalize,
  map,
  mergeMap, startWith,
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
  isLoading = false;

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
          catchError(err => {
            this.pokemons = [];
            return of(null);
          })
        ).subscribe(data => {
          this.isLoading = false;
        if (this.offset > 0) {
          this.pokemons = [...this.pokemons, ...data];
        }
        if (event) {
          event.target.complete();
        } else {
          this.pokemons = data;
        }
      })
    );

  }


  searchPokemon() {
    this.subs.add(
      this.searchControl.valueChanges
        .pipe(
          tap(() => this.isLoading = true),
          map(q => q.toLowerCase()),
          debounceTime(600),
          distinctUntilChanged(),
          filter(q => {
            if (q !== '') {
              return q;
            } else {
              this.offset = 0;
              this.getPokemonList();
            }
          }),
          switchMap((q: any) => this.pokemonService.searchPokemon(q)
            .pipe(
              map(pokemon => ({
                ...pokemon, color: pokemon.types[0].type.name,
                image: this.pokemonService.getPokemonImage(pokemon.id)
              })),
              catchError(err => {
                this.isLoading = false;
                return this.pokemons = [];
              })
            )),finalize(() => this.isLoading = false)
        ).subscribe(res => {
        this.pokemons = [res];
        this.isLoading = false;
      })
    )
    ;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
