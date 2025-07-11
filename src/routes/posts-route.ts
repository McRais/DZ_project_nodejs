import {Request, Response, Router} from "express";
import {AuthBasicMiddleware} from "../middlewares/auth-basic-middleware";
import {postsRepo} from "../repo/posts-repository";
import {
    OutputPostsType,
    RequestWithBody,
    RequestWithParamsAndBody, RequestWithParamsAndQuery,
    RequestWithQuery
} from "../models/types";
import {postValidation} from "../validators/validator-posts";
import {SortDirection} from "mongodb";
import {commentsRepo} from "../repo/comments-repository";
import {AuthBearerMiddleware} from "../middlewares/auth-bearer-middleware";
import {commentsValidator} from "../validators/validator-comments";

export const postsRoute = Router({})

//get all posts
postsRoute.get('/', async (req:RequestWithQuery<{searchNameTerm?: string, pageNumber?:number, pageSize?:number, sortBy?:string, sortDirection?:SortDirection}>,res:Response): Promise<Response<OutputPostsType[]>> =>{
    const [searchNameTerm, pageNumber,pageSize,sortBy,sortDirection] = [req.query.searchNameTerm, Number(req.query.pageNumber||1), Number(req.query.pageSize||10), String(req.query.sortBy||"createdAt"), req.query.sortDirection as SortDirection||"desc"];
    const posts = await postsRepo.getAllPosts(searchNameTerm, pageNumber, pageSize, sortBy, sortDirection)
    const postsRepoCount = await postsRepo.getPostsCountByName(searchNameTerm)

    return res.send({
        "pagesCount": Math.ceil(postsRepoCount/pageSize),
        "page": pageNumber,
        "pageSize": pageSize,
        "totalCount": postsRepoCount,
        "items": posts
    })
})

//get post by id
postsRoute.get('/:id', async (req: Request, res: Response): Promise<Response<OutputPostsType | 404>> => {
    const post = await postsRepo.getPostById(req.params.id)
    if(post === false){return res.sendStatus(404)} else{return res.send(post)}
})

//delete post by id, auth
postsRoute.delete('/:id', AuthBasicMiddleware, async (req:Request, res:Response): Promise<Response<404|204>> =>{
    const post =await postsRepo.deletePost(req.params.id)
    if (post===false){return res.sendStatus(404)} else {return res.sendStatus(204)} //done
})

//post a post, auth and validation
postsRoute.post("/", AuthBasicMiddleware, postValidation(), async (req:RequestWithBody<{title:string, shortDescription:string, content:string, blogId: string}>, res:Response) =>{
    const post = await postsRepo.createNewPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
    return res.status(201).send(post)
})

//update existing blog, auth and validation
postsRoute.put("/:id", AuthBasicMiddleware, postValidation(), async (req:RequestWithParamsAndBody<{id:string},{title:string, shortDescription:string, content:string, blogId: string}>, res:Response) =>{
    const post = await postsRepo.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
    if(!post){return res.sendStatus(404)} else {return res.sendStatus(204)}
})



//get all comments from the post
postsRoute.get("/:postId/comments", async (req:RequestWithParamsAndQuery<{postId:string}, {pageNumber?:number, pageSize?:number, sortBy?:string, sortDirection?:SortDirection}>, res:Response)=>{
    const post = await postsRepo.getPostById(req.params.postId)
    if(post === false){res.sendStatus(404)}
    const [pageNumber,pageSize,sortBy,sortDirection] = [Number(req.query.pageNumber||1), Number(req.query.pageSize||10), String(req.query.sortBy||"createdAt"), req.query.sortDirection as SortDirection||"desc"]
    const comments = await commentsRepo.getCommentsFromPost(req.params.postId, pageNumber, pageSize, sortBy, sortDirection)
    const commentsFromPostCount = await commentsRepo.getCommentsFromPostCount(req.params.postId)
    return res.send({
        "pagesCount": Math.ceil(commentsFromPostCount/pageSize),
        "page": pageNumber,
        "pageSize": pageSize,
        "totalCount": commentsFromPostCount,
        "items": comments
    })

})

//post a comment
postsRoute.post("/:postId/comments", AuthBearerMiddleware, commentsValidator(), async (req:RequestWithParamsAndBody<{postId:string},{content:string}>, res:Response) =>{
    const post = await postsRepo.getPostById(req.params.postId)
    if(post === false){return res.sendStatus(404)}
    const comment = await commentsRepo.createComment(req.userId!, req.params.postId, req.body.content)
    return res.status(201).send(comment)
})