"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// envConfig.ts
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from a custom .env file
dotenv_1.default.config({ path: '.env-dev' });
// Optionally log to confirm the environment has been loaded
console.log('Environment variables loaded from .env-dev');
