"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpGetAllPlanets = void 0;
const planet_model_1 = require("../../models/planet.model");
const httpGetAllPlanets = (req, res) => {
    return res.status(200).json((0, planet_model_1.getAllPlanets)());
};
exports.httpGetAllPlanets = httpGetAllPlanets;
