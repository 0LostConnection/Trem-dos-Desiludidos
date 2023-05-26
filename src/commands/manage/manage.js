const Command = require('../../infra/structures/CommandStructure')
const { PermissionFlagsBits } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'gerenciar',
            description: 'Gerenciar configurações do bot.',
            default_member_permissions: Number(PermissionFlagsBits.ManageGuild),
            dm_premission: false,
            options: [
                {
                    type: 2,
                    name: 'vendedores',
                    description: 'gerenciar vendedores',
                    options: [
                        {
                            type: 1,
                            name: 'adicionar',
                            description: 'Adicionar um vendedor.',
                            options: [
                                {
                                    type: 6,
                                    name: 'usuario',
                                    description: '@Usuário do vendedor.',
                                    required: true
                                },
                                {
                                    type: 3,
                                    name: 'nome-completo',
                                    description: 'Nome completo do vendedor.',
                                    required: true
                                }
                            ]
                        },
                        {
                            type: 1,
                            name: 'remover',
                            description: 'Remover um vendedor.',
                            options: [
                                {
                                    type: 6,
                                    name: 'usuario',
                                    description: '@Usuário do vendedor.',
                                    required: true
                                }
                            ]
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