const eventStructure = require(`../../infra/structures/EventStructure`)
const { ModalBuilder } = require('discord.js');
const createModalComponent = require('../../infra/utils/createModalComponent')

module.exports = class extends eventStructure {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        })
    }

    run = async (interaction) => {
        if (!interaction.isStringSelectMenu()) return
        if (!interaction.client.config.productsTypes.includes(interaction.customId)) return

        const ticketVenda = new ModalBuilder()
            .setCustomId(interaction.values[0])
            .setTitle('Ticket de Registro de Venda')

        ticketVenda.addComponents(
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
                required: false,
                label: 'Mensagem'
            })
        )

        interaction.showModal(ticketVenda)
        /* interaction.update({ components: interaction.components })
        interaction.showModal(ticketVenda) */
    }
}