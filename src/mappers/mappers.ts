import {WithId} from "mongodb";
import {BlogsType, commentatorInfoType, CommentsType, PostsType, UsersType} from "../models/types";

export const blogsOutputMapper = (blog: WithId<BlogsType>) =>{
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    }
}
export const postsOutputMapper = (post: WithId<PostsType>) =>{
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

export const usersOutputMapper = (user: WithId<UsersType>)=>{
    return{
        id: user._id.toString(),
        login:user.login,
        email:user.email,
        createdAt:user.createdAt
    }
}

export const commentsOutputMapper = (comment: WithId<CommentsType>) =>{
    return {
        id: comment._id.toString(),
        content: comment.content,
        commentatorInfo: comment.commentatorInfo,
        createdAt: comment.createdAt
    }
}