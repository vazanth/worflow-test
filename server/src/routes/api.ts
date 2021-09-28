import express from 'express';
import PlanetRouter from './planets/planets.router';
import LaunchRouter from './launches/launches.router';

const api = express.Router();

api.use('/planets', PlanetRouter);
api.use('/launches', LaunchRouter);

export default api;
