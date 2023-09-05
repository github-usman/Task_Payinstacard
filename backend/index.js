import express from "express";
import { connectToMongo } from "./db.js";
import authRoutes from "./routes/auth.js";


connectToMongo();



const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Usman ali ansari!');
});


app.use("/auth", authRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});