import express from "express"
import dotenv from "dotenv"
import cors from 'cors'

import { connectDB } from "./config/db.js";
import noteRouters from "./routes/notesRoutes.js"
import rateLimit from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001

//connectDB();
app.use(
    cors({
        origin: "http://localhost:5173",
    })
)
app.use(express.json())
app.use(rateLimit)

app.use("/api/notes", noteRouters)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on PORT", PORT);
    })
})