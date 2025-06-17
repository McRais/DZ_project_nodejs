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
const auth_basic_middleware_1 = require("../middlewares/auth-basic-middleware");
const posts_repository_1 = require("../repo/posts-repository");
const validator_posts_1 = require("../validators/validator-posts");
const comments_repository_1 = require("../repo/comments-repository");
const auth_bearer_middleware_1 = require("../middlewares/auth-bearer-middleware");
exports.postsRoute = (0, express_1.Router)({});
//get all posts
exports.postsRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [searchNameTerm, pageNumber, pageSize, sortBy, sortDirection] = [req.query.searchNameTerm, Number(req.query.pageNumber || 1), Number(req.query.pageSize || 10), String(req.query.sortBy || "createdAt"), req.query.sortDirection || "desc"];
    const posts = yield posts_repository_1.postsRepo.getAllPosts(searchNameTerm, pageNumber, pageSize, sortBy, sortDirection);
    const postsRepoCount = yield posts_repository_1.postsRepo.getPostsCountByName(searchNameTerm);
    return res.send({
        "pagesCount": Math.ceil(postsRepoCount / pageSize),
        "page": pageNumber,
        "pageSize": pageSize,
        "totalCount": postsRepoCount,
        "items": posts
    });
}));
//get post by id
exports.postsRoute.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posts_repository_1.postsRepo.getPostById(req.params.id);
    if (post === false) {
        return res.sendStatus(404);
    }
    else {
        return res.send(post);
    }
}));
//delete post by id, auth
exports.postsRoute.delete('/:id', auth_basic_middleware_1.AuthBasicMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posts_repository_1.postsRepo.deletePost(req.params.id);
    if (post === false) {
        return res.sendStatus(404);
    }
    else {
        return res.sendStatus(204);
    } //done
}));
//post a post, auth and validation
exports.postsRoute.post("/", auth_basic_middleware_1.AuthBasicMiddleware, (0, validator_posts_1.postValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posts_repository_1.postsRepo.createNewPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    return res.status(201).send(post);
}));
//update existing blog, auth and validation
exports.postsRoute.put("/:id", auth_basic_middleware_1.AuthBasicMiddleware, (0, validator_posts_1.postValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posts_repository_1.postsRepo.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    if (!post) {
        return res.sendStatus(404);
    }
    else {
        return res.sendStatus(204);
    }
}));
//get all comments from the post
exports.postsRoute.get("/:postId/comments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [pageNumber, pageSize, sortBy, sortDirection] = [Number(req.query.pageNumber || 1), Number(req.query.pageSize || 10), String(req.query.sortBy || "createdAt"), req.query.sortDirection || "desc"];
    const comments = yield comments_repository_1.commentsRepo.getCommentsFromPost(req.params.postId, pageNumber, pageSize, sortBy, sortDirection);
    const commentsFromPostCount = yield comments_repository_1.commentsRepo.getCommentsFromPostCount(req.params.postId);
    return res.send({
        "pagesCount": Math.ceil(commentsFromPostCount / pageSize),
        "page": pageNumber,
        "pageSize": pageSize,
        "totalCount": commentsFromPostCount,
        "items": comments
    });
}));
//post a comment
exports.postsRoute.post("/:postId/comments", auth_bearer_middleware_1.AuthBearerMiddleware, (req) => __awaiter(void 0, void 0, void 0, function* () { }));
