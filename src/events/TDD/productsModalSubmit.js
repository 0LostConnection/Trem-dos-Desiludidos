const ParseProductJSON = require('../../infra/utils/ParseProductJSON')
const productsArray = new ParseProductJSON().getIdsArray()
const ProcessTicketData = require('../../infra/utils/ProcessTicketData')
const { enviarTicket, registrarTicket } = new ProcessTicketData()
const eventStructure = require(`../../infra/structures/EventStructure`)
const { ticketsChannelId, backupChannelId } = require('../../../config')

module.exports = class extends eventStructure {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        })
    }

    run = async (interaction) => {
        if (!interaction.isModalSubmit()) return

        const backupChannel = interaction.guild.channels.cache.get(backupChannelId)
        const ticketsChannel = interaction.guild.channels.cache.get(ticketsChannelId)

        if (productsArray.desiludidos.some(r => interaction.customId.replace('+', ' ').split(' ').includes(r))) {
            try {
                interaction.message.edit({ components: interaction.message.components })
            } catch (error) {
                throw error
            }

            enviarTicket(ticketsChannel, backupChannel, interaction, 0)
            registrarTicket(interaction, 0)

            interaction.deferUpdate()
        }

        if (productsArray.correio.includes(interaction.customId)) {
            try {
                interaction.message.edit({ components: interaction.message.components })
            } catch (error) {
                throw error
            }

            enviarTicket(ticketsChannel, backupChannel, interaction, 1)
            registrarTicket(interaction, 1)

            interaction.deferUpdate()
        }
        return
    }
}