import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonDetailsRoutingModule } from './pokemon-details-routing.module';
import {PokemonDetailsComponent} from './pokemon-details/pokemon-details.component';
import {IonicModule} from '@ionic/angular';
import {HeaderComponent} from '../components/ui/header/header.component';
import {SharedModule} from '../core/shared/shared.module';

@NgModule({
  declarations: [PokemonDetailsComponent, HeaderComponent],
  imports: [
    CommonModule,
    PokemonDetailsRoutingModule,
    IonicModule,
    SharedModule
  ]
})
export class PokemonDetailsModule { }
