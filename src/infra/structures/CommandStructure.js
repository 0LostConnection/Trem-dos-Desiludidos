class Command {
    constructor(client, options) {
        this.client = client
        this.disabled = options.disabled
        this.name = options.name
        this.description = options.description
        this.options = options.options
        this.default_member_permissions = options.default_member_permissions
        this.dm_permission = options.dm_permission
    }
}

module.exports = Command