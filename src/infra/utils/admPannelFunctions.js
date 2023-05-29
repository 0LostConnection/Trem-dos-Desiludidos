const lucroCorreio = async (interaction) => {
    const { EmbedBuilder, ActionRowBuilder } = require('discord.js')
    const { Colors } = require('../../../config')
    const CreateSelectMenuOptions = require('../../infra/utils/CreateSelectMenuOptions')
    const ProcessTicketData = require('./ProcessTicketData')
    const ParseProductJSON = require('./ParseProductJSON')
    const productsDictionary = new ParseProductJSON().getDictionary()

    const productsSelectMenu = new ActionRowBuilder()
        .addComponents(
            new CreateSelectMenuOptions().admCorreioSelectMenu
        )

    const response = await interaction.reply({ components: [productsSelectMenu], ephemeral: true })

    const collectorFilter = i => i.user.id === interaction.user.id

    try {
        const menuInteraction = await response.awaitMessageComponent({ filter: collectorFilter, time: 60000 });

        const productId = menuInteraction.values[0].replace('adm:lucro-correio:', '')
        const productProfit = new ProcessTicketData(`${process.cwd()}/json/tickets.json`).calcularLucro(productId, 1)
        const profitEmbed = new EmbedBuilder()
            .setColor(Colors.custom.Love)
            .setTitle(`Produto: ${productsDictionary[productId]}`)
            .setDescription(`### Lucro mínimo:\n\`R$${productProfit.min}\`\n*Calculado utilizando o preço do produto pelo pix.*\n\n### Lucro máximo:\n\`R$${productProfit.max}\`\n*Calculado utilizando o preço do produto por dinheiro em espécie.*\n\n### Total de vendas:\n\`${productProfit.total}\``)

        interaction.editReply({ embeds: [profitEmbed], components: [] })

    } catch (e) {
        if (e.code == "InteractionCollectorError") {
            await interaction.editReply({ content: 'Interação não recebida dentro de 1 minuto, cancelando...', components: [] })
        } else {
            console.log(e)
            await interaction.editReply({ content: 'Aconteceu um erro! Verifique com o Geovane!', components: [] })
        }
    }
}

const lucroDesiludidos = async (interaction) => {
    const { EmbedBuilder, ActionRowBuilder } = require('discord.js')
    const { Colors } = require('../../../config')
    const CreateSelectMenuOptions = require('../../infra/utils/CreateSelectMenuOptions')
    const ProcessTicketData = require('./ProcessTicketData')
    const ParseProductJSON = require('./ParseProductJSON')
    const productsDictionary = new ParseProductJSON().getDictionary()

    const productsSelectMenu = new ActionRowBuilder()
        .addComponents(
            new CreateSelectMenuOptions().admDesiludidosSelectMenu
        )

    const response = await interaction.reply({ components: [productsSelectMenu], ephemeral: true })

    const collectorFilter = i => i.user.id === interaction.user.id

    try {
        const menuInteraction = await response.awaitMessageComponent({ filter: collectorFilter, time: 60000 });

        const productId = menuInteraction.values[0].replace('adm:lucro-desiludidos:', '')
        const productProfit = new ProcessTicketData(`${process.cwd()}/json/tickets.json`).calcularLucro(productId, 0)
        const profitEmbed = new EmbedBuilder()
            .setColor(Colors.dark.Purple)
            .setTitle(`Produto: ${productsDictionary[productId]}`)
            .setDescription(`### Lucro mínimo:\n\`R$${productProfit.min}\`\n*Calculado utilizando o preço do produto pelo pix.*\n\n### Lucro máximo:\n\`R$${productProfit.max}\`\n*Calculado utilizando o preço do produto por dinheiro em espécie.*\n\n### Total de vendas:\n\`${productProfit.total}\``)

        interaction.editReply({ embeds: [profitEmbed], components: [] })

    } catch (e) {
        if (e.code == "InteractionCollectorError") {
            await interaction.editReply({ content: 'Interação não recebida dentro de 1 minuto, cancelando...', components: [] })
        } else {
            console.log(e)
            await interaction.editReply({ content: 'Aconteceu um erro! Verifique com o Geovane!', components: [] })
        }
    }
}

const vendasPorProduto = (interaction) => {
    const { EmbedBuilder } = require('discord.js')
    const { Colors } = require('../../../config')
    const ProcessTicketData = require('./ProcessTicketData')
    const { vendasPorProduto } = new ProcessTicketData()

    const sellingsArray = vendasPorProduto()

    const embed = new EmbedBuilder()
        .setColor(Colors.clear.Yellow)
        .setTitle('Vendas por produto')
        .setDescription(`${sellingsArray.length ? sellingsArray.join('\n') : '```NADA```'}`)

    interaction.reply({ embeds: [embed], ephemeral: true })
}

const vendasPorVendedor = (interaction) => {
    const { EmbedBuilder } = require('discord.js')
    const { Colors } = require('../../../config')
    const ProcessTicketData = require('./ProcessTicketData')
    const { vendasPorVendedor } = new ProcessTicketData()

    const sellersArray = vendasPorVendedor()

    const embed = new EmbedBuilder()
        .setColor(Colors.clear.Yellow)
        .setTitle('Vendas por vendedor')
        .setDescription(`${sellersArray.length ? sellersArray.join('\n') : '```NADA```'}`)

    interaction.reply({ embeds: [embed], ephemeral: true })
}

const vendasTotal = (interaction) => {
    const { EmbedBuilder } = require('discord.js')
    const { Colors } = require('../../../config')
    const ProcessTicketData = require('./ProcessTicketData')
    const { totalDeVendas } = new ProcessTicketData()

    const totalAmount = totalDeVendas()

    const embed = new EmbedBuilder()
        .setColor(Colors.clear.Yellow)
        .setTitle('Total de vendas')
        .setDescription(`\`${totalAmount}\``)

    interaction.reply({ embeds: [embed], ephemeral: true })
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

    interaction.reply({ embeds: [embed], ephemeral: true })
}

module.exports = { lucroCorreio, lucroDesiludidos, vendasPorProduto, vendasPorVendedor, vendasTotal, listarVendedores }