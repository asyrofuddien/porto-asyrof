"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conn = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
dotenv_1.default.config();
const clientOptions = {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
};
const conn = async () => {
    const username = encodeURIComponent((process.env.USERNAMEDB || 'admin').replace(/^'|'$/g, ''));
    const password = encodeURIComponent((process.env.PASSWORDDB || 'admin').replace(/^'|'$/g, ''));
    const dbUrl = `mongodb+srv://${username}:${password}@portofolio-asyrof.u3ani.mongodb.net/?retryWrites=true&w=majority&appName=portofolio-asyrof`;
    try {
        await mongoose_1.default.connect(dbUrl, clientOptions);
        const db = mongoose_1.default.connection.db;
        if (!db) {
            throw new Error('Database connection is not initialized.');
        }
        await db.admin().command({ ping: 1 });
        console.log('Connected to MongoDB on', dbUrl);
    }
    catch (error) {
        console.error(`Failed to connect to MongoDB at ${dbUrl}:`, error);
        process.exit(1); // Exit the process on failure
    }
};
exports.conn = conn;
