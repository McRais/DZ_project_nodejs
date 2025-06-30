import {Request} from "express";

//types WithId
export type DBBlogsType = {
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}
export type DBPostsType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}
export type DBUsersType = {
    login: string,
    email: string,
    password: string,
    salt: string,
    createdAt: string
}

export type DBCommentsType = {
    content: string,
    commentatorInfo: commentatorInfoType,
    createdAt: string
    postId: string
}

export type commentatorInfoType = {
    userId: string,
    userLogin: string
}


//what should the functions output to user.
export type OutputBlogsType = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}

export type OutputPostsType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}

export type OutputUsersType = {
    id: string,
    login: string,
    email: string,
    createdAt: string
}

export type OutputCommentsType = {
    id: string,
    content: string,
    commentatorInfo: commentatorInfoType,
    createdAt: string
}

export type MyInfoType  = {
    email: string,
    login: string,
    userId: string
}

export type LoginSuccessType = {
    accessToken: string,
}

export type RequestWithParamsAndQuery<P, Q> = Request<P, {}, {}, Q>
export type RequestWithParams<P> = Request<P, {}, {}, {}>;
export type RequestWithBody<B> = Request<{}, {}, B, {}>
export type RequestWithParamsAndBody<P, B> = Request<P, {}, B, {}>
export type RequestWithQuery<Q> = Request<{},{},{},Q>