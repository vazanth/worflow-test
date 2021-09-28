import express from 'express';
import { httpGetAllPlanets } from './planets.controller';

const PlanetRouter = express.Router();

PlanetRouter.route('/').get(httpGetAllPlanets);

export default PlanetRouter;
