const productsDictionary = {
    "pirulito": "Pirulito",
    "bombom": "Bombom",
    "bombom+pirulito": "Bombom + Pirulito",
    "bombom+fini": "Bombom + Fini",
    "brigadeiro": "Brigadeiro",
    "brigadeiro+pirulito": "Brigadeiro + Pirulito",
    "brigadeiro+fini": "Brigadeiro + Fini",
    "2+brigadeiros": "2 Brigadeiros",
    "direct": "Mensagem Direct",
    "bilhete": "Bilhete",
    "bilhete+pirulito": "Bilhete + Pirulito",
    "bilhete+bombom": "Bilhete + Bombom",
    "bilhete+bombom+pirulito": "Bilhete + Bombom + Pirulito",
    "bilhete+brigadeiro": "Bilhete + Brigadeiro",
    "bilhete+brigadeiro+pirulito": "Bilhete + Brigadeiro + Pirulito",
    "bilhete+brigadeiro+fini": "Bilhete + Brigadeiro + Fini"
}

const productsArray = {
    desiludidos: [
        'pirulito',
        'bombom',
        'bombom+pirulito',
        'bombom+fini',
        'brigadeiro',
        'brigadeiro+pirulito',
        'brigadeiro+fini',
        '2+brigadeiros',
    ],
    correio: [
        'direct',
        'bilhete',
        'bilhete+pirulito',
        'bilhete+bombom',
        'bilhete+bombom+pirulito',
        'bilhete+brigadeiro',
        'bilhete+brigadeiro+pirulito',
        'bilhete+brigadeiro+fini'
    ]
}

const eventStructure = require(`../../infra/structures/EventStructure`)
const VendedorDB = require('../../infra/utils/VendedorDB')
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { Colors, ticketsChannelId, backupChannelId } = require('../../../config')

const deleteButton = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('delete')
            .setStyle(ButtonStyle.Danger)
            .setLabel('Cancelar esse ticket!')
    )

const sendTicket = ({ fields, footer, ticketsChannel, backupChannel }) => {
    const ticketEmbed = new EmbedBuilder()
        .setColor(Colors.dark.Blue)
        .setTitle('Ticket de Registro de Venda')
        .setFields(fields)
        .setFooter({ text: footer })

    ticketsChannel.send({ embeds: [ticketEmbed], components: [deleteButton] })
    backupChannel.send({ embeds: [ticketEmbed] })
}

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

        const Database = new VendedorDB(`${process.cwd()}/sellers.json`)
        const sellerName = Database.obterVendedor(interaction.user.id)?.name || interaction.user.username

        if (productsArray.desiludidos.includes(interaction.customId)) {
            try {
                interaction.message.edit({ components: interaction.message.components })
            } catch (error) {
                throw error
            }

            sendTicket({
                ticketsChannel: ticketsChannel,
                backupChannel: backupChannel,
                footer: 'Desiludidos',
                fields: [
                    {
                        "name": "Vendedor",
                        "value": sellerName
                    },
                    {
                        "name": "Comprador",
                        "value": interaction.fields.getTextInputValue('comprador'),
                        "inline": true
                    },
                    {
                        "name": "Série do Comprador",
                        "value": interaction.fields.getTextInputValue('comprador:serie'),
                        "inline": true
                    },
                    {
                        "name": "Produto",
                        "value": productsDictionary[interaction.customId]
                    },
                ]
            })
            interaction.deferUpdate()
        }
        if (productsArray.correio.includes(interaction.customId)) {
            try {
                interaction.message.edit({ components: interaction.message.components })
            } catch (error) {
                throw error
            }

            sendTicket({
                ticketsChannel: ticketsChannel,
                backupChannel: backupChannel,
                footer: 'Correio',
                fields: [
                    {
                        "name": "Produto",
                        "value": interaction.fields.getTextInputValue('mensagem')
                    },
                    {
                        "name": "Vendedor",
                        "value": sellerName
                    },
                    {
                        "name": "Comprador",
                        "value": interaction.fields.getTextInputValue('comprador'),
                        "inline": true
                    },
                    {
                        "name": "Série do Comprador",
                        "value": interaction.fields.getTextInputValue('comprador:serie'),
                        "inline": true
                    },
                    {
                        "name": "Produto",
                        "value": productsDictionary[interaction.customId]
                    },
                    {
                        "name": "Destinatário",
                        "value": interaction.fields.getTextInputValue('destinatario'),
                        "inline": true
                    },
                    {
                        "name": "Série do Destinatário",
                        "value": interaction.fields.getTextInputValue('destinatario:serie'),
                        "inline": true
                    },
                ]
            })
            interaction.deferUpdate()
        }
        return
    }
}