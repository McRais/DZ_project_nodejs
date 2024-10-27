import {WithId} from "mongodb";
import {BlogsType} from "../models/types";

export const blogsMapper = (blog: WithId<BlogsType>) =>{
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    }
}