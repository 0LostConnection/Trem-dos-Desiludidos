const Command = require('../../infra/structures/CommandStructure')
const { PermissionFlagsBits, } = require('discord.js')
const { } = require('../../../')
const ParseProductJSON = require('../../infra/utils/ParseProductJSON')
const productsChoices = new ParseProductJSON().createProductsChoices()

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'registrar-venda',
            description: 'Registra uma venda personalizada',
            dm_permission: false,
            default_member_permissions: Number(PermissionFlagsBits.ManageRoles),
            options: [
                {
                    type: 1,
                    name: 'desiludidos',
                    description: 'Loja dos Desiludidos',
                    options: [
                        {
                            type: 3,
                            name: 'produto',
                            description: 'Produtos da loja dos desiludidos',
                            required: true,
                            choices: productsChoices.desiludidos
                        },
                        {
                            type: 3,
                            name: 'método-pagamento',
                            description: 'Qual o método de pagamento da compra?',
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
                    name: 'correio',
                    description: 'Loja do Correio Elegante',
                    options: [
                        {
                            type: 3,
                            name: 'produto',
                            description: 'Produtos da loja dos desiludidos',
                            required: true,
                            choices: productsChoices.correio
                        },
                        {
                            type: 3,
                            name: 'método-pagamento',
                            description: 'Qual o método de pagamento da compra?',
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
            ]
        })
    }
}