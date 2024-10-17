"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidation = void 0;
const express_validator_1 = require("express-validator");
const nameValidator = (0, express_validator_1.body)('name')
    .isString().withMessage('name must be a string')
    .trim()
    .isLength({
    min: 1,
    max: 15
}).withMessage('incorrect name');
/*const descriptionValidator = body('description')
    .isString().withMessage('description must be a string')
    .trim()
    .isLength({
    min:0,
    max: 500
    }).withMessage('incorrect description')

const websiteValidator = body('websiteUrl')
    .isString().withMessage('website URL must be a string')
    .trim()
    .isLength({
    min:0,
    max: 100
    }).matches('^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$').withMessage('incorrect website URL')


export const blogIdValidator = body('id')
    .custom( (id:string) =>{
    const blog = blogsRepo.getBlogById(id)
    if (blog === false){
        throw Error('incorrect id')}
})*/
const blogValidation = () => [nameValidator];
exports.blogValidation = blogValidation;
