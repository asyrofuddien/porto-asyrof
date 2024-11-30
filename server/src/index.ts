import express from 'express';
import { routes } from './routes/route';
import { conn } from './db/connectionMongo';
import { connGraphQl } from './graphql/graphConnections';

import dotenv from 'dotenv';

// Load environment variables from a custom .env file
dotenv.config({ path: '.env-dev' });

const app = express();

conn();

// *************** routes call
routes(app);
connGraphQl(app);