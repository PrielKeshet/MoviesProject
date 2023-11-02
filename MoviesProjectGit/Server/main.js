const express = require("express");
const cors = require("cors");
const ConnectDB = require("./configs/DB");
const moviesRouter = require("./routers/moviesRouter");
const membersRouter = require("./routers/membersRouter");
const subsRouter = require("./routers/subscriptionsRouter");
const usersRouter = require("./routers/usersRouter");

const app = express();

ConnectDB();

const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/members", membersRouter);
app.use("/subs", subsRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`app is listening on http://localhost:${port}`);
});
