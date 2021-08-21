import {
    AllowedMentionsTypes,
    ButtonStyle,
    ComponentType,
    InteractionResponseType,
    MessageFlags
} from "discord-api-types/v9"

const YURI_COLOR = 16755938

const MessageService = {
    createPongMessage: () => {
        return {
            type: InteractionResponseType.Pong
        }
    },

    createErrorMessage: (message) => {
        return {
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                embeds: [
                    {
                        description: `${message}\n\nPlease contact <@223125131730485249> if you need help`,
                        color: YURI_COLOR
                    }
                ],
                flags: MessageFlags.Ephemeral
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
                                style: ButtonStyle.Success,
                                label: "No",
                                custom_id: "decline_ask"
                            }
                        ]
                    }
                ]
            }
        }
    }
}

export {MessageService}