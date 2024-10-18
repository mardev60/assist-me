import express from 'express';
import { helloWorldController } from './helloWorld/helloWorldController';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 3000;

app.get('/hello', helloWorldController);

app.listen(port, () => console.log(`> Listening on port ${port}`));