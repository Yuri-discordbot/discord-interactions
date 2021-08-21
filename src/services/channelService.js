import {DiscordAPIClient} from "../network/discordAPIClient.js"

let knownChannels = {}

const ChannelService = {
    isChannelNSFW: async (channelId) => {
        let channel = knownChannels[channelId]
        if (!channel) {
            channel = await DiscordAPIClient.getChannelDetails(channelId)

            if (!channel) {
                return null
            }

            knownChannels[channelId] = channel
        }

        return channel.nsfw
    }
}

export {ChannelService}