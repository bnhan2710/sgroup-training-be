const express = require("express");
const app = express();
const route = require("./routes/index.route");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const pool = require("./configs/database");
const knex = require("./configs/knexdb");
dotenv.config();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser())
app.use(express.static("public"));
//view engine
app.set("views", "./views");
app.set("view engine", "pug");

//Router
route(app);
app.use((req, res) => {
  return res.status(404).send({ message: "NOT FOUND" });
});

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
