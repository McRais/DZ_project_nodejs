import {Response, Router} from "express";
import {OutputUserType, RequestWithQuery} from "../models/types";
import {SortDirection} from "mongodb";
import {usersRepo} from "../repo/users-repository";

export const usersRoute = Router({});

usersRoute.get('/', async (req: RequestWithQuery<{searchLoginTerm?: string,searchEmailTerm?: string, pageNumber?:number, pageSize?:number, sortBy?:string, sortDirection?:SortDirection}>, res: Response): Promise<Response<OutputUserType[]>> => {
    const [searchLoginTerm,searchEmailTerm, pageNumber,pageSize,sortBy,sortDirection] = [req.query.searchLoginTerm,req.query.searchEmailTerm, Number(req.query.pageNumber||1), Number(req.query.pageSize||10), String(req.query.sortBy||"createdAt"), req.query.sortDirection as SortDirection||"desc"];
    const users = await usersRepo.getAllUsers(searchLoginTerm, pageNumber, pageSize, sortBy, sortDirection)
    const usersRepoCount = await usersRepo.getCount()

    return res.send({
        "pagesCount": Math.ceil(usersRepoCount/pageSize),
        "page": pageNumber,
        "pageSize": pageSize,
        "totalCount": usersRepoCount,
        "items": users
    })
}) //not done

usersRoute.post('/', (req, res) => {})

usersRoute.delete('/:id', (req, res) => {})