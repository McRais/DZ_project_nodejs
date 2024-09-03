"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRoute = void 0;
const express_1 = require("express");
const DB_1 = require("../database/DB");
exports.testingRoute = (0, express_1.Router)({});
exports.testingRoute.delete("/", (req, res) => {
    DB_1.blogsDB.length = 0;
    DB_1.postsDB.length = 0;
    res.sendStatus(204);
});
