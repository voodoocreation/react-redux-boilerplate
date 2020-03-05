React Redux boilerplate with server rendering
=============================================

A project boilerplate for applications that require [React](https://facebook.github.io/react/),
[Redux](http://redux.js.org/), [Redux-Saga](https://redux-saga.js.org/) and want to support
server rendering as well.

See [Next.js](https://github.com/zeit/next.js/) documentation for environment config etc.

Custom routes
-------------
Using [next-routes](https://www.npmjs.com/package/next-routes), you can define custom routes inside
[`/next.routes.js`](./next.routes.js) to handle more advanced routing to support routes with IDs, slugs etc.

Changing base HTML page structure
---------------------------------
The base global page template can be changed in [`/pages/_document.js`](./pages/_document.js)
if you require CDN-loaded third party scripts or CSS, or just wish to change the way the page chrome
is rendered across all pages.

NPM scripts
-----------
The following scripts can be used:
- `dev`: Runs dev environment with hot module reloading
- `build`: Builds prod bundle ready for deployment
- `build:export`: Builds and exports static HTML prod bundle ready for deployment
- `start`: Start prod environment (requires `build` script to have been run first)
- `format`: Run `prettier` code formatting
- `lint:ts`: Run TS linter, rules defined in [`/.eslintrc`](./.eslintrc)
- `lint:scss`: Run SCSS linter, rules defined in [`/.stylelintrc`](./.stylelintrc)
- `lint`: Run all linting
- `test`: Run unit tests for project (using [Jest](https://facebook.github.io/jest/))
