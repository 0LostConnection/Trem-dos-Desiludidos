const Command = require('../../infra/structures/CommandStructure')
const { PermissionFlagsBits, ComponentType, TextInputBuilder, TextInputStyle, ModalBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')

const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder } = require('discord.js');



const createOption = ({ label, description, value, emoji }) => {
    return new StringSelectMenuOptionBuilder()
        .setLabel(label)
        .setDescription(description)
        .setValue(value)
        .setEmoji(emoji)
}

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'produtos',
            description: 'Envia a mensagem de produtos.',
            disabled: false,
            default_member_permissions: Number(PermissionFlagsBits.ManageGuild),
            dm_permission: false
        })
    }

    run = (interaction) => {
        interaction.reply({ content: 'Ok!', ephemeral: true })

        const desiludidoSelectMenu = new StringSelectMenuBuilder()
            .setCustomId('produtos:desiludidos')
            .setPlaceholder('Selecione um produto')
            .addOptions(
                createOption({ label: 'Piruluto', value: 'pirulito', }),

            )

    }
}