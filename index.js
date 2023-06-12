const DiscordClientHandler = require('./src/infra/structures/DiscordClientHandler')
const { GatewayIntentBits } = require('discord.js')
require('dotenv').config({ path: './release.env' })

const botInstance = new DiscordClientHandler({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages
    ]
})

botInstance.config = require('./config.js')
botInstance.login(process.env.BOT_TOKEN)