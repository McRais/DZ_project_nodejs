import {Request, Response, Router} from "express";
import {authMiddleware} from "../middlewares/auth-middleware";
import {postsRepo} from "../repo/posts-repository";
import {OutputPostType, RequestWithBody, RequestWithBodyAndParams, RequestWithParams} from "../models/types";
import {postValidation} from "../validators/validator-posts";


export const postsRoute = Router({})


//get all posts
postsRoute.get('/', async (req:RequestWithParams<{pageNumber:number, pageSize:number, sortBy:string|null, sortDirection:string|null}>,res:Response): Promise<Response<OutputPostType[]>> =>{
    const post = await postsRepo.getAllPosts(req.params.pageNumber, req.params.pageSize, req.params.sortBy, req.params.sortDirection)
    return res.send(post)
})


//get post by id
postsRoute.get('/:id', async (req: Request, res: Response): Promise<Response<OutputPostType | 404>> => {
    const post = await postsRepo.getPostById(req.params.id)
    if(post === false){return res.sendStatus(404)} else{return res.send(post)}
})

//delete post by id, auth
postsRoute.delete('/:id', authMiddleware, async (req:Request, res:Response): Promise<Response<404|204>> =>{
    const post =await postsRepo.deletePost(req.params.id)
    if (post===false){return res.sendStatus(404)} else {return res.sendStatus(204)} //done
})

//post a post, auth and validation
postsRoute.post("/", authMiddleware, postValidation(), async (req:RequestWithBody<{title:string, shortDescription:string, content:string, blogId: string}>, res:Response) =>{
    const post = await postsRepo.createNewPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
    return res.status(201).send(post)
})

//put new values into existing blog, auth and validation
postsRoute.put("/:id", authMiddleware, postValidation(), async (req:RequestWithBodyAndParams<{id:string},{title:string, shortDescription:string, content:string, blogId: string}>,res:Response) =>{
    const post = await postsRepo.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
    if(!post){return res.sendStatus(404)} else {return res.sendStatus(204)}
})
