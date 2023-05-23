class Database {
    constructor(guildId) {
        this.guildId = guildId
    }

    async connect() {
        if (!this.guildId) return console.log('Provide and ID!')
        const { connect, set, connection, disconnect } = require('mongoose')
        const Models = require('./Models')

        set("strictQuery", true)
        const databaseConnection = await connect(process.env.DATABASE_SECRET, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            //.then(() => console.log('\x1b[32m%s\x1b[0m', 'Banco de dados conectado com sucesso!'))
            .catch(err => console.error('Erro ao conectar com MongoDB: ' + err));

        const database = { databaseConnection, ...Models }
        return {
            guild: await database.guilds.findById(this.guildId) || new database.guilds({ _id: this.guildId }),
            disconnect: () => {
                connection.close()
                disconnect()//.then(() => console.log('\x1b[32m%s\x1b[0m', 'Banco de dados desconectado com sucesso!'))
            }
        }
    }
}

module.exports = Database