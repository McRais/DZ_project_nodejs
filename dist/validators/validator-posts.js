"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidation = exports.blogIdValidator = void 0;
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
exports.blogIdValidator = (0, express_validator_1.body)('blogId').isString().trim()
    .custom((blogId) => {
    return blogs_repository_1.blogsRepo.getBlogById(blogId);
}).withMessage("incorrect blogId");
const postValidation = () => [titleValidator, shortDescValidator, contentValidator, exports.blogIdValidator, validator_errors_catcher_1.validatorErrorsCatcher];
exports.postValidation = postValidation;
