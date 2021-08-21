import express from "express"
import morgan from "morgan"
import {verifyKeyMiddleware} from "discord-interactions"
import {interactionHandler} from "./handlers/interactionHandler.js"
import {environment} from "./env.js"

const app = express()

// noinspection JSCheckFunctionSignatures
app.use(morgan("dev"))

app.post("/", verifyKeyMiddleware(environment.publicDiscordApplicationKey), async (req, res) => {
    res.status(200)

    const responseBody = await interactionHandler.handle(req.body)

    res.send(responseBody)
})

let port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})