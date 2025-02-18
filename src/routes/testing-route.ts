import {Request, Response, Router} from "express";
import {blogsCollection, postsCollection, usersCollection} from "../database/DB";

export const testingRoute = Router({})
testingRoute.delete("/", async (req: Request, res: Response) => {
    await blogsCollection.drop()
    await postsCollection.drop()
    await usersCollection.drop()
    return res.sendStatus(204)
})