const environment = {
    publicDiscordApplicationKey: process.env.PUBLIC_DISCORD_APPLICATION_KEY,
    apiBaseUrl: process.env.API_BASE_URL,
    discordBotToken: process.env.DISCORD_BOT_TOKEN
}

for (const [key, value] of Object.entries(environment)) {
    if (!value) {
        throw new Error(`${key} environment variable is not set.`)
    }
}

export {environment}
