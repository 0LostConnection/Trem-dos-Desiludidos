const eventStructure = require(`../../infra/structures/EventStructure`)

module.exports = class extends eventStructure {
    constructor(client) {
        super(client, {
            name: 'ready'
        })
    }

    run = async (interaction) => {
        console.log(`
Status          Online
Name            ${this.client.user.tag}
Guilds      ${this.client.guilds.cache.size}
        `)
        this.client.deployCommands()

        // Presence
        setInterval(() => {
            const { statusArray } = this.client.config
            const option = Math.floor(Math.random() * statusArray.length)
            this.client.user.setPresence({
                activities: [
                    {
                        name: statusArray[option].content,
                        type: statusArray[option].type,
                        url: statusArray[option].url
                    },
                ],
                status: statusArray[option].status
            })
        }, 30000)//1000*60*15);

    }
}