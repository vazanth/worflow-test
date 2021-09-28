import { Request, Response } from 'express';
import {
  abortLaunchById,
  scheduleNewLaunch,
  getAllLaunches,
  launchExists,
} from '../../models/launches.model';
import { getPagination } from '../../services/query';

interface Query {
  limit: number;
  page: number;
}

export const httpGetAllLaunches = async (req: Request, res: Response) => {
  const { limit, page } = req.query as unknown as Query;
  const { skip, limit: lim } = getPagination(limit, page);
  return res.status(200).json(await getAllLaunches(skip, lim));
};

export const httpAddNewLaunch = async (req: Request, res: Response) => {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.target ||
    !launch.rocket ||
    !launch.launchDate
  ) {
    return res.status(400).json({
      error: 'Missing Required Fields',
    });
  }

  launch.launchDate = new Date(launch.launchDate);

  if (launch.launchDate.toString() === 'Invalid Date') {
    return res.status(400).json({
      error: 'Not a Valid Date',
    });
  }

  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
};

export const httpAbortLaunch = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const exists = await launchExists(id);
  if (!exists) {
    return res.status(404).json({
      error: 'Launch Not Found',
    });
  }

  const aborted = await abortLaunchById(id);
  if (!aborted) {
    return res.status(400).json({
      error: 'Launch Not Aborted',
    });
  }
  return res.status(200).json({ ok: true });
};
