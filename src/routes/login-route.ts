import {Response, Router} from "express";
import {MyInfoType, RequestWithBody} from "../models/types";
import {usersRepo} from "../repo/users-repository";

export const loginRoute = Router({});

//login user, needs update and validator for input values
loginRoute.post('/login', async (req: RequestWithBody<{loginOrEmail: string, password:string}>, res:Response): Promise<Response<200|401|400>> => {
    const jwtOfUser = await usersRepo.loginUser(req.body.loginOrEmail, req.body.password);
    if (jwtOfUser) {
        return res.status(200).send(jwtOfUser);
    }
    return res.sendStatus(401)
})

//loginRoute.get('/me', async (req: RequestWithBody<{me: string}>, res:Response): Promise<MyInfoType|401> => {})