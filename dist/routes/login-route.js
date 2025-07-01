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
exports.loginRoute = void 0;
const express_1 = require("express");
const users_repository_1 = require("../repo/users-repository");
const jwt_service_1 = require("../services/jwt-service");
exports.loginRoute = (0, express_1.Router)({});
exports.loginRoute.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_repository_1.usersRepo.loginUser(req.body.loginOrEmail, req.body.password);
    if (user != false) {
        const token = yield jwt_service_1.jwtService.createJwt(user);
        if (token) {
            return res.status(200).send(token);
        }
    }
    return res.sendStatus(401);
}));
/*loginRoute.get('/me',AuthBearerMiddleware, async (req:Request, res:Response): Promise<MyInfoType> => {
    const user = await usersRepo.getUser(req.user.userId)
    if(user){return res.status(201).send({
        email: user.email,
        login: user.login,
        userId: user.id
    })}
})*/ 
