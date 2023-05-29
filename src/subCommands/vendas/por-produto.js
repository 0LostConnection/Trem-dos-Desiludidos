const { EmbedBuilder } = require('discord.js')
const { Colors } = require('../../../config')
const ProcessTicketData = require('../../infra/utils/ProcessTicketData')
const { vendasPorProduto } = new ProcessTicketData()

module.exports = (client, interaction) => {
    const sellingsArray = vendasPorProduto()

    const embed = new EmbedBuilder()
        .setColor(Colors.clear.Yellow)
        .setTitle('Vendas por produto')
        .setDescription(`${sellingsArray.length ? sellingsArray.join('\n') : '```NADA```'}`)

    interaction.reply({ embeds: [embed] })
}