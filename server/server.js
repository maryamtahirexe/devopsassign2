import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import ownerRouter from "./routes/owners.js";
import apartmentRouter from "./routes/apartments.js";      
import shopRouter from "./routes/shops.js"; 

dotenv.config();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: "http://54.159.57.46:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use("/owner", ownerRouter);
app.use("/apartments", apartmentRouter);       
app.use("/shops", shopRouter); 

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

console.log("CONNECTION_URL:", CONNECTION_URL);

if (!CONNECTION_URL) {
  console.error("CONNECTION_URL is not defined. Please check your .env file.");
  process.exit(1);
}

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    })
  )
  .catch((error) => console.error("Database connection error:", error.message));
