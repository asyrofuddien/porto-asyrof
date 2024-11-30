import express, { NextFunction, request, response } from 'express';
import { GetAllProjects } from '../controllers/projects.controller';

export const routes = (app: express.Application): void => {
  app.get('/', GetAllProjects);
};
