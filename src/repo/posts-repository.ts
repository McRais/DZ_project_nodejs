import {blogsCollection, postsCollection} from "../database/DB";
import {OutputPostType, PostsType} from "../models/types";
import {postsMapper} from "../mappers/blogs-mapper";
import {ObjectId} from "mongodb";

export class postsRepo {

    static async getCount(): Promise<number> {
        return await postsCollection.countDocuments({})
    }
    static async getCountFromBlog(blogId:string): Promise<number> {
        return await postsCollection.countDocuments({blogId: blogId})
    }

    static async getAllPosts(searchNameTerm: string, pageNumber:number, pageSize:number, sortBy:string, sortDirection:string): Promise<OutputPostType[]> {

        let posts
        if (searchNameTerm != null) {
            const regexp = new RegExp(searchNameTerm, "i");
            if (sortDirection == "asc") {
                posts = await postsCollection.find({name: regexp}).sort({[sortBy]: 1}).skip((pageNumber - 1) * pageSize).limit(pageSize).toArray()
            } else {
                posts = await postsCollection.find({name: regexp}).sort({[sortBy]: -1}).skip((pageNumber - 1) * pageSize).limit(pageSize).toArray()
            }
            return posts.map(postsMapper)
        }

        if (sortDirection == "asc") {
            posts = await postsCollection.find({}).sort({[sortBy]: 1}).skip((pageNumber - 1) * pageSize).limit(pageSize).toArray()
        } else {
            posts = await postsCollection.find({}).sort({[sortBy]: -1}).skip((pageNumber - 1) * pageSize).limit(pageSize).toArray()
        }
        return posts.map(postsMapper)
    }

    static async getPostById(id: string): Promise<OutputPostType | false> {
        const post = await postsCollection.findOne({_id: new ObjectId(id)})
        if (!post) {
            return false
        }
        let postArr = Array.of(post)
        return postArr.map(postsMapper)[0]
    }


    static async createNewPost(title: string, shortDescription: string, content: string, blogId: string): Promise<OutputPostType | false> {
        const blog = await blogsCollection.findOne({_id: new ObjectId(blogId)})
        if (!blog) {
            throw new Error("No blog")
        }
        const date = new Date()

        const newPost: PostsType = {
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blog.name,
            createdAt: date.toISOString()
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


