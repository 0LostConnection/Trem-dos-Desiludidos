const Command = require('../../infra/structures/CommandStructure')
const { PermissionFlagsBits, EmbedBuilder } = require('discord.js')
const ParseProductJSON = require('../../infra/utils/ParseProductJSON')
const productsChoices = new ParseProductJSON().createProductsChoices()
const { channels, Colors, Embeds } = require('../../../config')
const productsDictionary = new ParseProductJSON().getDictionary()
const Buttons = require('../../infra/utils/buttons')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'enviar-produção',
            description: 'Envia um ticket de entrega para o canal de entrega',
            dm_permission: false,
            default_member_permissions: Number(PermissionFlagsBits.ManageRoles),
            options: [
                {
                    type: 3,
                    name: 'loja',
                    description: 'Desiludidos ou Correio Elegante',
                    required: true,
                    choices: [
                        {
                            name: 'Desiludidos',
                            value: "0"
                        },
                        {
                            name: 'Correio Elegante',
                            value: "1"
                        }
                    ]
                },
                {
                    type: 3,
                    name: 'produto',
                    description: 'O produto do ticket',
                    required: true,
                    choices: [...productsChoices.desiludidos, ...productsChoices.correio]
                },
                {
                    type: 3,
                    name: 'destinatário',
                    description: 'Destinatário do produto',
                    required: true
                },
                {
                    type: 3,
                    name: 'série-destinatário',
                    description: 'Série do destinatário do produto',
                    required: true
                },
                {
                    type: 3,
                    name: 'mensagem',
                    description: 'Mensagem + Observaçẽs',
                    required: false
                }
            ]
        })
    }
    run = (interaction) => {
        // Functions
        const getChannel = (channelId) => { return interaction.guild.channels.cache.get(channelId) }

        const loja = Number(interaction.options.getString('loja'))
        const produto = interaction.options.getString('produto')
        const receiver = {
            name: interaction.options.getString('destinatário'),
            number: interaction.options.getString('série-destinatário')
        }
        const message = interaction.options.getString('mensagem')
        const shippingChannel = getChannel(channels.shippingChannelId)

        const ticket = new EmbedBuilder()
            .setColor(Colors.clear.Yellow)
            .setTitle('Ticket de Registro de Venda')
            .addFields([
                {
                    name: 'Produto',
                    value: `\`${productsDictionary[produto]}\``
                },
                {
                    name: 'Destinatário',
                    value: `\`${receiver.name}\``,
                    inline: true
                },
                {
                    name: 'Série do Destinatário',
                    value: `\`${receiver.number}\``,
                    inline: true
                },
            ])
            .setFooter({ text: String(loja) })


        if (message) ticket.addFields([{ name: 'Mensagem + Observações', value: `\`${message}\`` }])
        shippingChannel.send({ content: '<@&1114199498986618881>', embeds: [ticket], components: [Buttons.productDone] })

        interaction.reply({ embeds: [Embeds.SUCCESS('Ticket enviado para o canal de produção!')], ephemeral: true })
    }
}