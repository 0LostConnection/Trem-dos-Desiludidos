const Command = require('../../infra/structures/CommandStructure')
const ParseProductJSON = require('../../infra/utils/ParseProductJSON')
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
                            name: 'por-produto',
                            description: 'Número de vendas por produto.',
                        },
                        {
                            type: 1,
                            name: 'total',
                            description: 'Total de vendas.',
                        },
                        {
                            type: 1,
                            name: 'lucro-desiludidos',
                            description: 'Lucro total',
                            options: [
                                {
                                    type: 3,
                                    name: 'produto',
                                    description: 'Produto da loja dos desiludidos.',
                                    required: true,
                                    choices: new ParseProductJSON().createProductsChoices().desiludidos
                                }
                            ]
                        },
                        {
                            type: 1,
                            name: 'lucro-correio',
                            description: 'Lucro total',
                            options: [
                                {
                                    type: 3,
                                    name: 'produto',
                                    description: 'Produto da loja do correio elegante..',
                                    required: true,
                                    choices: new ParseProductJSON().createProductsChoices().correio
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 2,
                    name: 'vendedores',
                    description: 'Informações sobre os vendedores.',
                    options: [
                        {
                            type: 1,
                            name: 'listar',
                            description: 'Lista todos os vendedores registrados.'
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