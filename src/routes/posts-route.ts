import {Request, Response, Router} from "express";
import {authMiddleware} from "../middlewares/auth-middleware";
import {postsDB} from "../database/DB";
import {postsRepo} from "../repo/posts-repository";
import {postValidation} from "../validators/validator-posts";
import {RequestWithBody, RequestWithBodyAndParams} from "../models/types";

export const postsRoute = Router({})


//get all posts
postsRoute.get('/', (req,res) =>{
    const post = postsRepo.getAllPosts()
    return res.send(post)
})


//get post by id
postsRoute.get('/:id',(req: Request, res: Response) => {
    const post = postsRepo.getPostById(req.params.id)
    if(post === false){return res.sendStatus(404)} else{return res.send(post)}
})

//delete post by id, auth
postsRoute.delete('/:id',authMiddleware ,(req:Request, res:Response) =>{
    const post = postsRepo.deletePost(req.params.id)
    if (!post){return res.sendStatus(404)} else {return res.sendStatus(204)}
})

//post a post, auth and validation
postsRoute.post("/",authMiddleware, postValidation(), (req:RequestWithBody<{title:string, shortDescription:string, content:string, blogId: string}>, res:Response) =>{
    const post = postsRepo.createNewPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
    return res.status(201).send(post)
})

//put new values into existing blog, auth and validation
postsRoute.put("/:id",authMiddleware, postValidation(), (req:RequestWithBodyAndParams<{id:string},{title:string, shortDescription:string, content:string, blogId: string}>,res:Response) =>{
    const postCheck = postsRepo.getPostById(req.params.id)
    if(postCheck === false){return res.sendStatus(404)}
    const post = postsRepo.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
    return res.status(204).send(post)
})
