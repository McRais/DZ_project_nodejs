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
    const [searchNameTerm, pageNumber, pageSize, sortBy, sortDirection] = [req.query.searchNameTerm || null, req.query.pageNumber || 1, req.query.pageSize || 10, req.query.sortBy || "createdAt", req.query.sortDirection || "desc"];
    const blogs = yield blogs_repository_1.blogsRepo.getAllBlogs(searchNameTerm, pageNumber, pageSize, sortBy, sortDirection);
    const blogsRepoCount = yield blogs_repository_1.blogsRepo.getCount();
    return res.send({
        "pagesCount": Math.ceil(blogsRepoCount / pageSize),
        "page": pageNumber,
        "pageSize": pageSize,
        "totalCount": blogsRepoCount,
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
    const createdAt = new Date;
    const blogId = yield blogs_repository_1.blogsRepo.createNewBlog(req.body.name, req.body.description, req.body.websiteUrl, createdAt.toISOString());
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
    const [pageNumber, pageSize, sortBy, sortDirection] = [req.query.pageNumber || 1, req.query.pageSize || 10, req.query.sortBy || "createdAt", req.query.sortDirection || "desc"];
    const posts = yield blogs_repository_1.blogsRepo.getPostsFromBlog(req.params.id, pageNumber, pageSize, sortBy, sortDirection);
    const postsRepoCount = yield posts_repository_1.postsRepo.getCountFromBlog(req.params.id);
    return res.status(200).send({
        "pagesCount": Math.ceil(postsRepoCount / pageSize),
        "page": pageNumber,
        "pageSize": pageSize,
        "totalCount": postsRepoCount,
        "items": posts
    });
}));
exports.blogsRoute.post("/:id/posts", auth_middleware_1.authMiddleware, (0, validator_posts_1.postInBlogRouteValidation)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posts_repository_1.postsRepo.createNewPost(req.body.title, req.body.shortDescription, req.body.content, req.params.id);
    return res.status(201).send(post);
}));
