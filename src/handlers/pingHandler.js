import {MessageService} from "../services/messageService.js"

const pingHandler = {
    handle: (_interaction) => {
        return MessageService.createPongMessage()
    }
}

export {pingHandler}