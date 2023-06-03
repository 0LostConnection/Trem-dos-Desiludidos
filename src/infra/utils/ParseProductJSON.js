const { readFileSync } = require('fs')

module.exports = class parseProductJSON {
    constructor(jsonPath) {
        this.productsJson = Boolean(jsonPath) ? JSON.parse(readFileSync(jsonPath, 'utf-8')) : JSON.parse(readFileSync(`${process.cwd()}/json/products.json`, 'utf-8'))
    }

    getDictionary() {
        let dictionary = {}
        for (const category of this.productsJson) {
            for (const product of category.products) {
                dictionary[product.id] = product.description
            }
        }
        return dictionary
    }

    getIdsArray() {
        let idsArrays = { desiludidos: [], correio: [] }
        for (const category of this.productsJson) {
            for (const product of category.products) {
                switch (category.type) {
                    case 0:
                        idsArrays.desiludidos.push(product.id)
                        break
                    case 1:
                        idsArrays.correio.push(product.id)
                        break
                }
            }
        }
        return idsArrays
    }

    createProductsChoices() {
        let idsArrays = { desiludidos: [], correio: [] }
        for (const category of this.productsJson) {
            for (const product of category.products) {
                switch (category.type) {
                    case 0:
                        idsArrays.desiludidos.push({ name: product.description, value: product.id })
                        break
                    case 1:
                        idsArrays.correio.push({ name: product.description, value: product.id })
                        break
                }
            }
        }
        return idsArrays
    }

    findType(productId) {
        return this.productsJson.findIndex((typeObject) => typeObject.products.find(product => product.id == productId))
    }
}