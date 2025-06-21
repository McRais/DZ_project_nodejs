"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsMapper = exports.usersMapper = exports.postsMapper = exports.blogsMapper = void 0;
const blogsMapper = (blog) => {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    };
};
exports.blogsMapper = blogsMapper;
const postsMapper = (post) => {
    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt
    };
};
exports.postsMapper = postsMapper;
const usersMapper = (user) => {
    return {
        id: user._id.toString(),
        login: user.login,
        email: user.email,
        salt: user.salt,
        createdAt: user.createdAt
    };
};
exports.usersMapper = usersMapper;
const commentsMapper = (comment) => {
    return {
        id: comment._id.toString(),
        content: comment.content,
        commentatorInfo: comment.commentatorInfo,
        createdAt: comment.createdAt
    };
};
exports.commentsMapper = commentsMapper;
