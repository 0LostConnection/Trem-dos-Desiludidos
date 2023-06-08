const { Client, Collection } = require('discord.js')
const { readdirSync } = require('fs')
const { join } = require('path')

/**
 * Classe personalizada que estende o cliente do Discord.js para gerenciar comandos e eventos.
 * @class
 * @extends Client
 */
module.exports = class extends Client {
    constructor(options) {
        super(options)
        this.commands = []
        this.loadCommands()
        this.loadEvents()
    }

    deployCommands(commandsCategoriesPath = 'src/commands') {
        const commandsToDeploy = []
        const commandsCategories = readdirSync(commandsCategoriesPath)

        for (const category of commandsCategories) {
            const commandsFilesList = readdirSync(`${commandsCategoriesPath}/${category}`)

            for (const commandFile of commandsFilesList) {
                const commandClass = require(join(process.cwd(), `${commandsCategoriesPath}/${category}/${commandFile}`))

                try {
                    const command = new (commandClass)(this)
                    if (command.disabled) continue
                    commandsToDeploy.push(
                        {
                            name: command.name,
                            description: command.description,
                            options: command.options,
                            default_member_permissions: command.default_member_permissions,
                            dm_permission: command.dm_permission,
                        }
                    )
                } catch (err) {
                    console.log(err)
                }

            }
        }

        const { REST } = require('@discordjs/rest')
        const { Routes } = require('discord-api-types/v10')
        const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);
        (async () => {
            try {
                await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
                    body: commandsToDeploy
                })
                console.log(`Registered ${commandsToDeploy.length} [/] slash commands.`)

            } catch (err) {
                console.log(`Error registering [/] slash commands.\n${err}`)
            }
        })()
    }

    loadCommands(commandsCategoriesPath = 'src/commands') {
        this.commands = new Collection()
        const commandsCategories = readdirSync(commandsCategoriesPath)

        for (const category of commandsCategories) {
            const commandsFilesList = readdirSync(`${commandsCategoriesPath}/${category}`)

            for (const commandFile of commandsFilesList) {
                const commandClass = require(join(process.cwd(), `${commandsCategoriesPath}/${category}/${commandFile}`))

                try {
                    const command = new (commandClass)(this)
                    if (command.disabled) continue
                    this.commands.set(command.name, command)
                }
                catch (err) {
                    console.log(err)
                }
            }
        }

    }

    loadEvents(eventsTypesPath = 'src/events') {
        const eventsCategories = readdirSync(eventsTypesPath)

        for (const category of eventsCategories) {
            const eventsFilesList = readdirSync(`${eventsTypesPath}/${category}`)

            for (const eventFile of eventsFilesList) {
                const eventClass = require(join(process.cwd(), `${eventsTypesPath}/${category}/${eventFile}`))

                try {
                    const event = new (eventClass)(this)
                    if (event.disabled) continue
                    this.on(event.name, event.run)
                } catch (err) {
                    console.log(err)
                }
            }
        }
    }
}