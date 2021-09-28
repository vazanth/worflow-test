"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abortLaunchById = exports.launchExists = exports.addNewLaunch = exports.getAllLaunches = void 0;
const launches = new Map();
let latestFlightNumber = 100;
const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('July 12, 2030'),
    target: 'Kepler-442 b',
    customer: ['ISRO', 'NASA'],
    upcoming: true,
    success: true,
};
launches.set(launch.flightNumber, launch);
const getAllLaunches = () => {
    return Array.from(launches.values());
};
exports.getAllLaunches = getAllLaunches;
const addNewLaunch = (launch) => {
    latestFlightNumber++;
    // launches.set(latestFlightNumber, {
    //   ...launch,
    //   flightNumber: latestFlightNumber,
    //   customer: ['ISRO', 'NASA'],
    //   upcoming: true,
    //   success: true,
    // });
    launches.set(latestFlightNumber, Object.assign(launch, {
        flightNumber: latestFlightNumber,
        customer: ['ISRO', 'NASA'],
        upcoming: true,
        success: true,
    }));
};
exports.addNewLaunch = addNewLaunch;
const launchExists = (id) => {
    console.log('id', id, typeof id);
    return launches.has(id);
};
exports.launchExists = launchExists;
const abortLaunchById = (id) => {
    const aborted = launches.get(id);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
};
exports.abortLaunchById = abortLaunchById;
