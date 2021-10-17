import { Component } from '@angular/core';
import { TheneedfulService } from './theneedful.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'The Pinnacle of UI';

  constructor(private service: TheneedfulService) {}

  doTheNeedful() {
    this.service.doTheNeedful();
  }
}
