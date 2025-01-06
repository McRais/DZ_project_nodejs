import {OutputBlogType} from "../models/types";
import {blogsCollection} from "../database/DB";
import {blogsMapper} from "../mappers/blogs-mapper";
import {ObjectId} from "mongodb";

export class blogsRepo {

    static async getAllBlogs(): Promise<OutputBlogType[]> {
        const blogs = await blogsCollection.find({}).toArray()
        return blogs.map(blogsMapper)
    }

    static async getBlogById(id: string): Promise<OutputBlogType | false> {
        const blog = await blogsCollection.findOne({_id: new ObjectId(id)})
        if (!blog) {
            return false
        }
        const blogArr = Array.of(blog)
        return blogArr.map(blogsMapper)[0]
    }


    static async createNewBlog(name: string, description: string, websiteUrl: string): Promise<string> {
        const date = new Date()
        const res = await blogsCollection.insertOne({name, description, websiteUrl, createdAt: date.toISOString(), isMembership:false})
        return res.insertedId.toString()
    }

    static async deleteBlog(id:string) {
        const blog = await blogsCollection.findOne({_id: new ObjectId(id)})
        if (!blog) {
            return false
        }
        return await blogsCollection.deleteOne({_id: new ObjectId(id)})
    }

    static async updateBlog(id: string, name:string, description:string, websiteUrl:string) {
        await blogsCollection.updateOne(
            {_id: new ObjectId(id)},
            {
                name: name,
                description: description,
                websiteUrl: websiteUrl
            })
        return await blogsRepo.getBlogById(id)
    }
}
