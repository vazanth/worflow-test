import express from 'express';
import {
  httpAddNewLaunch,
  httpGetAllLaunches,
  httpAbortLaunch,
} from './launches.controller';

const LaunchRouter = express.Router();

LaunchRouter.route('/').get(httpGetAllLaunches).post(httpAddNewLaunch);

LaunchRouter.route('/:id').delete(httpAbortLaunch);

export default LaunchRouter;
