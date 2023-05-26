const { readFileSync } = require('fs')
const TicketsDB = require('./TicketsDB')
const ticketsDB = new TicketsDB(`${process.cwd()}/json/tickets.json`)
const ParseProductJSON = require('../../infra/utils/ParseProductJSON')
const productsDictionary = new ParseProductJSON().getDictionary()
const VendedorDB = require('../../infra/utils/VendedorDB')
const vendedorDB = new VendedorDB(`${process.cwd()}/json/tickets.json`)

module.exports = class ProcessTicketData {
    registrarTicket(interaction, ticketType) {
        switch (ticketType) {
            case 0:
                ticketsDB.adicionarTicket({
                    type: ticketType,
                    sellerId: interaction.user.id,
                    buyer: {
                        name: interaction.fields.getTextInputValue('comprador'),
                        number: interaction.fields.getTextInputValue('comprador:serie')
                    },
                    product: interaction.customId
                })
                break

            case 1:
                ticketsDB.adicionarTicket({
                    type: ticketType,
                    sellerId: interaction.user.id,
                    buyer: {
                        name: interaction.fields.getTextInputValue('comprador'),
                        number: interaction.fields.getTextInputValue('comprador:serie')
                    },
                    receiver: {
                        name: interaction.fields.getTextInputValue('destinatario'),
                        number: interaction.fields.getTextInputValue('destinatario:serie')
                    },
                    product: interaction.customId,
                    message: interaction.fields.getTextInputValue('mensagem')
                })
                break
        }
    }

    enviarTicket(ticketsChannel, backupChannel, interaction, ticketType) {
        const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
        const { Colors } = require('../../../config')

        const deleteButton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('delete')
                    .setStyle(ButtonStyle.Danger)
                    .setLabel('Cancelar esse ticket!')
            )

        let ticketEmbed = {}

        switch (ticketType) {
            case 0:
                ticketEmbed = new EmbedBuilder()
                    .setColor(Colors.dark.Purple)
                    .setTitle('Ticket de Registro de Venda')
                    .setFields([
                        {
                            "name": "Vendedor",
                            "value": `\`${vendedorDB.obterVendedor(interaction.user.id)?.name || interaction.user.username}\``
                        },
                        {
                            "name": "Comprador",
                            "value": `\`${interaction.fields.getTextInputValue('comprador')}\``,
                            "inline": true
                        },
                        {
                            "name": "Série do Comprador",
                            "value": `\`${interaction.fields.getTextInputValue('comprador:serie')}\``,
                            "inline": true
                        },
                        {
                            "name": "Produto",
                            "value": `\`${productsDictionary[interaction.customId]}\``
                        },
                    ])
                    .setFooter({ text: 'Desiludidos' })

                ticketsChannel.send({ embeds: [ticketEmbed], components: [deleteButton] })
                backupChannel.send({ embeds: [ticketEmbed] })
                break

            case 1:
                ticketEmbed = new EmbedBuilder()
                    .setColor(Colors.custom.Love)
                    .setTitle('Ticket de Registro de Venda')
                    .setFields([

                        {
                            "name": "Vendedor",
                            "value": `\`${vendedorDB.obterVendedor(interaction.user.id)?.name || interaction.user.username}\``
                        },
                        {
                            "name": "Comprador",
                            "value": `\`${interaction.fields.getTextInputValue('comprador')}\``,
                            "inline": true
                        },
                        {
                            "name": "Série do Comprador",
                            "value": `\`${interaction.fields.getTextInputValue('comprador:serie')}\``,
                            "inline": true
                        },
                        {
                            "name": "Produto",
                            "value": `\`${productsDictionary[interaction.customId]}\``
                        },
                        {
                            "name": "Destinatário",
                            "value": `\`${interaction.fields.getTextInputValue('destinatario')}\``,
                            "inline": true
                        },
                        {
                            "name": "Série do Destinatário",
                            "value": `\`${interaction.fields.getTextInputValue('destinatario:serie')}\``,
                            "inline": true
                        },
                        {
                            "name": "Mensagem",
                            "value": `\`${interaction.fields.getTextInputValue('mensagem')}\``
                        },
                    ])
                    .setFooter({ text: 'Correio' })
                ticketsChannel.send({ embeds: [ticketEmbed], components: [deleteButton] })
                backupChannel.send({ embeds: [ticketEmbed] })
                break
        }


    }

    vendasPorVendedor() {
        const ticketsJson = ticketsDB.obterTickets()
        let sellersArray = []
        let sellerData = {}

        for (const ticket of ticketsJson) {
            sellerData[ticket.sellerId] = 0
        }

        for (const ticket of ticketsJson) {
            sellerData[ticket.sellerId] += 1
        }

        for (const [sellerId, totalSales] of Object.entries(sellerData)) {
            sellersArray.push(`<@${sellerId}> - \`${totalSales}\``)
        }

        return sellersArray
    }

    totalDeVendas() {
        console.log(ticketsDB.obterTickets().length)
        return ticketsDB.obterTickets().length
    }
}