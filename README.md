# needful

The pinnacle of UI.

## Usage

Press the button, and the needful will be done.

## Development

- **Development server:** Run `npm run dev`, and go to <http://localhost:4200>.
- **Testing:** Run `npm run test` to (continuously) perform unit tests.
- **Code clean-up:** Run `npm run cleanup` to invoke the code formatter and
  linter. They are also available individually as `npm run format` and
  `npm run lint`.

### Deployment

- **Building:** Run `npm run build` to put production-ready server and client
  images into the `dist/` directory.
  - `dist/public` contains the client files, and can be deployed to a static
    file server or CDN.
  - `dist/server` contains the server at `dist/server/main.js`. The server
    requires the client files for server-side rendering; if installed at a
    non-default location, you need to specify the client directory's path as the
    `--webroot`.
- **Running:** Run `npm start` (after a successful build) to start the
  production server on the default port.

## Colophon

Developed using the [Angular](https://angular.io) framework. The favicon is part
of the [twemoji](https://twemoji.twitter.com/) set.

For Angular-specific help, see the output of `npm run ng help`.

### License

Original code is licensed under the **AGPLv3**, or any later version. See the
[LICENSE](LICENSE) file for its full text.

The licensing of Angular-template-derived code is somewhat ambiguous, but should
lie somewhere between **MIT** (from Angular) and **AGPLv3** (by the project
maintainer's preference).

The favicon is licensed under the **CC-BY 4.0**.
