import {Router} from "express";
import {blogsCollection, postsCollection} from "../database/DB";

export const testingRoute = Router({})
testingRoute.delete("/", async (req: Request, res: Response) => {
    await blogsCollection.deleteMany({})
    await postsCollection.deleteMany({})
    res.sendStatus(204)
})