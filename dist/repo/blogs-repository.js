"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepo = void 0;
const DB_1 = require("../database/DB");
class blogsRepo {
    static getAllBlogs() {
        return DB_1.blogsDB;
    }
    static getBlogById(id) {
        const blog = DB_1.blogsDB.find((blog) => blog.id === id);
        if (!blog) {
            return false;
        }
        return blog;
    }
    static createNewBlog(name, description, websiteUrl) {
        const newBlog = {
            id: Date.now().toString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        };
        DB_1.blogsDB.push(newBlog);
        return newBlog;
    }
    static deleteBlog(id) {
        const blog = DB_1.blogsDB.find((blog) => blog.id === id);
        if (!blog) {
            return false;
        }
        const index = DB_1.blogsDB.findIndex(blog => blog.id === id);
        DB_1.blogsDB.splice(index, 1);
        return true;
    }
    static updateBlog(id, name, description, websiteUrl) {
        const blog = DB_1.blogsDB.find((blog) => blog.id === id);
        if (!blog) {
            return false;
        }
        const index = DB_1.blogsDB.findIndex(blog => blog.id === id);
        DB_1.blogsDB[index].name = name;
        DB_1.blogsDB[index].description = description;
        DB_1.blogsDB[index].websiteUrl = websiteUrl;
        DB_1.postsDB.forEach((posts_inThatBlog) => {
            if (posts_inThatBlog.blogId === id) {
                posts_inThatBlog.blogName = name;
            }
        });
        return DB_1.blogsDB[index];
    }
}
exports.blogsRepo = blogsRepo;
