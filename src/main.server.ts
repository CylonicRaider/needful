/*
 * Initialize the server environment.
 *
 * NOTE: @angular/platform-server/init should be imported before anything that
 *       depends on DOM APIs.
 */
import '@angular/platform-server/init';

import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export { AppServerModule } from './app/app.server.module';
export { renderModule, renderModuleFactory } from '@angular/platform-server';
