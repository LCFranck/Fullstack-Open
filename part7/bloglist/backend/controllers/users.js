const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  const saltRounds = 10;
  if (!password || password.length < 3) {
    return response
      .status(400)
      .json({ error: "password must be at least 3 characters long!" });
  }
  if (!username || username.length < 3) {
    return response
      .status(400)
      .json({ error: "username must be at least 3 characters long!" });
  }
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  //console.log("hej allohopa")
  response.json(users);
});

usersRouter.get("/:id", async (request, response) => {
  console.log(request.params.id + "kakkarumpa")
  const user = await User.findById(request.params.id);
  if (user) {
    response.json(user);
  } else {
   // console.log(user)
    response.status(404).end();
  }
});

module.exports = usersRouter;
