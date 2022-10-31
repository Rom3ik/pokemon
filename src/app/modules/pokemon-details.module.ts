import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonDetailsRoutingModule } from './pokemon-details-routing.module';
import {PokemonDetailsComponent} from "./pokemon-details/pokemon-details.component";
import {IonicModule} from "@ionic/angular";


@NgModule({
  declarations: [PokemonDetailsComponent],
  imports: [
    CommonModule,
    PokemonDetailsRoutingModule,
    IonicModule
  ]
})
export class PokemonDetailsModule { }
