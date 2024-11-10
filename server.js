// const & imports
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.port || 3000;
const bodyParser = require("body-parser");
const db = require("./db/db");
const controller = require("./controller/controller");
const router = express.Router();

app.use(express.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/", controller);
app.listen(port, (err) => {
  console.log(`server is running on port: ${port}`);
});
