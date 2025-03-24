import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import ownerRouter from "./routes/owners.js";
import apartmentRouter from "./routes/apartments.js";      
import shopRouter from "./routes/shops.js"; 
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
// app.use(cors({
//   origin: ["http://107.21.157.243", "http://107.21.157.243:3000"],  
//   credentials: true,
// }));
app.use(cors({
  origin: "http://18.234.111.248:3000", // Frontend URL
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// app.use(express.json({ limit: "30mb", extended: true }));
// app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(helmet());
app.use(morgan("dev"));

app.use("/owner", ownerRouter);
app.use("/apartments", apartmentRouter);       
app.use("/shops", shopRouter); 

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

console.log("CONNECTION_URL:", process.env.CONNECTION_URL);

if (!CONNECTION_URL) {
  console.error("CONNECTION_URL is not defined. Please check your .env file.");
  process.exit(1);
}

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, "0.0.0.0", () => { // Bind to all network interfaces
      console.log(`Server Running on port ${PORT}`);
    })
  )
  .catch((error) => console.error("Database connection error:", error.message));
//mongodb+srv://maryamtahir061:meenuu123@clusterweb.l6zg4.mongodb.net/
