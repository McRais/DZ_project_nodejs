import {NextFunction, Request, Response} from "express";

export const AuthWithBearerTokenMiddleware = (req: Request, res: Response, next:NextFunction) => {

    return next()
}