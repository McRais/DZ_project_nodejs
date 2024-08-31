import { app } from './settings'
import {runDb} from "./database/DB";

app.listen(3003, async() => {
    await runDb()
})



