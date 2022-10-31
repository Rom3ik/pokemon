import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PokemonDetailsComponent} from './pokemon-details/pokemon-details.component';

const routes: Routes = [
  {path: '', component: PokemonDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonDetailsRoutingModule { }
