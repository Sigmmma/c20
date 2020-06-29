const express = require("express");
const serveStatic = require("serve-static");
const multer = require("multer");

module.exports = function() {
  const port = process.env.C20_PORT ? Number(process.env.C20_PORT) : 8080;
  const app = express();
  app.use("/", serveStatic("./dist"));

  app.post("/survey/submit", multer().none(), (req, res) => {
    console.log(req.body);
    res.redirect("/");
  });

  app.listen(port);
  console.log(`Serving at http://localhost:${port}/`);
};
