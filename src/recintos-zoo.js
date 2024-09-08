class RecintosZoo {
  constructor() {
    this.recintos = [
      { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: ['macaco'], ocupacao: 3 },
      { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: [], ocupacao: 0 },
      { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistentes: ['gazela'], ocupacao: 2 },
      { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: [], ocupacao: 0 },
      { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: ['leao'], ocupacao: 3 }
    ];

    this.animais = {
      LEAO: { tamanho: 3, bioma: ['savana'], carnivoro: true },
      LEOPARDO: { tamanho: 2, bioma: ['savana'], carnivoro: true },
      CROCODILO: { tamanho: 3, bioma: ['rio'], carnivoro: true },
      MACACO: { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
      GAZELA: { tamanho: 2, bioma: ['savana'], carnivoro: false },
      HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false }
    };
  }

  analisaRecintos(animal, quantidade) {
    
    if (!this.animais[animal]) {
      return { erro: "Animal inválido" };
    }

    if (quantidade <= 0 || isNaN(quantidade)) {
      return { erro: "Quantidade inválida" };
    }

    const animalInfo = this.animais[animal];
    const recintosViaveis = [];

    this.recintos.forEach((recinto) => {
      
      if (!animalInfo.bioma.includes(recinto.bioma)) {
        return;
      }

      
      if (animalInfo.carnivoro) {
        if (recinto.animaisExistentes.some(a => this.animais[a].carnivoro && a !== animal)) {
          return; 
        }
      }

      
      if (animal === 'HIPOPOTAMO' && !recinto.bioma.includes('savana') || !recinto.bioma.includes('rio')) {
        return; 
      }


      const espacoNecessario = quantidade * animalInfo.tamanho;
      const espacoExtra = recinto.animaisExistentes.length > 0 ? 1 : 0;
      const espacoLivre = recinto.tamanhoTotal - (recinto.ocupacao + espacoExtra);

  
      if (espacoLivre >= espacoNecessario) {
        recintosViaveis.push(
          `Recinto ${recinto.numero} (espaço livre: ${espacoLivre - espacoNecessario} total: ${recinto.tamanhoTotal})`
        );
      }
    });

    if (recintosViaveis.length > 0) {
      return { recintosViaveis };
    } else {
      return { erro: "Não há recinto viável" };
    }
  }
}

export { RecintosZoo as RecintosZoo };
