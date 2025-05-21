import {Response, Router} from "express";
import {RequestWithBody} from "../models/types";
import {usersRepo} from "../repo/users-repository";

export const loginRoute = Router({});

//login user, needs update and validator of input values
loginRoute.post('/', async (req: RequestWithBody<{loginOrEmail: string, password:string}>, res:Response): Promise<Response<200|401|400>> => {
    const login = await usersRepo.loginUser(req.body.loginOrEmail, req.body.password);
    if (login) {
        return res.status(200).send(login);
    }
    return res.sendStatus(401)
})