"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = require("./routes/route");
const connectionMongo_1 = require("./db/connectionMongo");
const graphConnections_1 = require("./graphql/graphConnections");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from a custom .env file
dotenv_1.default.config({ path: '.env-dev' });
const app = (0, express_1.default)();
// Enable CORS middleware
app.use((0, cors_1.default)());
(0, connectionMongo_1.conn)();
// *************** routes call
(0, route_1.routes)(app);
(0, graphConnections_1.connGraphQl)(app);
