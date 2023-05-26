const Command = require('../../infra/structures/CommandStructure')
const { PermissionFlagsBits } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'info',
            description: 'Levantamendo de informações.',
            default_member_permission: Number(PermissionFlagsBits.ManageGuild),
            dm_permission: false,
            options: [
                {
                    type: 2,
                    name: 'vendas',
                    description: 'Informações sobre as vendas',
                    options: [
                        {
                            type: 1,
                            name: 'por-vendedor',
                            description: 'Número de vendas por vendedor.',
                        },
                        {
                            type: 1,
                            name: 'total',
                            description: 'Total de vendas.',
                        }
                    ]
                }
            ]
        })
    }

    run = (interaction) => {
        const subCommandGroup = interaction.options.getSubcommandGroup()
        const subCommand = interaction.options.getSubcommand()

        require(`../../subCommands/${subCommandGroup}/${subCommand}`)(this.client, interaction)
    }
}