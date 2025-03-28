"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicAccessAuthMiddleware = void 0;
const BasicAccessAuthMiddleware = (req, res, next) => {
    if (req.headers['authorization'] !== "Basic YWRtaW46cXdlcnR5") {
        res.sendStatus(401);
        return;
    }
    return next();
};
exports.BasicAccessAuthMiddleware = BasicAccessAuthMiddleware;
