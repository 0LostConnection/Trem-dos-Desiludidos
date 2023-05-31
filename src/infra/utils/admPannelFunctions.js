const lucroCorreio = async (interaction) => {
    const { EmbedBuilder } = require('discord.js')
    const { Colors } = require('../../../config')

    const TicketsDB = require('../../database/TicketsDB')
    const ticketsData = await new TicketsDB().obterTickets()

    const ProcessTicketData = require('./ProcessTicketData')

    const ParseProductJSON = require('./ParseProductJSON')
    const productsDictionary = new ParseProductJSON().getDictionary()
    const productsIdsArray = new ParseProductJSON().getIdsArray()

    let fields = []
    for (const productId of productsIdsArray.correio) {
        const productProfit = new ProcessTicketData(ticketsData).calcularLucro(productId, 1)

        fields.push({ name: `\`${productsDictionary[productId]}\``, value: `**Lucro mínimo:**\n\`R$${productProfit.min}\`\n**Lucro máximo:**\n\`R$${productProfit.max}\`\n**Total de vendas:**\n\`${productProfit.total}\`\n‎`, inline: true })
    }

    const embed = new EmbedBuilder()
        .setColor(Colors.custom.Love)
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
        .setDescription('***Lucro mínimo:*** *Calculado utilizando o preço do produto pelo pix.*\n***Lucro máximo:*** *Calculado utilizando o preço do produto por dinheiro em espécie.*\n‎')
        .setFields(fields)

    await interaction.editReply({ embeds: [embed], ephemeral: true })
}

const lucroDesiludidos = async (interaction) => {
    const { EmbedBuilder } = require('discord.js')
    const { Colors } = require('../../../config')

    const TicketsDB = require('../../database/TicketsDB')
    const ticketsData = await new TicketsDB().obterTickets()

    const ProcessTicketData = require('./ProcessTicketData')

    const ParseProductJSON = require('./ParseProductJSON')
    const productsDictionary = new ParseProductJSON().getDictionary()
    const productsIdsArray = new ParseProductJSON().getIdsArray()

    let fields = []
    for (const productId of productsIdsArray.desiludidos) {
        const productProfit = new ProcessTicketData(ticketsData).calcularLucro(productId, 0)

        fields.push({ name: `\`${productsDictionary[productId]}\``, value: `**Lucro mínimo:**\n\`R$${productProfit.min}\`\n**Lucro máximo:**\n\`R$${productProfit.max}\`\n**Total de vendas:**\n\`${productProfit.total}\`\n‎`, inline: true })
    }

    const embed = new EmbedBuilder()
        .setColor(Colors.dark.Purple)
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
        .setDescription('***Lucro mínimo:*** *Calculado utilizando o preço do produto pelo pix.*\n***Lucro máximo:*** *Calculado utilizando o preço do produto por dinheiro em espécie.*\n‎')
        .setFields(fields)

    await interaction.editReply({ embeds: [embed], ephemeral: true })
}

const vendasPorProduto = async (interaction) => {
    const { EmbedBuilder } = require('discord.js')
    const { Colors } = require('../../../config')

    const TicketsDB = require('../../database/TicketsDB')
    const ticketsData = await new TicketsDB().obterTickets()

    const ProcessTicketData = require('./ProcessTicketData')
    const sellingsArray = new ProcessTicketData(ticketsData).vendasPorProduto()

    const embed = new EmbedBuilder()
        .setColor(Colors.clear.Yellow)
        .setTitle('Vendas por produto')
        .setDescription(`${sellingsArray.length ? sellingsArray.join('\n') : '```NADA```'}`)

    await interaction.editReply({ embeds: [embed], ephemeral: true })
}

const vendasPorVendedor = async (interaction) => {
    const { EmbedBuilder } = require('discord.js')
    const { Colors } = require('../../../config')

    const TicketsDB = require('../../database/TicketsDB')
    const ticketsData = await new TicketsDB().obterTickets()

    const ProcessTicketData = require('./ProcessTicketData')
    const sellersArray = new ProcessTicketData(ticketsData).vendasPorVendedor()

    const embed = new EmbedBuilder()
        .setColor(Colors.clear.Yellow)
        .setTitle('Vendas por vendedor')
        .setDescription(`${sellersArray.length ? sellersArray.join('\n') : '```NADA```'}`)

    await interaction.editReply({ embeds: [embed], ephemeral: true })
}

const vendasTotal = async (interaction) => {
    const { EmbedBuilder } = require('discord.js')
    const { Colors } = require('../../../config')

    const TicketsDB = require('../../database/TicketsDB')
    const ticketsData = await new TicketsDB().obterTickets()

    const ProcessTicketData = require('./ProcessTicketData')
    const totalAmount = await new ProcessTicketData(ticketsData).totalDeVendas()

    const embed = new EmbedBuilder()
        .setColor(Colors.clear.Yellow)
        .setTitle('Total de vendas')
        .setDescription(`\`${totalAmount}\``)

    await interaction.editReply({ embeds: [embed], ephemeral: true })
}

const listarVendedores = (interaction) => {
    const { EmbedBuilder } = require('discord.js')
    const { Colors } = require('../../../config')
    const VendedorDB = require('../../infra/utils/VendedorDB')
    const Database = new VendedorDB(`${process.cwd()}/json/sellers.json`)
    const sellersJson = Database.obterVendedores()

    let sellersArray = []

    for (const id in sellersJson) {
        sellersArray.push(`<@${id}> - \`${sellersJson[id].name}\``)
    }

    const embed = new EmbedBuilder()
        .setColor(Colors.clear.Yellow)
        .setTitle('Vendedores')
        .setDescription(`${sellersArray.length ? sellersArray.join('\n') : '```NADA```'}`)

    interaction.editReply({ embeds: [embed], ephemeral: true })
}

module.exports = { lucroCorreio, lucroDesiludidos, vendasPorProduto, vendasPorVendedor, vendasTotal, listarVendedores }