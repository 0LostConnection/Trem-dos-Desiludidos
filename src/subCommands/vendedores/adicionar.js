module.exports = async (client, interaction) => {
    const VendedorDB = require('../../infra/utils/VendedorDB')
    const Database = new VendedorDB(`${process.cwd()}/sellers.json`)

    await interaction.deferReply({ ephemeral: true })

    const user = interaction.options.getUser('usuario')
    const fullName = interaction.options.getString('nome-completo')

    Database.adicionarVendedor(user.id, fullName)

    await interaction.editReply({ content: 'Vendedor registrado!' })
}