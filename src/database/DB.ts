import {MongoClient} from "mongodb";
import {DBBlogsType, DBCommentsType, DBPostsType, DBUsersType} from "../models/types";
import * as dotenv from "dotenv";
dotenv.config();

const mongoURI = process.env.MONGO_URI
if (!mongoURI) {throw new Error("no db connection")}

const client = new MongoClient(mongoURI)

const db = client.db('blogs-db')
export const blogsCollection = db.collection<DBBlogsType>('blogs')
export const postsCollection = db.collection<DBPostsType>('posts')
export const usersCollection = db.collection<DBUsersType>('users')
export const commentsCollection = db.collection<DBCommentsType>('comments')

export const runDb = async() => {
    try {
        await client.connect()
        await client.db("blogs-db").command({ping: 1})
        console.log("Connected to DB")

    } catch (e){
        console.log(e)
        await client.close()
    }
}
