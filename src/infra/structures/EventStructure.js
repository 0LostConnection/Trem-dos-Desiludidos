const { Events } = require('discord.js')

class Event {
    /**
     * Estrutura de eventos
     * @param {*} client Discord client 
     * @param {Object} options Opções do evento
     * @param {String<Events>} options.name Nome do evento 
     */
    constructor(client, options) {
        this.client = client
        this.name = options.name
        this.disabled = options.disabled
    }
}

module.exports = Event