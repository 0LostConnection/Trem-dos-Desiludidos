module.exports = async (client, interaction) => {
    const VendedorDB = require('../../infra/utils/VendedorDB')
    const Database = new VendedorDB(`${process.cwd()}/json/sellers.json`)

    const user = interaction.options.getUser('usuario')
    const fullName = interaction.options.getString('nome')

    Database.adicionarVendedor(user.id, fullName)

    await interaction.editReply({ content: 'Vendedor registrado!' })
}