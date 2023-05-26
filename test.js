const ProductsDB = require('./src/infra/utils/ProductsDB')
const productsDB = new ProductsDB('./json/products.json')

console.log(productsDB.obterPreco('pirulito'))