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
const validator_posts_1 = require("../validators/validator-posts");
const posts_repository_1 = require("../repo/posts-repository");
exports.blogsRoute = (0, express_1.Router)({});
exports.blogsRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [searchNameTerm, pageNumber, pageSize, sortBy, sortDirection] = [req.params.searchNameTerm, req.params.pageNumber || 1, req.params.pageSize || 10, req.params.sortBy || "createdAt", req.params.sortDirection];
    const blogs = yield blogs_repository_1.blogsRepo.getAllBlogs(searchNameTerm, pageNumber, pageSize, sortBy, sortDirection);
    return res.send({
        "pagesCount": Math.ceil(blogs.length / pageSize),
        "page": pageNumber,
        "pageSize": pageSize,
        "totalCount": yield blogs_repository_1.blogsRepo.getCount(),
        "items": blogs
    });
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
exports.blogsRoute.post("/", auth_middleware_1.authMiddleware, (0, validator_blogs_1.blogBodyValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = yield blogs_repository_1.blogsRepo.createNewBlog(req.body.name, req.body.description, req.body.websiteUrl);
    const blog = yield blogs_repository_1.blogsRepo.getBlogById(blogId);
    return res.status(201).send(blog);
}));
exports.blogsRoute.put("/:id", auth_middleware_1.authMiddleware, (0, validator_blogs_1.blogBodyValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blogs_repository_1.blogsRepo.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl);
    if (!blog) {
        return res.sendStatus(404);
    }
    else {
        return res.sendStatus(204);
    }
}));
exports.blogsRoute.get('/:id/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blogs_repository_1.blogsRepo.getBlogById(req.params.id);
    if (blog === false) {
        return res.sendStatus(404);
    }
    const posts = yield blogs_repository_1.blogsRepo.getPostsFromBlog(req.params.id);
    return res.status(200).send(posts);
}));
exports.blogsRoute.post("/:id/posts", auth_middleware_1.authMiddleware, (0, validator_posts_1.postValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posts_repository_1.postsRepo.createNewPost(req.body.title, req.body.shortDescription, req.body.content, req.params.id);
    return res.status(201).send(post);
}));
