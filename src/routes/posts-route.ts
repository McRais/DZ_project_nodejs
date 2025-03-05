import {Request, Response, Router} from "express";
import {authMiddleware} from "../middlewares/auth-middleware";
import {postsRepo} from "../repo/posts-repository";
import {
    OutputPostType,
    RequestWithBody,
    RequestWithBodyAndParams, RequestWithParamAndQuery,
    RequestWithQuery
} from "../models/types";
import {postValidation} from "../validators/validator-posts";
import {SortDirection} from "mongodb";



export const postsRoute = Router({})


//get all posts
postsRoute.get('/', async (req:RequestWithQuery<{searchNameTerm?: string, pageNumber?:number, pageSize?:number, sortBy?:string, sortDirection?:SortDirection}>,res:Response): Promise<Response<OutputPostType[]>> =>{
    const [searchNameTerm, pageNumber,pageSize,sortBy,sortDirection] = [req.query.searchNameTerm, Number(req.query.pageNumber||1), Number(req.query.pageSize||10), String(req.query.sortBy||"createdAt"), req.query.sortDirection as SortDirection||"desc"];
    const posts = await postsRepo.getAllPosts(searchNameTerm, pageNumber, pageSize, sortBy, sortDirection)
    const postsRepoCount = await postsRepo.getCount(searchNameTerm)

    return res.send({
        "pagesCount": Math.ceil(postsRepoCount/pageSize),
        "page": pageNumber,
        "pageSize": pageSize,
        "totalCount": postsRepoCount,
        "items": posts
    })
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

postsRoute.get("/:postId/comments", async (req:RequestWithParamAndQuery<{postId:string}, {pageNumber?:number, pageSize?:number, sortBy?:string, sortDirection?:SortDirection}>, res:Response)=>{

})

postsRoute.post("/:postId/comments", async (req:RequestWithBodyAndParams<{postId:string}, {content:string}>) =>{

})