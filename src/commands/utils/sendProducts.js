const Command = require('../../infra/structures/CommandStructure')
const createSelectMenuOptions = require('../../infra/utils/selectMenuOptions')
const { Colors } = require('../../../config')
const { PermissionFlagsBits, ActionRowBuilder, EmbedBuilder, } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'produtos',
            description: 'Envia a mensagem de produtos.',
            disabled: false,
            default_member_permissions: Number(PermissionFlagsBits.ManageGuild),
            dm_permission: false
        })
    }

    run = (interaction) => {
        interaction.reply({ content: 'Ok!', ephemeral: true })

        const selectMenuOptions = new createSelectMenuOptions()

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

        interaction.channel.send({ embeds: [desiludidosEmbed], components: [desiludidosRow] })
        interaction.channel.send({ embeds: [correioEmbed], components: [correioRow] })

    }
}