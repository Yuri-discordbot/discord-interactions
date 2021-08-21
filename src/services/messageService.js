import {
    AllowedMentionsTypes,
    ButtonStyle,
    ComponentType,
    InteractionResponseType,
    MessageFlags
} from "discord-api-types/v9"
import {DiscordAPIClient} from "../network/discordAPIClient.js"

const YURI_COLOR = 16755938
const BONK_IMAGES = [
    "https://media1.tenor.com/images/6493bee2be7ae168a5ef7a68cf751868/tenor.gif",
    "https://media1.tenor.com/images/4dee992174206c66cb208bee31174b8d/tenor.gif",
    "https://media1.tenor.com/images/0f145914d9e66a19829d7145daf9abcc/tenor.gif",
    "https://media1.tenor.com/images/4d6dcfd5d1a0e876a534ee8bf2411e43/tenor.gif",
    "https://c.tenor.com/tvSkixRvwsMAAAAC/bonk-meme.gif",
    "https://c.tenor.com/XMTk6EGrjHgAAAAd/horny-jail.gif",
    "https://c.tenor.com/O-xE6XSYBqAAAAAC/arknights-%E3%82%A2%E3%83%BC%E3%82%AF%E3%83%8A%E3%82%A4%E3%83%84.gif",
]

const MessageService = {
    createPongMessage: () => {
        return {
            type: InteractionResponseType.Pong
        }
    },

    createErrorMessage: (message) => {
        return MessageService.createTextMessage(`${message}\n\nPlease contact <@223125131730485249> if this problem persists`, true)
    },

    createTextMessage: (message, ephemeral = false) => {
        return {
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                embeds: [
                    {
                        description: message,
                        color: YURI_COLOR
                    }
                ],
                flags: ephemeral ? MessageFlags.Ephemeral : undefined
            }
        }
    },

    createCommandMessage: (command, sender, receiver) => {
        return {
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: receiver,
                allowed_mentions: {
                    parse: [AllowedMentionsTypes.Role, AllowedMentionsTypes.User]
                },
                embeds: [
                    {
                        description: command.embed_text.replace("%sender", sender).replace("%receiver", receiver),
                        image: {
                            url: command.images_urls[Math.floor(Math.random() * command.images_urls.length)]
                        },
                        color: YURI_COLOR
                    },
                ]
            }
        }
    },

    createOfferMessage: (command, sender, receiver) => {
        return {
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: receiver,
                allowed_mentions: {
                    parse: [AllowedMentionsTypes.Role, AllowedMentionsTypes.User]
                },
                embeds: [
                    {
                        description: `${sender} is offering \`${command.name}\` to ${receiver}\n\nDo you accept?`,
                        color: YURI_COLOR
                    }
                ],
                components: [
                    {
                        type: ComponentType.ActionRow,
                        components: [
                            {
                                type: ComponentType.Button,
                                style: ButtonStyle.Success,
                                label: "Yes",
                                custom_id: "accept_offer",
                            },
                            {
                                type: ComponentType.Button,
                                style: ButtonStyle.Danger,
                                label: "No",
                                custom_id: "decline_offer"
                            }
                        ]
                    }
                ]
            }
        }
    },

    createAskMessage: (command, sender, receiver) => {
        return {
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: receiver,
                allowed_mentions: {
                    parse: [AllowedMentionsTypes.Role, AllowedMentionsTypes.User]
                },
                embeds: [
                    {
                        description: `${sender} is asking \`${command.name}\` from ${receiver}\n\nDo you accept?`,
                        color: YURI_COLOR
                    }
                ],
                components: [
                    {
                        type: ComponentType.ActionRow,
                        components: [
                            {
                                type: ComponentType.Button,
                                style: ButtonStyle.Success,
                                label: "Yes",
                                custom_id: "accept_ask",
                            },
                            {
                                type: ComponentType.Button,
                                style: ButtonStyle.Danger,
                                label: "No",
                                custom_id: "decline_ask"
                            }
                        ]
                    }
                ]
            }
        }
    },

    createBonkMessage: () => {
        return {
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                embeds: [
                    {
                        description: "This is not an nsfw channel >:(",
                        image: {
                            url: BONK_IMAGES[Math.floor(Math.random() * BONK_IMAGES.length)]
                        },
                        color: YURI_COLOR
                    },
                ]
            }
        }
    },

    createReplacementMessage: (message) => {
        return {
            type: InteractionResponseType.UpdateMessage,
            data: {
                content: "",
                embeds: [
                    {
                        description: message,
                        color: YURI_COLOR
                    }
                ],
                components: []
            }
        }
    },

    removeComponentsFromMessage: async (message) => {
        await DiscordAPIClient.patchMessage(message, {components: []})
    }
}

export {MessageService}