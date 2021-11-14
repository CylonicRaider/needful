import { Injectable } from '@angular/core';

export type TheneedfulCallback = (ok: boolean) => void;

@Injectable({
  providedIn: 'root',
})
export class TheneedfulService {
  busy = false;

  constructor() {}

  doTheNeedful(callback: TheneedfulCallback | null = null) {
    if (this.busy) return;
    void this.run(callback);
  }

  private async run(callback: TheneedfulCallback | null) {
    this.busy = true;
    const ok = await new Promise<boolean>(resolve => {
      setTimeout(() => resolve(true), 1000 + 2000 * Math.random());
    });
    this.busy = false;
    if (callback != null) callback(ok);
  }
}
