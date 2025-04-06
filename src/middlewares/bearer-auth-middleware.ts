import {NextFunction, Request, Response} from "express";

export const BearerAuthMiddleware = (req: Request, res: Response, next:NextFunction) => {

    return next()
}