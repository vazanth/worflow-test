"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoDisconnect = exports.mongoConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_URL = process.env.MONGO_URL;
mongoose_1.default.connection.once('open', () => {
    console.log('Mongo DB connection ready!!!');
});
mongoose_1.default.connection.on('error', (err) => {
    console.error('Mongo DB error', err);
});
const mongoConnect = () => {
    mongoose_1.default.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false, //Make Mongoose use `findOneAndUpdate()` ---changed to--> findAndModify()
    });
};
exports.mongoConnect = mongoConnect;
const mongoDisconnect = () => {
    mongoose_1.default.disconnect();
};
exports.mongoDisconnect = mongoDisconnect;
