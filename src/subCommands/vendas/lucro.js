module.exports = (client, interaction) => {
    interaction.reply({ embeds: [client.config.Embeds.ERROR('### 🚧 | Sob desenvolvimento!', interaction)] })
}