const express = require("express");
const morgan = require("morgan");
const {InteractionResponseType, InteractionType, verifyKeyMiddleware} = require("discord-interactions");
const helloData = require("data-access");

const PUBLIC_DISCORD_APPLICATION_KEY = process.env.public_discord_application_key;

const app = express();

// noinspection JSCheckFunctionSignatures
app.use(morgan("dev"));

app.post('/', verifyKeyMiddleware(PUBLIC_DISCORD_APPLICATION_KEY), async (req, res) => {
    res.status(200);
    const message = req.body;

    console.log(helloData());

    if (message.type === InteractionType.PING) {
        res.send({
            type: InteractionResponseType.PONG
        });
    } else if (message.type === InteractionType.COMMAND) {
        res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: "Pong"
            }
        });
    }
});

app.listen(3000);