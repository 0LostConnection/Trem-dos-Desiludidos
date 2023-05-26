const fs = require('fs')

module.exports = class ProductsDB {
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

    obterPreco(productId) {
        let data = this.carregarDados()
        for (const productType of data) {
            return productType.products.find(p => p.id == productId)?.price || []
        }
    }
}