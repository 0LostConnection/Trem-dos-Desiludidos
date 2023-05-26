const { EmbedBuilder } = require('discord.js')
const { Colors } = require('../../../config')
const ProcessTicketData = require('../../infra/utils/ProcessTicketData')
const ParseProductJSON = require('../../infra/utils/ParseProductJSON')
const productsDictionary = new ParseProductJSON().getDictionary()

module.exports = (client, interaction) => {
    const productId = interaction.options.getString('produto')
    const productProfit = new ProcessTicketData(`${process.cwd()}/json/tickets.json`).calcularLucro(productId, 1)

    const embed = new EmbedBuilder()
        .setColor(Colors.custom.Love)
        .setTitle(`Produto: ${productsDictionary[productId]}`)
        .setDescription(`### Lucro mínimo:\n\`R$${productProfit.min}\`\n*Calculado utilizando o preço do produto pelo pix.*\n\n### Lucro máximo:\n\`R$${productProfit.max}\`\n*Calculado utilizando o preço do produto por dinheiro em espécie.*\n\n### Total de vendas:\n\`${productProfit.total}\``)

    interaction.reply({ embeds: [embed] })
}