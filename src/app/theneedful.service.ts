import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TheneedfulService {
  private busy: boolean = false;

  doTheNeedful() {
    if (this.busy) return;
    this.start();
  }

  private start() {
    this.busy = true;
    setTimeout(() => this.finish(), 100 + 200 * Math.random());
  }

  private finish() {
    alert('OK');
    this.busy = false;
  }
}
