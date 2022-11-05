import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageLoaderComponent} from '../../components/ui/image-loader/image-loader.component';
import {IonicModule} from '@ionic/angular';
import {PokemonListComponent} from '../../components/widgets/pokemon-list/pokemon-list.component';


@NgModule({
  declarations: [ImageLoaderComponent, PokemonListComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [ImageLoaderComponent, PokemonListComponent]
})
export class SharedModule {
}
