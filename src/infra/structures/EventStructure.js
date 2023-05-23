class Event {
    constructor(client, options) {
        this.client = client,
        this.name = options.name
        this.disabled = options.disabled
    }
}

module.exports = Event