import {NextFunction, Request, Response} from "express";

export const AuthBearerMiddleware = (req: Request, res: Response, next:NextFunction) => {
    return next()
}