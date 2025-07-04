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
exports.testingRoute = void 0;
const express_1 = require("express");
const DB_1 = require("../database/DB");
exports.testingRoute = (0, express_1.Router)({});
//drop all tables for testing purposes
exports.testingRoute.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield DB_1.blogsCollection.drop();
    yield DB_1.postsCollection.drop();
    yield DB_1.usersCollection.drop();
    yield DB_1.commentsCollection.drop();
    return res.sendStatus(204);
}));
