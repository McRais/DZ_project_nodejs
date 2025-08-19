import {Request, Response, Router} from "express";
import {LoginSuccessType, MyInfoType, RequestWithBody} from "../models/types";
import {usersRepo} from "../repo/users-repository";
import {jwtService} from "../services/jwt-service";
import {AuthBearerMiddleware} from "../middlewares/auth-bearer-middleware";
import {EmailService} from "../services/email-service";

export const loginRoute = Router({});


loginRoute.post('/login', async (req: RequestWithBody<{loginOrEmail: string, password:string}>, res:Response): Promise<Response<LoginSuccessType|401>> => {
    const user = await usersRepo.loginUser(req.body.loginOrEmail, req.body.password);
    if(user != false){
        const token =await jwtService.createJwt(user)
        if(token){return res.status(200).send(token)}
    }
    return  res.sendStatus(401);
})

loginRoute.get('/me',AuthBearerMiddleware, async (req:Request, res:Response) => {
    const user = await usersRepo.getUser(req.userId!)
    if(user){
        const info = {
            email: user.email,
            login: user.login,
            userId: user.id
        }
        return res.status(201).send(info)
    }
    return res.sendStatus(401)
})

loginRoute.post('/registration', async (req:Request, res:Response) => {
const registration = await EmailService.RegisterUser("","","")
})

loginRoute.post('/registration-confirmation', async (req:Request, res:Response) => {

})

loginRoute.post('/registration-email-resending', async (req:Request, res:Response) => {

})