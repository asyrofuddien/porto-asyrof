"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const projects_controller_1 = require("../controllers/projects.controller");
const routes = (app) => {
    app.get('/', projects_controller_1.GetAllProjects);
};
exports.routes = routes;
