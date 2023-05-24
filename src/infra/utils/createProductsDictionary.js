let dictionary = {}
let array = []

const productsJson = require('../../../products.json')

for (const category of productsJson) {
    for (const product of category.products) {
        console.log(product.description)
        dictionary[product.id] = product.description
        array.push(product.id)
    }
}

console.log(JSON.stringify(dictionary, null, 4))
console.log(array)