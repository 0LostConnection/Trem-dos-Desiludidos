const fs = require('fs')

module.exports = class VendedorDB {
    constructor(filePath) {
        this.filePath = filePath
    }

    carregarDados() {
        try {
            const data = fs.readFileSync(this.filePath)
            return JSON.parse(data)
        } catch (error) {
            // Se o arquivo não existir ou ocorrer algum erro na leitura, retorna um objeto vazio
            return []
        }
    }

    salvarDados(data) {
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 4))
    }

    adicionarTicket(ticket) {
        let data = this.carregarDados()
        data.push(ticket)
        this.salvarDados(data)
    }

    obterTickets() {
        let data = this.carregarDados()
        return data
    }
}