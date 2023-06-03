const Command = require('../../infra/structures/CommandStructure')
const { Colors } = require('../../../config')
const { PermissionFlagsBits, ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, } = require('discord.js')

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
            .setColor(Colors.custom.Emerald)
            .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
            .setImage('https://i.imgur.com/JRG3xRm.png')

        // Desiludidos
        const desiludidosRow = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('pagamento:desiludidos')
                    .setPlaceholder('Selecione um método de pagamento.')
                    .addOptions(
                        new StringSelectMenuOptionBuilder()
                            .setLabel('Pix')
                            .setValue('pagamento:pix')
                            .setEmoji('<:pix:1113466593377267773>'),
                        new StringSelectMenuOptionBuilder()
                            .setLabel('Dinheiro')
                            .setValue('pagamento:money')
                            .setEmoji('💵')
                    )
            )
        const desiludidosEmbed = new EmbedBuilder()
            .setImage('https://i.imgur.com/cJgr8ci.png')
            .setColor(Colors.dark.Purple)

        // Correio Elegante
        const correioRow = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('pagamento:correio')
                    .setPlaceholder('Selecione um método de pagamento.')
                    .addOptions(
                        new StringSelectMenuOptionBuilder()
                            .setLabel('Pix')
                            .setValue('pagamento:pix')
                            .setEmoji('<:pix:1113466593377267773>'),
                        new StringSelectMenuOptionBuilder()
                            .setLabel('Dinheiro')
                            .setValue('pagamento:dinheiro')
                            .setEmoji('💵')
                    )
            )
        const correioEmbed = new EmbedBuilder()
            .setImage('https://i.imgur.com/VRtGv6S.png')
            .setColor(Colors.custom.Love)

        interaction.channel.send({ embeds: [tituloEmbed] })
        interaction.channel.send({ embeds: [desiludidosEmbed], components: [desiludidosRow] })
        interaction.channel.send({ embeds: [correioEmbed], components: [correioRow] })
    }
}




/* const selectMenuOptions = new CreateSelectMenuOptions()

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
        interaction.channel.send({ embeds: [correioEmbed], components: [correioRow] }) */