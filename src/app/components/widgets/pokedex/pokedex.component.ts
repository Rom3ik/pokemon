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
import {Types} from '../../../core/enums/types';
import {IonInfiniteScroll} from '@ionic/angular';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {LoadingService} from '../../../core/services/loading.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokedexComponent implements OnInit, OnDestroy, AfterViewInit {

  searchControl = new FormControl();
  isLoading = this.loadingService.loading$;

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit() {

  }


  ngAfterViewInit() {
    // this.searchPokemon();
  }




  //
  // searchPokemon() {
  //   this.subs.add(
  //     this.searchControl.valueChanges
  //       .pipe(
  //         map(q => q.toLowerCase()),
  //         debounceTime(400),
  //         distinctUntilChanged(),
  //         filter(q => {
  //           if (q !== '') {
  //             return q;
  //           }
  //           if (q === '') {
  //             this.offset = 0;
  //             this.loadPokemons();
  //             return;
  //           }
  //         }),
  //         tap(() => this.loadingService.show()),
  //         switchMap((q: any) => this.pokemonService.searchPokemon(q)
  //           .pipe(
  //             map(pokemon => ({
  //               ...pokemon, type: this.pokemonService.getPokemonType(pokemon),
  //               image: this.pokemonService.getPokemonImage(pokemon.id)
  //             })),
  //             catchError(err => this.pokemons = []),
  //             finalize(() => {
  //               this.loadingService.hide();
  //               this.cdr.markForCheck();
  //             })
  //           )),
  //       ).subscribe(res => {
  //       this.pokemons = [res];
  //     })
  //   );
  // }

  ngOnDestroy() {
    // this.subs.unsubscribe();
  }

}
