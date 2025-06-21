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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRepo = void 0;
const mongodb_1 = require("mongodb");
const DB_1 = require("../database/DB");
const output_mappers_1 = require("../mappers/output-mappers");
const bcrypt_1 = __importDefault(require("bcrypt"));
class usersRepo {
    static getCount(searchLoginTerm, searchEmailTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            const regexLogin = searchLoginTerm ? { login: { $regex: searchLoginTerm, $options: "i" } } : {};
            const regexEmail = searchEmailTerm ? { email: { $regex: searchEmailTerm, $options: "i" } } : {};
            return yield DB_1.usersCollection.countDocuments({ $or: [regexLogin, regexEmail] });
        });
    }
    static getUser(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield DB_1.usersCollection.findOne({ _id: new mongodb_1.ObjectId(userID) });
            if (!user) {
                return false;
            } //it will never return it, this function is only for usersRepo.createUser
            return (0, output_mappers_1.usersMapper)(user);
        });
    }
    static checkUserLoginUniqueness(login) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield DB_1.usersCollection.findOne({ login: login });
            if (!user) {
                return true;
            }
            return false;
        });
    }
    static checkUserEmailUniqueness(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield DB_1.usersCollection.findOne({ email: email });
            if (!user) {
                return true;
            }
            return false;
        });
    }
    static getAllUsers(searchLoginTerm, searchEmailTerm, pageNumber, pageSize, sortBy, sortDirection) {
        return __awaiter(this, void 0, void 0, function* () {
            const regexLogin = searchLoginTerm ? { login: { $regex: searchLoginTerm, $options: "i" } } : {};
            const regexEmail = searchEmailTerm ? { email: { $regex: searchEmailTerm, $options: "i" } } : {};
            const users = yield DB_1.usersCollection
                .find({ $or: [regexLogin, regexEmail] })
                .sort(sortBy, sortDirection)
                .limit(pageSize)
                .skip((pageNumber - 1) * pageSize)
                .toArray();
            return users.map(output_mappers_1.usersMapper);
        });
    }
    static createUser(login, password, email, createdAt) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashPass = yield bcrypt_1.default.hash(password, salt);
            const user = yield DB_1.usersCollection.insertOne({ login: login, password: hashPass, salt: salt, email: email, createdAt: createdAt });
            return yield usersRepo.getUser(user.insertedId.toString());
        });
    }
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteResult = yield DB_1.usersCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return deleteResult.deletedCount != 0;
        });
    }
    static loginUser(loginOrEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield DB_1.usersCollection.findOne({ $or: [{ login: loginOrEmail }, { email: loginOrEmail }] });
            if (!user || (yield bcrypt_1.default.hash(password, user.salt)) != user.password) {
                return false;
            }
            return {
                "accessToken": "" //need to send a jwt of a user
            };
        });
    }
}
exports.usersRepo = usersRepo;
