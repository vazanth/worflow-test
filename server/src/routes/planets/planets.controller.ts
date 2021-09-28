import { Request, Response } from 'express';
import { getAllPlanets } from '../../models/planet.model';

export const httpGetAllPlanets = async (req: Request, res: Response) => {
  return res.status(200).json(await getAllPlanets());
};
