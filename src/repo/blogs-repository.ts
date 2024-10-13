import {BlogsType, OutputBlogType} from "../models/types";
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
        let blogArr = Array.of(blog)
        return blogArr.map(blogsMapper)[0]
    }


    static async createNewBlog(name: string, description: string, websiteUrl: string): Promise<string> {
        const res = await blogsCollection.insertOne({name, description, websiteUrl})
        return res.insertedId.toString()
    }
}/*
    static deleteBlog(id:string) {
        const blog = blogsDB.find((blog) => blog.id === id)
        if (!blog){return false}
        const index = blogsDB.findIndex(blog => blog.id === id);
        blogsDB.splice(index, 1);
        return true
    }

    static updateBlog(id: string, name:string, description:string, websiteUrl:string) {
        const blog = blogsDB.find((blog) => blog.id === id)
        if (!blog){return false}
        const index = blogsDB.findIndex(blog => blog.id === id);
        blogsDB[index].name = name
        blogsDB[index].description = description
        blogsDB[index].websiteUrl = websiteUrl

        postsDB.forEach((posts_inThatBlog) => {
            if(posts_inThatBlog.blogId === id){posts_inThatBlog.blogName = name}
        })

        return blogsDB[index]
    }

}

*/