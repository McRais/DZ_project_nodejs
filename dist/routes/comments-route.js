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
exports.commentsRoute = void 0;
const express_1 = require("express");
const comments_repository_1 = require("../repo/comments-repository");
const auth_bearer_middleware_1 = require("../middlewares/auth-bearer-middleware");
exports.commentsRoute = (0, express_1.Router)({});
//get comment by id
exports.commentsRoute.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield comments_repository_1.commentsRepo.getCommentById(req.params.id);
    return res.status(200).send(comment);
}));
//update comment by id
exports.commentsRoute.put('', auth_bearer_middleware_1.AuthBearerMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield comments_repository_1.commentsRepo.updateComment(req.params.id, req.body.content);
    if (!comment) {
        return res.sendStatus(404);
    }
    else {
        return res.sendStatus(204);
    }
}));
//delete comment by id
/*commentsRoute.delete('', AuthBearerMiddleware, async (req:RequestWithParams<{id:string}>, res:Response):Promise<204|404|403> => {
    const result = await usersRepo.deleteUser(req.params.id)
    return

})*/ 
