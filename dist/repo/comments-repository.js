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
const DB_1 = require("../database/DB");
class commentsRepo {
    static getCommentsFromPostCount(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DB_1.commentsCollection.countDocuments({ postId: postId }); //feels not right, check the types.ts
        });
    }
    static getCommentsFromPost(postId, pageNumber, pageSize, sortBy, sortDirection) {
        return __awaiter(this, void 0, void 0, function* () {
            //need to add link to types, probably array to every post containing commentsId's
            const posts = yield DB_1.commentsCollection
                .find({ commentatorInfo: { postId: postId } })
                .sort(sortBy, sortDirection)
                .limit(pageSize)
                .skip((pageNumber - 1) * pageSize)
                .toArray();
        });
    }
}
exports.commentsRepo = commentsRepo;
