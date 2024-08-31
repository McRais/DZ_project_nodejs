import {Request, Response, Router} from "express";
import {authMiddleware} from "../middlewares/auth-middleware";
import {blogsDB, RequestWithBody, RequestWithBodyAndParams} from "../database/DB";
import {RequestWithParams} from "../database/DB";
import {blogsRepo} from "../repo/blogs-repository";
import {blogValidation} from "../validators/validator-blogs";


export const blogsRoute = Router({})

//get all blogs
blogsRoute.get('/', (req,res) =>{
    const blog = blogsRepo.getAllBlogs()
    return res.send(blog)
})


//get blog by id
blogsRoute.get('/:id',(req: Request, res: Response) => {
const blog = blogsRepo.getBlogById(req.params.id)
    if(blog === false){return res.sendStatus(404)} else{return res.send(blog)}
})

//delete blog by id, auth
blogsRoute.delete('/:id',authMiddleware ,(req:Request, res:Response) =>{
    const blog = blogsRepo.deleteBlog(req.params.id)
    if (!blog){return res.sendStatus(404)} else {return res.sendStatus(204)}
})

//post blog, auth and validation
blogsRoute.post("/",authMiddleware, blogValidation(), (req:RequestWithBody<{name:string, description:string, websiteUrl:string}>, res:Response) =>{
    const blog = blogsRepo.createNewBlog(req.body.name, req.body.description, req.body.websiteUrl)
    if (!blog){return res.sendStatus(404)} else {return res.status(201).send(blog)}
})

//put new values into existing blog, auth and validation
blogsRoute.put("/:id",authMiddleware, blogValidation(), (req:RequestWithBodyAndParams<{id:string},{name:string, description:string, websiteUrl:string}>,res:Response) =>{
    const blog = blogsRepo.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl)
    if (!blog){return res.sendStatus(404)} else {return res.status(204).send(blog)}
})

