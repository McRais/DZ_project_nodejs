import {userIdBearerAuthType} from "./models/types";
import {WithId} from "mongodb";

declare global {
    namespace Express {
        export interface Request {
            user: userIdBearerAuthType | null
        }
    }
}