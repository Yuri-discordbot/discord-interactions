import {InteractionResponseType} from "discord-interactions"

const pingHandler = {
    handle: (_interaction) => {
        return {
            type: InteractionResponseType.PONG
        }
    }
}

export {pingHandler}