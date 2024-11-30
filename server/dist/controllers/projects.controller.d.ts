import { Request, Response, NextFunction } from 'express';
declare function GetAllProjects(req: Request, res: Response, next: NextFunction): Promise<void>;
export { GetAllProjects };
