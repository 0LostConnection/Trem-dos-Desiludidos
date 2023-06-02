const ProductsDB = require('../../infra/utils/ProductsDB')
const ParseProductJSON = require('../../infra/utils/ParseProductJSON')
const { EmbedBuilder } = require('discord.js')
const { Colors, Embeds } = require('../../../config')

module.exports = async (client, interaction) => {
    const productId = interaction.options.getString('produto')
    const productIndex = new ParseProductJSON().findType(productId)
    const productPrice = new ProductsDB().obterPreco(productId + '1', productIndex)

    if (productPrice) {
        const pricesEmbed = new EmbedBuilder()
            .setColor(Colors.custom.Emerald)
            .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
            .setTitle('Preços')
            .setDescription(`**Dinheiro:** \`R$${productPrice.money}\`\n**Pix:** \`R${productPrice.pix}\``)

        interaction.editReply({ embeds: [pricesEmbed] })
    } else {
        interaction.editReply({ embeds: [Embeds.ERROR('**Ocorreu um erro! Consulte o Geovane!**\n\n*Notas: nãoaguentomais*', interaction)] })
    }
}