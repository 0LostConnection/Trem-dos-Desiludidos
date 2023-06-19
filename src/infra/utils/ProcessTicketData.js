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
                const productsArray = interaction.values
                for (const product of productsArray) {
                    ticketsArray.push(
                        {
                            type: ticketType,
                            sellerId: interaction.user.id,
                            paymentMethod: paymentMethod,
                            product: {
                                id: product,
                                price: productsDB.obterPreco(product, 0)[paymentMethod]
                            }
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
                        product: {
                            id: interaction.customId,
                            price: productsDB.obterPreco(interaction.customId, 1)[paymentMethod]
                        },
                        message: interaction.fields.getTextInputValue('mensagem')
                    }
                )
                new TicketsDB().adicionarTicket(ticketsArray)
                break
        }
    }

    async enviarTicket(interaction, { ticketType, paymentMethod }) {
        const { EmbedBuilder } = require('discord.js')
        const { Colors, channels } = require('../../../config')
        const Buttons = require('./buttons')

        const getChannel = (channelId) => { return interaction.guild.channels.cache.get(channelId) }

        const sellersChannel = getChannel(channels.sellersChannelId)
        const productionChannel = getChannel(channels.productionChannelId)
        const backupChannel = getChannel(channels.backupChannelId)

        let ticketEmbed
        let minimizedTicketEmbed
        switch (ticketType) {
            case 0:
                const productsArray = interaction.values
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
                                "name": "Produto",
                                "value": `\`${productsDictionary[product]}\``
                            },
                            {
                                "name": "Método de pagamento",
                                "value": `\`${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}\``
                            }
                        ])
                        .setFooter({ text: `Desiludidos` })
                    await backupChannel.send({ embeds: [ticketEmbed] })
                    minimizedTicketEmbed = ticketEmbed.toJSON()
                    minimizedTicketEmbed.footer.text = interaction.user.id

                    sellersChannel.send({ content: `<@${interaction.user.id}>`, embeds: [minimizedTicketEmbed], components: [Buttons.sellerProductSent, Buttons.sellerProductNotSent] })
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
                            "name": "Mensagem + Observações",
                            "value": `\`${interaction.fields.getTextInputValue('mensagem')}\``
                        },
                        {
                            "name": "Método de pagamento",
                            "value": `\`${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}\``
                        }
                    ])
                    .setFooter({ text: `Correio Elegante` })
                await backupChannel.send({ embeds: [ticketEmbed] })

                minimizedTicketEmbed = ticketEmbed.toJSON()
                minimizedTicketEmbed.footer.text = interaction.user.id
                minimizedTicketEmbed.fields.splice(minimizedTicketEmbed.fields.findIndex(field => field.name == 'Comprador'), 1)
                minimizedTicketEmbed.fields.splice(minimizedTicketEmbed.fields.findIndex(field => field.name == 'Série do Comprador'), 1)
                minimizedTicketEmbed.fields.splice(minimizedTicketEmbed.fields.findIndex(field => field.name == 'Método de pagamento'), 1)

                productionChannel.send({ content: '<@&1114199414546907157>', embeds: [minimizedTicketEmbed], components: [Buttons.productDone] })
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
            sellingData[ticket.product.id] = 0
        }

        for (const [index, ticket] of Object.entries(this.ticketsData)) {
            sellingData[ticket.product.id] += 1
        }

        for (const [productId, totalSales] of Object.entries(sellingData)) {
            sellingsArray.push(`\`${productsDictionary[productId]}\` - \`${totalSales}\``)
        }

        return sellingsArray
    }

    calcularLucro(productId) {
        let moneyProfit = 0
        let pixProfit = 0
        let productSellingsMoney = 0
        let productSellingsPix = 0

        for (const [index, ticket] of Object.entries(this.ticketsData)) {
            if (ticket.product.id === productId && ticket.paymentMethod === 'money') {
                moneyProfit += Number(String(ticket.product.price.replace(',', '.')))
                productSellingsMoney += 1
            }
            if (ticket.product.id === productId && ticket.paymentMethod === 'pix') {
                pixProfit += Number(ticket.product.price.replace(',', '.'))
                productSellingsPix = 0
            }
        }
        const totalProfit = String(Number(moneyProfit) + Number(pixProfit))
        return { money: { profit: String(moneyProfit).replace('.', ','), total: productSellingsMoney }, pix: { profit: String(pixProfit).replace('.', ','), total: productSellingsPix }, totalProfit: totalProfit.replace('.', ',') }
    }

    totalDeVendas() {
        return this.ticketsData.length
    }
}