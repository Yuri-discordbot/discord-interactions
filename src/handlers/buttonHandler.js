import {CommandService} from "../services/commandService.js"
import {MessageService} from "../services/messageService.js"

const parseReceiverMention = (message) => {
    const lastMentionInMessageStart = message.lastIndexOf("<@") + 2
    const lastMentionInMessageEnd = message.lastIndexOf(">")

    if (lastMentionInMessageStart === 2) {
        // there is no 2nd mention, probably everyone
        return null
    }

    return message.substring(lastMentionInMessageStart, lastMentionInMessageEnd)
}

const ButtonHandler = {
    handle: async (interaction) => {
        const clickerId = interaction.member.user.id
        const receiverMention = parseReceiverMention(interaction.message.embeds[0].description)

        let messageWasForSpecificUser = false
        let canUserClick = false

        if (receiverMention === null) {
            canUserClick = true
        } else if (receiverMention[0] === "&") {
            interaction.member.roles.forEach(role => {
                if (receiverMention.substring(1) === role) {
                    canUserClick = true
                }
            })
        } else if (receiverMention === clickerId) {
            canUserClick = true
            messageWasForSpecificUser = true
        }

        if (canUserClick) {
            const command = await CommandService.findCommandByGuildIdAndName(interaction.guild_id, interaction.message.interaction.name)

            switch (interaction.data.custom_id) {

            case "accept_offer":
                if (messageWasForSpecificUser) {
                    await MessageService.removeComponentsFromMessage(interaction.message)
                }

                return MessageService.createCommandMessage(command, `<@${interaction.message.interaction.user.id}>`, `<@${clickerId}>`)

            case "accept_ask":
                if (messageWasForSpecificUser) {
                    await MessageService.removeComponentsFromMessage(interaction.message)
                }

                return MessageService.createCommandMessage(command, `<@${clickerId}>`, `<@${interaction.message.interaction.user.id}>`)

            case "decline_offer": // fall through
            case "decline_ask":
                if (messageWasForSpecificUser) {
                    return MessageService.createReplacementMessage(`<@${clickerId}> declined the offer.`)
                } else {
                    return MessageService.createTextMessage("You declined the offer.", true)
                }

            default:
                return MessageService.createErrorMessage("This button is not supported yet.")
            }
        } else {
            return MessageService.createTextMessage("You cannot click that button", true)
        }
    }
}

export {ButtonHandler}