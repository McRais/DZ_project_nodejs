import {validatorErrorsCatcher} from "../middlewares/validator-errors-catcher";
import {body} from "express-validator";

const nameValidator = body('name')
    .isString().withMessage('name must be a string')
    .trim()
    .isLength({
    min:1,
    max: 15
    }).withMessage('incorrect name')

const descriptionValidator = body('description')
    .isString().withMessage('description must be a string')
    .trim()
    .isLength({
    min:1,
    max: 500
    }).withMessage('incorrect description')

const websiteValidator = body('websiteUrl')
    .isString().withMessage('website URL must be a string')
    .trim()
    .isLength({
    min:0,
    max: 100
    }).matches('^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$').withMessage('incorrect website URL')

export const blogCreateUpdateBodyValidation = () =>[nameValidator, descriptionValidator, websiteValidator,validatorErrorsCatcher]



