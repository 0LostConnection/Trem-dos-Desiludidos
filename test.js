/* 
const ParseProductJSON = require('./src/infra/utils/ParseProductJSON')
const ids = new ParseProductJSON().getIdsArray()

for (const [type, productsIds] of Object.entries(ids)) {
    for (const productId of productsIds) {
        console.log(new ParseProductJSON().findType(productId))
    }
} 
*/

/* 
const ParseProductJSON = require('./src/infra/utils/ParseProductJSON')
const ProductsDB = require('./src/infra/utils/ProductsDB')

const ids = new ParseProductJSON().getIdsArray()

for (const [type, productsIds] of Object.entries(ids)) {
    for (const productId of productsIds) {
        new ProductsDB('./json/products.json').alterarPreco(productId)
    }

}
 */

const ProductsDB = require('./src/infra/utils/ProductsDB')
console.log(new ProductsDB('./json/products.json').alterarPreco('pirulito', 'pix', Number(1)))