const fs = require('fs')

module.exports = class VendedorDB {
  constructor(filePath) {
    this.filePath = filePath
    this.data = this.carregarDados()
  }

  carregarDados() {
    try {
      const data = fs.readFileSync(this.filePath)
      return JSON.parse(data)
    } catch (error) {
      // Se o arquivo não existir ou ocorrer algum erro na leitura, retorna um objeto vazio
      return {}
    }
  }

  salvarDados(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 4))
  }

  adicionarVendedor(id, name) {
    let data = this.carregarDados()
    data[id] = {
      name: name
    }

    this.salvarDados(data)
  }

  obterVendedor(id) {
    let data = this.carregarDados()
    return data[id]
  }

  obterVendedores() {
    let data = this.carregarDados()
    return data
  }

  atualizarNomeVendedor(id, newName) {
    let data = this.carregarDados()
    const vendedor = data[id]

    if (vendedor) {
      vendedor.name = newName
      this.salvarDados(data)
    }
  }

  excluirVendedor(id) {
    let data = this.carregarDados()
    delete data[id]
    this.salvarDados(data)
  }
}