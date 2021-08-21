import {YuriAPIClient} from "../network/yuriAPIClient.js"

const discordIdToGuildIdMap = {}

const GuildService = {
    getGuildIdFromDiscordId: async (guildDiscordId) => {
        let guildId = discordIdToGuildIdMap[guildDiscordId]

        if (!guildId) {
            guildId = await YuriAPIClient.getGuildIdFromDiscordId(guildDiscordId)

            if (!guildId) {
                console.warn(`Could not retrieve guild with discord id ${guildDiscordId}`)
                return null
            }

            discordIdToGuildIdMap[guildDiscordId] = guildId
        }

        return guildId
    }
}

export {GuildService}