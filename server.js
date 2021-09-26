const express = require("express");
const serveStatic = require("serve-static");

module.exports = function() {
  const port = process.env.C20_PORT ? Number(process.env.C20_PORT) : 8080;

  const app = express();
  app.use("/", serveStatic("./dist"));
  
  // fall through to 404 handler
  app.use(function(req, res, next) {
    console.log(`Unable to find ${req.url}, returning 404!`);
	  res.status(404);
	  res.type('html');
	  res.sendFile('./dist/404/index.html', {root: '.'});
  });

  app.listen(port);
  console.log(`Serving at http://localhost:${port}/`);
};
