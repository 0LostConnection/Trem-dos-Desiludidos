const ParseProductJSON = require('../../infra/utils/ParseProductJSON')
const productsDictionary = new ParseProductJSON().getDictionary()
const VendedorDB = require('../../infra/utils/VendedorDB')
const vendedorDB = new VendedorDB(`${process.cwd()}/json/sellers.json`)
const ProductsDB = require('../../infra/utils/ProductsDB')
const productsDB = new ProductsDB(`${process.cwd()}/json/products.json`)
const TicketsDB = require('../../database/TicketsDB')


module.exports = class ProcessTicketData {
    constructor(ticketsData) {
        this.ticketsData = ticketsData
    }

    registrarTicket(interaction, { ticketType, paymentMethod }) {
        let ticketsArray = []

        switch (ticketType) {
            case 0:
                const productsArray = interaction.customId.replace(/\+/g, ' ').split(' ')
                for (const product of productsArray) {
                    ticketsArray.push(
                        {
                            type: ticketType,
                            sellerId: interaction.user.id,
                            paymentMethod: paymentMethod,
                            buyer: {
                                name: interaction.fields.getTextInputValue('comprador'),
                                number: interaction.fields.getTextInputValue('comprador:serie')
                            },
                            product: product
                        }
                    )
                }
                new TicketsDB().adicionarTicket(ticketsArray)
                break

            case 1:
                ticketsArray.push(
                    {
                        type: ticketType,
                        sellerId: interaction.user.id,
                        paymentMethod: paymentMethod,
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
                    }
                )
                new TicketsDB().adicionarTicket(ticketsArray)
                break
        }
    }

    enviarTicket(ticketsChannel, backupChannel, interaction, { ticketType, paymentMethod }) {
        const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
        const { Colors } = require('../../../config')

        const deleteButton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('delete')
                    .setStyle(ButtonStyle.Danger)
                    .setLabel('Cancelar esse ticket!')
            )

        let ticketEmbed = []
        switch (ticketType) {
            case 0:
                const productsArray = interaction.customId.replace(/\+/g, ' ').split(' ')
                for (const product of productsArray) {
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
                                "value": `\`${productsDictionary[product]}\``
                            },
                            {
                                "name": "Método de pagamento",
                                "value": `\`${paymentMethod}\``
                            }
                        ])
                        .setFooter({ text: 'Desiludidos' })


                    ticketsChannel.send({ embeds: [ticketEmbed], components: [deleteButton] })
                    backupChannel.send({ embeds: [ticketEmbed] })
                }
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
                        {
                            "name": "Método de pagamento",
                            "value": `\`${paymentMethod}\``
                        }
                    ])
                    .setFooter({ text: 'Correio' })
                ticketsChannel.send({ embeds: [ticketEmbed], components: [deleteButton] })
                backupChannel.send({ embeds: [ticketEmbed] })
                break
        }
    }

    vendasPorVendedor() {
        let sellersArray = []
        let sellerData = {}

        for (const [index, ticket] of Object.entries(this.ticketsData)) {
            sellerData[ticket.sellerId] = 0
        }

        for (const [index, ticket] of Object.entries(this.ticketsData)) {
            sellerData[ticket.sellerId] += 1
        }

        for (const [sellerId, totalSales] of Object.entries(sellerData)) {
            sellersArray.push(`${vendedorDB.obterVendedor(sellerId)?.name ? `\`${vendedorDB.obterVendedor(sellerId)?.name}\`` : `<@${sellerId}>`} - \`${totalSales}\``)
        }

        return sellersArray
    }

    vendasPorProduto() {
        let sellingsArray = []
        let sellingData = {}

        for (const [index, ticket] of Object.entries(this.ticketsData)) {
            sellingData[ticket.product] = 0
        }

        for (const [index, ticket] of Object.entries(this.ticketsData)) {
            sellingData[ticket.product] += 1
        }

        for (const [productId, totalSales] of Object.entries(sellingData)) {
            sellingsArray.push(`\`${productsDictionary[productId]}\` - \`${totalSales}\``)
        }

        return sellingsArray
    }

    calcularLucro(productId, type) {
        const productPrice = productsDB.obterPreco(productId, type)

        let productSellings = 0

        for (const [index, ticket] of Object.entries(this.ticketsData)) {
            if (ticket.product === productId) {
                productSellings += 1
            }
        }

        return { min: String(productSellings * Number(productPrice.pix.replace(',', '.'))).replace('.', ','), max: String(productSellings * Number(productPrice.money.replace(',', '.'))).replace('.', ','), total: productSellings }
    }

    totalDeVendas() {
        return this.ticketsData.length
    }
}