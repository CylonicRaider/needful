import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type TheneedfulCallback = () => void;

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
    await new Promise(resolve => {
      this.http.post('api/doit', null).subscribe(
        () => {},
        err => {
          console.error('API request failed:', err);
          resolve(null);
        },
        () => resolve(null),
      );
    });
    this.busy = false;
    if (callback != null) callback();
  }
}
