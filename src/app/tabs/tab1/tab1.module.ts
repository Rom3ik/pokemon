import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Tab1Page} from './tab1.page';
import {Tab1PageRoutingModule} from './tab1-routing.module';
import {PokedexComponent} from '../../components/widgets/pokedex/pokedex.component';
import {SharedModule} from '../../core/shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Tab1PageRoutingModule,
    SharedModule
  ],
  declarations: [Tab1Page, PokedexComponent]
})
export class Tab1PageModule {
}
