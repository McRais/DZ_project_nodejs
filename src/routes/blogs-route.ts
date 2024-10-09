import {Request, Response, Router} from "express";
import {authMiddleware} from "../middlewares/auth-middleware";
import {blogsDB} from "../database/DB";
import {blogsRepo} from "../repo/blogs-repository";
import {blogValidation} from "../validators/validator-blogs";
import {RequestWithBody, RequestWithBodyAndParams, RequestWithParams} from "../models/types";


export const blogsRoute = Router({})

//get all blogs
blogsRoute.get('/', async (req,res) =>{
    const blog = await blogsRepo.getAllBlogs()
    return res.send(blog)
}) //done


//get blog by id
blogsRoute.get('/:id', async (req: Request, res: Response) => {
const blog = await blogsRepo.getBlogById(req.params.id)
    if(blog === false){return res.sendStatus(404)} else{return res.send(blog)}
})

//delete blog by id, auth
blogsRoute.delete('/:id',authMiddleware ,(req:Request, res:Response) =>{
    const blog = blogsRepo.deleteBlog(req.params.id)
    if (!blog){return res.sendStatus(404)} else {return res.sendStatus(204)}
})

//post blog, auth and validation
blogsRoute.post("/",authMiddleware, blogValidation(), (req:RequestWithBody<{name:string, description:string, websiteUrl:string}>, res:Response) =>{
    const blogId = blogsRepo.createNewBlog(req.body.name, req.body.description, req.body.websiteUrl)
    const blog = blogsRepo.getBlogById(blogId)
    return res.status(201).send(blog)
})

//put new values into existing blog, auth and validation
blogsRoute.put("/:id",authMiddleware, blogValidation(), (req:RequestWithBodyAndParams<{id:string},{name:string, description:string, websiteUrl:string}>,res:Response) =>{
    const blog = blogsRepo.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl)
    if (!blog){return res.sendStatus(404)} else {return res.status(204).send(blog)}
})

