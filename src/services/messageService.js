import {InteractionResponseFlags, InteractionResponseType} from "discord-interactions"

const YURI_COLOR = 16755938

const replaceSenderAndReceiverWithMentions = (embedText, sender, receiver) => {
    return embedText.replace("%sender", sender).replace("%receiver", receiver)
}

const getRandomImage = (images) => {
    return images[Math.floor(Math.random() * images.length)]
}

const MessageService = {
    createErrorMessage: (message) => {
        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                embeds: [
                    {
                        description: `${message}\n\nPlease contact <@223125131730485249> if you need help`,
                        color: YURI_COLOR
                    }
                ],
                flags: InteractionResponseFlags.EPHEMERAL
            }
        }
    },

    createCommandMessage: (command, sender, receiver) => {
        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: receiver,
                allowedMentions: {
                    parse: ["roles", "users"]
                },
                embeds: [
                    {
                        description: replaceSenderAndReceiverWithMentions(command.embed_text, sender, receiver),
                        image: {
                            url: getRandomImage(command.images_urls)
                        },
                        color: YURI_COLOR
                    },
                ]
            }
        }
    },

    createOfferMessage: (_command, _sender, _receiver) => {
        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                embeds: [
                    {
                        description: "Offering is not supported yet",
                        color: YURI_COLOR
                    }
                ],
                flags: InteractionResponseFlags.EPHEMERAL
            }
        }
    },

    createAskMessage: (_command, _sender, _receiver) => {
        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                embeds: [
                    {
                        description: "Asking is not supported yet",
                        color: YURI_COLOR
                    }
                ],
                flags: InteractionResponseFlags.EPHEMERAL
            }
        }
    }
}

export {MessageService}