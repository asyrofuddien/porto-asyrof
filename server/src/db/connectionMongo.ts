import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ServerApiVersion } from 'mongodb';

dotenv.config();

const clientOptions = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

const conn = async (): Promise<void> => {
  const username: string = encodeURIComponent((process.env.USERNAMEDB || 'admin').replace(/^'|'$/g, ''));
  const password: string = encodeURIComponent((process.env.PASSWORDDB || 'admin').replace(/^'|'$/g, ''));
  const dbUrl: string = `mongodb+srv://${username}:${password}@portofolio-asyrof.u3ani.mongodb.net/?retryWrites=true&w=majority&appName=portofolio-asyrof`;

  try {
    await mongoose.connect(dbUrl, clientOptions);

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection is not initialized.');
    }

    await db.admin().command({ ping: 1 });
    console.log('Connected to MongoDB on', dbUrl);
  } catch (error) {
    console.error(`Failed to connect to MongoDB at ${dbUrl}:`, error);
    process.exit(1); // Exit the process on failure
  }
};

export { conn };
