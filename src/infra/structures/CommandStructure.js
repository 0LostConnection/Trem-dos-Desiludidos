const { PermissionFlagsBits } = require('discord.js')

class Command {
    /**
     * Estrutura dos slash commands
     * @param {*} client Discord client 
     * @param {Object} options Opções do comando
     * @param {Boolean} options.disabled Se o comando está desativado ou não
     * @param {String} options.name Nome do comando
     * @param {String} options.description Descrição do comando
     * @param {Array<CommandInteractionOption>} options.options Opções do comando
     * @param {BigInt<PermissionFlagsBits>} options.default_member_permissions Permissões que o membro precisa para executar o comando
     * @param {(Boolean|null)} options.dm_permission Se o comando pode ser usado em DMs
     */
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