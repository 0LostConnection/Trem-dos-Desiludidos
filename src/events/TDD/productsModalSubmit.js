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

    run = (interaction) => {
        if (!interaction.isModalSubmit()) return

        const backupChannel = interaction.guild.channels.cache.get(backupChannelId)
        const ticketsChannel = interaction.guild.channels.cache.get(ticketsChannelId)
        const paymentMethod = String(interaction.message.embeds[0].title)

        if (productsArray.correio.includes(interaction.customId)) {
            interaction.update({ embeds: [interaction.client.config.Embeds.SUCCESS('**Ticket Registrado!**')], components: [] })

            enviarTicket(ticketsChannel, backupChannel, interaction, { ticketType: 1, paymentMethod: paymentMethod.charAt(0).toLowerCase() + paymentMethod.slice(1) })
            registrarTicket(interaction, { ticketType: 1, paymentMethod: paymentMethod.charAt(0).toLowerCase() + paymentMethod.slice(1) })
        }

        if (productsArray.desiludidos.some(r => interaction.customId.replace('+', ' ').split(' ').includes(r))) {
            interaction.update({ embeds: [interaction.client.config.Embeds.SUCCESS('**Ticket Registrado!**')], components: [] })

            enviarTicket(ticketsChannel, backupChannel, interaction, { ticketType: 0, paymentMethod: paymentMethod.charAt(0).toLowerCase() + paymentMethod.slice(1) })
            registrarTicket(interaction, { ticketType: 0, paymentMethod: paymentMethod.charAt(0).toLowerCase() + paymentMethod.slice(1) })
        }
    }
}