import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {catchError, finalize, map, mergeMap} from 'rxjs/operators';
import {combineLatest, Observable} from 'rxjs';
import {NavigationExtras} from '@angular/router';
import {SubSink} from 'subsink';
import {PokemonService} from '../../../core/services/pokemon.service';
import {LoadingService} from '../../../core/services/loading.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonListComponent implements OnInit {

  subs = new SubSink();
  pokemon$: Observable<any>;
  pokemons: any[] = [];
  offset = 0;
  isLoading = this.loadingService.loading$;

  constructor(
    private pokemonService: PokemonService,
    private cdr: ChangeDetectorRef,
    private loadingService: LoadingService,
    private navCtrl: NavController
  ) {
  }

  ngOnInit() {
    this.loadPokemons();
  }


  trackById(index: number, pokemon: any) {
    return pokemon.id;
  }

  showPokemonDetails(pokemon: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        pokemon
      }
    };
    this.navCtrl.navigateForward('/pokemon-details', navigationExtras);
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

}
