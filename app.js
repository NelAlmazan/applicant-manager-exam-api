const express = require("express");

const app = express();

const mongoose = require("mongoose");

const cors = require("cors");

let databaseURL =
  "mongodb+srv://dbAdmin:dbAdminPassword@cluster0-4k8ek.mongodb.net/applicants-manager-db?retryWrites=true&w=majority";

mongoose.connect(databaseURL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());

const server = require("./queries/index");

server.applyMiddleware({
  app,
  path: "/playground",
});

let port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`🚀 Server ready at port ${port} ${server.graphqlPath}`);
});
