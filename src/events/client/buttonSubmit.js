const eventStructure = require(`../../infra/structures/EventStructure`)
const { channels, Embeds } = require('../../../config')
const Buttons = require('../../infra/utils/buttons')

module.exports = class extends eventStructure {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        })
    }

    run = async (interaction) => {
        if (!interaction.isButton()) return

        const getChannel = (channelId) => { return interaction.guild.channels.cache.get(channelId) }

        const shippedProductsChannel = getChannel(channels.shippedProductsChannelId)
        const productionChannel = getChannel(channels.productionChannelId)
        let sellerId
        switch (interaction.customId) {
            case 'delete':
                interaction.message.delete()
                break
            case 'product:done':
                const shippingChannel = getChannel(channels.shippingChannelId)

                let minimizedTicketEmbed = interaction.message.embeds[0]
                if (interaction.message.embeds[0].color === 15895712) {
                    minimizedTicketEmbed.fields.splice(minimizedTicketEmbed.fields.findIndex(field => field.name == 'Comprador'), 1)
                    minimizedTicketEmbed.fields.splice(minimizedTicketEmbed.fields.findIndex(field => field.name == 'Série do Comprador'), 1)
                }
                
                shippingChannel.send({ content: '<@&1114199498986618881>', embeds: [minimizedTicketEmbed], components: [Buttons.productSent] })

                try {
                    interaction.message.delete()
                } catch (err) {
                    console.error(err)
                }
                break
            case 'product:sent':
                shippedProductsChannel.send({ embeds: interaction.message.embeds })

                try {
                    interaction.message.delete()
                } catch (err) {
                    console.error(err)
                }
                break
            case 'seller:product:sent':
                sellerId = interaction.message.embeds[0].footer.text

                if (interaction.user.id !== sellerId) return interaction.reply({ embeds: [Embeds.INFO(`**Você não é o vendedor que registrou esse ticket!**`)], ephemeral: true })

                shippedProductsChannel.send({ embeds: interaction.message.embeds })

                try {
                    interaction.message.delete()
                } catch (err) {
                    console.error(err)
                }
                break
            case 'seller:product:not-sent':
                sellerId = interaction.message.embeds[0].footer.text

                if (interaction.user.id !== sellerId) return interaction.reply({ embeds: [Embeds.INFO(`**Você não é o vendedor que registrou esse ticket!**`)], ephemeral: true })

                productionChannel.send({ content: '<@&1114199414546907157>', embeds: interaction.message.embeds, components: [Buttons.productDone] })

                try {
                    interaction.message.delete()
                } catch (err) {
                    console.error(err)
                }
                break
        }
    }
}