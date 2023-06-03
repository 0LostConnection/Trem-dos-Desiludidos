const Command = require('../../infra/structures/CommandStructure')
const { PermissionFlagsBits } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'vendedores',
            description: 'Gerenciar os vendedores registrados.',
            default_member_permissions: Number(PermissionFlagsBits.ManageRoles),
            dm_premission: false,
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
                            name: 'nome',
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
                },
                {
                    type: 1,
                    name: 'listar',
                    description: 'Listar os vendedores registrados.',
                }
            ]
        })
    }

    run = async (interaction) => {
        await interaction.deferReply({ ephemeral: true})
        const subCommand = interaction.options.getSubcommand()
        require(`../../subCommands/vendedores/${subCommand}`)(this.client, interaction)
    }
}