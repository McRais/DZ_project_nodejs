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
exports.postsRoute = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const posts_repository_1 = require("../repo/posts-repository");
const validator_posts_1 = require("../validators/validator-posts");
exports.postsRoute = (0, express_1.Router)({});
//get all posts
exports.postsRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posts_repository_1.postsRepo.getAllPosts();
    return res.send(post);
})); //done
//get post by id
exports.postsRoute.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posts_repository_1.postsRepo.getPostById(req.params.id);
    if (post === false) {
        return res.sendStatus(404);
    }
    else {
        return res.send(post);
    }
})); //done
//delete post by id, auth
exports.postsRoute.delete('/:id', auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posts_repository_1.postsRepo.deletePost(req.params.id);
    if (!post) {
        return res.sendStatus(404);
    }
    else {
        return res.sendStatus(204);
    } //not done
}));
//post a post, auth and validation
exports.postsRoute.post("/", auth_middleware_1.authMiddleware, (0, validator_posts_1.postValidation)(), (req, res) => {
    const post = posts_repository_1.postsRepo.createNewPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    return res.status(201).send(post);
});
//put new values into existing blog, auth and validation
exports.postsRoute.put("/:id", auth_middleware_1.authMiddleware, (0, validator_posts_1.postValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posts_repository_1.postsRepo.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    return res.status(204).send(post);
}));
