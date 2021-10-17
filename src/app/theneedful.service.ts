import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TheneedfulService {
  doTheNeedful() {
    setTimeout(() => alert('OK'), 100 + 200 * Math.random());
  }
}
