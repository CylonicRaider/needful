import { Component } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
} from '@angular/material/snack-bar';

import { TheneedfulService } from './theneedful.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'The Pinnacle of UI';

  constructor(
    public service: TheneedfulService,
    private snackbar: MatSnackBar,
  ) {}

  doTheNeedful() {
    this.service.doTheNeedful(() => {
      this.snackbar.open('Done', 'OK', {
        horizontalPosition: 'left',
        duration: 5000,
      });
    });
  }
}
