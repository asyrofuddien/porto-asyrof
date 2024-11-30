import { Request, Response, NextFunction } from 'express';

async function GetAllProjects(req: Request, res: Response, next: NextFunction) {
  try {
    console.log('Fetching all projects...');
    res.status(200).json({ message: 'All projects fetched successfully!' });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
}

export { GetAllProjects };
