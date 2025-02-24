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
exports.userValidator = void 0;
const express_validator_1 = require("express-validator");
const validator_errors_catcher_1 = require("../middlewares/validator-errors-catcher");
const users_repository_1 = require("../repo/users-repository");
const loginValidator = (0, express_validator_1.body)('login')
    .isString().withMessage('login must be a string')
    .trim()
    .isLength({
    min: 3,
    max: 100
}).withMessage('incorrect login length')
    .matches('^[a-zA-Z0-9_-]*$').withMessage('incorrect login pattern');
const emailValidator = (0, express_validator_1.body)('email')
    .isString().withMessage('website URL must be a string')
    .trim()
    .matches('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$').withMessage('incorrect email address');
const passwordValidator = (0, express_validator_1.body)('password')
    .isString().withMessage('password must be a string')
    .trim()
    .isLength({
    min: 6,
    max: 20
}).withMessage('incorrect password length');
const loginUniquenessValidator = (0, express_validator_1.body)('login').custom((login) => __awaiter(void 0, void 0, void 0, function* () {
    const loginUniqueness = yield users_repository_1.usersRepo.checkUserLoginUniqueness(login);
    if (!loginUniqueness) {
        throw new Error('login is not unique');
    }
}));
const emailUniquenessValidator = (0, express_validator_1.body)('email').custom((email) => __awaiter(void 0, void 0, void 0, function* () {
    const emailUniqueness = yield users_repository_1.usersRepo.checkUserEmailUniqueness(email);
    if (!emailUniqueness) {
        throw new Error('email is not unique');
    }
}));
const userValidator = () => [loginValidator, emailValidator, passwordValidator, loginUniquenessValidator, emailUniquenessValidator, validator_errors_catcher_1.validatorErrorsCatcher];
exports.userValidator = userValidator;
