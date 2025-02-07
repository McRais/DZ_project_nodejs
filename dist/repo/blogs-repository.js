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
    static getCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DB_1.blogsCollection.countDocuments({});
        });
    }
    static getAllBlogs(searchNameTerm, pageNumber, pageSize, sortBy, sortDirection) {
        return __awaiter(this, void 0, void 0, function* () {
            let blogs;
            return DB_1.blogsCollection.aggregate([
                { '$search': { name: searchNameTerm } },
                { '$sortBy': { [sortBy]: sortDirection } },
                { '$limit': pageSize },
                { '$pageNumber': pageNumber - 1 },
            ]);
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
    static createNewBlog(name, description, websiteUrl, createdAt) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield DB_1.blogsCollection.insertOne({ name, description, websiteUrl, createdAt: createdAt, isMembership: false });
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
            const blog = yield blogsRepo.getBlogById(id);
            if (!blog) {
                return false;
            }
            yield DB_1.blogsCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: {
                    name: name,
                    description: description,
                    websiteUrl: websiteUrl
                } }, { upsert: true });
            return true;
        });
    }
    static getPostsFromBlog(id, pageNumber, pageSize, sortBy, sortDirection) {
        return __awaiter(this, void 0, void 0, function* () {
            let field = sortBy;
            let posts;
            if (sortDirection == "desc") {
                posts = yield DB_1.postsCollection.find({ blogId: id }).sort({ [field]: -1 }).skip((pageNumber - 1) * pageSize).limit(pageSize).toArray();
            }
            else {
                posts = yield DB_1.postsCollection.find({ blogId: id }).sort({ [field]: 1 }).skip((pageNumber - 1) * pageSize).limit(pageSize).toArray();
            }
            return posts.map(blogs_mapper_1.postsMapper);
        });
    }
}
exports.blogsRepo = blogsRepo;
