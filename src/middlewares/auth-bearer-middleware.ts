import {NextFunction, Request, Response} from "express";
import {usersRepo} from "../repo/users-repository";
import {jwtService} from "../services/jwt-service";

export const AuthBearerMiddleware = (req: Request, res: Response, next:NextFunction) => {
   /* if (!req.headers.authorization) {return res.sendStatus(401)}

    const token = req.headers.authorization.split(' ')[1];
    const userId = await jwtService.getUserIdFromToken(token);

    if (userId){
        req.userId=await usersRepo.getUser(userId)
        return next()
    }

    return res.sendStatus(401)*/
}