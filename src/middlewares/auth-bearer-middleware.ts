import {NextFunction, Request, Response} from "express";
import {usersRepo} from "../repo/users-repository";
import {jwtService} from "../services/jwt-service";

export const AuthBearerMiddleware = async (req: Request, res: Response, next:NextFunction) => {
    if (!req.headers.authorization) {return res.sendStatus(401)}

    const token = req.headers.authorization.split(' ')[1];
    const userDecodedToken = await jwtService.getUserIdFromToken(token); //should return just JwtPayload, returns a string

    if (userDecodedToken && typeof userDecodedToken !== "string"){
        const user = await usersRepo.getUser(userDecodedToken.id)
        if(user){
            req.user.userId = userDecodedToken;  //100% a mistake somewhere here
            next()
        }
    }

    return res.sendStatus(401)
}