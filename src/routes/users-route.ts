import {Response, Router} from "express";
import {OutputUserType, RequestWithBody, RequestWithParams, RequestWithQuery} from "../models/types";
import {SortDirection} from "mongodb";
import {usersRepo} from "../repo/users-repository";

export const usersRoute = Router({});

usersRoute.get('/', async (req: RequestWithQuery<{searchLoginTerm?: string,searchEmailTerm?: string, pageNumber?:number, pageSize?:number, sortBy?:string, sortDirection?:SortDirection}>, res: Response): Promise<Response<OutputUserType[]>> => {
    const [searchLoginTerm,searchEmailTerm, pageNumber,pageSize,sortBy,sortDirection] = [req.query.searchLoginTerm,req.query.searchEmailTerm, Number(req.query.pageNumber||1), Number(req.query.pageSize||10), String(req.query.sortBy||"createdAt"), req.query.sortDirection as SortDirection||"desc"];
    const users = await usersRepo.getAllUsers(searchLoginTerm, searchEmailTerm, pageNumber, pageSize, sortBy, sortDirection)
    const usersRepoCount = await usersRepo.getCount()

    return res.send({
        "pagesCount": Math.ceil(usersRepoCount/pageSize),
        "page": pageNumber,
        "pageSize": pageSize,
        "totalCount": usersRepoCount,
        "items": users
    })
})

usersRoute.post('/', async (req: RequestWithBody<{login:string, password:string, email:string}>, res) => {

    if(await usersRepo.checkUserLoginUniqueness(req.body.login)){
        return res.send(400).json({
            "errorsMessages": [
                {
                    "message": "Login is not unique",
                    "field": "login"
                }
            ]
        })
    }
    if(await usersRepo.checkUserEmailUniqueness(req.body.email)){
        return res.send(400).json({
            "errorsMessages": [
                {
                    "message": "Email is not unique",
                    "field": "email"
                }
            ]
        })
    }
    
    const [login, password, email, createdAt] = [req.body.login, req.body.password, req.body.email, new Date]
    const user = await usersRepo.createUser(login, password, email, createdAt.toISOString())
    return res.status(201).send(user)
})

usersRoute.delete('/:id', async (req:RequestWithParams<{id:string}>, res) => {
    const result = await usersRepo.deleteUser(req.params.id)    //redo later
    return res.status(200).send({result})
})