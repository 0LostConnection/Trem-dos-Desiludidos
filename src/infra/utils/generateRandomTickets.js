const ParseProductsJSON = require('./ParseProductJSON')
const productsArray = new ParseProductsJSON('./json/products.json').getIdsArray()
const productsDictionary = new ParseProductsJSON('./json/products.json').getDictionary()

const axios = require('axios');

async function getNames() {
    try {
        const response = await axios({
            method: 'GET',
            url: 'https://randommer.io/api/Name?nameType=fullname&quantity=12',
            headers: {
                'accept': '*/*',
                'X-Api-Key': 'd294c485a16a4d3d99e7fe8ed1c2a3cf'
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
    }
}

function generateTicket(names) {
    const series = ['3ºB', '3ºA', '2ºB', '2ºA', '1ºB', '1ºA', '9ºB', '9ºA']
    const messages = ['Você é especial!', 'Te amo! <3', 'Saiba que você é uma ótima pessoa!', 'Continue sendo a pessoa incrível que você é!']
    const tickets = []
    for (const [type, array] of Object.entries(productsArray)) {
        switch (type) {
            case 'desiludidos':
                for (const productId of array) {
                    console.log()
                    tickets.push({
                        "type": 0,
                        "sellerId": "437249534096048130",
                        "buyer": {
                            "name": names[Math.floor(Math.random() * names.length)],
                            "number": series[Math.floor(Math.random() * series.length)]
                        },
                        "product": productId
                    },)
                }
                break

            case 'correio':
                for (const productId of array) {
                    tickets.push({
                        "type": 0,
                        "sellerId": "437249534096048130",
                        "buyer": {
                            "name": names[Math.floor(Math.random() * names.length)],
                            "number": series[Math.floor(Math.random() * series.length)]
                        },
                        "receiver": {
                            "name": names[Math.floor(Math.random() * names.length)],
                            "number": series[Math.floor(Math.random() * series.length)]
                        },
                        "product": productId,
                        "message": messages[Math.floor(Math.random() * messages.length)]
                    },)
                }
                break
        }
    }

    return tickets
}

getNames().then(names => {
    console.log(JSON.stringify(generateTicket(names), null, 4))
})