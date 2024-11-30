"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllProjects = GetAllProjects;
async function GetAllProjects(req, res, next) {
    try {
        console.log('Fetching all projects...');
        res.status(200).json({ message: 'All projects fetched successfully!' });
    }
    catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
}
