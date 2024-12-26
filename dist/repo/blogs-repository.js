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
            const blog = yield DB_1.blogsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!blog) {
                return false;
            }
            const blogArr = Array.of(blog);
            return blogArr.map(blogs_mapper_1.blogsMapper)[0];
        });
    }
    static createNewBlog(name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = new Date().toString();
            const res = yield DB_1.blogsCollection.insertOne({ name, description, websiteUrl, createdAt: date.toString(), isMembership: true });
            return res.insertedId.toString();
        });
    }
    static deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield DB_1.blogsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!blog) {
                return false;
            }
            return yield DB_1.blogsCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        });
    }
    static updateBlog(id, name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            yield DB_1.blogsCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                name: name,
                description: description,
                websiteUrl: websiteUrl
            });
            return yield blogsRepo.getBlogById(id);
        });
    }
}
exports.blogsRepo = blogsRepo;
