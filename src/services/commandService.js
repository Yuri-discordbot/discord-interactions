import {GuildService} from "./guildService.js"
import {YuriAPIClient} from "../network/yuriAPIClient.js"

const CommandService = {
    findCommandByGuildIdAndName: async (guildDiscordId, name) => {
        const guildId = await GuildService.getGuildIdFromDiscordId(guildDiscordId)

        if (!guildId) {
            return null
        }

        return YuriAPIClient.getCommandByGuildIdAndName(guildId, name)
    }
}

export {CommandService}