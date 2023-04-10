import cors from 'cors';
import express from 'express';
// import RootRouter from './routes/index.js';
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, 
  optionSuccessStatus: 200
};

const app = express();
app.use(cors(corsOptions));



const SERVER_PORT = 3005

app.use(express.json());

// app.use('/api/v1', RootRouter);

// for testing purposes
app.get('/ping', (_, res) => {
  res.send('pong');
});

app.listen(SERVER_PORT, async () => {
  console.log(`API Server listening on port ${SERVER_PORT}`);
});
