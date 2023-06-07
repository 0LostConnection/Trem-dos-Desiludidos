const TicketsDB = require('./src/database/TicketsDB')
require('dotenv').config({ path: './release.env' })

module.exports = GetTickets = async () => {
    const date_obj = new Date(Date())
    const tk = new TicketsDB()
    const data = await tk.obterTickets()
    const { writeFileSync } = require('fs')
    writeFileSync(`${process.cwd()}/json/tickets-${date_obj.toISOString()}.json`, JSON.stringify(data, null, 4))
}

module.exports()