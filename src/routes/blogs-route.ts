import {Request, Response, Router} from "express";
import {authMiddleware} from "../middlewares/auth-middleware";
import {blogsRepo} from "../repo/blogs-repository";
import {OutputBlogType, RequestWithBody, RequestWithBodyAndParams} from "../models/types";
import {blogBodyValidation} from "../validators/validator-blogs";



export const blogsRoute = Router({})


blogsRoute.get('/', async (req: Request, res: Response): Promise<Response<OutputBlogType[]>> => {
    const blogs = await blogsRepo.getAllBlogs()
    return res.send(blogs)
})

blogsRoute.get('/:id', async (req: Request, res: Response) => {
const blog = await blogsRepo.getBlogById(req.params.id)
    if(blog === false){return res.sendStatus(404)} else{return res.send(blog)}
})

blogsRoute.delete('/:id',authMiddleware, async (req:Request, res:Response) =>{
    const result = await blogsRepo.deleteBlog(req.params.id)
    if (result === false){return res.sendStatus(404)} else {return res.sendStatus(204)}
})

blogsRoute.post("/",authMiddleware, blogBodyValidation(), async (req:RequestWithBody<{name:string, description:string, websiteUrl:string}>, res:Response) =>{
    const blogId = await blogsRepo.createNewBlog(req.body.name, req.body.description, req.body.websiteUrl)
    const blog = await blogsRepo.getBlogById(blogId)
    if (blog === false){return res.sendStatus(404)} else {return res.status(201).send(blog)}
})

blogsRoute.put("/:id",authMiddleware, blogBodyValidation(), async (req:RequestWithBodyAndParams<{id:string},{name:string, description:string, websiteUrl:string}>,res:Response) =>{
    const blog = await blogsRepo.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl)
    if (blog === false){return res.sendStatus(404)} else {return res.status(204).send(blog)}
})


