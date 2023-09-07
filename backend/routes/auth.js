import express from "express";
const router = express.Router();
import { body, validationResult } from "express-validator"; // this is for validation of data inputs 1->type of data check   2-> empty or not
import User from "../models/User.js";
import { fetchuser } from "../middleware/fetchuser.js";
import bcrypt from "bcryptjs"; // make more secure of  password or hashing
import jwt from "jsonwebtoken"; // provide a token when user logged which have three parts of the token
const JWT_SECRET = "playinsta#byUsman"; // it makes it more secure
// ROUTE 1: Create a user using : POST: "/auth/createuser" Doesnt require Auth no log in required
router.post(
  "/createuser",
  [
    body("full_name", "Enter a valid name").isLength({ min: 1 }),
    body("user_name", "Enter a valid user name name").isLength({ min: 1 }),
    body("email", "Enter a valid email").isEmail(),
    body("phone", "Enter a valid phone number").isString(),
    body("password", "Enter a valid password").isLength({ min: 1 }),
    body("gender", "Enter a valid gender").isString(),
    body("age", "Enter a valid password").isDate(),
    body("address", "Enter a valid address"),
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
      
      
        let user_name = await User.findOne({ user_name: req.body.user_name});
        if (user_name) {
          return res
            .status(400)
            .json({success, error: "Sorry a user with this user ID already exists" });
        }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      user = await User.create({
        full_name: req.body.full_name,
        user_name:req.body.user_name,
        email:req.body.email,
        phone:req.body.phone,
        password: secPass,
        gender:req.body.gender,
        age:new Date(req.body.age),
        address:req.body.address,
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

// ROUTE 2: Authenticate a user, Using : POST: "/auth/login" Doesnt require Auth, no log in required


router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can not be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // if there are errors return Bad message and all errors
    
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ success,error: error.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      // check weather user exits or not in database
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please, Enter correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      // password is Same or worng
      if (!passwordCompare) {
        return res
          .status(400)
          .json({success, error: "Please, Enter correct credentials" });
      }
      
      // if all thing are succesfull then generate a token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success,authToken });
      
    } catch (error) {
    
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 2: after getting authToken get a user Details, Using : POST: "/auth/getuser"  require Auth,  log in required

router.post(
  '/getuser',
  fetchuser
  ,
  async (req, res) => {
    
    try {
       const userId =  req.user.id
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);


export default router;