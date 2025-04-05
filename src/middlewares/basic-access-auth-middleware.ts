import {NextFunction, Request, Response} from "express";

export const BasicAccessAuthMiddleware = (req: Request, res: Response, next:NextFunction) => {
    if (req.headers['authorization'] !== "Basic YWRtaW46cXdlcnR5"){
        res.sendStatus(401)
        return
    }
    return next()
}

