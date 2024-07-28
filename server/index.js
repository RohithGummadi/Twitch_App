import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.send("hello your server is up");
});

app.use("/api/auth", authRoutes);

const server = http.createServer(app);
mongoose.connect(process.env.MONGO_URL).then(()=>{
  server.listen(PORT, () => {
    console.log(`The server is listening on ${PORT}`);
  });

}).catch(err=>{
  console.log("The DB connection failed. Server not started")
  console.log(err)
})

