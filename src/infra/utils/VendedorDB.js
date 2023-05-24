const fs = require('fs');

module.exports = class VendedorDB {
  constructor(filePath) {
    this.filePath = filePath;
    this.data = this.carregarDados();
  }

  carregarDados() {
    try {
      const data = fs.readFileSync(this.filePath);
      return JSON.parse(data);
    } catch (error) {
      // Se o arquivo não existir ou ocorrer algum erro na leitura, retorna um objeto vazio
      return {};
    }
  }

  salvarDados() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 4));
  }

  adicionarVendedor(id, name) {
    const vendedor = {
      name: name
    };

    this.data[id] = vendedor;
    this.salvarDados();
  }

  obterVendedor(id) {
    return this.data[id]
  }

  atualizarNomeVendedor(id, newName) {
    const vendedor = this.data[id];

    if (vendedor) {
      vendedor.name = newName;
      this.salvarDados();
    }
  }

  excluirVendedor(id) {
    delete this.data[id];
    this.salvarDados();
  }
}