import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {PokemonService} from '../../../core/services/pokemon.service';
import {combineLatest, Observable} from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter, finalize,
  map,
  mergeMap,
  switchMap, tap
} from 'rxjs/operators';
import {Types} from '../../../core/enums/types';
import {SubSink} from 'subsink';
import {IonInfiniteScroll} from '@ionic/angular';
import {FormControl} from '@angular/forms';
import {Router, NavigationExtras} from '@angular/router';
import {LoadingService} from '../../../core/services/loading.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokedexComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(IonInfiniteScroll) infinity: IonInfiniteScroll;
  searchControl = new FormControl();
  pokeTypes = Types;
  pokemon$: Observable<any>;
  pokemons: any[] = [];
  offset = 0;
  subs = new SubSink();
  isLoading = this.loadingService.loading$;

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit() {
    this.loadPokemons();
  }


  ngAfterViewInit() {
    this.searchPokemon();
  }

  trackById(pokemon: any) {
    return pokemon.id;
  }

  showPokemonDetails(pokemon: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        pokemon
      }
    };
    this.router.navigate(['/pokemon-details'], navigationExtras);
  }

  loadPokemons(loadMore: boolean = false, event?: any) {
    if (loadMore) {
      this.offset += 25;
    }
    this.subs.add(
      this.pokemonService.getPokemonList(24, this.offset)
        .pipe(
          map(res => res.results.map(poke => ({id: this.pokemonService.getPokeId(poke)}))),
          mergeMap(pokemon => combineLatest(pokemon.map(poke => poke = this.pokemonService.getPoke(poke.id)))),
          map((pokemon: any) => pokemon.map(poke => ({
            ...poke,
            type: this.pokemonService.getPokemonType(poke),
            image: this.pokemonService.getPokemonImage(poke.id)
          }))),
          catchError(err => this.pokemons = []),
          finalize(() => this.cdr.markForCheck())
        ).subscribe(data => {
        this.pokemons = [...this.pokemons, ...data];
        if (event) {
          event.target.complete();
        }
      })
    );

  }


  searchPokemon() {
    this.subs.add(
      this.searchControl.valueChanges
        .pipe(
          map(q => q.toLowerCase()),
          debounceTime(400),
          distinctUntilChanged(),
          filter(q => {
            if (q !== '') {
              return q;
            }
            if (q === '') {
              this.offset = 0;
              this.loadPokemons();
              return;
            }
          }),
          tap(() => this.loadingService.show()),
          switchMap((q: any) => this.pokemonService.searchPokemon(q)
            .pipe(
              map(pokemon => ({
                ...pokemon, type: this.pokemonService.getPokemonType(pokemon),
                image: this.pokemonService.getPokemonImage(pokemon.id)
              })),
              catchError(err => this.pokemons = []),
              finalize(() => {
                this.loadingService.hide();
                this.cdr.markForCheck();
              })
            )),
        ).subscribe(res => {
        this.pokemons = [res];
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
