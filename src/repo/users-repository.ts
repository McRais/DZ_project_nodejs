import {ObjectId, SortDirection} from "mongodb";
import {DBUsersType, LoginSuccessType, OutputUsersType} from "../models/types";
import {usersCollection} from "../database/DB";
import {usersMapper} from "../mappers/output-mappers";
import bcrypt from "bcrypt";


export class usersRepo{
    static async getCount(searchLoginTerm:string|undefined, searchEmailTerm:string|undefined): Promise<number> {
        const regexLogin = searchLoginTerm ? {login:{$regex: searchLoginTerm, $options: "i"}} : {};
        const regexEmail = searchEmailTerm ? {email:{$regex: searchEmailTerm, $options: "i"}} : {};
        return await usersCollection.countDocuments({$or:[regexLogin,regexEmail]})
    }

    static async getUser(userID:string): Promise<OutputUsersType|false> {
        const user = await usersCollection.findOne({_id: new ObjectId(userID)},)
        if (!user) {return false}  //it will never return it, this function is only for usersRepo.createUser
        return usersMapper(user)
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

    static async getAllUsers(searchLoginTerm: string|undefined, searchEmailTerm: string|undefined, pageNumber:number, pageSize:number, sortBy:string, sortDirection:SortDirection): Promise<OutputUsersType[]> {
        const regexLogin = searchLoginTerm ? {login:{$regex: searchLoginTerm, $options: "i"}} : {};
        const regexEmail = searchEmailTerm ? {email:{$regex: searchEmailTerm, $options: "i"}} : {};
        const users = await usersCollection
            .find({$or: [regexLogin, regexEmail]})
            .sort(sortBy, sortDirection)
            .limit(pageSize)
            .skip((pageNumber - 1) * pageSize)
            .toArray()
        return users.map(usersMapper)
    }

    static async createUser(login:string,password:string,email:string,createdAt:string): Promise<OutputUsersType|false> {
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);
        const user = await usersCollection.insertOne({login:login, password:hashPass, salt: salt, email:email, createdAt:createdAt})
        return await usersRepo.getUser(user.insertedId.toString())
    }

    static async deleteUser(id:string): Promise<boolean> {
        const deleteResult = await usersCollection.deleteOne({_id: new ObjectId(id)})
        return deleteResult.deletedCount != 0
    }

    static async loginUser(loginOrEmail:string,password:string):Promise<OutputUsersType|false> {
        const user = await usersCollection.findOne({$or: [{login:loginOrEmail}, {email:loginOrEmail}]})
        if(!user || await bcrypt.hash(password, user.salt) != user.password) {return false}
        return usersMapper(user)
    }

    static async getUserLogin(userId:string):Promise<string> {
        const user = await usersCollection.findOne({_id: new ObjectId(userId)})
        return user!.login;
    }
}