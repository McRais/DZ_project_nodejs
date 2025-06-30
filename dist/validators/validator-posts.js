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
exports.blogIdParamValidation = exports.postInBlogsRouteValidation = exports.postValidation = void 0;
const express_validator_1 = require("express-validator");
const validator_errors_catcher_1 = require("../middlewares/validator-errors-catcher");
const blogs_repository_1 = require("../repo/blogs-repository");
const titleValidator = (0, express_validator_1.body)('title')
    .isString().withMessage('title must be a string')
    .trim()
    .isLength({
    min: 1,
    max: 30
}).withMessage('incorrect title');
const shortDescValidator = (0, express_validator_1.body)('shortDescription')
    .isString().withMessage('short description must be a string')
    .trim()
    .isLength({
    min: 1,
    max: 100
}).withMessage('incorrect shortDescription');
const contentValidator = (0, express_validator_1.body)('content')
    .isString().withMessage('content must be a string')
    .trim()
    .isLength({
    min: 1,
    max: 1000
}).withMessage('incorrect content');
const blogIdBodyValidator = (0, express_validator_1.body)('blogId')
    .custom((id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blogs_repository_1.blogsRepo.getBlogById(id);
    if (blog === false) {
        throw new Error('incorrect id of blog');
    }
}));
const blogIdParamValidator = (0, express_validator_1.param)('blogId')
    .custom((id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blogs_repository_1.blogsRepo.getBlogById(id);
    if (blog === false) {
        throw new Error('incorrect id of blog');
    }
}));
const postValidation = () => [titleValidator, shortDescValidator, contentValidator, blogIdBodyValidator, validator_errors_catcher_1.validatorErrorsCatcher];
exports.postValidation = postValidation;
const postInBlogsRouteValidation = () => [titleValidator, shortDescValidator, contentValidator, validator_errors_catcher_1.validatorErrorsCatcher];
exports.postInBlogsRouteValidation = postInBlogsRouteValidation;
const blogIdParamValidation = () => [blogIdParamValidator, validator_errors_catcher_1.validatorBlogIdErrorCatcher];
exports.blogIdParamValidation = blogIdParamValidation;
