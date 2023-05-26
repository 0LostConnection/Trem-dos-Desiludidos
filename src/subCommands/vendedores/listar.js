const { EmbedBuilder } = require('discord.js')
const { Colors } = require('../../../config')

module.exports = async (client, interaction) => {
    const VendedorDB = require('../../infra/utils/VendedorDB')
    const Database = new VendedorDB(`${process.cwd()}/json/sellers.json`)
    const sellersJson = await Database.obterVendedores()
    let sellersArray = []

    for (const id in sellersJson) {
        sellersArray.push(`<@${id}> - \`${sellersJson[id].name}\``)
    }
    
    const embed = new EmbedBuilder()
        .setColor(Colors.clear.Yellow)
        .setTitle('Vendedores')
        .setDescription(`${sellersArray.length ? sellersArray.join('\n') : '```NADA```'}`)

    interaction.reply({ embeds: [embed] })
}