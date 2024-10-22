import {Request, Response, Router} from "express";
import {authMiddleware} from "../middlewares/auth-middleware";

import {blogsRepo} from "../repo/blogs-repository";
import {blogIdValidator, blogValidation} from "../validators/validator-blogs";
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
})//done

//delete blog by id, auth
blogsRoute.delete('/:id',authMiddleware, async (req:Request, res:Response) =>{
    const result = await blogsRepo.deleteBlog(req.params.id)
    if (!result){return res.sendStatus(404)} else {return res.sendStatus(204)}
})//done

//post blog, auth and validation
blogsRoute.post("/",authMiddleware, blogValidation, async (req:RequestWithBody<{name:string, description:string, websiteUrl:string}>, res:Response) =>{
    const blogId = await blogsRepo.createNewBlog(req.body.name, req.body.description, req.body.websiteUrl)
    const blog = await blogsRepo.getBlogById(blogId)
    return res.status(201).send(blog)
})//done

//put new values into existing blog, auth and validation
blogsRoute.put("/:id",authMiddleware, blogIdValidator, blogValidation, async (req:RequestWithBodyAndParams<{id:string},{name:string, description:string, websiteUrl:string}>,res:Response) =>{
    const blog = await blogsRepo.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl)
    return res.status(204).send(blog)
})//done

