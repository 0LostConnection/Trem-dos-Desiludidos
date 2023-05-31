const Database = require('./Database')

module.exports = class extends Database {
    constructor() {
        super(process.env.DATABASE_SECRET)
    }

    /*  async adicionarTicket(data) {
         const tickets = require('./models/Ticket')
         const connection = await super.connect()
         const database = { connection, tickets }
         const ticket =  new database.tickets(data)
         await ticket.save()
         await super.disconnect()
     } */

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