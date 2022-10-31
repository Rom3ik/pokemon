import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {

  pokemon: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.pokemon = this.router.getCurrentNavigation().extras.state.pokemon;
      } else {
        this.router.navigate(['/tabs']);
      }
    });
  }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['/tabs']);
  }

}
