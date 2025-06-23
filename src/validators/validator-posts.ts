import {body, param} from "express-validator";
import {validatorBlogIdErrorCatcher, validatorErrorsCatcher} from "../middlewares/validator-errors-catcher";
import {blogsRepo} from "../repo/blogs-repository";

const titleValidator = body('title')
    .isString().withMessage('title must be a string')
    .trim()
    .isLength({
        min:1,
        max: 30
    }).withMessage('incorrect title')

const shortDescValidator = body('shortDescription')
    .isString().withMessage('short description must be a string')
    .trim()
    .isLength({
        min:1,
        max: 100
    }).withMessage('incorrect shortDescription')

const contentValidator = body('content')
    .isString().withMessage('content must be a string')
    .trim()
    .isLength({
        min:1,
        max: 1000
    }).withMessage('incorrect content')

const blogIdBodyValidator = body('blogId')
    .custom(async (id) =>{
        const blog = await blogsRepo.getBlogById(id)
        if (blog === false){
            throw new Error('incorrect id of blog')}
    })

const blogIdParamValidator = param('blogId')
    .custom(async (id) =>{
        const blog = await blogsRepo.getBlogById(id)
        if (blog === false){
            throw new Error('incorrect id of blog')}
    })

export const postValidation = () =>[titleValidator, shortDescValidator, contentValidator, blogIdBodyValidator, validatorErrorsCatcher]
export const postInBlogsRouteValidation = () =>[blogIdParamValidator,validatorBlogIdErrorCatcher, shortDescValidator, contentValidator, validatorErrorsCatcher]
