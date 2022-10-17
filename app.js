const express = require("express");
const path = require("path");
const config = require("dotenv").config();
require("./connectDb")();
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const { createClient } = require("redis");
const connectRedis = require("connect-redis");

const redisClient = createClient({ legacyMode: true });
redisClient
  .connect()
  .catch((e) => console.log("cannot connect to the client" + e));

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");

const RedisStore = connectRedis(session);
const sessionConfig = {
  store: new RedisStore({ client: redisClient }),
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: 1000 * 60 * 10,
  },
};

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(sessionConfig));

app.use("/", indexRouter);

app.use("/auth", authRouter);

app.use("/hello", (req, res) => {
  if (req.session.viewCount === undefined) {
    req.session.viewCount = 0;
  } else {
    req.session.viewCount++;
  }
  res.send("View Count is " + req.session.viewCount);
});

app.use(express.static(path.join(__dirname, "public")));
module.exports = app;
