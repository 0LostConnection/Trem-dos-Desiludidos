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

const productsArray = [
    'pirulito',
    'bombom',
    'bombom+pirulito',
    'bombom+fini',
    'brigadeiro',
    'brigadeiro+pirulito',
    'brigadeiro+fini',
    '2+brigadeiros',
    'direct',
    'bilhete',
    'bilhete+pirulito',
    'bilhete+bombom',
    'bilhete+bombom+pirulito',
    'bilhete+brigadeiro',
    'bilhete+brigadeiro+pirulito',
    'bilhete+brigadeiro+fini'
]

const eventStructure = require(`../../infra/structures/EventStructure`)
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { Colors, ticketsChannelId, backupChannelId } = require('../../../config')

const deleteButton = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('delete')
            .setStyle(ButtonStyle.Danger)
            .setLabel('Cancelar esse ticket!')
    )

module.exports = class extends eventStructure {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        })
    }

    run = async (interaction) => {
        if (!interaction.isModalSubmit()) return
        if (!productsArray.includes(interaction.customId)) return

        const backupChannel = interaction.guild.channels.cache.get(backupChannelId)
        const ticketsChannel = interaction.guild.channels.cache.get(ticketsChannelId)
        const ticketEmbed = new EmbedBuilder()
            .setColor(Colors.dark.Blue)
            .setTitle('Ticket de Registro de Venda')
            .setFields(
                {
                    "name": "Vendedor",
                    "value": interaction.user.username
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
            )
        if (interaction.fields.getTextInputValue('mensagem')) ticketEmbed.setDescription(`**Mensagem**\n${interaction.fields.getTextInputValue('mensagem')}`)

        ticketsChannel.send({ embeds: [ticketEmbed], components: [deleteButton] })
        backupChannel.send({ embeds: [ticketEmbed] })
        interaction.deferUpdate()
    }
}