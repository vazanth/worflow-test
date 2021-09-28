"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPlanetsData = exports.getAllPlanets = void 0;
const csv_parse_1 = __importDefault(require("csv-parse"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const planets = [];
function isHabitablePlanet(planet) {
    return (planet['koi_disposition'] === 'CONFIRMED' &&
        planet['koi_insol'] > 0.36 &&
        planet['koi_insol'] < 1.11 &&
        planet['koi_prad'] < 1.6);
}
const loadPlanetsData = () => {
    return new Promise((resolve, reject) => {
        fs_1.default.createReadStream(path_1.default.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe((0, csv_parse_1.default)({
            comment: '#',
            columns: true,
        }))
            .on('data', (data) => {
            if (isHabitablePlanet(data)) {
                planets.push(data);
            }
        })
            .on('error', (err) => {
            console.log(err);
            reject(err);
        })
            .on('end', () => {
            console.log(`${planets.length} habitable planets found!`);
            resolve('');
        });
    });
};
exports.loadPlanetsData = loadPlanetsData;
const getAllPlanets = () => {
    return planets;
};
exports.getAllPlanets = getAllPlanets;
