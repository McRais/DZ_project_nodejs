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
exports.blogsRepo = void 0;
const DB_1 = require("../database/DB");
const blogs_mapper_1 = require("../mappers/blogs-mapper");
const mongodb_1 = require("mongodb");
class blogsRepo {
    static getAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const blogs = yield DB_1.blogsCollection.find({}).toArray();
            return blogs.map(blogs_mapper_1.blogsMapper);
        });
    }
    static getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield DB_1.blogsCollection.findOne({ _id: new mongodb_1.ObjectId(id) }).toArray();
            if (!blog) {
                return false;
            }
            return blog.map(blogs_mapper_1.blogsMapper);
        });
    }
    static createNewBlog(name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield DB_1.blogsCollection.insertOne({ name, description, websiteUrl });
            return res.insertedId.toString();
        });
    }
} /*
    static deleteBlog(id:string) {
        const blog = blogsDB.find((blog) => blog.id === id)
        if (!blog){return false}
        const index = blogsDB.findIndex(blog => blog.id === id);
        blogsDB.splice(index, 1);
        return true
    }

    static updateBlog(id: string, name:string, description:string, websiteUrl:string) {
        const blog = blogsDB.find((blog) => blog.id === id)
        if (!blog){return false}
        const index = blogsDB.findIndex(blog => blog.id === id);
        blogsDB[index].name = name
        blogsDB[index].description = description
        blogsDB[index].websiteUrl = websiteUrl

        postsDB.forEach((posts_inThatBlog) => {
            if(posts_inThatBlog.blogId === id){posts_inThatBlog.blogName = name}
        })

        return blogsDB[index]
    }

}

*/
exports.blogsRepo = blogsRepo;
