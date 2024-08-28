import express from "express";
import User from "../model/userModal";
import auth from "../middleware/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    let user = new User({
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10),
      email: req.body.email,
    });

    await user.save();
    res.status(201).send({ username: user.username, email: user.email });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !(await bcrypt.compare(req.body.password, user.password)))
      return res.status(400).send("Invalid username or password.");

    const token = jwt.sign({ _id: user._id }, "your_jwt_secret");
    res.send({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

export default authRouter = router;
