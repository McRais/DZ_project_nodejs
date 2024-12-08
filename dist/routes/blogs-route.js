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
exports.blogsRoute = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const blogs_repository_1 = require("../repo/blogs-repository");
const validator_blogs_1 = require("../validators/validator-blogs");
exports.blogsRoute = (0, express_1.Router)({});
exports.blogsRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blogs_repository_1.blogsRepo.getAllBlogs();
    return res.send(blogs);
}));
exports.blogsRoute.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blogs_repository_1.blogsRepo.getBlogById(req.params.id);
    if (blog === false) {
        return res.sendStatus(404);
    }
    else {
        return res.send(blog);
    }
}));
exports.blogsRoute.delete('/:id', auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogs_repository_1.blogsRepo.deleteBlog(req.params.id);
    if (result === false) {
        return res.sendStatus(404);
    }
    else {
        return res.sendStatus(204);
    }
}));
exports.blogsRoute.post("/", auth_middleware_1.authMiddleware, validator_blogs_1.blogValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = yield blogs_repository_1.blogsRepo.createNewBlog(req.body.name, req.body.description, req.body.websiteUrl);
    const blog = yield blogs_repository_1.blogsRepo.getBlogById(blogId);
    if (blog === false) {
        return res.sendStatus(404);
    }
    else {
        return res.status(201).send(blog);
    }
}));
exports.blogsRoute.put("/:id", auth_middleware_1.authMiddleware, validator_blogs_1.blogIdValidator, validator_blogs_1.blogValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blogs_repository_1.blogsRepo.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl);
    if (blog === false) {
        return res.sendStatus(404);
    }
    else {
        return res.status(204).send(blog);
    }
}));
