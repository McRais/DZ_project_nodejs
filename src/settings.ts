import express from "express";
import {blogsRoute} from "./routes/blogs-route";
import {postsRoute} from "./routes/posts-route";
import {testingRoute} from "./routes/testing-route";
import bodyParser from "body-parser";
import {usersRoute} from "./routes/users-route";
import {loginRoute} from "./routes/login-route";
import {commentsRoute} from "./routes/comments-route";

export const app = express()
app.use(express.json())
app.use(bodyParser.json())

app.use('/blogs', blogsRoute)
app.use('/posts', postsRoute)
app.use('/users', usersRoute)
app.use('/auth/login', loginRoute)
app.use('/comments', commentsRoute)
app.use('/testing/all-data', testingRoute)