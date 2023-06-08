const mongoose = require('mongoose');

/**
 * Classe responsável pela conexão com o banco de dados
 */
module.exports = class Database {
    /**
     * @param {String} uri URI para a conexão com o banco de dados
     */
    constructor(uri) {
        this.uri = uri;
    }

    /**
     * Conecta com o banco de dados
     */
    async connect() {
        try {
            mongoose.set("strictQuery", true)
            await mongoose.connect(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
            //console.log('Conexão bem-sucedida ao banco de dados!')
            return mongoose.connection
        } catch (error) {
            console.error('Erro ao conectar ao banco de dados:', error);
        }
    }

    /**
     * Desconecta do banco de dados
     */
    async disconnect() {
        try {
            await mongoose.disconnect()
            //console.log('Desconectado do banco de dados.');
        } catch (error) {
            console.error('Erro ao desconectar do banco de dados:', error);
        }
    }
}