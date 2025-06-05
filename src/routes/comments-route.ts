import {Router, Response} from "express";
import {RequestWithParams} from "../models/types";
import {commentsRepo} from "../repo/comments-repository";
import {AuthBearerMiddleware} from "../middlewares/auth-bearer-middleware";
import {usersRepo} from "../repo/users-repository";

export const commentsRoute = Router({})

//get comment by id
commentsRoute.get('/:id', async (req: RequestWithParams<{id:string}>, res:Response) : Promise<any> => {
    const comment = await commentsRepo.getCommentById(req.params.id);
    return res.status(200).send(comment);
})

//update comment by id
commentsRoute.put('', AuthBearerMiddleware, async (req, res) => {
    const comment =await commentsRepo.updateComment(req.params.id, req.body.content);
    if(!comment){return res.sendStatus(404)} else {return res.sendStatus(204)}
})

//delete comment by id
/*commentsRoute.delete('', AuthBearerMiddleware, async (req:RequestWithParams<{id:string}>, res:Response):Promise<204|404|403> => {
    const result = await usersRepo.deleteUser(req.params.id)
    return

})*/