// envConfig.ts
import dotenv from 'dotenv';

// Load environment variables from a custom .env file
dotenv.config({ path: '.env-dev' });

// Optionally log to confirm the environment has been loaded
console.log('Environment variables loaded from .env-dev');
