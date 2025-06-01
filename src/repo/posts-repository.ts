import {blogsCollection, postsCollection} from "../database/DB";
import {OutputPostsType, DBPostsType} from "../models/types";
import {postsMapper} from "../mappers/output-mappers";
import {ObjectId, SortDirection} from "mongodb";

export class postsRepo {

    static async getPostsCountByName(searchNameTerm:string|undefined): Promise<number> {
        const regex = searchNameTerm?{name:{$regex: searchNameTerm, $options: "i"}} : {};
        return await postsCollection.countDocuments(regex)
    }
    static async getCountOfPostsFromBlog(blogId:string): Promise<number> {
        return await postsCollection.countDocuments({blogId: blogId})
    }

    static async getAllPosts(searchNameTerm: string|undefined, pageNumber:number, pageSize:number, sortBy:string, sortDirection:SortDirection): Promise<OutputPostsType[]> {
        const regex = searchNameTerm?{name:{$regex: searchNameTerm, $options: "i"}} : {};

        const posts = await postsCollection
            .find(regex)
            .sort(sortBy, sortDirection)
            .limit(pageSize)
            .skip((pageNumber - 1) * pageSize)
            .toArray()

        return posts.map(postsMapper)
    }

    static async getPostById(id: string): Promise<OutputPostsType | false> {
        const post = await postsCollection.findOne({_id: new ObjectId(id)})
        if (!post) {
            return false
        }
        return postsMapper(post)
    }

    static async createNewPost(title: string, shortDescription: string, content: string, blogId: string): Promise<OutputPostsType | false> {
        const blog = await blogsCollection.findOne({_id: new ObjectId(blogId)})
        if (!blog) {
            throw new Error("No blog")
        }
        const date = new Date()

        const newPost: DBPostsType = {
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blog.name,
            createdAt: date.toISOString(),
        }
        const result = await postsCollection.insertOne(newPost)
        return postsRepo.getPostById(result.insertedId.toString())
    }

    static async deletePost(id: string) {
        const post = await postsCollection.findOne({_id: new ObjectId(id)})
        if (!post) {
            return false
        }
        return await postsCollection.deleteOne({_id: new ObjectId(id)})
    }

    static async updatePost(id: string, title:string, shortDescription:string, content:string, blogId: string):Promise<boolean> {
        const postCheck = await postsCollection.findOne({_id: new ObjectId(id)})
        if (!postCheck) {
            return false
        }
        await postsCollection.updateOne({_id: new ObjectId(id)},
            {$set: {
                    title: title,
                    shortDescription: shortDescription,
                    content: content,
                    blogId: blogId
                }},{upsert: true})
        return true
    }
}


