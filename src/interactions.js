const express = require("express");
const morgan = require("morgan");
const {verifyKeyMiddleware} = require("discord-interactions");
const helloData = require("data-access");

const PUBLIC_DISCORD_APPLICATION_KEY = process.env.public_discord_application_key;

const app = express();

// noinspection JSCheckFunctionSignatures
app.use(morgan("dev"));

app.post('/', verifyKeyMiddleware(PUBLIC_DISCORD_APPLICATION_KEY), async (req, res) => {
    res.status(200);
    const message = req.body;

    console.log(helloData());

    if (message.type === 1) {
        res.send({
            type: 1
        });
    } else if (message.type === 2) {
        let data;

        switch (message.data.name) {
            case "pat":
                const sender = `<@${message.user !== undefined ? message.user.id : message.member.user.id}>`;

                let receiver;
                if (message.data.resolved.roles !== undefined) {
                    receiver = message.data.resolved.roles[message.data.options[0].value].name === "@everyone"
                        ? "@everyone"
                        : `<@&${message.data.options[0].value}>`;

                } else if (message.data.resolved.users !== undefined) {
                    receiver = `<@${message.data.options[0].value}>`;
                } else {
                    receiver = "undefined";
                }

                let color = 16755938; // default yuri color

                // check if asking
                if (message.data.options[1] ?? false) {
                    data = {
                        embeds: [
                            {
                                description: `${sender} is offering \`pat\` to ${receiver}
                                
                                Do you accept?`,
                                color: color,
                            }
                        ],
                        components: [
                            {
                                type: 1,
                                components: [
                                    {
                                        type: 2,
                                        style: 3,
                                        label: "Yes",
                                        custom_id: "accept_offer",
                                    },
                                    {
                                        type: 2,
                                        style: 4,
                                        label: "No",
                                        custom_id: "decline_offer"
                                    }
                                ]
                            }
                        ],
                    }
                } else {
                    data = {
                        embeds: [
                            {
                                description: `${sender} is patting ${receiver}`,
                                image: {
                                    url: "https://media1.tenor.com/images/d7c326bd43776f1e0df6f63956230eb4/tenor.gif?itemid=17187002"
                                },
                                color: color,
                            }
                        ]
                    }
                }

                break;
            case "ping":
                data = {
                    content: "pong"
                }
                break;
        }

        res.send({
            type: 4,
            data: data,
        });
    } else if (message.type === 3) {
        console.log(message);
        //console.log(message.message);
        //console.log(message.message.components[0].components);

        if (message.data !== undefined && (message.data.custom_id === "accept_offer" || message.data.custom_id === "decline_offer")) {
            const clickUser = message.member !== undefined ? message.member.user : message.user;

            let canUserClick = false;

            const embedMessage = message.message.embeds[0].description;
            const lastMentionInMessageStart = embedMessage.lastIndexOf("<@") + 2;
            const lastMentionInMessageEnd = embedMessage.lastIndexOf(">");
            const receiverMention = embedMessage.substring(lastMentionInMessageStart, lastMentionInMessageEnd);

            if (lastMentionInMessageStart === 2) {
                // @everyone was used maybe? i guess?
                if (embedMessage.includes("@everyone")) {
                    canUserClick = true;
                }
            } else {
                if (receiverMention[0] === "&") {
                    // a role has been tagged, check if user has role
                    message.member.roles.forEach(role => {
                        if (receiverMention.substring(1) === role) {
                            // user that clicked has the mentionned role
                            canUserClick = true;
                        }
                    });
                } else {
                    // a user has been tagged
                    if (receiverMention === clickUser.id) {
                        // user who clicked is the same that was tagged
                        canUserClick = true;
                    }
                }
            }

            if (canUserClick && message.data.custom_id === "accept_offer") {
                res.send({
                    type: 4,
                    data: {
                        embeds: [
                            {
                                description: `<@${message.message.interaction.user.id}> pats <@${clickUser.id}>`,
                                image: {
                                    url: "https://media1.tenor.com/images/d7c326bd43776f1e0df6f63956230eb4/tenor.gif?itemid=17187002"
                                },
                                color: 16755938,
                            }
                        ],
                        components: [],
                    }
                });
            } else {
                res.send({
                    type: 6,
                });
            }
        } else {
            res.send({
                type: 6,
            });
        }
    }
});

app.listen(3000);