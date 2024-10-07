import express from "express";
import {blogsRoute} from "./routes/blogs-route";
import {postsRoute} from "./routes/posts-route";
import {testingRoute} from "./routes/testing-route";

export const app = express()
app.use(express.json())

app.use('/blogs', blogsRoute)
app.use('/posts', postsRoute)
app.use('/testing/all-data', testingRoute)