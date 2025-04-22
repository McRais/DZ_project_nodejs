import {OutputBlogType, OutputPostType} from "../models/types";
import {blogsCollection, postsCollection} from "../database/DB";
import {blogsOutputMapper, postsOutputMapper} from "../mappers/mappers";
import {ObjectId, SortDirection} from "mongodb";

export class blogsRepo {

    static async getCountByName(searchNameTerm:string|undefined): Promise<number> {
        const regex = searchNameTerm?{name:{$regex: searchNameTerm, $options: "i"}} : {};
        return await blogsCollection.countDocuments(regex)
    }

    static async getAllBlogs(searchNameTerm: string|undefined, pageNumber:number, pageSize:number, sortBy:string, sortDirection:SortDirection): Promise<OutputBlogType[]> {

        const regex = searchNameTerm?{name:{$regex: searchNameTerm, $options: "i"}} : {};

        const blogs = await blogsCollection
            .find(regex)
            .sort(sortBy, sortDirection)
            .limit(pageSize)
            .skip((pageNumber - 1) * pageSize)
            .toArray()

        return blogs.map(blogsOutputMapper)
    }

    static async getBlogById(id: string): Promise<OutputBlogType | false> {
        const blog = await blogsCollection.findOne({_id: new ObjectId(id)})
        if (!blog) {
            return false
        }
        return blogsOutputMapper(blog)
    }

    static async createNewBlog(name: string, description: string, websiteUrl: string, createdAt:string): Promise<string> {
        const res = await blogsCollection.insertOne({name, description, websiteUrl, createdAt: createdAt, isMembership:false})
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
        const blog = await blogsRepo.getBlogById(id)
        if (!blog) {return false}
        await blogsCollection.updateOne(
            {_id: new ObjectId(id)},
            {$set: {
                name: name,
                description: description,
                websiteUrl: websiteUrl
            }},{upsert: true})
        return true
    }

    static async getPostsFromBlog(id:string, pageNumber:number, pageSize:number, sortBy:string, sortDirection:SortDirection):Promise<OutputPostType[]> {

        const posts = await postsCollection
            .find({blogId: id})
            .sort(sortBy, sortDirection)
            .limit(pageSize)
            .skip((pageNumber - 1) * pageSize)
            .toArray()

        return posts.map(postsOutputMapper)
    }
}
