const eventStructure = require(`../../infra/structures/EventStructure`)
const CreateSelectMenuOptions = require('../../infra/utils/CreateSelectMenuOptions')
const { ActionRowBuilder, EmbedBuilder } = require('discord.js')
const { Colors } = require('../../../config')

module.exports = class extends eventStructure {
    constructor(client) {
        super(client, {
            name: 'interactionCreate',
            disabled: false
        })
    }

    run = async (interaction) => {
        if (!interaction.isStringSelectMenu()) return
        if (!['pagamento:desiludidos', 'pagamento:correio'].includes(interaction.customId)) return

        await interaction.deferReply({ ephemeral: true })

        interaction.message.edit({ components: interaction.message.components })

        const selectMenuOptions = new CreateSelectMenuOptions()

        const metodoPagamento = String(interaction.values[0].replace('pagamento:', ''))

        switch (interaction.customId) {
            case 'pagamento:desiludidos':
                const desiludidosRow = new ActionRowBuilder()
                    .addComponents(selectMenuOptions.desiludidosSelectMenu)
                const desiludidosEmbed = new EmbedBuilder()
                    .setTitle(metodoPagamento.charAt(0).toUpperCase() + metodoPagamento.slice(1))
                    .setImage('https://i.imgur.com/cJgr8ci.png')
                    .setColor(Colors.dark.Purple)

                interaction.editReply({ embeds: [desiludidosEmbed], components: [desiludidosRow], ephemeral: true })
                break
            case 'pagamento:correio':
                const correioRow = new ActionRowBuilder()
                    .addComponents(selectMenuOptions.correioSelectMenu)
                const correioEmbed = new EmbedBuilder()
                    .setTitle(metodoPagamento.charAt(0).toUpperCase() + metodoPagamento.slice(1))
                    .setImage('https://i.imgur.com/VRtGv6S.png')
                    .setColor(Colors.custom.Love)

                interaction.editReply({ embeds: [correioEmbed], components: [correioRow], ephemeral: true })
                break
        }
    }
}