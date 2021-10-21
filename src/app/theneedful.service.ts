import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TheneedfulService {
  busy = false;

  constructor(private http: HttpClient) {}

  doTheNeedful() {
    if (this.busy) return;
    void this.run();
  }

  private async run() {
    this.busy = true;
    await new Promise(resolve => {
      this.http.post('doit', null).subscribe(
        () => {},
        err => {
          console.error('API request failed:', err);
          resolve(null);
        },
        () => resolve(null),
      );
    });
    alert('OK');
    this.busy = false;
  }
}
