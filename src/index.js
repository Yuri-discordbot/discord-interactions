import express from "express"
import morgan from "morgan"
import {verifyKeyMiddleware} from "discord-interactions"
import {interactionHandler} from "./handlers/interactionHandler.js"

const PUBLIC_DISCORD_APPLICATION_KEY = process.env.PUBLIC_DISCORD_APPLICATION_KEY

const app = express()

// noinspection JSCheckFunctionSignatures
app.use(morgan("dev"))

app.post("/", verifyKeyMiddleware(PUBLIC_DISCORD_APPLICATION_KEY), async (req, res) => {
    res.status(200)

    console.log(req.body)

    const responseBody = interactionHandler.handle(req.body)

    res.send(responseBody)
})

let port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})