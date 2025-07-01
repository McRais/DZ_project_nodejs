import {ObjectId, SortDirection} from "mongodb";
import {commentsCollection} from "../database/DB";
import {commentsMapper} from "../mappers/output-mappers";
import {OutputCommentsType} from "../models/types";
import {usersRepo} from "./users-repository";

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

    static async getCommentById(id:string): Promise<OutputCommentsType|false> {
        const comment = await commentsCollection.findOne({_id: new ObjectId(id)})
        if (!comment) {return false}
        return commentsMapper(comment)
    }

    static async createComment(userId:string, postId:string, content:string): Promise<OutputCommentsType> {
        const comment = {
            content: content,
            commentatorInfo:{
                userId:userId,
                userLogin: await usersRepo.getUserLogin(userId)
            },
            createdAt: new Date().toISOString(),
            postId: postId
        }

        const res = await commentsCollection.insertOne(comment)
        return {
            id:res.insertedId.toString(),
            content: comment.content,
            commentatorInfo: comment.commentatorInfo,
            createdAt: comment.createdAt
        }
    }

    static async updateComment(id: string, content:string):Promise<number> {
        const comment = await commentsCollection.findOne({_id: new ObjectId(id)})
        if (!comment) {
            return 404
        }
        if(comment.commentatorInfo.userId != id){
            return 403
        }
        await commentsCollection.updateOne({_id: new ObjectId(id)},
            {$set: {
                    content: content
                }})
        return 204
    }

    static async deleteComment(userId:string, commentId: string):Promise<number> {
        const comment = await commentsCollection.findOne({_id: new ObjectId(commentId)})
        if(!comment){return 404}
        if(userId != comment.commentatorInfo.userId){return 403}
        await commentsCollection.deleteOne({_id: new ObjectId(commentId)})
        return 204
    }
}