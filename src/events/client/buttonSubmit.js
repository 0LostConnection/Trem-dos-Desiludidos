const eventStructure = require(`../../infra/structures/EventStructure`)
const { channels } = require('../../../config')
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

        switch (interaction.customId) {
            case 'delete':
                interaction.message.delete()
                break
            case 'product:done':
                const shippingChannel = getChannel(channels.shippingChannelId)
                shippingChannel.send({ content: '<@&1114199498986618881>', embeds: interaction.message.embeds, components: [Buttons.productSent] })

                try {
                    interaction.message.delete()
                } catch (err) {
                    console.error(err)
                }
                break
            case 'product:sent':
                const shippedProductsChannel = getChannel(channels.shippedProductsChannelId)
                shippedProductsChannel.send({ embeds: interaction.message.embeds })

                try {
                    interaction.message.delete()
                } catch (err) {
                    console.error(err)
                }
                break
            case 'product:not-sent':
                const productionChannel = getChannel(channels.productionChannelId)
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