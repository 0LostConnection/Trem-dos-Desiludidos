const { EmbedBuilder } = require('discord.js')

module.exports = {
    // Bot
    version: require('./package.json').version,

    statusArray: [
        {
            type: 3,
            content: `Robson Bot`,
            status: 'online'
        },
        {
            type: 0,
            content: `Made By LostConnection#4460`,
            status: 'online'
        }
    ],

    Embeds: {
        // ERROR: ({ title, description, author, footer }) => {
        ERROR: (description, interaction) => {
            const embed = new EmbedBuilder()
                .setDescription(description)
                .setColor(module.exports.Colors.clear.Red)
            if (interaction) embed.setAuthor({ name: interaction?.guild.name, iconURL: interaction?.guild.iconURL({ animated: true }) })
            return embed
        },
        SUCCESS: (description, interaction) => {
            const embed = new EmbedBuilder()
                .setDescription(description)
                .setColor(module.exports.Colors.clear.Green)
            if (interaction) embed.setAuthor({ name: interaction?.guild.name, iconURL: interaction?.guild.iconURL({ animated: true }) })
            return embed
        },
        INFO: (description, interaction) => {
            const embed = new EmbedBuilder()
                .setDescription(description)
                .setColor(module.exports.Colors.clear.Blue)
            if (interaction) embed.setAuthor({ name: interaction?.guild.name, iconURL: interaction?.guild.iconURL({ animated: true }) })
            return embed
        }
    },

    // Colors
    Colors: {
        clear: {
            Red: 16712704, // #FF0400
            Orange: 16741376, // #FF7400
            Yellow: 16570112, // #fcd700
            Green: 7844437, // #77B255
            Blue: 554481, // #0875F1
            Purple: 11927807, // #B600FF
            Pink: 16761035, // #FFC0CB
            White: 16777215, // #FFFFFF
            Black: 0, // #000000
            Cyan: 696767, // #0AA1BF
            Water: 65481 // #00FFC9
        },
        dark: {
            Red: 11010048, // #A80000
            Orange: 13394194, // #cc6112
            Olive: 10528768, // #A0A800
            Green: 4750633, // #487d29
            Blue: 2050454, // #1F4996
            Purple: 5846677, // #593695
            Pink: 15535195, // #ed0c5b
            White: 14674921, // #DFEBE9
            Black: 2764847 // #2A302F
        },
        custom: {
            LimeGreen: 2461555, // #258F73
            Orange: 15635286, // #ee9356
            Emerald: 5294200, // #50C878
            Booster: 16023551, // #f47fff
            Love: 15895712 // #F28CA0
        }
    },
}