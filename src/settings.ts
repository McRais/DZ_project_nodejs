import express, {Request, Response} from "express";
import {blogsRoute} from "./routes/blogs-route";
import {postsRoute} from "./routes/posts-route";
import {blogsDB, postsDB} from "./database/DB";

export const app = express()
app.use(express.json())


//for testing
app.delete('/testing/all-data', (req: Request, res: Response) => {
        blogsDB.length = 0
        postsDB.length = 0
        res.sendStatus(204)
})


app.use('/blogs', blogsRoute)
app.use('/posts', postsRoute)