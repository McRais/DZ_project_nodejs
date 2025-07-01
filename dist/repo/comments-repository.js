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
const output_mappers_1 = require("../mappers/output-mappers");
const users_repository_1 = require("./users-repository");
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
            return comments.map(output_mappers_1.commentsMapper);
        });
    }
    static getCommentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield DB_1.commentsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!comment) {
                return false;
            }
            return (0, output_mappers_1.commentsMapper)(comment);
        });
    }
    static createComment(userId, postId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = {
                content: content,
                commentatorInfo: {
                    userId: userId,
                    userLogin: yield users_repository_1.usersRepo.getUserLogin(userId)
                },
                createdAt: new Date().toISOString(),
                postId: postId
            };
            const res = yield DB_1.commentsCollection.insertOne(comment);
            return {
                id: res.insertedId.toString(),
                content: comment.content,
                commentatorInfo: comment.commentatorInfo,
                createdAt: comment.createdAt
            };
        });
    }
    static updateComment(userId, commentId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield DB_1.commentsCollection.findOne({ _id: new mongodb_1.ObjectId(commentId) });
            if (!comment) {
                return 404;
            }
            if (comment.commentatorInfo.userId != userId) {
                return 403;
            }
            yield DB_1.commentsCollection.updateOne({ _id: new mongodb_1.ObjectId(commentId) }, { $set: {
                    content: content
                } });
            return 204;
        });
    }
    static deleteComment(userId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield DB_1.commentsCollection.findOne({ _id: new mongodb_1.ObjectId(commentId) });
            if (!comment) {
                return 404;
            }
            if (userId != comment.commentatorInfo.userId) {
                return 403;
            }
            yield DB_1.commentsCollection.deleteOne({ _id: new mongodb_1.ObjectId(commentId) });
            return 204;
        });
    }
}
exports.commentsRepo = commentsRepo;
