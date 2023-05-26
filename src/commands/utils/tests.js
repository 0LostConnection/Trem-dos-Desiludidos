const Command = require('../../infra/structures/CommandStructure')
const parseProductJSON = require('../../infra/utils/ParseProductJSON')
const { PermissionFlagsBits } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'test',
            description: 'test',
            default_member_permissions: Number(PermissionFlagsBits.ManageGuild),
            dm_permission: false
        })
    }

    run = (interaction) => {
        console.log(new parseProductJSON().getDictionary())
    }
}