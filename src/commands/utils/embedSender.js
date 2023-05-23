const Command = require('../../infra/structures/CommandStructure')
const { PermissionFlagsBits } = require('discord.js')
const ValidateJson = require('../../infra/utils/ValidateJSON')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'webhook',
            description: 'Envia um embed baseado no código JSON provido.',
            disabled: false,
            default_member_permissions: Number(PermissionFlagsBits.ManageGuild),
            dm_permission: false,
            options: [
                {
                    type: 7,
                    name: 'canal',
                    description: 'Canal para enviar a mensagem embed.',
                    required: true
                },
                {
                    type: 3,
                    name: 'json',
                    description: 'Código JSON da mensagem.',
                    required: true
                },
                {
                    type: 3,
                    name: 'forum',
                    description: 'ID do fórum.',
                    required: false
                }
            ]
        })
    }

    run = async (interaction) => {
        // Get channel object with channelId
        let data = {}
        const channelId = interaction.options.getChannel('canal').id
        const channelObj = interaction.guild.channels.cache.get(channelId)
        
        // Validate JSON. If true, return the parsed JSON object
        const optionsJson = ValidateJson(interaction.options.getString('json'))
        if (optionsJson) {
            data.embeds = [optionsJson]
        } else {
            interaction.reply({ content: `**Ocorreu um erro:**\nO JSON não é válido!`, ephemeral: true })
            return
        }

        // Check if the forum id provided is really a forum channel
        const forumId = interaction.options.getString('forum')
        if (forumId) {
            if (channelObj.type !== 15) return interaction.reply({ content: `**Ocorreu um erro:**\nO canal provido não é um fórum!`, ephemeral: true })
            data.threadId = forumId
        }

        // Check if the provided channel is a category
        if(channelObj.type == 4) return interaction.reply({ content: `**Ocorreu um erro:**\n${channelObj} não é um canal!`, ephemeral: true })

        const webhooks = await channelObj.fetchWebhooks()
        const webhook = webhooks.first()
        if (!webhook) return interaction.reply({ content: '**Ocorreu um erro:**\nO canal não possui webhooks.', ephemeral: true })

        console.log(data)
        webhook.send(data)
            .then(() => {
                interaction.reply({ content: `Embed enviado! Confira: ${channelObj}`, ephemeral: true })
            })
            .catch(err => {
                interaction.reply({ content: `**Ocorreu um erro:**\n${err.message}`, ephemeral: true })
                console.log(err)
            })
    }
}