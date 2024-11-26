let compara = (s1, e1) => { 
    let senha = [...s1];
    let entrada = [...e1];
    let pretas = 0;

    let arrayBrancas = senha.map((e, i) => e == entrada[i]);
    let brancas = arrayBrancas.reduce((a, b) => a + b);

    for (let i1 in entrada) {
        if (arrayBrancas[i1]) continue;
        for (let i2 in senha) {
            if (arrayBrancas[i2]) continue;
            if (entrada[i1] == senha[i2]) {
                pretas++;
                entrada[i1] = -1; 
                senha[i2] = -2;   
            }
        }
    }
    
    return { brancas: brancas, pretas: pretas };
};

function gerarCombinacao() {
    const numeros = [];
    while (numeros.length < 4) {
        const num = Math.floor(Math.random() * 4) + 1;
        if (!numeros.includes(num)) {
            numeros.push(num);
        }
    }
    return numeros;
}

function jogar() {
    const combinacao = gerarCombinacao();
    let tentativas = 10;

    console.log("Bem-vindo ao jogo! Tente adivinhar a combinação secreta.");
    console.log("A combinação é composta por 4 números entre 1 e 4, sem repetições.");

    while (tentativas > 0) {
        const palpite = prompt(`Digite seu palpite (ex: 1,2,3,4). Tentativas restantes: ${tentativas}`);
        const entrada = palpite.split(",").map(Number);

        if (entrada.length !== 4 || entrada.some(num => num < 1 || num > 4)) {
            console.log("Entrada inválida! Insira quatro números de 1 a 4, separados por vírgulas.");
            continue;
        }

        const resultado = compara(combinacao, entrada);

        if (resultado.brancas === 4) {
            console.log("Parabéns! Você acertou a combinação:", combinacao);
            return;
        } else {
            console.log(`Brancas (posição correta): ${resultado.brancas}`);
            console.log(`Pretas (números corretos na posição errada): ${resultado.pretas}`);
        }

        tentativas--;
    }

    console.log("Suas tentativas acabaram! A combinação correta era:", combinacao);
}

jogar();
