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
exports.blogValidation = exports.blogIdValidator = void 0;
const express_validator_1 = require("express-validator");
const blogs_repository_1 = require("../repo/blogs-repository");
const nameValidator = (0, express_validator_1.body)('name')
    .isString().withMessage('name must be a string')
    .trim()
    .isLength({
    min: 1,
    max: 15
}).withMessage('incorrect name');
const descriptionValidator = (0, express_validator_1.body)('description')
    .isString().withMessage('description must be a string')
    .trim()
    .isLength({
    min: 0,
    max: 500
}).withMessage('incorrect description');
const websiteValidator = (0, express_validator_1.body)('websiteUrl')
    .isString().withMessage('website URL must be a string')
    .trim()
    .isLength({
    min: 0,
    max: 100
}).matches('^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$').withMessage('incorrect website URL');
exports.blogIdValidator = (0, express_validator_1.body)('id')
    .custom((id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blogs_repository_1.blogsRepo.getBlogById(id);
    if (blog === false) {
        throw Error('incorrect id');
    }
}));
const blogValidation = () => [ /*nameValidator, descriptionValidator, websiteValidator, validatorErrorsCatcher*/];
exports.blogValidation = blogValidation;
