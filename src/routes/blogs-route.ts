import {Request, Response, Router} from "express";
import {AuthBasicMiddleware} from "../middlewares/auth-basic-middleware";
import {blogsRepo} from "../repo/blogs-repository";
import {
    OutputBlogsType,
    RequestWithBody,
    RequestWithBodyAndParams,
    RequestWithParamsAndQuery,
    RequestWithParams, RequestWithQuery
} from "../models/types";
import {blogCreateUpdateBodyValidation, BlogIdInParamValidation} from "../validators/validator-blogs";
import {postInBlogRouteValidation} from "../validators/validator-posts";
import {postsRepo} from "../repo/posts-repository";
import {SortDirection} from "mongodb";



export const blogsRoute = Router({})

//get all blogs with pagination
blogsRoute.get('/', async (req: RequestWithQuery<{searchNameTerm?: string, pageNumber?:number, pageSize?:number, sortBy?:string, sortDirection?:SortDirection}>, res: Response): Promise<Response<OutputBlogsType[]>> => {
    const [searchNameTerm, pageNumber,pageSize,sortBy,sortDirection] = [req.query.searchNameTerm, Number(req.query.pageNumber||1), Number(req.query.pageSize||10), String(req.query.sortBy||"createdAt"), req.query.sortDirection as SortDirection||"desc"];
    const blogs = await blogsRepo.getAllBlogs(searchNameTerm, pageNumber, pageSize, sortBy, sortDirection)
    const blogsRepoCount = await blogsRepo.getCountByName(searchNameTerm)

    return res.send({
        "pagesCount": Math.ceil(blogsRepoCount/pageSize),
        "page": pageNumber,
        "pageSize": pageSize,
        "totalCount": blogsRepoCount,
        "items": blogs
    })
})

//get specific blog by id
blogsRoute.get('/:id', async (req: RequestWithParams<{pageNumber:number, pageSize:number, sortBy:string, sortDirection:string, id:string}>, res: Response) => {
const blog = await blogsRepo.getBlogById(req.params.id)
    if(blog === false){return res.sendStatus(404)} else{return res.send(blog)}
})

//delete blog
blogsRoute.delete('/:id',AuthBasicMiddleware, async (req:Request, res:Response) =>{
    const result = await blogsRepo.deleteBlog(req.params.id)
    if (result === false){return res.sendStatus(404)} else {return res.sendStatus(204)}
})

//post blog
blogsRoute.post("/",AuthBasicMiddleware, blogCreateUpdateBodyValidation(), async (req:RequestWithBody<{name:string, description:string, websiteUrl:string}>, res:Response) =>{
    const createdAt = new Date
    const blogId = await blogsRepo.createNewBlog(req.body.name, req.body.description, req.body.websiteUrl, createdAt.toISOString())
    const blog = await blogsRepo.getBlogById(blogId)
    return res.status(201).send(blog)
})

//update blog
blogsRoute.put("/:id",AuthBasicMiddleware, blogCreateUpdateBodyValidation(), async (req:RequestWithBodyAndParams<{id:string},{name:string, description:string, websiteUrl:string}>, res:Response) =>{
    const blog = await blogsRepo.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl)
    if(!blog){return res.sendStatus(404)}else{return res.sendStatus(204)}
})

//get posts from blog, need rework to check id in route, not in validator
blogsRoute.get('/:id/posts', BlogIdInParamValidation(), async (req: RequestWithParamsAndQuery<{id:string}, {pageNumber?:number, pageSize?:number, sortBy?:string, sortDirection?:SortDirection}>, res: Response)=>{

    const [pageNumber,pageSize,sortBy,sortDirection] = [Number(req.query.pageNumber||1), Number(req.query.pageSize||10), String(req.query.sortBy||"createdAt"), req.query.sortDirection as SortDirection||"desc"]
    const posts = await blogsRepo.getPostsFromBlog(req.params.id, pageNumber, pageSize, sortBy, sortDirection)

    const postsRepoCount = await postsRepo.getCountOfPostsFromBlog(req.params.id)
    return res.status(200).send({
        "pagesCount": Math.ceil(postsRepoCount/pageSize),
        "page": pageNumber,
        "pageSize": pageSize,
        "totalCount": postsRepoCount,
        "items": posts
    })
})

//create new post in blog, need rework to check id in route, not in validator
blogsRoute.post("/:id/posts", AuthBasicMiddleware,BlogIdInParamValidation(), postInBlogRouteValidation(), async (req:RequestWithBodyAndParams<{id:string},{title:string, shortDescription:string, content:string}>, res:Response) =>{
    const post = await postsRepo.createNewPost(req.body.title, req.body.shortDescription, req.body.content, req.params.id)
    return res.status(201).send(post)
})


