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
exports.usersRepo = void 0;
const mongodb_1 = require("mongodb");
const DB_1 = require("../database/DB");
const blogs_mapper_1 = require("../mappers/blogs-mapper");
class usersRepo {
    static getCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DB_1.usersCollection.countDocuments();
        });
    }
    static getUser(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield DB_1.usersCollection.findOne({ userID: userID });
            if (!user) {
                return false;
            } //it will never return it, this function is only for usersRepo.createUser
            const userArr = Array.of(user); //eugene please refactor this, there is a lot of crutches already. Sincerely, Eugene
            return userArr.map(blogs_mapper_1.usersMapper)[0];
        });
    }
    static getAllUsers(searchLoginTerm, searchEmailTerm, pageNumber, pageSize, sortBy, sortDirection) {
        return __awaiter(this, void 0, void 0, function* () {
            const regexLogin = searchLoginTerm ? { name: { $regex: searchLoginTerm, $options: "i" } } : {};
            const regexEmail = searchEmailTerm ? { name: { $regex: searchEmailTerm, $options: "i" } } : {};
            const users = yield DB_1.usersCollection
                .find({ $or: [{ login: regexLogin }, { email: regexEmail }] })
                .sort(sortBy, sortDirection)
                .limit(pageSize)
                .skip((pageNumber - 1) * pageSize)
                .toArray();
            return users.map(blogs_mapper_1.usersMapper);
        });
    }
    static createUser(login, password, email, createdAt) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield DB_1.usersCollection.insertOne({ login, password, email, createdAt: createdAt });
            return usersRepo.getUser(user.insertedId.toString());
        });
    }
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DB_1.usersCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) }); //redo later
        });
    }
}
exports.usersRepo = usersRepo;
