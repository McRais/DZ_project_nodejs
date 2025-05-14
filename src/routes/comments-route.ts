import {Router, Response} from "express";
import {RequestWithParams} from "../models/types";
import {commentsRepo} from "../repo/comments-repository";
import {BearerAuthMiddleware} from "../middlewares/bearer-auth-middleware";

export const commentsRoute = Router({})

//get comment by id
commentsRoute.get('/:id', async (req: RequestWithParams<{id:string}>, res:Response) : Promise<any> => {
    const comment = await commentsRepo.getCommentById(req.params.id);
    return res.status(200).send(comment);
})

//update comment by id
commentsRoute.put('', BearerAuthMiddleware, (req, res) => {})

//delete comment by id
commentsRoute.delete('', BearerAuthMiddleware, (req, res) => {})