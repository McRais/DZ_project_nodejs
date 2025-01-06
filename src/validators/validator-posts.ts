import {body} from "express-validator";
import {validatorErrorsCatcher} from "../middlewares/validator-errors-catcher";

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


export const postValidation = () =>[titleValidator, shortDescValidator, contentValidator, validatorErrorsCatcher]
