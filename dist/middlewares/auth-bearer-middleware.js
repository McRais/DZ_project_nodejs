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
exports.AuthBearerMiddleware = void 0;
const users_repository_1 = require("../repo/users-repository");
const jwt_service_1 = require("../services/jwt-service");
const AuthBearerMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        return res.sendStatus(401);
    }
    const token = req.headers.authorization.split(' ')[1];
    const userIdFromToken = yield jwt_service_1.jwtService.getUserIdFromToken(token);
    if (userIdFromToken) {
        const user = yield users_repository_1.usersRepo.getUser(userIdFromToken);
        if (user) {
            req.user.userId = userIdFromToken; //100% a mistake somewhere here
            next();
        }
    }
    return res.sendStatus(401);
});
exports.AuthBearerMiddleware = AuthBearerMiddleware;
