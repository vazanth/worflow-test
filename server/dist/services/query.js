"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagination = void 0;
const getPagination = (limitParam, pageParam) => {
    const limit = limitParam ? Math.abs(limitParam) : 0;
    const page = pageParam ? Math.abs(pageParam) : 1;
    const skip = (page - 1) * limit;
    return {
        skip,
        limit,
    };
};
exports.getPagination = getPagination;
