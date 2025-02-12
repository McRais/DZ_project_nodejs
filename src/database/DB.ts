import {MongoClient} from "mongodb";
import {BlogsType, PostsType, UsersType} from "../models/types";
import * as dotenv from "dotenv";
dotenv.config();

const mongoURI = process.env.MONGO_URI
if (!mongoURI) {throw new Error("no db connection")}

const client = new MongoClient(mongoURI)

const db = client.db('blogs-db')
export const blogsCollection = db.collection<BlogsType>('blogs')
export const postsCollection = db.collection<PostsType>('posts')
export const usersCollection = db.collection<UsersType>('users')

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
