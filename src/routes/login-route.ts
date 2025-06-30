import {Response, Router} from "express";
import {MyInfoType, RequestWithBody} from "../models/types";
import {usersRepo} from "../repo/users-repository";

export const loginRoute = Router({});


//login user, needs validator for input values
loginRoute.post('/login', async (req: RequestWithBody<{loginOrEmail: string, password:string}>, res:Response): Promise<Response<204|401|400>> => {
    const login = await usersRepo.loginUser(req.body.loginOrEmail, req.body.password);
    if(!login){return res.sendStatus(401)}
    return res.sendStatus(204)
})

//loginRoute.get('/me', async (req: RequestWithBody<{me: string}>, res:Response): Promise<MyInfoType|401> => {})