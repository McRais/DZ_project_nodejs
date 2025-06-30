import {Response, Router} from "express";
import {LoginSuccessType, MyInfoType, RequestWithBody} from "../models/types";
import {usersRepo} from "../repo/users-repository";
import {jwtService} from "../services/jwt-service";

export const loginRoute = Router({});


loginRoute.post('/login', async (req: RequestWithBody<{loginOrEmail: string, password:string}>, res:Response): Promise<Response<LoginSuccessType|401>> => {
    const user = await usersRepo.loginUser(req.body.loginOrEmail, req.body.password);
    if(user != false){
        const token =await jwtService.createJwt(user)
        if(token){return res.status(204).send(token)}
    }
    return  res.sendStatus(401);
})

//loginRoute.get('/me', async (req: RequestWithBody<{me: string}>, res:Response): Promise<MyInfoType|401> => {})