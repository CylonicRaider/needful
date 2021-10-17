import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'The Pinnacle of UI';

  doTheNeedful() {
    setTimeout(() => alert('OK'), 100 + 200 * Math.random());
  }
}
