const fs = require('fs')
const ParseProductJSON = require('./ParseProductJSON')

module.exports = class ProductsDB {
    constructor(filePath) {
        this.filePath = Boolean(filePath) ? filePath : `${process.cwd()}/json/products.json`, 'utf-8'
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

    obterPreco(productId, type) {
        let data = this.carregarDados()
        return data[type].products.find(p => p.id == productId)?.price || null
    }

    salvarDados(data) {
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 4))
    }

    alterarPreco(productId, paymentMethod, price) {
        let data = this.carregarDados()

        const productTypeIndex = new ParseProductJSON().findType(productId)

        let productsArray = data[productTypeIndex].products

        let productIndex = productsArray.findIndex(product => product.id == productId)

        try {
            data[productTypeIndex].products[productIndex].price[paymentMethod] = String(price).replace('.', ',')
            this.salvarDados(data)
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }
}