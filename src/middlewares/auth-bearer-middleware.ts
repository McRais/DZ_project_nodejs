import {NextFunction, Request, Response} from "express";
import {usersRepo} from "../repo/users-repository";
import {jwtService} from "../services/jwt-service";

export const AuthBearerMiddleware = async (req: Request, res: Response, next:NextFunction) => {
    if (!req.headers.authorization) {return res.sendStatus(401)}

    const token = req.headers.authorization.split(' ')[1];
    const userIdFromToken =await jwtService.getUserIdFromToken(token);

    if(!userIdFromToken){return res.sendStatus(401)}

    if (userIdFromToken){
        const user = await usersRepo.getUser(userIdFromToken)
        if(user != false){
            req.userId = user.id;
            return next()
        }
    }
}