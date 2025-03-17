import {SortDirection} from "mongodb";
import {commentsCollection, postsCollection} from "../database/DB";

export class commentsRepo{
    static async getCommentsFromPostCount(postId: string):  Promise<number>{
        return await commentsCollection.countDocuments({postId: postId}) //feels not right, check the types.ts
    }

    static async getCommentsFromPost(postId: string, pageNumber:number, pageSize:number, sortBy:string, sortDirection:SortDirection): Promise<any>{

        //need to add link to types, probably array to every post containing commentsId's
        const posts = await commentsCollection
            .find({commentatorInfo:{postId:postId}})
            .sort(sortBy, sortDirection)
            .limit(pageSize)
            .skip((pageNumber - 1) * pageSize)
            .toArray()

    }

}