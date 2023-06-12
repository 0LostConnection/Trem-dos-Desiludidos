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
        const logChannel = getChannel(channels.logChannelId)
        const shippingChannel = getChannel(channels.shippingChannelId)

        let ticketEmbed = interaction.message.embeds[0]
        let sellerId

        switch (interaction.customId) {
            case 'delete':
                interaction.message.delete()
                break
            case 'product:done':
                logChannel.send({ content: `**Ação:** \`Botão\`\n**Por:**${interaction.user}\n**Para:** ${shippingChannel}\n`, embeds: [ticketEmbed] })
                shippingChannel.send({ content: '<@&1114199498986618881>', embeds: [ticketEmbed], components: [Buttons.productSent] })

                try {
                    interaction.message.delete()
                } catch (err) {
                    console.error(err)
                }
                break
            case 'product:sent':
                logChannel.send({ content: `**Ação:** \`Botão\`\n**Por:**${interaction.user}\n**Para:** ${shippedProductsChannel}\n`, embeds: [ticketEmbed] })
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
                
                logChannel.send({ content: `**Ação:** \`Botão\`\n**Por:**${interaction.user}\n**Para:** ${shippedProductsChannel}\n`, embeds: [ticketEmbed] })
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

                logChannel.send({ content: `**Ação:** \`Botão\`\n**Por:**${interaction.user}\n**Para:** ${productionChannel}\n`, embeds: [ticketEmbed] })
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