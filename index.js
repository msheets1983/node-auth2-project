require("dotenv/config");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/users-router");

const server = express();

server.use(cookieParser());
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/auth", authRouter);
server.use("/users", usersRouter);

server.get("/", (req, res, next) => {
  res.json({ message: "Hello World" });
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Server Error" });
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
