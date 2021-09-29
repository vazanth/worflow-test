"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpAbortLaunch = exports.httpAddNewLaunch = exports.httpGetAllLaunches = void 0;
const launches_model_1 = require("../../models/launches.model");
const query_1 = require("../../services/query");
const httpGetAllLaunches = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page } = req.query;
    const { skip, limit: lim } = (0, query_1.getPagination)(limit, page);
    return res.status(200).json(yield (0, launches_model_1.getAllLaunches)(skip, lim));
});
exports.httpGetAllLaunches = httpGetAllLaunches;
const httpAddNewLaunch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    yield (0, launches_model_1.scheduleNewLaunch)(launch);
    return res.status(201).json(launch);
});
exports.httpAddNewLaunch = httpAddNewLaunch;
const httpAbortLaunch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const exists = yield (0, launches_model_1.launchExists)(id);
    if (!exists) {
        return res.status(404).json({
            error: 'Launch Not Found',
        });
    }
    const aborted = yield (0, launches_model_1.abortLaunchById)(id);
    if (!aborted) {
        return res.status(400).json({
            error: 'Launch Not Aborted',
        });
    }
    return res.status(200).json({ ok: true });
});
exports.httpAbortLaunch = httpAbortLaunch;
