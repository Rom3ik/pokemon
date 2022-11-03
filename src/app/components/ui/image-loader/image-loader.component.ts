import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-image-with-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.scss'],
})
export class ImageLoaderComponent {

  @Input() loader = 'assets/icon/loading.svg';
  @Input() image: any;
  @Input() alt: string;
  @Input() height = `${72}px`;
  @Input() width = `${72}px`;

  isLoading: boolean;

  constructor() {
    this.isLoading = true;
  }

  hideLoader() {
    this.isLoading = false;
  }

}
