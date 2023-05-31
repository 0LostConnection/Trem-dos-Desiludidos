require('dotenv').config({ path: './release.env' })

const TicketsDB = require('./src/database/TicketsDB')
/* new TicketsDB().adicionarTicket({
    type: 0,
    sellerId: '437249534096048130',
    buyer: {
        name: 'Tariyah Gillum',
        number: '3ºB'
    },
    product: 'pirulito',
}) */
const log = async () => {
    const tickets = await new TicketsDB().obterTickets()
    console.log(tickets)
}
log()