import {OutputUsersType} from "../models/types";
import jwt, {JwtPayload} from "jsonwebtoken";

const secret = process.env.JWT_SECRET||"123";


export const jwtService = {
     async createJwt(user: OutputUsersType) {
         const payload = { userId: user.id }
        const token = jwt.sign(payload, secret);
        return {accessToken: token};
    },

    async getUserIdFromToken(token:string){
         try {
             const result:any = jwt.verify(token, secret);
             return result.userId
         }
         catch (error) {return null}
    }
}