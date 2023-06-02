const ProductsDB = require('../../infra/utils/ProductsDB')
const { Embeds } = require('../../../config')

module.exports = async (client, interaction) => {
    const productId = interaction.options.getString('produto')
    const paymentMethod = interaction.options.getString('método-pagamento')
    const price = interaction.options.getNumber('preço')

    if (new ProductsDB().alterarPreco(productId, paymentMethod, price)) {
        interaction.editReply({ embeds: [Embeds.SUCCESS('**Preço alterado com sucesso!**', interaction)] })
    } else {
        interaction.editReply({ embeds: [Embeds.ERROR('**Ocorreu um erro! Consulte o Geovane!**\n\n*Notas: nãoaguentomais*', interaction)] })
    }
}