import gql from "graphql-tag"
import {GraphQLClient} from "graphql-request"
import {environment} from "../env.js"

const client = new GraphQLClient(`${environment.apiBaseUrl}/v1/graphql`)

const YuriAPIClient = {
    getGuildIdFromDiscordId: async (guildDiscordId) => {
        const query = gql`
            query ($guildDiscordId: String!) {
                guildByDiscordId(discord_id: $guildDiscordId) {
                    id
                }
            }
        `

        try {
            const data = await client.request(query, {guildDiscordId})
            return data.guildByDiscordId.id
        } catch (e) {
            console.warn(e)
            return null
        }
    },

    getCommandByGuildIdAndName: async (guildId, name) => {
        const query = gql`
            query ($guildId: ID!, $name: String!) {
                commandInGuildByName(guild_id: $guildId, name: $name) {
                    id
                    name
                    embed_text
                    images_urls
                    nsfw
                }
            }
        `

        try {
            const data = await client.request(query, {guildId, name})
            return data.commandInGuildByName
        } catch (e) {
            console.warn(e)
            return null
        }
    }
}

export {YuriAPIClient}