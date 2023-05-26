const ProcessTicketData = require('../../infra/utils/ProcessTicketData')
const { vendasPorVendedor } = new ProcessTicketData()
const { EmbedBuilder } = require('discord.js')
const { Colors } = require('../../../config')

module.exports = (client, interaction) => {
    const sellersArray = vendasPorVendedor()

    const embed = new EmbedBuilder()
        .setColor(Colors.clear.Yellow)
        .setTitle('Vendas por vendedor')
        .setDescription(`${sellersArray.length ? sellersArray.join('\n') : '```NADA```'}`)

    interaction.reply({ embeds: [embed] })
}