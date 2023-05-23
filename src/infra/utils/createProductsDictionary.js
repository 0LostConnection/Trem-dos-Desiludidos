let dictionary = {}

const productsJson = require('../../../products.json')

for (const category of productsJson) {
    for (const product of category.products) {
        dictionary[product.id] = product.description
    }
}

console.log(JSON.stringify(dictionary, null, 4))