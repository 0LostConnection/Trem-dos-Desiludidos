const Command = require('../../infra/structures/CommandStructure')
const { Colors } = require('../../../config')
const { PermissionFlagsBits, ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js')
module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'enviar-painel-de-administração',
            description: 'Envia o painel de administração.',
            disabled: false,
            default_member_permissions: Number(PermissionFlagsBits.ManageGuild),
            dm_permission: false
        })
    }

    run = (interaction) => {
        const admSelectMenu = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('adm')
                    .setPlaceholder('Selecione uma opção')
                    .addOptions(
                        new StringSelectMenuOptionBuilder()
                            .setValue('adm:lucro-desiludidos')
                            .setLabel('Lucro Desiludidos')
                            .setDescription('Lucro da loja dos desiludidos')
                            .setEmoji('💔'),
                        new StringSelectMenuOptionBuilder()
                            .setValue('adm:lucro-correio')
                            .setLabel('Lucro Correio Elegante')
                            .setDescription('Lucro da loja do correio elegante')
                            .setEmoji('💘'),
                        new StringSelectMenuOptionBuilder()
                            .setValue('adm:vendas-por-vendedor')
                            .setLabel('Vendas por vendedor')
                            .setDescription('Número de vendas por vendedor')
                            .setEmoji('👤'),
                        new StringSelectMenuOptionBuilder()
                            .setValue('adm:vendas-por-produto')
                            .setLabel('Vendas por produto')
                            .setDescription('Número de vendas por produto')
                            .setEmoji('📦'),
                        new StringSelectMenuOptionBuilder()
                            .setValue('adm:vendas-total')
                            .setLabel('Total de Vendas')
                            .setDescription('Total de vendas')
                            .setEmoji('📦'),
                        new StringSelectMenuOptionBuilder()
                            .setValue('adm:vendedores-listar')
                            .setLabel('Listar Vendedores')
                            .setDescription('Lista todos os vendedores registrados')
                            .setEmoji('📝')
                    )
            )

        const admEmbed = new EmbedBuilder()
            .setColor(Colors.custom.Emerald)
            .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
            .setImage('https://i.imgur.com/yYs7J5v.png')

        interaction.channel.send({ embeds: [admEmbed], components: [admSelectMenu] })
        interaction.reply({ content: 'Ok!', ephemeral: true })
    }
}