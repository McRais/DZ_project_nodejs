import {blogsCollection, postsCollection} from "../database/DB";
import {OutputPostType, PostsType} from "../models/types";
import {postsMapper} from "../mappers/blogs-mapper";
import {ObjectId, SortDirection} from "mongodb";

export class postsRepo {

    static async getCount(searchNameTerm:string|undefined): Promise<number> {
        const regex = searchNameTerm?{name:{$regex: searchNameTerm, $options: "i"}} : {};
        return await postsCollection.countDocuments(regex)
    }
    static async getCountFromBlog(blogId:string): Promise<number> {
        return await postsCollection.countDocuments({blogId: blogId})
    }

    static async getAllPosts(searchNameTerm: string|undefined, pageNumber:number, pageSize:number, sortBy:string, sortDirection:SortDirection): Promise<OutputPostType[]> {
        const regex = searchNameTerm?{name:{$regex: searchNameTerm, $options: "i"}} : {};

        const posts = await postsCollection
            .find(regex)
            .sort(sortBy, sortDirection)
            .limit(pageSize)
            .skip((pageNumber - 1) * pageSize)
            .toArray()

        return posts.map(postsMapper)
    }

    static async getPostById(id: string): Promise<OutputPostType | false> {
        const post = await postsCollection.findOne({_id: new ObjectId(id)})
        if (!post) {
            return false
        }
        let postArr = Array.of(post)  //eugene please refactor this, there is a lot of crutches already. Sincerely, Eugene
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


