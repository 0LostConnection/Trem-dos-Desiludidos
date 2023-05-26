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
                        required: false,
                        label: 'Mensagem'
                    })
                )

                interaction.showModal(ticketVendaCorreio)
                break
            case 'produtos:desiludidos':
                const ticketVendaDesiludido = new ModalBuilder()
                    .setCustomId(interaction.values.join('+'))
                    .setTitle('Ticket de Registro de Venda')

                ticketVendaDesiludido.addComponents(
                    createModalComponent({
                        customId: 'comprador',
                        required: true,
                        label: 'Comprador'
                    }),
                    createModalComponent({
                        customId: 'comprador:serie',
                        required: true,
                        label: 'Série do Comprador'
                    })
                )

                interaction.showModal(ticketVendaDesiludido)
                break
        }

        /* interaction.update({ components: interaction.components })
        interaction.showModal(ticketVenda) */
    }
}