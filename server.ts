import 'zone.js/dist/zone-node';

import { existsSync } from 'fs';
import { join } from 'path';

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import * as minimist from 'minimist';

import { app as api } from './src/api';
import { AppServerModule } from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(distFolder: string): express.Express {
  const server = express();
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  // Angular SSR engine.
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    }),
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // API endpoints.
  server.all('/api/**', api());

  // Static files are differentiated by including dots.
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    }),
  );

  // Everything else is passed to the SSR engine.
  server.get('*', (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

  return server;
}

function run(argv: string[]): void {
  const parsed = minimist(argv);

  if (parsed.help) {
    console.info(`USAGE: server [--host IP] [--port PORT] [--webroot DIR]`);
    return;
  }

  const host = parsed.host || process.env.BIND_HOST || '';
  const port = parsed.port || process.env.PORT || 4000;
  const statics = parsed.webroot || join(__dirname, '../public');

  // Start up the Node server
  const server = app(statics);
  server.listen(port, host, () => {
    console.log(`Serving HTTP on ${host || '*'}:${port}...`);
  });
}

/* Run the server, but only when not require()d. */
// Webpack will replace 'require' with '__webpack_require__'.
// '__non_webpack_require__' is a proxy to Node 'require'.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run(process.argv.slice(2));
}

export * from './src/main.server';
