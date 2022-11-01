import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PokemonService} from '../../core/services/pokemon.service';
import {filter, map, share, shareReplay, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonDetailsComponent implements OnInit {

  pokemon: any;
  pokemonDescription$: Observable<string>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonService
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.pokemon = this.router.getCurrentNavigation().extras.state.pokemon;
        this.getPokemonSpecies(this.pokemon.id);
      } else {
        this.router.navigateByUrl('/tabs', {replaceUrl: true});
      }
    });
  }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['/tabs']);
  }

  getPokemonSpecies(id: string) {
    this.pokemonDescription$ = this.pokemonService.getPokemonSpecies(id)
      .pipe(
        map((pokemon: any) => pokemon.flavor_text_entries.filter(lang => lang.language.name === 'en')),
        map(data => data[0].flavor_text),
      );
  }

}
