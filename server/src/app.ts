import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import routages from "./routes/routages";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);
app.use(express.json());
app.use("/api", routages);

app.listen(port, () => console.log(`> Listening on port ${port}`));
