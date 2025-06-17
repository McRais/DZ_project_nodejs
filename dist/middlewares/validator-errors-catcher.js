"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorErrorsCatcher = void 0;
const express_validator_1 = require("express-validator");
const validatorErrorsCatcher = (req, res, next) => {
    const validationErrors = (0, express_validator_1.validationResult)(req).formatWith((error) => ({
        message: error.msg,
        field: error.type === "field" ? error.path : "field is not found"
    }));
    if (!validationErrors.isEmpty()) {
        const errorMessage = validationErrors.array({ onlyFirstError: true });
        return res.status(400).json({ errorsMessages: errorMessage });
    }
    return next();
};
exports.validatorErrorsCatcher = validatorErrorsCatcher;
