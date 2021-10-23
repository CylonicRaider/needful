import { Component } from '@angular/core';
import { TheneedfulService } from './theneedful.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'The Pinnacle of UI';

  constructor(public service: TheneedfulService) {}

  doTheNeedful() {
    this.service.doTheNeedful();
  }
}
