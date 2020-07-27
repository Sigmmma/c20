const express = require("express");
const serveStatic = require("serve-static");
const multer = require("multer");
const crypto = require("crypto");
const AWS = require("aws-sdk");
const cors = require("cors");

module.exports = function() {
  const port = process.env.C20_PORT ? Number(process.env.C20_PORT) : 8080;
  const bucketName = process.env.C20_S3_BUCKET || "reclaimers-data-test";
  const s3 = new AWS.S3();

  const saveSurvey = function(surveyData, cb) {
    const s3Params = {Bucket: bucketName, Key: "survey-results.json"};
    s3.getObject(s3Params, (err, data) => {
      if (err && err.statusCode != 404) {
        return cb(err);
      }
      const results = err ? {} : JSON.parse(data.Body.toString());
      results[surveyData.ipHash] = surveyData;
      const putParams = {
        ...s3Params,
        Body: JSON.stringify(results),
        "ContentType": "application/json",
        "ACL": "public-read"
      };
      s3.putObject(putParams, (err) => {
        cb(err);
      });
    });
  };

  const app = express();
  app.use("/", serveStatic("./dist"));

  app.post("/survey/submit", cors(), multer().none(), (req, res) => {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const ipHash = crypto.createHash("md5").update(ip).digest("hex");
    const date = new Date().toISOString();
    const surveyData = {...req.body, ipHash, date};
    saveSurvey(surveyData, (err) => {
      if (err) {
        console.error(`Failed to save survey data for ${ipHash}`, err);
        res.status(500).send("Internal server error");
        return;
      }
      console.log(`Saved survey data for ${ipHash}`);
      res.redirect("/");
    });
  });

  app.listen(port);
  console.log(`Serving at http://localhost:${port}/`);
};
