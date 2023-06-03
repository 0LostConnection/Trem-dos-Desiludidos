const Command = require('../../infra/structures/CommandStructure')
const { PermissionFlagsBits } = require('discord.js')
module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'botões',
            description: 'Envia os botões.',
            disabled: false,
            default_member_permissions: Number(PermissionFlagsBits.ManageGuild),
            dm_permission: false,
            disabled: true
        })
    }

    run = (interaction) => {
        const { productDone, productNotSent, productSent } = require('../../infra/utils/buttons')

        interaction.reply({ content: 'Ok!', components: [productDone, productNotSent, productSent], ephemeral: false })
    }
}