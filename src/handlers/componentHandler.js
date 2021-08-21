import {ComponentType} from "discord-api-types/v9"
import {MessageService} from "../services/messageService.js"
import {ButtonHandler} from "./buttonHandler.js"

const componentHandler = {
    handle: async (interaction) => {
        switch (interaction.data.component_type) {
        case ComponentType.ActionRow:
            return MessageService.createErrorMessage("This action is not supported.")
        case ComponentType.Button:
            return ButtonHandler.handle(interaction)
        case ComponentType.SelectMenu:
            return MessageService.createErrorMessage("This action is not supported.")
        }
    }
}

export {componentHandler}