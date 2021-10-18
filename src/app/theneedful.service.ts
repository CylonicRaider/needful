import { Injectable } from '@angular/core';

function sleep(time: number): Promise<void> {
  return new Promise(res => setTimeout(res, time));
}

@Injectable({
  providedIn: 'root',
})
export class TheneedfulService {
  private busy: boolean = false;

  doTheNeedful() {
    if (this.busy) return;
    this.run();
  }

  private async run() {
    this.busy = true;
    await sleep(100 + 200 * Math.random());
    alert('OK');
    this.busy = false;
  }
}
