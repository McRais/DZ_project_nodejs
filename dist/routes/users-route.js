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
exports.usersRoute = void 0;
const express_1 = require("express");
const users_repository_1 = require("../repo/users-repository");
exports.usersRoute = (0, express_1.Router)({});
exports.usersRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [searchLoginTerm, searchEmailTerm, pageNumber, pageSize, sortBy, sortDirection] = [req.query.searchLoginTerm, req.query.searchEmailTerm, Number(req.query.pageNumber || 1), Number(req.query.pageSize || 10), String(req.query.sortBy || "createdAt"), req.query.sortDirection || "desc"];
    const users = yield users_repository_1.usersRepo.getAllUsers(searchLoginTerm, pageNumber, pageSize, sortBy, sortDirection);
    const usersRepoCount = yield users_repository_1.usersRepo.getCount();
    return res.send({
        "pagesCount": Math.ceil(usersRepoCount / pageSize),
        "page": pageNumber,
        "pageSize": pageSize,
        "totalCount": usersRepoCount,
        "items": users
    });
})); //not done
exports.usersRoute.post('/', (req, res) => { });
exports.usersRoute.delete('/:id', (req, res) => { });
