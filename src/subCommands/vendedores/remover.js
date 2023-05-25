module.exports = async (client, interaction) => {
    const VendedorDB = require('../../infra/utils/VendedorDB')
    const Database = new VendedorDB(`${process.cwd()}/sellers.json`)

    await interaction.deferReply({ ephemeral: true })

    const user = interaction.options.getUser('usuario')

    Database.excluirVendedor(user.id)

    await interaction.editReply({ content: 'Vendedor removido!', ephemeral: true })
}