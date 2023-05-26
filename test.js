const parseProductJSON = require('./src/infra/utils/parseProductJSON')

const dictionary = new parseProductJSON().getDictionary()
const idsArray = new parseProductJSON().getIdsArray()
console.log(dictionary, idsArray)