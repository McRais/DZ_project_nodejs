import {Request, Response, Router} from "express";
import {authMiddleware} from "../middlewares/auth-middleware";
import {blogsRepo} from "../repo/blogs-repository";
import {
    OutputBlogType,
    RequestWithBody,
    RequestWithBodyAndParams,
    RequestWithParamAndQuery,
    RequestWithParams, RequestWithQuery
} from "../models/types";
import {blogBodyValidation, paramBlogIdValidation} from "../validators/validator-blogs";
import {postInBlogRouteValidation} from "../validators/validator-posts";
import {postsRepo} from "../repo/posts-repository";



export const blogsRoute = Router({})


blogsRoute.get('/', async (req: RequestWithQuery<{searchNameTerm?: string, pageNumber?:number, pageSize?:number, sortBy?:string, sortDirection?:string}>, res: Response): Promise<Response<OutputBlogType[]>> => {
    const [searchNameTerm, pageNumber,pageSize,sortBy,sortDirection] = [req.query.searchNameTerm||null, req.query.pageNumber||1, req.query.pageSize||10, req.query.sortBy||"createdAt", req.query.sortDirection||"desc"];
    const blogs = await blogsRepo.getAllBlogs(searchNameTerm, pageNumber, pageSize, sortBy, sortDirection)
    const blogsRepoCount = await blogsRepo.getCount()

    return res.send({
        "pagesCount": Math.ceil(blogsRepoCount/pageSize),
        "page": pageNumber,
        "pageSize": pageSize,
        "totalCount": blogsRepoCount,
        "items": blogs
    })
})

blogsRoute.get('/:id', async (req: RequestWithParams<{pageNumber:number, pageSize:number, sortBy:string, sortDirection:string, id:string}>, res: Response) => {
const blog = await blogsRepo.getBlogById(req.params.id)
    if(blog === false){return res.sendStatus(404)} else{return res.send(blog)}
})

blogsRoute.delete('/:id',authMiddleware, async (req:Request, res:Response) =>{
    const result = await blogsRepo.deleteBlog(req.params.id)
    if (result === false){return res.sendStatus(404)} else {return res.sendStatus(204)}
})

blogsRoute.post("/",authMiddleware, blogBodyValidation(), async (req:RequestWithBody<{name:string, description:string, websiteUrl:string}>, res:Response) =>{
    const createdAt = new Date
    const blogId = await blogsRepo.createNewBlog(req.body.name, req.body.description, req.body.websiteUrl, createdAt.toISOString())
    const blog = await blogsRepo.getBlogById(blogId)
    return res.status(201).send(blog)
})

blogsRoute.put("/:id",authMiddleware, blogBodyValidation(), async (req:RequestWithBodyAndParams<{id:string},{name:string, description:string, websiteUrl:string}>,res:Response) =>{
    const blog = await blogsRepo.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl)
    if(!blog){return res.sendStatus(404)}else{return res.sendStatus(204)}
})

blogsRoute.get('/:id/posts', /*paramBlogIdValidation(),*/ async (req: RequestWithParamAndQuery<{id:string}, {pageNumber?:number, pageSize?:number, sortBy?:string, sortDirection?:string}>, res: Response)=>{
    const blog = await blogsRepo.getBlogById(req.params.id)
    if(blog === false){return res.sendStatus(404)}

    const [pageNumber,pageSize,sortBy,sortDirection] = [req.query.pageNumber||1, req.query.pageSize||10, req.query.sortBy||"createdAt", req.query.sortDirection||"desc"]
    const posts = await blogsRepo.getPostsFromBlog(req.params.id, pageNumber, pageSize, sortBy, sortDirection)

    const postsRepoCount = await postsRepo.getCountFromBlog(req.params.id)
    return res.status(200).send({
        "pagesCount": Math.ceil(postsRepoCount/pageSize),
        "page": pageNumber,
        "pageSize": pageSize,
        "totalCount": postsRepoCount,
        "items": posts
    })
})

blogsRoute.post("/:id/posts", authMiddleware,paramBlogIdValidation(), postInBlogRouteValidation(), async (req:RequestWithBodyAndParams<{id:string},{title:string, shortDescription:string, content:string}>, res:Response) =>{
    const post = await postsRepo.createNewPost(req.body.title, req.body.shortDescription, req.body.content, req.params.id)
    return res.status(201).send(post)
})


