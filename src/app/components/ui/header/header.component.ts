import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  @Input() title = '';
  @Input() backUrl = '/';

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  goBack() {
    this.router.navigateByUrl(this.backUrl);
  }

}
