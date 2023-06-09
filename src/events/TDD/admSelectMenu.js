const eventStructure = require(`../../infra/structures/EventStructure`)
const { lucroCorreio, lucroDesiludidos, vendasPorProduto, vendasPorVendedor, vendasTotal, listarVendedores, lucroTotal } = require('../../infra/utils/admPannelFunctions')

module.exports = class extends eventStructure {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        })
    }

    run = async (interaction) => {
        if (!interaction.isStringSelectMenu()) return
        if (interaction.customId !== 'adm') return

        await interaction.deferReply({ ephemeral: true })

        await interaction.message.edit({ components: interaction.message.components })

        switch (interaction.values[0]) {
            case 'adm:lucro-desiludidos':
                lucroDesiludidos(interaction)
                break
            case 'adm:lucro-correio':
                lucroCorreio(interaction)
                break
            case 'adm:lucro-total':
                lucroTotal(interaction)
                break
            case 'adm:vendas-por-vendedor':
                vendasPorVendedor(interaction)
                break
            case 'adm:vendas-por-produto':
                vendasPorProduto(interaction)
                break
            case 'adm:vendas-total':
                vendasTotal(interaction)
                break
            case 'adm:vendedores-listar':
                listarVendedores(interaction)
                break
        }
    }
}