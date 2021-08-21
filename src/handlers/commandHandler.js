import {InteractionResponseType, InteractionResponseFlags} from "discord-interactions"

const commandHandler = {
    handle: (_interaction) => {
        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: "Message received",
                flags: InteractionResponseFlags.EPHEMERAL
            }
        }
    }
}

export {commandHandler}