import { app } from './settings'
import {runDb} from "./database/DB";

const port = process.env.PORT || 3003

app.listen(port,  async() => {
    await runDb()
    console.log(`Example app listening on port ${port}`)
})
