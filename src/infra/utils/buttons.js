const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

const productDone = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('product:done')
            .setStyle(ButtonStyle.Success)
            .setLabel('Produto Finalizado')
            .setEmoji('<:check:1114181897912860793>')
    )

const productSent = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('product:sent')
            .setStyle(ButtonStyle.Success)
            .setLabel('Produto Enviado')
            .setEmoji('<:check:1114181897912860793>')
    )

const productNotSent = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('product:not-sent')
            .setStyle(ButtonStyle.Danger)
            .setLabel('Produto Não Enviado')
            .setEmoji('<:cruz:1114181900706259026>')
    )

const sellerProductSent = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('seller:product:sent')
            .setStyle(ButtonStyle.Success)
            .setLabel('Produto Enviado')
            .setEmoji('<:check:1114181897912860793>')
    )

const sellerProductNotSent = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('seller:product:not-sent')
            .setStyle(ButtonStyle.Danger)
            .setLabel('Produto Não Enviado')
            .setEmoji('<:cruz:1114181900706259026>')
    )

module.exports = { productDone, productNotSent, productSent, sellerProductSent, sellerProductNotSent }

//const shippingChannel = getChannel(channels.shippingChannelId)