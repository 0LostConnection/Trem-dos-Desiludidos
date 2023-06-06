const Command = require('../../infra/structures/CommandStructure')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            description: 'Checa o ping do bot',
        })
    }

    run = (interaction) => {
        interaction.reply({ content: `🏓 **|** **Latência:** \`${Date.now() - interaction.createdTimestamp}ms\`  **Latência da API:** \`${Math.round(interaction.client.ws.ping)}ms\``, ephemeral: true })
    }
}