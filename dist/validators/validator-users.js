"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidator = void 0;
const express_validator_1 = require("express-validator");
const validator_errors_catcher_1 = require("../middlewares/validator-errors-catcher");
const loginValidator = (0, express_validator_1.body)('login')
    .isString().withMessage('login must be a string')
    .trim()
    .isLength({
    min: 3,
    max: 100
}).withMessage('incorrect login length')
    .matches(/^[a-zA-Z0-9_-]*$/, 'incorrect login pattern');
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
const userValidator = () => [loginValidator, emailValidator, passwordValidator, validator_errors_catcher_1.validatorErrorsCatcher];
exports.userValidator = userValidator;
