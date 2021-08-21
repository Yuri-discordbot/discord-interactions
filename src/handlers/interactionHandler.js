import {pingHandler} from "./pingHandler.js"
import {commandHandler} from "./commandHandler.js"
import {componentHandler} from "./componentHandler.js"
import {InteractionType} from "discord-interactions"

const interactionHandler = {
    handle: async (interaction) => {
        switch (interaction.type) {
        case InteractionType.PING:
            return pingHandler.handle(interaction)

        case InteractionType.APPLICATION_COMMAND:
            return commandHandler.handle(interaction)

        case InteractionType.MESSAGE_COMPONENT:
            return componentHandler.handle(interaction)

        default:
            console.warn(`unhandled interaction type ${interaction.type}`)
            return {}
        }
    }
}

export {interactionHandler}