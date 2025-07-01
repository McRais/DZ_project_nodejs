"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsValidator = void 0;
const express_validator_1 = require("express-validator");
const validator_errors_catcher_1 = require("../middlewares/validator-errors-catcher");
const contentValidation = (0, express_validator_1.body)('content')
    .isString().withMessage('content must be a string')
    .trim()
    .isLength({
    min: 20,
    max: 300
}).withMessage('incorrect title');
const commentsValidator = () => [contentValidation, validator_errors_catcher_1.validatorErrorsCatcher];
exports.commentsValidator = commentsValidator;
