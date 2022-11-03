import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PokemonService} from '../../core/services/pokemon.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonDetailsComponent implements OnInit, AfterViewInit {

  pokemon: any;
  pokemonStats: any[] = [];
  pokemonDescription$: Observable<string>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonService,
    private renderer2: Renderer2
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.pokemon = this.router.getCurrentNavigation().extras.state.pokemon;
        this.initializePokemonStats(this.pokemon.stats);
        this.getPokemonSpecies(this.pokemon.id);
      } else {
        this.router.navigateByUrl('/tabs', {replaceUrl: true});
      }
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const progress = Array.from(document.getElementsByClassName('stat-value') as any);
      progress.forEach((item: any) => {
        const max = item.getAttribute('max');
        this.renderer2.setStyle(item, 'width', item.getAttribute('done') * 100 / max + '%');
      });
    }, 200);
  }

  goBack() {
    this.router.navigate(['/tabs']);
  }

  initializePokemonStats(stats: []) {
    stats.map((stat: any) => ({name: stat.stat.name, value: stat.base_stat}))
      .map((data: any) => {
        this.pokemonStats.push(data);
      });
  }

  getPokemonSpecies(id: string) {
    this.pokemonDescription$ = this.pokemonService.getPokemonSpecies(id)
      .pipe(
        map((pokemon: any) => pokemon.flavor_text_entries.filter(lang => lang.language.name === 'en')),
        map(data => data[0].flavor_text),
      );
  }

}
