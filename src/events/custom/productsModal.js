const productsDictionary = {
    "pirulito": "Pirulito",
    "bombom": "Bombom",
    "bombom+pirulito": "Bombom + Pirulito",
    "bombom+fini": "Bombom + Fini",
    "brigadeiro": "Brigadeiro",
    "brigadeiro+pirulito": "Brigadeiro + Pirulito",
    "brigadeiro+fini": "Brigadeiro + Fini",
    "2+brigadeiros": "2 Brigadeiros",
    "direct": "Mensagem Direct",
    "bilhete": "Bilhete",
    "bilhete+pirulito": "Bilhete + Pirulito",
    "bilhete+bombom": "Bilhete + Bombom",
    "bilhete+bombom+pirulito": "Bilhete + Bombom + Pirulito",
    "bilhete+brigadeiro": "Bilhete + Brigadeiro",
    "bilhete+brigadeiro+pirulito": "Bilhete + Brigadeiro + Pirulito",
    "bilhete+brigadeiro+fini": "Bilhete + Brigadeiro + Fini"
}

const eventStructure = require(`../../infra/structures/EventStructure`)

module.exports = class extends eventStructure {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        })
    }

    run = async (interaction) => {
        if (!interaction.isModalSubmit()) return
        if (!interaction.customId === 'ticket:venda') return

        console.log(intearction)

    }
}