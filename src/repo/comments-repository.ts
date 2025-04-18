import {ObjectId, SortDirection} from "mongodb";
import {commentsCollection} from "../database/DB";
import {commentsOutputMapper} from "../mappers/mappers";
import {OutputCommentType} from "../models/types";

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
        return comments.map(commentsOutputMapper)
    }

    static async getCommentById(id:string): Promise<OutputCommentType|false> {
        const comment = await commentsCollection.findOne({_id: new ObjectId(id)})
        if (!comment) {return false}
        const commentArr = Array.of(comment)
        return commentArr.map(commentsOutputMapper)[0]
    }

    static async createComment(content:string, postId:string): Promise<string|false> {
        const comment = await commentsCollection.findOne({_id: new ObjectId(postId)})
        if (!comment) {return false}
        const res = await commentsCollection.insertOne({
            content: content,
            commentatorInfo:{
                userId:"",
                userLogin:""
            },
            createdAt: new Date().toISOString(),
            postId: postId
        })
        return res.insertedId.toString()
    }
}