import {Request} from "express";


export type BlogsType = {
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}
export type PostsType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}
export type UsersType = {
    login: string,
    email: string,
    password: string,
    createdAt: string
}

export type CommentsType = {
    content: string,
    commentatorInfo: commentatorInfoType,
    createdAt: string
    postId: string
}

export type commentatorInfoType = {
    userId: string,
    userLogin: string
}

export type RequestWithParamAndQuery<P, Q> = Request<P, {}, {}, Q>
export type RequestWithParams<P> = Request<P, {}, {}, {}>;
export type RequestWithBody<B> = Request<{}, {}, B, {}>
export type RequestWithBodyAndParams<P, B> = Request<P, {}, B, {}>
export type RequestWithQuery<Q> = Request<{},{},{},Q>

export type OutputBlogType = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}

export type OutputPostType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}

export type OutputUserType = {
    id: string,
    login: string,
    email: string,
    createdAt: string
}

export type OutputCommentType = {
    id: string,
    content: string,
    commentatorInfo: commentatorInfoType,
    createdAt: string
}

export type MeViewType  = {
    email: string,
    login: string,
    userId: string
}

export type LoginSuccessType = {
    accessToken: string,
}