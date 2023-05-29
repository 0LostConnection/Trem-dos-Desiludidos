const { EmbedBuilder } = require('discord.js')
const { Colors } = require('../../../config')
const ProcessTicketData = require('../../infra/utils/ProcessTicketData')
const { totalDeVendas } = new ProcessTicketData()

module.exports = (client, interaction) => {
    const totalAmount = totalDeVendas()

    const embed = new EmbedBuilder()
        .setColor(Colors.clear.Yellow)
        .setTitle('Total de vendas')
        .setDescription(`\`${totalAmount}\``)

    interaction.reply({ embeds: [embed] })
}