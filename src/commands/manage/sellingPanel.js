const Command = require('../../infra/structures/CommandStructure')
const CreateSelectMenuOptions = require('../../infra/utils/CreateSelectMenuOptions')
const { Colors } = require('../../../config')
const { PermissionFlagsBits, ActionRowBuilder, EmbedBuilder, } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'enviar-painel-de-vendas',
            description: 'Envia a mensagem de produtos.',
            disabled: false,
            default_member_permissions: Number(PermissionFlagsBits.ManageGuild),
            dm_permission: false
        })
    }

    run = (interaction) => {
        interaction.reply({ content: 'Ok!', ephemeral: true })

        // Título
        const tituloEmbed = new EmbedBuilder()
            .setColor(Colors.custom.Love)
            .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
            .setImage('https://i.imgur.com/JRG3xRm.png')

        const selectMenuOptions = new CreateSelectMenuOptions()

        // Desiludidos
        const desiludidosRow = new ActionRowBuilder()
            .addComponents(selectMenuOptions.desiludidosSelectMenu)
        const desiludidosEmbed = new EmbedBuilder()
            .setImage('https://i.imgur.com/cJgr8ci.png')
            .setColor(Colors.dark.Purple)

        // Correio Elegante
        const correioRow = new ActionRowBuilder()
            .addComponents(selectMenuOptions.correioSelectMenu)
        const correioEmbed = new EmbedBuilder()
            .setImage('https://i.imgur.com/VRtGv6S.png')
            .setColor(Colors.custom.Love)

        interaction.channel.send({ embeds: [tituloEmbed] })
        interaction.channel.send({ embeds: [desiludidosEmbed], components: [desiludidosRow] })
        interaction.channel.send({ embeds: [correioEmbed], components: [correioRow] })

    }
}