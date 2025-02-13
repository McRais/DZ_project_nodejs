import {SortDirection} from "mongodb";
import {OutputUserType} from "../models/types";
import {usersCollection} from "../database/DB";
import {usersMapper} from "../mappers/blogs-mapper";

export class usersRepo{
    static async getCount(): Promise<number> {
        return await usersCollection.countDocuments()
    }

    static async getAllUsers(searchNameTerm: string|undefined, pageNumber:number, pageSize:number, sortBy:string, sortDirection:SortDirection): Promise<OutputUserType[]> {
        const regex = searchNameTerm?{name:{$regex: searchNameTerm, $options: "i"}} : {};
        const users = await usersCollection
            .find(regex)
            .sort(sortBy, sortDirection)
            .limit(pageSize)
            .skip((pageNumber - 1) * pageSize)
            .toArray()

        return users.map(usersMapper)
    }
}