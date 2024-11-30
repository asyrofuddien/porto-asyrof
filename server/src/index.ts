import express from 'express';
// import { routes } from './routes/route';
import { conn } from './db/connectionMongo';
import { connGraphQl } from './graphql/graphConnections';
import cors from 'cors';

import dotenv from 'dotenv';

// Load environment variables from a custom .env file
dotenv.config({ path: '.env-dev' });

const app = express();

// Enable CORS middleware
app.use(cors());

conn();

// *************** routes call
// routes(app);
connGraphQl(app);
