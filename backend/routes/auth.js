import express from "express";
const router = express.Router();
import { body, validationResult } from "express-validator"; // this is for validation of data inputs 1->type of data check   2-> empty or not
import User from "../models/User.js";
import bcrypt from "bcryptjs"; // make more secure of  password or hashing
import jwt from "jsonwebtoken"; // provide a token when user logged which have three parts of the token
const JWT_SECRET = "playinsta#byUsman"; // it makes it more secure
// ROUTE 1: Create a user using : Post "/auth" Doesnt require Auth no log in required
router.post(
  "/createuser",
  [
    body("full_name", "Enter a valid name").isLength({ min: 1 }),
    body("user_name", "Enter a valid name").isLength({ min: 2 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
    body("gender", "Enter a valid password").isLength({min:4}),
    body("age", "Enter a valid password").isLength({ min: 8}),
  ],
  
  async (req, res) => {
    let success = false;
    // if there are errors return Bad message and all errors

    const error = validationResult(req);
    if (!error.isEmpty()) {
      
      return res.status(400).json({success, error: error.array() });
    }
    //   Check whether the user with the same mail exists already or not

    try {
      let user = await User.findOne({ email: req.body.email});
      if (user) {
        return res
          .status(400)
          .json({success, error: "Sorry a user with this email already exists" });
      }
      

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      user = await User.create({
        full_name: req.body.full_name,
        user_name:req.body.user_name,
        email:req.body.email,
        password: secPass,
        gender:req.body.gender,
        age:new Date(req.body.age),
      });


      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;

      res.json({ success,authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

export default router;