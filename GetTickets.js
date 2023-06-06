const TicketsDB = require('./src/database/TicketsDB')
require('dotenv').config({ path: './release.env' })

const a = async () => {
    const tk = new TicketsDB()
    const data = await tk.obterTickets()
    const { writeFileSync } = require('fs')
    writeFileSync(`${process.cwd()}/json/tickets.json`, JSON.stringify(data, null, 4))
}
a()