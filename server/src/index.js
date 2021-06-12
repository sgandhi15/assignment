const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const { router } = require("./routes");
const { json } = require("express");

if (process.env.NODE_ENV === "dev") dotenv.config();

const app = express();

app.use(cors());
app.use(json());
app.use(router);

app.listen(process.env.PORT, () =>
  console.log(`Server is started on PORT ${process.env.PORT}`)
);
