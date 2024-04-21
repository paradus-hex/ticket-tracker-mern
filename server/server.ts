import { PrismaClient } from "@prisma/client";
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import RootRouter from './routes/index.js';
const corsOptions = {
  origin: function (origin:any, callback:any) {
    const whitelist = ['https://ticket-tracker-mern.vercel.app', 'http://localhost:3000'];
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);  // Allow specific origins
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,  // Ensure credentials are allowed
  optionSuccessStatus: 200
};


dotenv.config();

const app = express();
app.use(cors(corsOptions));

const SERVER_PORT = process.env.SERVER_PORT;

app.use(express.json());

app.use('/api/v1', RootRouter);

// for testing purposes
app.get('/ping', (_, res) => {
  res.send('pong');
});

app.listen(SERVER_PORT, async () => {
  console.log(`API Server listening on port ${SERVER_PORT}`);
});




const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;