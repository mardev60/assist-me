import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import routages from './routes/routages';

dotenv.config();
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

app.use('/api', routages);

app.listen(port, () => console.log(`> Listening on port ${port}`));
