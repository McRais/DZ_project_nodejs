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
exports.loginRoute = (0, express_1.Router)({});
//login user, needs update and validator for input values
exports.loginRoute.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jwtOfUser = yield users_repository_1.usersRepo.loginUser(req.body.loginOrEmail, req.body.password);
    if (jwtOfUser) {
        return res.status(200).send(jwtOfUser);
    }
    return res.sendStatus(401);
}));
//loginRoute.get('/me', async (req: RequestWithBody<{me: string}>, res:Response): Promise<MyInfoType|401> => {})
