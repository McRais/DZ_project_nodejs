import {NextFunction, Response, Router} from "express";
import {OutputUserType, RequestWithBody, RequestWithParams, RequestWithQuery} from "../models/types";
import {SortDirection} from "mongodb";
import {usersRepo} from "../repo/users-repository";
import {authMiddleware} from "../middlewares/auth-middleware";
import {userValidator} from "../validators/validator-users";
import {validatorErrorsCatcher} from "../middlewares/validator-errors-catcher";


export const usersRoute = Router({});

usersRoute.get('/',authMiddleware, async (req: RequestWithQuery<{searchLoginTerm?: string,searchEmailTerm?: string, pageNumber?:number, pageSize?:number, sortBy?:string, sortDirection?:SortDirection}>, res: Response): Promise<Response<OutputUserType[]>> => {
    const [searchLoginTerm,searchEmailTerm, pageNumber,pageSize,sortBy,sortDirection] = [req.query.searchLoginTerm,req.query.searchEmailTerm, Number(req.query.pageNumber||1), Number(req.query.pageSize||10), String(req.query.sortBy||"createdAt"), req.query.sortDirection as SortDirection||"desc"];
    const users = await usersRepo.getAllUsers(searchLoginTerm, searchEmailTerm, pageNumber, pageSize, sortBy, sortDirection)
    const usersRepoCount = await usersRepo.getCount(searchLoginTerm,searchEmailTerm)

    return res.send({
        "pagesCount": Math.ceil(usersRepoCount/pageSize),
        "page": pageNumber,
        "pageSize": pageSize,
        "totalCount": usersRepoCount,
        "items": users
    })
})

/*usersRoute.post('/', authMiddleware, userValidator, async (req: RequestWithBody<{ login: string, password: string, email: string }>, res: Response, next:NextFunction): Promise<Response<OutputUserType|400>> => {

    if(await usersRepo.checkUserLoginUniqueness(req.body.login)){
        throw new Error('login already exists');
    }
    if(await usersRepo.checkUserEmailUniqueness(req.body.email)){
        throw new Error('email already exists');
    }
    validatorErrorsCatcher(req,res,next)

    const [login, password, email, createdAt] = [req.body.login, req.body.password, req.body.email, new Date]
    const user = await usersRepo.createUser(login, password, email, createdAt.toISOString())
    return res.status(201).send(user)
})*/

usersRoute.delete('/:id',authMiddleware, async (req:RequestWithParams<{id:string}>, res: Response): Promise<Response<204|404>> => {

    const result = await usersRepo.deleteUser(req.params.id)
    return result? res.sendStatus(204):res.sendStatus(404)
})