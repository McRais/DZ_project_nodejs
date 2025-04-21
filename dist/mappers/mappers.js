"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsOutputMapper = exports.usersOutputMapper = exports.postsOutputMapper = exports.blogsOutputMapper = void 0;
const blogsOutputMapper = (blog) => {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    };
};
exports.blogsOutputMapper = blogsOutputMapper;
const postsOutputMapper = (post) => {
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
exports.postsOutputMapper = postsOutputMapper;
const usersOutputMapper = (user) => {
    return {
        id: user._id.toString(),
        login: user.login,
        email: user.email,
        createdAt: user.createdAt
    };
};
exports.usersOutputMapper = usersOutputMapper;
const commentsOutputMapper = (comment) => {
    return {
        id: comment._id.toString(),
        content: comment.content,
        commentatorInfo: comment.commentatorInfo,
        createdAt: comment.createdAt
    };
};
exports.commentsOutputMapper = commentsOutputMapper;
