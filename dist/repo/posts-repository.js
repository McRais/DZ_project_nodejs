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
const mongodb_1 = require("mongodb");
class postsRepo {
    static getCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DB_1.postsCollection.countDocuments({});
        });
    }
    static getCountFromBlog(blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DB_1.postsCollection.countDocuments({ blogId: blogId });
        });
    }
    static getAllPosts(searchNameTerm, pageNumber, pageSize, sortBy, sortDirection) {
        return __awaiter(this, void 0, void 0, function* () {
            const regex = searchNameTerm ? { name: { $regex: searchNameTerm, $options: "i" } } : {};
            const posts = yield DB_1.postsCollection
                .find(regex)
                .sort(sortBy, sortDirection)
                .limit(pageSize)
                .skip((pageNumber - 1) * pageSize)
                .toArray();
            return posts.map(blogs_mapper_1.postsMapper);
        });
    }
    static getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield DB_1.postsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!post) {
                return false;
            }
            let postArr = Array.of(post);
            return postArr.map(blogs_mapper_1.postsMapper)[0];
        });
    }
    static createNewPost(title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield DB_1.blogsCollection.findOne({ _id: new mongodb_1.ObjectId(blogId) });
            if (!blog) {
                throw new Error("No blog");
            }
            const date = new Date();
            const newPost = {
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId,
                blogName: blog.name,
                createdAt: date.toISOString()
            };
            const result = yield DB_1.postsCollection.insertOne(newPost);
            return postsRepo.getPostById(result.insertedId.toString());
        });
    }
    static deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield DB_1.postsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!post) {
                return false;
            }
            return yield DB_1.postsCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        });
    }
    static updatePost(id, title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const postCheck = yield DB_1.postsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!postCheck) {
                return false;
            }
            yield DB_1.postsCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: {
                    title: title,
                    shortDescription: shortDescription,
                    content: content,
                    blogId: blogId
                } }, { upsert: true });
            return true;
        });
    }
}
exports.postsRepo = postsRepo;
