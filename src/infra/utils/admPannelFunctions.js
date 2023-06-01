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

        fields.push({ name: `__${productsDictionary[productId]}__`, value: `**nº - Pix:**\n\`${productProfit.pix.total}\` - \`R$${productProfit.pix.profit}\`\n**nº - Dinheiro:**\n\`${productProfit.money.total}\` - \`R$${productProfit.money.profit}\`\n**Lucro Total:**\n\`R$${productProfit.totalProfit}\`\n‎`, inline: true })
    }

    const embed = new EmbedBuilder()
        .setColor(Colors.custom.Love)
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
        .setTitle('Lucro Correio Elegante')
        .setFields(fields)
        .setImage('https://i.imgur.com/aPOaaYh.png')
        .setFooter({ text: 'nº - Número de vendas registradas com o método de pagamento' })

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

        fields.push({ name: `__${productsDictionary[productId]}__`, value: `**nº - Pix:**\n\`${productProfit.pix.total}\` - \`R$${productProfit.pix.profit}\`\n**nº - Dinheiro:**\n\`${productProfit.money.total}\` - \`R$${productProfit.money.profit}\`\n**Lucro Total:**\n\`R$${productProfit.totalProfit}\`\n‎`, inline: true })
    }

    const embed = new EmbedBuilder()
        .setColor(Colors.dark.Purple)
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
        .setTitle('Lucro Desiludidos')
        .setFields(fields)
        .setImage('https://i.imgur.com/aPOaaYh.png')
        .setFooter({ text: 'nº - Número de vendas registradas com o método de pagamento' })

    await interaction.editReply({ embeds: [embed], ephemeral: true })
}

const lucroTotal = async (interaction) => {
    const typeDictionary = {
        'correio': 1,
        'desiludidos': 0
    }

    const { EmbedBuilder } = require('discord.js')
    const { Colors } = require('../../../config')

    const TicketsDB = require('../../database/TicketsDB')
    const ticketsData = await new TicketsDB().obterTickets()

    const ProcessTicketData = require('./ProcessTicketData')

    const ParseProductJSON = require('./ParseProductJSON')
    const productsIdsArray = new ParseProductJSON().getIdsArray()

    let productsProfit = []
    for (const [productType] of Object.entries(productsIdsArray)) {
        for (const productId of productsIdsArray[productType]) {
            const productProfit = new ProcessTicketData(ticketsData).calcularLucro(productId, typeDictionary[productType])
            if (productProfit.totalProfit == 0) continue
            productsProfit.push(productProfit.totalProfit.replace(',', '.'))
        }
    }

    let totalProfit = String(productsProfit.reduce(function (x, y) {
        return Number(x) + Number(y)
    }, 0))

    const embed = new EmbedBuilder()
        .setColor(Colors.custom.Emerald)
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
        .setTitle('Lucro Total')
        .setDescription(`\`R$${totalProfit.replace('.', ',')}\``)

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
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
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
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
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
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
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
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
        .setTitle('Vendedores')
        .setDescription(`${sellersArray.length ? sellersArray.join('\n') : '```NADA```'}`)

    interaction.editReply({ embeds: [embed], ephemeral: true })
}

module.exports = { lucroCorreio, lucroDesiludidos, lucroTotal, vendasPorProduto, vendasPorVendedor, vendasTotal, listarVendedores }