import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {

  loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();


  constructor() {
  }

  show(): void {
    this.loading.next(true);
  }

  hide(): void {
    this.loading.next(false);
  }

}
