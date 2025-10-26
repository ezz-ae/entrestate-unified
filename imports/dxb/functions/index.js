const functions = require("firebase-functions");
const { default: next } = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, conf: { distDir: ".next" } });
const handle = app.getRequestHandler();

exports.nextServer = functions.region("us-central1").https.onRequest(async (req, res) => {
  await app.prepare();
  return handle(req, res);
});