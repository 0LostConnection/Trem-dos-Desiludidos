const ParseProductJSON = require('../../infra/utils/ParseProductJSON')
const productsArray = new ParseProductJSON().getIdsArray()
const ProcessTicketData = require('../../infra/utils/ProcessTicketData')
const { enviarTicket, registrarTicket } = new ProcessTicketData()
const eventStructure = require(`../../infra/structures/EventStructure`)
const { Embeds } = require('../../../config')

module.exports = class extends eventStructure {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        })
    }

    run = (interaction) => {
        if (!interaction.isModalSubmit()) return

        const paymentDictionary = {
            'dinheiro': 'money',
            'pix': 'pix'
        }

        let paymentMethod

        if (productsArray.correio.includes(interaction.customId)) {
            paymentMethod = String(interaction.message.embeds[0].title)
            interaction.update({ embeds: [Embeds.SUCCESS('**Ticket Registrado!**')], components: [] })

            enviarTicket(interaction, { ticketType: 1, paymentMethod: paymentMethod.charAt(0).toLowerCase() + paymentMethod.slice(1) })
            registrarTicket(interaction, { ticketType: 1, paymentMethod: paymentDictionary[paymentMethod.charAt(0).toLowerCase() + paymentMethod.slice(1)] })
            return
        }

        if (productsArray.desiludidos.some(r => interaction.customId.replace('+', ' ').split(' ').includes(r))) {
            paymentMethod = String(interaction.message.embeds[0].title)
            interaction.update({ embeds: [Embeds.SUCCESS('**Ticket Registrado!**')], components: [] })

            enviarTicket(interaction, { ticketType: 0, paymentMethod: paymentMethod.charAt(0).toLowerCase() + paymentMethod.slice(1) })
            registrarTicket(interaction, { ticketType: 0, paymentMethod: paymentDictionary[paymentMethod.charAt(0).toLowerCase() + paymentMethod.slice(1)] })
            return
        }
    }
}