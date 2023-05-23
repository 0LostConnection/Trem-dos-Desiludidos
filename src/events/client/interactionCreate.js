const eventStructure = require(`../../infra/structures/EventStructure`)

module.exports = class extends eventStructure {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        })
    }

    run = (interaction) => {
        if (!interaction.isChatInputCommand()) return

        const command = this.client.commands.get(interaction.commandName)
        if (!command) return
        
        try {
            command.run(interaction)
        } catch (err) {
            console.log(err)
        }
    }
}