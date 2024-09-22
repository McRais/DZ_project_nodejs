"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsMapper = void 0;
const blogsMapper = (blog) => {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl
    };
};
exports.blogsMapper = blogsMapper;
