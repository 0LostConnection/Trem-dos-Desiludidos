const eventStructure = require(`../../infra/structures/EventStructure`)

module.exports = class extends eventStructure {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        })
    }

    run = async (interaction) => {
        if (!interaction.isButton()) return

        switch(interaction.customId) {
            case 'delete':
                interaction.message.delete()
                break
        }
    }
}