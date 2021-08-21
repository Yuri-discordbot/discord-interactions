import {InteractionResponseType, InteractionResponseFlags} from "discord-interactions"

const componentHandler = {
    handle: (_interaction) => {
        return {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: "Button pressed",
                flags: InteractionResponseFlags.EPHEMERAL
            }
        }
    }
}

export {componentHandler}