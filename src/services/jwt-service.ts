import {OutputUsersType} from "../models/types";
import jwt from "jsonwebtoken";
import {ObjectId} from "mongodb";


export const jwtService = {
     async createJwt(user: OutputUsersType) {
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET||'123', {expiresIn: "1h"});
        return {accessToken: token};
    },
    /*async getUserIdFromToken(token:string){
         try {
             const result = jwt.verify(token, process.env.JWT_SECRET || '123');
             return result.userId;
         }
         catch (error) {return null}
    }*/
}