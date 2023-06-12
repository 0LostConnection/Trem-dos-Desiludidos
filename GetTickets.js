const TicketsDB = require('./src/database/TicketsDB')
require('dotenv').config({ path: './release.env' })

module.exports = GetTickets = async () => {
    const date_obj = new Date(Date())
    const name = `tickets-${date_obj.toISOString()}.json`
    const tk = new TicketsDB()
    const data = await tk.obterTickets()
    const { writeFileSync } = require('fs')
    writeFileSync(`${process.cwd()}/json/${name}`, JSON.stringify(data, null, 4))

    return name
}