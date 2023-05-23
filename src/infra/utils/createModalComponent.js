const { ActionRowBuilder, TextInputBuilder, TextInputStyle } = require("discord.js")

module.exports = ({ customId, label, style, maxLength, minLength, placeholder, value, required }) => {
    const input = new TextInputBuilder()
        .setCustomId(customId)
        .setStyle(style || TextInputStyle.Short)
        .setRequired(false || required)
        .setPlaceholder(placeholder || label)
        .setLabel(label)
    if (value) input.setValue(value)

    return new ActionRowBuilder().addComponents(input)
}