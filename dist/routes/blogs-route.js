"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRoute = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const blogs_repository_1 = require("../repo/blogs-repository");
const validator_blogs_1 = require("../validators/validator-blogs");
exports.blogsRoute = (0, express_1.Router)({});
//get all blogs
exports.blogsRoute.get('/', (req, res) => {
    const blog = blogs_repository_1.blogsRepo.getAllBlogs();
    return res.send(blog);
}); //done
//get blog by id
exports.blogsRoute.get('/:id', (req, res) => {
    const blog = blogs_repository_1.blogsRepo.getBlogById(req.params.id);
    if (blog === false) {
        return res.sendStatus(404);
    }
    else {
        return res.send(blog);
    }
}); //done
//delete blog by id, auth
exports.blogsRoute.delete('/:id', auth_middleware_1.authMiddleware, (req, res) => {
    const blog = blogs_repository_1.blogsRepo.deleteBlog(req.params.id);
    if (!blog) {
        return res.sendStatus(404);
    }
    else {
        return res.sendStatus(204);
    }
});
//post blog, auth and validation
exports.blogsRoute.post("/", auth_middleware_1.authMiddleware, (0, validator_blogs_1.blogValidation)(), (req, res) => {
    const blogId = blogs_repository_1.blogsRepo.createNewBlog(req.body.name, req.body.description, req.body.websiteUrl);
    const blog = blogs_repository_1.blogsRepo.getBlogById(blogId);
    return res.status(201).send(blog);
});
//put new values into existing blog, auth and validation
exports.blogsRoute.put("/:id", auth_middleware_1.authMiddleware, (0, validator_blogs_1.blogValidation)(), (req, res) => {
    const blog = blogs_repository_1.blogsRepo.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl);
    if (!blog) {
        return res.sendStatus(404);
    }
    else {
        return res.status(204).send(blog);
    }
});
