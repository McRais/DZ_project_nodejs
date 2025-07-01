import {body} from "express-validator";
import {validatorErrorsCatcher} from "../middlewares/validator-errors-catcher";

const contentValidation = body('content')
.isString().withMessage('content must be a string')
    .trim()
    .isLength({
        min:20,
        max: 300
    }).withMessage('incorrect title')

export const commentsValidator = () => [contentValidation,validatorErrorsCatcher]