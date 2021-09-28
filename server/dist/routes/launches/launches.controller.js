"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpAbortLaunch = exports.httpAddNewLaunch = exports.httpGetAllLaunches = void 0;
const launches_model_1 = require("../../models/launches.model");
const httpGetAllLaunches = (req, res) => {
    return res.status(200).json((0, launches_model_1.getAllLaunches)());
};
exports.httpGetAllLaunches = httpGetAllLaunches;
const httpAddNewLaunch = (req, res) => {
    const launch = req.body;
    if (!launch.mission ||
        !launch.target ||
        !launch.rocket ||
        !launch.launchDate) {
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
    (0, launches_model_1.addNewLaunch)(launch);
    return res.status(201).json(launch);
};
exports.httpAddNewLaunch = httpAddNewLaunch;
const httpAbortLaunch = (req, res) => {
    const id = Number(req.params.id);
    if (!(0, launches_model_1.launchExists)(id)) {
        return res.status(404).json({
            error: 'Launch Not Found',
        });
    }
    const aborted = (0, launches_model_1.abortLaunchById)(id);
    return res.status(200).json(aborted);
};
exports.httpAbortLaunch = httpAbortLaunch;
