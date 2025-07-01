import {OutputUsersType} from "../models/types";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET||"123";


export const jwtService = {
     async createJwt(user: OutputUsersType) {
        const token = jwt.sign({userId: user.id}, secret,{expiresIn: "1d"});
        return {accessToken: token};
    },

    async getUserIdFromToken(token:string){
         try {
             const result = jwt.verify(token, secret);
             return result //need to find why jwt.verify can return a string
         }
         catch (error) {return null}
    }
}