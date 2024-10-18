import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import {
    loginController,
    meController,
    registerController,
} from "./auth/authController";
import { authenticateToken } from "./auth/authMiddleware";
import { helloWorldController } from "./helloWorld/helloWorldController";

dotenv.config();
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

app.get("/hello", helloWorldController);
app.post("/login", loginController);
app.post("/register", registerController);
app.get("/me", authenticateToken, meController);

app.listen(port, () => console.log(`> Listening on port ${port}`));
