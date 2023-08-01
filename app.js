const express = require("express");
const app = express();
const port = 8080;
const http = require("http");
const server = http.createServer(app);

const session = require("express-session");
const cookieParser = require("cookie-parser");
const main = ({ router } = require("./routes/routes"));

// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/", main);

server.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  try {
    // await sequelize.authenticate();
    console.log("Connection database has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
