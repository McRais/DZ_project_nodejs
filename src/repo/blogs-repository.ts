import {OutputBlogType, OutputPostType} from "../models/types";
import {blogsCollection, postsCollection} from "../database/DB";
import {blogsMapper, postsMapper} from "../mappers/blogs-mapper";
import {ObjectId} from "mongodb";

export class blogsRepo {

    static async getCount(): Promise<number> {
        return await blogsCollection.countDocuments({})
    }

    static async getAllBlogs(searchNameTerm: string|null, pageNumber:number, pageSize:number, sortBy:string, sortDirection:string): Promise<OutputBlogType[]> {
        let blogs
        if(searchNameTerm!=null){
            const regexp = new RegExp(searchNameTerm, "i");

            if(sortDirection=="desc"){
                blogs = await blogsCollection.find({name:regexp}).sort({[sortBy]:"desc"}).skip((pageNumber-1)*pageSize).limit(pageSize).toArray()
            } else {
                blogs = await blogsCollection.find({name:regexp}).sort({[sortBy]:"asc"}).skip((pageNumber-1)*pageSize).limit(pageSize).toArray()
            }
            return blogs.map(blogsMapper)
        }
        if(sortDirection=="desc"){
            blogs = await blogsCollection.find({}).sort({[sortBy]:"desc"}).skip((pageNumber-1)*pageSize).limit(pageSize).toArray()
        } else {
            blogs = await blogsCollection.find({}).sort({[sortBy]:"asc"}).skip((pageNumber-1)*pageSize).limit(pageSize).toArray()
        }
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

    static async getPostsFromBlog(id:string, pageNumber:number, pageSize:number, sortBy:string, sortDirection:string):Promise<OutputPostType[]> {
        let field = sortBy
        let posts

        if(sortDirection=="desc"){
            posts = await postsCollection.find({blogId: id}).sort({[field]:-1}).skip((pageNumber-1)*pageSize).limit(pageSize).toArray()
        } else {
            posts = await postsCollection.find({blogId: id}).sort({[field]:1}).skip((pageNumber-1)*pageSize).limit(pageSize).toArray()
        }
        return posts.map(postsMapper)
    }
}
