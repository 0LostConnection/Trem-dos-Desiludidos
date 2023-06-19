const eventStructure = require(`../../infra/structures/EventStructure`)
const { ModalBuilder, TextInputStyle } = require('discord.js');
const createModalComponent = require('../../infra/utils/createModalComponent')
const { Embeds } = require('../../../config')
const ProcessTicketData = require('../../infra/utils/ProcessTicketData')
const { enviarTicket, registrarTicket } = new ProcessTicketData()

module.exports = class extends eventStructure {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        })
    }

    run = async (interaction) => {
        if (!interaction.isStringSelectMenu()) return
        if (!interaction.client.config.productsTypes.includes(interaction.customId)) return

        switch (interaction.customId) {
            case 'produtos:correio':
                const ticketVendaCorreio = new ModalBuilder()
                    .setCustomId(interaction.values[0])
                    .setTitle('Ticket de Registro de Venda')

                ticketVendaCorreio.addComponents(
                    createModalComponent({
                        customId: 'comprador',
                        required: true,
                        label: 'Comprador'
                    }),
                    createModalComponent({
                        customId: 'comprador:serie',
                        required: true,
                        label: 'Série do Comprador'
                    }),
                    createModalComponent({
                        customId: 'destinatario',
                        required: true,
                        label: 'Destinatário'
                    }),
                    createModalComponent({
                        customId: 'destinatario:serie',
                        required: true,
                        label: 'Série do Destinatário'
                    }),
                    createModalComponent({
                        customId: 'mensagem',
                        required: true,
                        label: 'Mensagem + Observações',
                        style: TextInputStyle.Paragraph
                    })
                )

                interaction.showModal(ticketVendaCorreio)
                break
            case 'produtos:desiludidos':
                const paymentDictionary = {
                    'dinheiro': 'money',
                    'pix': 'pix'
                }
                const paymentMethod = String(interaction.message.embeds[0].title)
                interaction.update({ embeds: [Embeds.SUCCESS('**Ticket Registrado!**')], components: [] })

                enviarTicket(interaction, { ticketType: 0, paymentMethod: paymentMethod.charAt(0).toLowerCase() + paymentMethod.slice(1) })
                registrarTicket(interaction, { ticketType: 0, paymentMethod: paymentDictionary[paymentMethod.charAt(0).toLowerCase() + paymentMethod.slice(1)] })
                break
        }

        /* interaction.update({ components: interaction.components })
        interaction.showModal(ticketVenda) */
    }
}