/* eslint-disable no-console, global-require, import/no-dynamic-require */

const path = require("path");
const glob = require("glob");
const accepts = require("accepts");
const express = require("express");
const nextJS = require("next");
const compression = require("compression");
const jsonServer = require("json-server");
const customRoutes = require("./next.routes");

const isMockApiEnabled = true;
const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 5000;
const apiPath = "/mock-api";
const apiURL = `http://localhost${port}${apiPath}`;
const app = nextJS({ dev });
const customRoutesHandler = customRoutes.getRequestHandler(app);
const languages = glob
  .sync("./src/locales/*.ts")
  .map(f => path.basename(f, ".ts"));

app.prepare().then(() => {
  const server = express();

  if (isMockApiEnabled) {
    if (process.env.API_DELAY) {
      server.use(apiURL, (req, res, next) => {
        setTimeout(() => {
          next();
        }, process.env.API_DELAY);
      });
    }

    server.use(apiPath, jsonServer.rewriter(require("./server/routes")));
    server.use(apiPath, jsonServer.router(require("./server/db")));
  }

  if (!dev) {
    server.use(compression());
  }

  server.use(
    "/assets",
    express.static(path.join(__dirname, "dist/server/assets"))
  );

  server.use((req, res) => {
    const accept = accepts(req);
    const locale = accept.language(languages);

    req.locale = locale || "en-NZ";

    customRoutesHandler(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
