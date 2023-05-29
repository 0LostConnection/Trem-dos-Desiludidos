const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js')
const { readFileSync } = require('fs')

module.exports = class createSelectMenuOptions {
    constructor() {
        this.desiludidosSelectMenu = new StringSelectMenuBuilder()
            .setCustomId('produtos:desiludidos')
            .setPlaceholder('Selecione um produto')
            .setMinValues(1)
            .setMaxValues(4)

        this.correioSelectMenu = new StringSelectMenuBuilder()
            .setCustomId('produtos:correio')
            .setPlaceholder('Selecione um produto')

        this.admDesiludidosSelectMenu = new StringSelectMenuBuilder()
            .setCustomId('adm:lucro-desiludidos:products')
            .setPlaceholder('Selecione um produto')

        this.admCorreioSelectMenu = new StringSelectMenuBuilder()
            .setCustomId('adm:lucro-correio:products')
            .setPlaceholder('Selecione um produto')

        this.productsJson = JSON.parse(readFileSync(`${process.cwd()}/json/products.json`, 'utf-8'))

        for (const category of this.productsJson) {
            for (const product of category.products) {
                switch (category.type) {
                    case 0:
                        this.desiludidosSelectMenu
                            .addOptions(
                                new StringSelectMenuOptionBuilder()
                                    .setLabel(product.name)
                                    .setDescription(product.description)
                                    .setValue(product.id)
                                    .setEmoji(product.emoji)
                            )
                        this.admDesiludidosSelectMenu
                            .addOptions(
                                new StringSelectMenuOptionBuilder()
                                    .setLabel(product.name)
                                    .setDescription(product.description)
                                    .setValue(`adm:lucro-desiludidos:${product.id}`)
                                    .setEmoji(product.emoji)
                            )
                        break
                    case 1:
                        this.correioSelectMenu
                            .addOptions(
                                new StringSelectMenuOptionBuilder()
                                    .setLabel(product.name)
                                    .setDescription(product.description)
                                    .setValue(product.id)
                                    .setEmoji(product.emoji)
                            )
                        this.admCorreioSelectMenu
                            .addOptions(
                                new StringSelectMenuOptionBuilder()
                                    .setLabel(product.name)
                                    .setDescription(product.description)
                                    .setValue(`adm:lucro-correio:${product.id}`)
                                    .setEmoji(product.emoji)
                            )
                        break
                }
            }
        }
    }
}