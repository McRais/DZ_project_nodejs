import {WithId} from "mongodb";
import {DBBlogsType, commentatorInfoType, DBCommentsType, DBPostsType, DBUsersType} from "../models/types";

export const blogsMapper = (blog: WithId<DBBlogsType>) =>{
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    }
}
export const postsMapper = (post: WithId<DBPostsType>) =>{
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

export const usersMapper = (user: WithId<DBUsersType>)=>{
    return{
        id: user._id.toString(),
        login:user.login,
        email:user.email,
        createdAt:user.createdAt
    }
}

export const commentsMapper = (comment: WithId<DBCommentsType>) =>{
    return {
        id: comment._id.toString(),
        content: comment.content,
        commentatorInfo: comment.commentatorInfo,
        createdAt: comment.createdAt
    }
}