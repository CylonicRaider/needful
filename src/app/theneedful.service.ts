import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type TheneedfulCallback = (ok: boolean) => void;

@Injectable({
  providedIn: 'root',
})
export class TheneedfulService {
  busy = false;

  constructor(private http: HttpClient) {}

  doTheNeedful(callback: TheneedfulCallback | null = null) {
    if (this.busy) return;
    void this.run(callback);
  }

  private async run(callback: TheneedfulCallback | null) {
    this.busy = true;
    const ok = await new Promise<boolean>(resolve => {
      this.http.post('api/doit', null).subscribe(
        () => {},
        err => {
          console.error('API request failed:', err);
          resolve(false);
        },
        () => resolve(true),
      );
    });
    this.busy = false;
    if (callback != null) callback(ok);
  }
}
