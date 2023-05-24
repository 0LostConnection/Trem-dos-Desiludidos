const Command = require('../../infra/structures/CommandStructure')
const VendedorDB = require('../../infra/utils/VendedorDB')
const { PermissionFlagsBits } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'registrar-vendedor',
            description: 'Configuração do bot.',
            default_member_permissions: Number(PermissionFlagsBits.ManageGuild),
            dm_premission: false,
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
        })
    }

    run = async (interaction) => {
        await interaction.deferReply()

        const user = interaction.options.getUser('usuario')
        const fullName = interaction.options.getString('nome-completo')
        
        const Database = new VendedorDB(`${process.cwd()}/sellers.json`)
        Database.adicionarVendedor(user.id, fullName)

        await interaction.editReply({ content: 'Vendedor registrado!'})
    }
}