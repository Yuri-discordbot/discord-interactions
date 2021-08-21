import {CommandService} from "../services/commandService.js"
import {MessageService} from "../services/messageService.js"

const parseCommandOptions = (commandData) => {
    let options = {}

    for (let i = 0; i < commandData.options.length; i++) {
        options[commandData.options[i].name] = commandData.options[i].value
    }

    return options
}

const parseReceiver = (commandData, args) => {
    if (commandData.resolved.roles) {
        // receiver is a role
        return commandData.resolved.roles[args.receiver].name === "@everyone"
            ? "@everyone"
            : `<@&${args.receiver}>`
    } else if (commandData.resolved.users) {
        // receiver is a user
        return `<@${args.receiver}>`
    } else {
        return null
    }
}

const commandHandler = {
    handle: async (interaction) => {
        const command = await CommandService.findCommandByGuildIdAndName(interaction.guild_id, interaction.data.name)

        if (!command) {
            return MessageService.createErrorMessage(`The command ${interaction.data.name} was not found.`)
        }

        const args = parseCommandOptions(interaction.data)

        const sender = `<@${interaction.member.user.id}>`
        const receiver = parseReceiver(interaction.data, args)

        if (!args.options) {
            return MessageService.createCommandMessage(command, sender, receiver)
        }

        if (args.options === "offer") {
            return MessageService.createOfferMessage(command, sender, receiver)
        }

        if (args.options === "ask") {
            return MessageService.createAskMessage(command, sender, receiver)
        }
    }
}

export {commandHandler}