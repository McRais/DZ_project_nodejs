import {ObjectId, SortDirection} from "mongodb";
import {OutputUserType} from "../models/types";
import {usersCollection} from "../database/DB";
import {usersMapper} from "../mappers/blogs-mapper";
import bcrypt from "bcrypt";

export class usersRepo{
    static async getCount(searchLoginTerm:string|undefined, searchEmailTerm:string|undefined): Promise<number> {
        const regexLogin = searchLoginTerm ? {name:{$regex: searchLoginTerm, $options: "i"}} : {};
        const regexEmail = searchEmailTerm ? {email:{$regex: searchEmailTerm, $options: "i"}} : {};
        return await usersCollection.countDocuments({$or:[regexLogin,regexEmail]})
    }

    static async getUser(userID:string): Promise<OutputUserType|false> {
        const user = await usersCollection.findOne({_id: new ObjectId(userID)},)
        if (!user) {return false}  //it will never return it, this function is only for usersRepo.createUser
        const userArr = Array.of(user) //eugene please refactor this, there is a lot of crutches already. Sincerely, Eugene
        return userArr.map(usersMapper)[0]
    }

    static async checkUserLoginUniqueness(login:string): Promise<boolean> {
        const user = await usersCollection.findOne({login:login})
        if (!user) {return true}
        return false
    }
    static async checkUserEmailUniqueness(email:string): Promise<boolean> {
        const user = await usersCollection.findOne({email:email})
        if (!user) {return true}
        return false
    }

    static async getAllUsers(searchLoginTerm: string|undefined, searchEmailTerm: string|undefined, pageNumber:number, pageSize:number, sortBy:string, sortDirection:SortDirection): Promise<OutputUserType[]> {
        const regexLogin = searchLoginTerm ? {name:{$regex: searchLoginTerm, $options: "i"}} : {};
        const regexEmail = searchEmailTerm ? {email:{$regex: searchEmailTerm, $options: "i"}} : {};
        const users = await usersCollection
            .find({$or: [regexLogin, regexEmail]}) //problem with this, can't pull some users  in tests
            .sort(sortBy, sortDirection)
            .limit(pageSize)
            .skip((pageNumber - 1) * pageSize)
            .toArray()
        return users.map(usersMapper)
    }

    static async createUser(login:string,password:string,email:string,createdAt:string): Promise<OutputUserType|false> {
        const hashPass = bcrypt.hashSync(password, 10);
        const user = await usersCollection.insertOne({login:login, password:hashPass, email:email, createdAt:createdAt})
        return await usersRepo.getUser(user.insertedId.toString())
    }


    static async deleteUser(id:string): Promise<boolean> {
        const deleteResult = await usersCollection.deleteOne({_id: new ObjectId(id)})
        return deleteResult.deletedCount != 0
    }

    static async loginUser(loginOrEmail:string,password:string):Promise<boolean> {
        const user = await usersCollection.findOne({$or: [{login:loginOrEmail}, {email:loginOrEmail}]})
        if (!user) {return false}
        return bcrypt.compareSync(password, user.password)
    }
}