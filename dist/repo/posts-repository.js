"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepo = void 0;
const DB_1 = require("../database/DB");
class postsRepo {
    static getAllPosts() {
        return DB_1.postsDB;
    }
    static getPostById(id) {
        const post = DB_1.postsDB.find((post) => post.id === id);
        if (!post) {
            return false;
        }
        return post;
    }
    static createNewPost(title, shortDescription, content, blogId) {
        //find the name of the blog
        const blog = DB_1.blogsDB.find((blog) => blog.id === blogId);
        if (!blog) {
            throw new Error("No Blog");
        }
        const newPost = {
            id: Date.now().toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blog.name
        };
        DB_1.postsDB.push(newPost);
        return newPost;
    }
    static deletePost(id) {
        const post = DB_1.postsDB.find((post) => post.id === id);
        if (!post) {
            return false;
        }
        const index = DB_1.postsDB.findIndex(post => post.id === id);
        DB_1.postsDB.splice(index, 1);
        return true;
    }
    static updatePost(id, title, shortDescription, content, blogId) {
        const index = DB_1.postsDB.findIndex(post => post.id === id);
        //find the name of new blog
        const blog = DB_1.blogsDB.find((blog) => blog.id === blogId);
        if (!blog) {
            throw new Error("No Blog");
        }
        DB_1.postsDB[index].title = title;
        DB_1.postsDB[index].shortDescription = shortDescription;
        DB_1.postsDB[index].content = content;
        DB_1.postsDB[index].blogId = blogId;
        DB_1.postsDB[index].blogName = blog.name;
        return DB_1.postsDB[index];
    }
}
exports.postsRepo = postsRepo;
