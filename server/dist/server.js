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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
// import path from 'path';
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const mongo_1 = require("./services/mongo");
const planet_model_1 = require("./models/planet.model");
const launches_model_1 = require("./models/launches.model");
// dotenv.config({ path: path.join(__dirname, '..', '.env') });
// console.log('__dirname', path.join(__dirname, '..', '.env'));
const PORT = process.env.PORT;
const server = http_1.default.createServer(app_1.default);
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, mongo_1.mongoConnect)();
        (0, planet_model_1.loadPlanetsData)();
        (0, launches_model_1.loadLaunchData)();
        server.listen(PORT, () => {
            console.log(`Listening on port ${PORT}...`);
        });
    });
}
startServer();
process.on('SIGTERM', (signal) => {
    console.log(`Received ${signal}`);
    (0, mongo_1.mongoDisconnect)();
    process.exit(0);
});
// Handle ^C
process.on('SIGINT', (signal) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Received ${signal}`);
    (0, mongo_1.mongoDisconnect)();
    process.exit(0);
}));
process.on('uncaughtException', (err) => {
    console.error('Uncaught exception');
    console.error(err);
    (0, mongo_1.mongoDisconnect)();
    process.exit(1);
});
