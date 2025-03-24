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
exports.commentsRepo = void 0;
const mongodb_1 = require("mongodb");
const DB_1 = require("../database/DB");
const mappers_1 = require("../mappers/mappers");
class commentsRepo {
    static getCommentsFromPostCount(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DB_1.commentsCollection.countDocuments({ postId: postId });
        });
    }
    static getCommentsFromPost(postId, pageNumber, pageSize, sortBy, sortDirection) {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield DB_1.commentsCollection
                .find({ postId: postId })
                .sort(sortBy, sortDirection)
                .limit(pageSize)
                .skip((pageNumber - 1) * pageSize)
                .toArray();
            return comments.map(mappers_1.commentsMapper);
        });
    }
    static getCommentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield DB_1.commentsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!comment) {
                return false;
            }
            const commentArr = Array.of(comment);
            return commentArr.map(mappers_1.commentsMapper)[0];
        });
    }
    static createComment(content, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield DB_1.commentsCollection.findOne({ _id: new mongodb_1.ObjectId(postId) });
            if (!comment) {
                return false;
            }
            const res = yield DB_1.commentsCollection.insertOne({
                content: content,
                commentatorInfo: {
                    userId: "",
                    userLogin: ""
                },
                createdAt: new Date().toISOString(),
                postId: postId
            });
            return res.insertedId.toString();
        });
    }
}
exports.commentsRepo = commentsRepo;
