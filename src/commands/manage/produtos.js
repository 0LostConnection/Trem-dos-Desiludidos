const Command = require('../../infra/structures/CommandStructure')
const { PermissionFlagsBits } = require('discord.js')
const ParseProductJSON = require('../../infra/utils/ParseProductJSON')
const productsChoices = new ParseProductJSON().createProductsChoices()

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'produtos',
            description: 'Gerenciar os produtos registrados.',
            default_member_permissions: Number(PermissionFlagsBits.ManageGuild),
            dm_permission: false,
            options: [
                {
                    type: 1,
                    name: 'alterar-preco',
                    description: 'Trocar o preço do produto',
                    options: [
                        {
                            type: 3,
                            name: 'produto',
                            description: 'Produto do qual o preço será alterado',
                            required: true,
                            choices: [...productsChoices.desiludidos, ...productsChoices.correio]
                        },
                        {
                            type: 3,
                            name: 'método-pagamento',
                            description: 'Qual o método de pagamento do preço a ser alterado',
                            required: true,
                            choices: [
                                {
                                    name: 'Dinheiro',
                                    value: 'money'
                                },
                                {
                                    name: 'PIX',
                                    value: 'pix'
                                }
                            ]
                        },
                        {
                            type: 10,
                            name: 'preço',
                            description: 'O preço do produto em R$ - Utilize pontos ao invés de vírgula!',
                            required: true
                        }
                    ]
                },
                {
                    type: 1,
                    name: 'ver-precos',
                    description: 'Veja os preços dos produtos',
                    options: [
                        {
                            type: 3,
                            name: 'produto',
                            description: 'Produto do qual o preço será alterado',
                            required: true,
                            choices: [...productsChoices.desiludidos, ...productsChoices.correio]
                        }
                    ]
                }
            ]
        })
    }

    run = async (interaction) => {
        await interaction.deferReply({ ephemeral: true })

        const subCommand = interaction.options.getSubcommand()

        require(`../../subCommands/produtos/${subCommand}`)(this.client, interaction)

    }
}