import {SortDirection} from "mongodb";
import {commentsCollection} from "../database/DB";
import {commentsMapper} from "../mappers/mappers";

export class commentsRepo{

    static async getCommentsFromPostCount(postId: string):  Promise<number>{
        return await commentsCollection.countDocuments({postId: postId})
    }

    static async getCommentsFromPost(postId: string, pageNumber:number, pageSize:number, sortBy:string, sortDirection:SortDirection): Promise<any>{
        const comments = await commentsCollection
            .find({postId: postId})
            .sort(sortBy, sortDirection)
            .limit(pageSize)
            .skip((pageNumber - 1) * pageSize)
            .toArray()
        return comments.map(commentsMapper)
    }

}