import {WithId} from "mongodb";
import {BlogsType, PostsType, UsersType} from "../models/types";

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
export const postsMapper = (post: WithId<PostsType>) =>{
    return{
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt
    }
}

export const usersMapper = (user: WithId<UsersType>)=>{
    return{
        id: user._id.toString(),
        login:user.login,
        email:user.email,
        createdAt:user.createdAt
    }
}