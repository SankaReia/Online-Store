require("dotenv").config();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const express = require("express");
const router = require("./routes/index.js");
const errorHandler = require("./middleware/ErrorHandlingMiddleware.js");
const path = require("path");

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);

//Обработка ошибок, последний Middleware
app.use(errorHandler);

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
