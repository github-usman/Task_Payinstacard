import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    full_name: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Date,
    required:true,
  },
});

export default mongoose.model("User", UserSchema);

// USER INPUTS BASED SCHEMA
// body("full_name", "Enter a valid name").isLength({ min: 1 }),
// body("user_name", "Enter a valid name").isLength({ min: 2 }),
// body("email", "Enter a valid email").isEmail(),
// body("password", "Enter a valid password").isLength({ min: 5 }),
// body("gender", "Enter a valid password").isLength({min:4}),
// body("age", "Enter a valid password").isLength({ min: 8}),
