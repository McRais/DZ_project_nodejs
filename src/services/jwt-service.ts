import {OutputUsersType} from "../models/types";
import jwt from "jsonwebtoken";


export const jwtService = {
     async createJwt(user: OutputUsersType) {
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET||"123", {expiresIn: "10m"});
        return {accessToken: token};
    }
}