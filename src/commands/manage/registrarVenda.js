const Command = require('../../infra/structures/CommandStructure')
const { PermissionFlagsBits, EmbedBuilder } = require('discord.js')
const { Colors, channels, Embeds } = require('../../../config')
const ParseProductJSON = require('../../infra/utils/ParseProductJSON')
const productsChoices = new ParseProductJSON().createProductsChoices()
const productsDictionary = new ParseProductJSON().getDictionary()
const TicketsDB = require('../../database/TicketsDB')
const VendedorDB = require('../../infra/utils/VendedorDB')
const vendedorDB = new VendedorDB(`${process.cwd()}/json/sellers.json`)
const Buttons = require('../../infra/utils/buttons')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'registrar-venda',
            description: 'Registra uma venda personalizada',
            dm_permission: false,
            default_member_permissions: Number(PermissionFlagsBits.ManageRoles),
            options: [
                {
                    type: 1,
                    name: 'desiludidos',
                    description: 'Loja dos Desiludidos',
                    options: [
                        {
                            type: 3,
                            name: 'produto',
                            description: 'Produtos da loja dos desiludidos',
                            required: true,
                            choices: productsChoices.desiludidos
                        },
                        {
                            type: 3,
                            name: 'método-pagamento',
                            description: 'Qual o método de pagamento da compra?',
                            required: true,
                            choices: [
                                {
                                    name: 'Dinheiro',
                                    value: 'money'
                                },
                                {
                                    name: 'PIX',
                                    value: 'pix'
                                }
                            ]
                        },
                        {
                            type: 10,
                            name: 'preço',
                            description: 'O preço do produto em R$ - Utilize pontos ao invés de vírgula!',
                            required: true
                        },
                        {
                            type: 3,
                            name: 'comprador',
                            description: 'Comprador do produto',
                            required: true
                        },
                        {
                            type: 3,
                            name: 'série-comprador',
                            description: 'Série do comprador',
                            required: true
                        }
                    ]
                },
                {
                    type: 1,
                    name: 'correio',
                    description: 'Loja do Correio Elegante',
                    options: [
                        {
                            type: 3,
                            name: 'produto',
                            description: 'Produtos da loja dos desiludidos',
                            required: true,
                            choices: productsChoices.correio
                        },
                        {
                            type: 3,
                            name: 'método-pagamento',
                            description: 'Qual o método de pagamento da compra?',
                            required: true,
                            choices: [
                                {
                                    name: 'Dinheiro',
                                    value: 'money'
                                },
                                {
                                    name: 'PIX',
                                    value: 'pix'
                                }
                            ]
                        },
                        {
                            type: 10,
                            name: 'preço',
                            description: 'O preço do produto em R$ - Utilize pontos ao invés de vírgula!',
                            required: true
                        },
                        {
                            type: 3,
                            name: 'comprador',
                            description: 'Comprador do produto',
                            required: true
                        },
                        {
                            type: 3,
                            name: 'série-comprador',
                            description: 'Série do comprador',
                            required: true
                        },
                        {
                            type: 3,
                            name: 'destinatário',
                            description: 'Destinatário do produto',
                            required: true
                        },
                        {
                            type: 3,
                            name: 'série-destinatário',
                            description: 'Série do destinatário do produto',
                            required: true
                        },
                        {
                            type: 3,
                            name: 'mensagem',
                            description: 'Mensagem + Observaçẽs',
                            required: true
                        }
                    ]
                },
            ]
        })
    }

    run = async (interaction) => {
        // Functions
        const getChannel = (channelId) => { return interaction.guild.channels.cache.get(channelId) }

        // Dictionaries
        const paymentDictionary = { 'Money': 'dinheiro', 'Pix': 'pix' }
        const typeDictionary = { 'desiludidos': 0, 'correio': 1 }

        // Selling details
        const productType = typeDictionary[interaction.options.getSubcommand()]
        const product = {
            id: interaction.options.getString('produto'),
            price: interaction.options.getNumber('preço')
        }
        const paymentMethod = interaction.options.getString('método-pagamento')
        const buyer = {
            name: interaction.options.getString('comprador'),
            number: interaction.options.getString('série-comprador')
        }

        // Channels
        const backupChannel = getChannel(channels.backupChannelId)

        // Ticket / Embeds
        let ticketsArray = []
        let ticketEmbed
        let minimizedTicketEmbed

        switch (productType) {
            case 0:
                // Insert ticket on database
                ticketsArray.push(
                    {
                        type: productType,
                        sellerId: interaction.user.id,
                        paymentMethod: paymentMethod,
                        buyer: {
                            name: buyer.name,
                            number: buyer.number
                        },
                        product: {
                            id: product.id,
                            price: String(product.price)
                        }
                    }
                )
                await new TicketsDB().adicionarTicket(ticketsArray)

                // Sending ticket embed to channels the channels
                ticketEmbed = new EmbedBuilder()
                    .setColor(Colors.custom.Emerald)
                    .setTitle('Ticket de Registro de Venda')
                    .setFields([
                        {
                            "name": "Vendedor",
                            "value": `\`${vendedorDB.obterVendedor(interaction.user.id)?.name || interaction.user.username}\``
                        },
                        {
                            "name": "Comprador",
                            "value": `\`${buyer.name}\``,
                            "inline": true
                        },
                        {
                            "name": "Série do Comprador",
                            "value": `\`${buyer.number}\``,
                            "inline": true
                        },
                        {
                            "name": "Produto",
                            "value": `\`${productsDictionary[product.id]}\``
                        },
                        {
                            "name": "Método de pagamento",
                            "value": `\`${paymentDictionary[paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)]} R$${product.price}\``
                        }
                    ])
                    .setFooter({ text: `Desiludidos` })
                // Sending embed to backup channel
                await backupChannel.send({ embeds: [ticketEmbed] })

                // Edit embed details
                minimizedTicketEmbed = ticketEmbed.toJSON()
                minimizedTicketEmbed.footer.text = interaction.user.id

                // Sending modifield embed to sellers channel
                const sellersChannel = getChannel(channels.sellersChannelId)
                sellersChannel.send({ content: `<@${interaction.user.id}>`, embeds: [minimizedTicketEmbed], components: [Buttons.sellerProductSent, Buttons.sellerProductNotSent] })

                interaction.reply({ embeds: [Embeds.SUCCESS('**Ticket Registrado!**')], ephemeral: true })
                break
            case 1:
                // Specifg Selling Details
                const receiver = {
                    name: interaction.options.getString('destinatário'),
                    number: interaction.options.getString('série-destinatário')
                }
                const message = interaction.options.getString('mensagem')

                // Insert ticket on database
                ticketsArray.push(
                    {
                        type: productType,
                        sellerId: interaction.user.id,
                        paymentMethod: paymentMethod,
                        buyer: {
                            name: buyer.name,
                            number: buyer.number
                        },
                        receiver: {
                            name: receiver.name,
                            number: receiver.number
                        },
                        product: {
                            id: product.id,
                            price: String(product.price)
                        },
                        message: message
                    }
                )
                await new TicketsDB().adicionarTicket(ticketsArray)

                // Sending ticket embed to channels the channels
                ticketEmbed = new EmbedBuilder()
                    .setColor(Colors.custom.Emerald)
                    .setTitle('Ticket de Registro de Venda')
                    .setFields([
                        {
                            "name": "Vendedor",
                            "value": `\`${vendedorDB.obterVendedor(interaction.user.id)?.name || interaction.user.username}\``
                        },
                        {
                            "name": "Comprador",
                            "value": `\`${buyer.name}\``,
                            "inline": true
                        },
                        {
                            "name": "Série do Comprador",
                            "value": `\`${buyer.number}\``,
                            "inline": true
                        },
                        {
                            "name": "Produto",
                            "value": `\`${productsDictionary[product.id]}\``
                        },
                        {
                            "name": "Destinatário",
                            "value": `\`${receiver.name}\``,
                            "inline": true
                        },
                        {
                            "name": "Série do Destinatário",
                            "value": `\`${receiver.number}\``,
                            "inline": true
                        },
                        {
                            "name": "Mensagem + Observações",
                            "value": `\`${message}\``
                        },
                        {
                            "name": "Método de pagamento",
                            "value": `\`${paymentDictionary[paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)]} R$${product.price}\``
                        }
                    ])
                    .setFooter({ text: `Desiludidos` })
                // Sending embed to backup channel
                await backupChannel.send({ embeds: [ticketEmbed] })
                
                // Edit embed details
                minimizedTicketEmbed = ticketEmbed.toJSON()
                minimizedTicketEmbed.footer.text = interaction.user.id
                minimizedTicketEmbed.fields.splice(minimizedTicketEmbed.fields.findIndex(field => field.name == 'Comprador'), 1)
                minimizedTicketEmbed.fields.splice(minimizedTicketEmbed.fields.findIndex(field => field.name == 'Série do Comprador'), 1)

                // Sending modifield embed to sellers channel
                const productionChannel = getChannel(channels.productionChannelId)
                productionChannel.send({ content: '<@&1114199414546907157>', embeds: [minimizedTicketEmbed], components: [Buttons.productDone] })

                interaction.reply({ embeds: [Embeds.SUCCESS('**Ticket Registrado!**')], ephemeral: true })
                break
        }

    }
}