"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthByBasicCredentialsMiddleware = void 0;
const AuthByBasicCredentialsMiddleware = (req, res, next) => {
    if (req.headers['authorization'] !== "Basic YWRtaW46cXdlcnR5") {
        res.sendStatus(401);
        return;
    }
    return next();
};
exports.AuthByBasicCredentialsMiddleware = AuthByBasicCredentialsMiddleware;
