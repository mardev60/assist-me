import express from 'express';
import { helloWorldController } from './helloWorld/helloWorldController';
import dotenv from 'dotenv';
import { loginController, meController, registerController } from './auth/authController';
import { authenticateToken } from './auth/authMiddleware';
import routages from './routes/routages';


dotenv.config();
const app = express();
const port = 3000;
app.use(express.json());

// app.get('/hello', helloWorldController);
// app.post('/login', loginController);
// app.post('/register', registerController);
// app.get('/me', authenticateToken, meController);

app.use('/api', routages);

app.listen(port, () => console.log(`> Listening on port ${port}`));