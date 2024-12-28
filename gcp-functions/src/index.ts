// src/index.ts
const functions = require("@google-cloud/functions-framework");

functions.http("helloGET", (req: any, res: any) => {
  res.send("Hello World!");
});
