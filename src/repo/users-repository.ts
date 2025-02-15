import {ObjectId, SortDirection} from "mongodb";
import {OutputUserType} from "../models/types";
import {usersCollection} from "../database/DB";
import {usersMapper} from "../mappers/blogs-mapper";

export class usersRepo{
    static async getCount(): Promise<number> {
        return await usersCollection.countDocuments()
    }

    static async getUser(userID:string): Promise<OutputUserType|false> {
        const user = await usersCollection.findOne({userID:userID})
        if (!user) {return false}  //it will never return it, this function is only for usersRepo.createUser
        const userArr = Array.of(user) //eugene please refactor this, there is a lot of crutches already. Sincerely, Eugene
        return userArr.map(usersMapper)[0]

    }

    static async checkUserLoginUniqueness(login:string): Promise<boolean> {
        const user = await usersCollection.findOne({login:login})
        if (!user) {return false}
        return true
    }
    static async checkUserEmailUniqueness(email:string): Promise<boolean> {
        const user = await usersCollection.findOne({email:email})
        if (!user) {return false}
        return true
    }

    static async getAllUsers(searchLoginTerm: string|undefined, searchEmailTerm: string|undefined, pageNumber:number, pageSize:number, sortBy:string, sortDirection:SortDirection): Promise<OutputUserType[]> {
        const regexLogin = searchLoginTerm?{name:{$regex: searchLoginTerm, $options: "i"}} : {};
        const regexEmail = searchEmailTerm?{name:{$regex: searchEmailTerm, $options: "i"}}:{}
        const users = await usersCollection
            .find({$or: [{login:regexLogin}, {email:regexEmail}]})
            .sort(sortBy, sortDirection)
            .limit(pageSize)
            .skip((pageNumber - 1) * pageSize)
            .toArray()
        return users.map(usersMapper)
    }

    static async createUser(login:string,password:string,email:string,createdAt:string): Promise<OutputUserType|false> {
        const user = await usersCollection.insertOne({login, password, email, createdAt: createdAt})
        return usersRepo.getUser(user.insertedId.toString())
    }

    static async deleteUser(id:string): Promise<any> {
        return await usersCollection.deleteOne({_id: new ObjectId(id)}) //redo later
    }
}