import express from "express"
import dotenv from "dotenv"
import cors from 'cors'
import path from "path"

import { connectDB } from "./config/db.js";
import noteRouters from "./routes/notesRoutes.js"
import rateLimit from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001

const __dirname = path.resolve()


//connectDB();
if (process.env.NODE_ENV !== "production") {
    app.use(
        cors({
            origin: "http://localhost:5173",
        })
    )
}
app.use(express.json())
app.use(rateLimit)

app.use("/api/notes", noteRouters)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on PORT", PORT);
    })
})