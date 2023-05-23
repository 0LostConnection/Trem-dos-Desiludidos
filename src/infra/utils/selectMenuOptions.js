const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js')

module.exports = class createSelectMenuOptions {
    constructor() {
        this.desiludidosSelectMenu = new StringSelectMenuBuilder()
            .setCustomId('produtos:desiludidos')
            .setPlaceholder('Selecione um produto')

        this.correioSelectMenu = new StringSelectMenuBuilder()
            .setCustomId('produtos:correio')
            .setPlaceholder('Selecione um produto')

        this.productsJson = require('../../../products.json')

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
                }
            }
        }
    }
}