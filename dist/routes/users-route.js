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
const auth_basic_middleware_1 = require("../middlewares/auth-basic-middleware");
const validator_users_1 = require("../validators/validator-users");
exports.usersRoute = (0, express_1.Router)({});
//get users table with pagination and sorting
exports.usersRoute.get('/', auth_basic_middleware_1.AuthBasicMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [searchLoginTerm, searchEmailTerm, pageNumber, pageSize, sortBy, sortDirection] = [req.query.searchLoginTerm, req.query.searchEmailTerm, Number(req.query.pageNumber || 1), Number(req.query.pageSize || 10), String(req.query.sortBy || "createdAt"), req.query.sortDirection || "desc"];
    const users = yield users_repository_1.usersRepo.getAllUsers(searchLoginTerm, searchEmailTerm, pageNumber, pageSize, sortBy, sortDirection);
    const usersRepoCount = yield users_repository_1.usersRepo.getCount(searchLoginTerm, searchEmailTerm);
    return res.send({
        "pagesCount": Math.ceil(usersRepoCount / pageSize),
        "page": pageNumber,
        "pageSize": pageSize,
        "totalCount": usersRepoCount,
        "items": users
    });
}));
//create new user
exports.usersRoute.post('/', auth_basic_middleware_1.AuthBasicMiddleware, (0, validator_users_1.userValidator)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const checkLoginUniqueness = yield users_repository_1.usersRepo.checkUserLoginUniqueness(req.body.login); //something is not right
    if (!checkLoginUniqueness) {
        return res.status(400).send({
            errorsMessages: [{ field: 'login', message: 'login should be unique' }]
        });
    }
    const checkEmailUniqueness = yield users_repository_1.usersRepo.checkUserEmailUniqueness(req.body.email);
    if (!checkEmailUniqueness) {
        return res.status(400).send({
            errorsMessages: [{ field: 'email', message: 'email should be unique' }]
        });
    }
    const [login, password, email, createdAt] = [req.body.login, req.body.password, req.body.email, new Date];
    const user = yield users_repository_1.usersRepo.createUser(login, password, email, createdAt.toISOString());
    return res.status(201).send(user); //redo, can't send user all the data
}));
//delete user
exports.usersRoute.delete('/:id', auth_basic_middleware_1.AuthBasicMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_repository_1.usersRepo.deleteUser(req.params.id);
    return result ? res.sendStatus(204) : res.sendStatus(404);
}));
