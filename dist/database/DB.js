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
exports.postsDB = exports.blogsDB = exports.runDb = exports.postsCollection = exports.blogsCollection = void 0;
const mongodb_1 = require("mongodb");
const mongoURI = process.env.MONGO_URI || 'mongodb://0.0.0.0:27017';
const port = 3003;
const client = new mongodb_1.MongoClient(mongoURI);
const db = client.db('blogs-db');
exports.blogsCollection = db.collection('blogs');
exports.postsCollection = db.collection('posts');
const runDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        console.log("Connected to DB");
        console.log(`Example app listening on port ${port}`);
    }
    catch (e) {
        console.log(e);
        yield client.close();
    }
});
exports.runDb = runDb;
exports.blogsDB = [
    {
        id: "1",
        name: "First blog",
        description: "First description",
        websiteUrl: "First-blog.com"
    }
], exports.postsDB = [
    {
        id: "1234892487",
        title: "First post",
        shortDescription: "Short description for the first post",
        content: "Content",
        blogId: "1",
        blogName: "First blog"
    }
];
