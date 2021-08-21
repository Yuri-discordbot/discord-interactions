import {pingHandler} from "./pingHandler.js"
import {commandHandler} from "./commandHandler.js"
import {componentHandler} from "./componentHandler.js"
import {InteractionType} from "discord-api-types"

const interactionHandler = {
    handle: async (interaction) => {
        switch (interaction.type) {
        case InteractionType.Ping:
            return pingHandler.handle(interaction)

        case InteractionType.ApplicationCommand:
            return commandHandler.handle(interaction)

        case InteractionType.MessageComponent:
            return componentHandler.handle(interaction)

        default:
            console.warn(`unhandled interaction type ${interaction.type}`)
            return {}
        }
    }
}

export {interactionHandler}