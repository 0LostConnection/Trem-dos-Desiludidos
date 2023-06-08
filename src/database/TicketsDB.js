const Database = require('./Database')

/**
 * Classe que representa uma conexão com o banco de dados.
 * @class
 * @constructor Cria uma nova conexão com o banco de dados
 * @augments Database
 */
module.exports = class extends Database {
    constructor() {
        super(process.env.DATABASE_SECRET)
    }

    /**
     * Adiciona um ticket ao banco de dados.
     * @param {Object} data 
     */
    async adicionarTicket(data) {
        const tickets = require('./models/Ticket')
        const connection = await super.connect()
        const database = { connection, tickets }

        database.tickets.collection.insertMany(data, async (err, docs) => {
            if (err) {
                    console.log(err)
            } else {
                await super.disconnect()
                //console.info('Ticket(s) salvo!');
            }
        })
    }
    
    /**
     * Obtêm todos os tickets no banco de dados e retorna em forma de Array
     * @returns {Array} Array contendo objetos
     */
    async obterTickets() {
        const tickets = require('./models/Ticket')
        const connection = await super.connect()
        const database = { connection, tickets }

        let ticketsArray = new Array()
        const cursor = database.tickets.find().cursor()
        for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
            ticketsArray.push(
                {
                    type: doc.type,
                    sellerId: doc.sellerId,
                    paymentMethod: doc.paymentMethod,
                    buyer: doc.buyer,
                    receiver: doc.receiver.name ? doc.receiver : undefined,
                    product: doc.product,
                    message: doc.message
                }
            )
        }
        await super.disconnect()
        return ticketsArray
    }
}