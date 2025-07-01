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
const validator_comments_1 = require("../validators/validator-comments");
exports.commentsRoute = (0, express_1.Router)({});
//get comment by id
exports.commentsRoute.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield comments_repository_1.commentsRepo.getCommentById(req.params.id);
    if (!comment) {
        return res.sendStatus(404);
    }
    return res.status(200).send(comment);
}));
//update comment by id
exports.commentsRoute.put('/:commentId', auth_bearer_middleware_1.AuthBearerMiddleware, (0, validator_comments_1.commentsValidator)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentStatus = yield comments_repository_1.commentsRepo.updateComment(req.user.userId, req.body.content);
    return res.sendStatus(commentStatus); //need to rewrite, repo knows http codes
}));
//delete comment by id
exports.commentsRoute.delete('/:commentId', auth_bearer_middleware_1.AuthBearerMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comments_repository_1.commentsRepo.deleteComment(req.user.userId, req.params.id);
    return res.sendStatus(result);
}));
