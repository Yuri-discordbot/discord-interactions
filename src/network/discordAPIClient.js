import axios from "axios"
import {environment} from "../env.js"

const client = axios.create({
    baseURL: "https://discord.com/api/v9",
    headers: {
        Authorization: `Bot ${environment.discordBotToken}`,
        "Content-Type": "application/json",
        Accepts: "application/json"
    }
})

const DiscordAPIClient = {
    patchMessage: async (message, patch) => {
        try {
            await client.patch(`/channels/${message.channel_id}/messages/${message.id}`, {patch})
        } catch (e) {
            console.warn(e)
        }
    },

    getChannelDetails: async (channelId) => {
        try {
            const response = await client.get(`/channels/${channelId}`)
            return response.data
        } catch (e) {
            console.warn(e)
            return null
        }
    }
}

export {DiscordAPIClient}