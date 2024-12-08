import {blogsCollection, postsCollection} from "../database/DB";
import {OutputPostType, PostsType} from "../models/types";
import {postsMapper} from "../mappers/blogs-mapper";
import {ObjectId} from "mongodb";

export class postsRepo {

    static async getAllPosts(): Promise<OutputPostType[]> {
        const posts = await postsCollection.find({}).toArray()
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


    static async createNewPost(title: string, shortDescription: string, content: string, blogId: string): Promise<string> {
        const blog = await blogsCollection.findOne({_id: new ObjectId(blogId)})
        if (!blog) {
            throw new Error("No blog")
        }

        const newPost: PostsType = {
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blog.name,
            createdAt: Date.now().toString()
        }
        const res = await postsCollection.insertOne(newPost)
        return res.insertedId.toString()
    }

    static async deletePost(id: string) {
        const post = await postsCollection.findOne({_id: new ObjectId(id)})
        if (!post) {
            return false
        }
        return await postsCollection.deleteOne({_id: new ObjectId(id)})
    }


    static async updatePost(id: string, title:string, shortDescription:string, content:string, blogId: string):Promise<OutputPostType> {
        const postCheck = await postsCollection.findOne({_id: new ObjectId(id)})
        if (!postCheck) {
            throw new Error("No post")
        }
        const {upsertedId} = await postsCollection.updateOne({_id: new ObjectId(id)}, {
            title,
            shortDescription,
            content,
            blogId
        })
        const post = await postsCollection.findOne({_id: new ObjectId(upsertedId?.toString())})
        if (post) {
            let postArr = Array.of(post)
            return postArr.map(postsMapper)[0]
        } else {throw new Error("No post")}


    }

}


