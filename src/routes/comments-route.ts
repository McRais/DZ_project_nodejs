import {Router, Response} from "express";
import {RequestWithParams, RequestWithParamsAndBody} from "../models/types";
import {commentsRepo} from "../repo/comments-repository";
import {AuthBearerMiddleware} from "../middlewares/auth-bearer-middleware";
import {commentsValidator} from "../validators/validator-comments";


export const commentsRoute = Router({})

//get comment by id
commentsRoute.get('/:id', async (req: RequestWithParams<{id:string}>, res:Response) : Promise<any> => {
    const comment = await commentsRepo.getCommentById(req.params.id);
    if(!comment){return res.sendStatus(404)}
    return res.status(200).send(comment);
})

//update comment by id
commentsRoute.put('/:commentId', AuthBearerMiddleware, commentsValidator(), async (req:RequestWithParamsAndBody<{commentId:string}, {content:string}>, res:Response) => {
    const commentStatus =await commentsRepo.updateComment(req.userId!, req.body.content);
    return res.sendStatus(commentStatus) //need to rewrite, repo knows http codes
})

//delete comment by id
commentsRoute.delete('/:commentId', AuthBearerMiddleware, async (req:RequestWithParams<{id:string}>, res:Response) => {
    const result = await commentsRepo.deleteComment(req.userId!, req.params.id)
    return res.sendStatus(result)

})