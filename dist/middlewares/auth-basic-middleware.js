"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthBasicMiddleware = void 0;
const AuthBasicMiddleware = (req, res, next) => {
    if (req.headers['authorization'] !== "Basic YWRtaW46cXdlcnR5") {
        res.sendStatus(401);
        return;
    }
    return next();
};
exports.AuthBasicMiddleware = AuthBasicMiddleware;
