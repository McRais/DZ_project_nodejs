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
exports.postsRepo = void 0;
const DB_1 = require("../database/DB");
const blogs_mapper_1 = require("../mappers/blogs-mapper");
class postsRepo {
    static getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield DB_1.postsCollection.find({}).toArray();
            return posts.map(blogs_mapper_1.postsMapper);
        });
    }
    static getPostById(id) {
        const post = postsDB.find((post) => post.id === id);
        if (!post) {
            return false;
        }
        return post;
    }
    static createNewPost(title, shortDescription, content, blogId) {
        //find the name of the blog
        const blog = blogsDB.find((blog) => blog.id === blogId);
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
        postsDB.push(newPost);
        return newPost;
    }
    static deletePost(id) {
        const post = postsDB.find((post) => post.id === id);
        if (!post) {
            return false;
        }
        const index = postsDB.findIndex(post => post.id === id);
        postsDB.splice(index, 1);
        return true;
    }
    static updatePost(id, title, shortDescription, content, blogId) {
        const index = postsDB.findIndex(post => post.id === id);
        //find the name of new blog
        const blog = blogsDB.find((blog) => blog.id === blogId);
        if (!blog) {
            throw new Error("No Blog");
        }
        postsDB[index].title = title;
        postsDB[index].shortDescription = shortDescription;
        postsDB[index].content = content;
        postsDB[index].blogId = blogId;
        postsDB[index].blogName = blog.name;
        return postsDB[index];
    }
}
exports.postsRepo = postsRepo;
