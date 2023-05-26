const ProcessTicketData = require('./src/infra/utils/ProcessTicketData')
const { calcularLucro } = new ProcessTicketData('./json/tickets.json')

const ParseProductJSON = require('./src/infra/utils/ParseProductJSON')
const dictionary = new ParseProductJSON().getDictionary()
const array = new ParseProductJSON().getIdsArray()

console.log(new ParseProductJSON().createProductsChoices())

console.log(dictionary)
console.log(array)
console.log(calcularLucro('pirulito'), )
