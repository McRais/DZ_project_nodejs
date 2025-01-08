import {Request, Response, Router} from "express";
import {blogsCollection, postsCollection} from "../database/DB";

export const testingRoute = Router({})
testingRoute.delete("/", async (req: Request, res: Response) => {
    await blogsCollection.drop()
    await postsCollection.drop()
    return res.sendStatus(204)
})