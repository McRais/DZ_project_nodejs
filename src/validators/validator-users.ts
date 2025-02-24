import {body} from "express-validator";
import {validatorErrorsCatcher} from "../middlewares/validator-errors-catcher";
import {usersRepo} from "../repo/users-repository";

const loginValidator = body('login')
    .isString().withMessage('login must be a string')
    .trim()
    .isLength({
        min:3,
        max: 100
    }).withMessage('incorrect login length')
    .matches('^[a-zA-Z0-9_-]*$').withMessage('incorrect login pattern')

const emailValidator = body('email')
    .isString().withMessage('website URL must be a string')
    .trim()
    .matches('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$').withMessage('incorrect email address')

const passwordValidator = body('password')
    .isString().withMessage('password must be a string')
    .trim()
    .isLength({
        min:6,
        max: 20
    }).withMessage('incorrect password length')

const loginUniquenessValidator = body('login').custom(async(login) => {
    const loginUniqueness =  await usersRepo.checkUserLoginUniqueness(login)
    if (!loginUniqueness) {
        throw new Error('login is not unique')
    }
})

const emailUniquenessValidator = body('email').custom(async(email) => {
    const emailUniqueness =  await usersRepo.checkUserEmailUniqueness(email)
    if (!emailUniqueness) {
        throw new Error('email is not unique')
    }
})

export const userValidator = () => [loginValidator, emailValidator, passwordValidator,loginUniquenessValidator,emailUniquenessValidator, validatorErrorsCatcher]
