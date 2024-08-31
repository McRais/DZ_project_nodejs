import {Request} from "express";
import {MongoClient} from "mongodb";

const mongoURI = process.env.MONGO_URI || 'mongodb://0.0.0.0:27017'
const port =  3003

const client = new MongoClient(mongoURI)

const db = client.db('blogs-db')
export const blogsCollection = db.collection('blogs')
export const postsCollection = db.collection('posts')

export const runDb = async() => {
    try {
        await client.connect()
        console.log("Connected to DB")
        console.log(`Example app listening on port ${port}`)

    } catch (e){
        console.log(e)
        await client.close()
    }
}


 export type BlogsType = {
    "id": string,
    "name": string,
    "description": string,
    "websiteUrl": string
}

export type PostsType =  {
    "id": string,
    "title": string,
    "shortDescription": string,
    "content": string,
    "blogId": string,
    "blogName": string
}

export type RequestWithParams<P> = Request<P, {}, {}, {}>;
export type RequestWithBody<B> = Request<{}, {}, B, {}>
export type RequestWithBodyAndParams<P,B> = Request<P, {}, B, {}>

export const blogsDB: BlogsType[] = [
    {
        id: "1",
        name: "First blog",
        description: "First description",
        websiteUrl: "First-blog.com"
    }
], postsDB: PostsType[] = [
    {
        id: "1234892487",
        title: "First post",
        shortDescription: "Short description for the first post",
        content: "Content",
        blogId: "1",
        blogName: "First blog"
    }
];

