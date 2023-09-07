import express from "express";
import { connectToMongo } from "./db.js";
import authRoutes from "./routes/auth.js";
import cors from "cors";


connectToMongo();



const app = express();
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello, Usman ali ansari!');
});


app.use("/auth", authRoutes);



app.listen(dbPort, () => {
  console.log(`App listening on port ${dbHost}${dbPort}`);
});