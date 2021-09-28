"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const launches_controller_1 = require("./launches.controller");
const LaunchRouter = express_1.default.Router();
LaunchRouter.route('/').get(launches_controller_1.httpGetAllLaunches).post(launches_controller_1.httpAddNewLaunch);
LaunchRouter.route('/:id').delete(launches_controller_1.httpAbortLaunch);
exports.default = LaunchRouter;
