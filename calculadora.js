// Objeto com preços de cada produto, a chave é o id do input
const precos = {
  paoBasico600: 25,
  paoMandioquinha600: 30,
  paoTomateSeco600: 30,
  paoAzeitona600: 30,
  paoOregano600: 30,
  paoSementes600: 30,
  paoBaconPresunto600: 35,
  paoAtum600: 35,
  paoCerejaAmendoas600: 35,

  paoBasico300: 15,
  paoMandioquinha300: 20,
  paoTomateSeco300: 17.5,
  paoAzeitona300: 17.5,
  paoOregano300: 17.5,
  paoSementes300: 17.5,
  paoBaconPresunto300: 20,
  paoAtum300: 20,
  paoCerejaAmendoas300: 20,

  boloMacacomcanela: 32.50,
  boloAmeixaCoco: 32.50,
  bboloCacau: 27.50,

  Gergelimcanelaecacau: 12.00,

  paoMacaxeira: 22.5,
  paoCalabresa: 42.5,
  paoPresunto: 42.5,
  paoFrango: 42.5,
  paoPimentaBiquinho: 42.5,
  paoCarneGorgonzola: 45.0,

  paoRoscaCoco: 30,
  paoChurros: 42.5,
  paoRomeuJulieta: 42.5,
  paoFlorChocolate: 52.5,
  paoFlorRomeuJulieta: 50,

  salgadoFrangoRequeijao: 7,
  salgadoPresuntoMucarela: 7,
  salgadoCalabresaRequeijao: 7,
  salgadinhoqueijo: 15.0,
  
  cookie100: 15.0
  
};

function calcularTotal() {
  let total = 0;

  for (const id in precos) {
    const input = document.getElementById(id);
    if (input) {
      const quantidade = Number(input.value) || 0;
      total += quantidade * precos[id];
    }
  }

  // Pega o desconto percentual
  const descontoPercentInput = document.getElementById('descontoPercent');
  const descontoPercent = descontoPercentInput ? Number(descontoPercentInput.value) || 0 : 0;

  // Aplica desconto percentual
  if (descontoPercent > 0) {
    total = total - (total * descontoPercent / 100);
  }

  // Pega desconto em reais
  const descontoInput = document.getElementById('desconto');
  const desconto = descontoInput ? parseFloat(descontoInput.value.replace("R$", "").replace(/\./g, "").replace(",", ".")) || 0 : 0;

  // Adiciona taxa de entrega
const taxaEntregaInput = document.getElementById('taxaEntrega');
let taxaEntrega = 0;

if (taxaEntregaInput) {
  const valorFormatado = taxaEntregaInput.value.replace(/\./g, '').replace(',', '.');
  taxaEntrega = Number(valorFormatado) || 0;
}

total += taxaEntrega;


  // Subtrai desconto em reais, sem deixar negativo
  total -= desconto;
  if (total < 0) total = 0;

  // Atualiza texto do total formatado em moeda BR
  const resultadoTotal = document.getElementById('resultadoTotal');
  resultadoTotal.textContent = 'Total: R$ ' + total.toFixed(2).replace('.', ',');
}

// Adicionar listener para disparar o cálculo a cada input alterado no formulário
const form = document.getElementById('form-pedidos');
form.addEventListener('input', calcularTotal);

// Calcular total inicial (se quiser)
calcularTotal();

const botaoZerar = document.getElementById('botaoZerar');

botaoZerar.addEventListener('click', () => {
  for (const id in precos) {
    const input = document.getElementById(id);
    if (input) {
      input.value = 0;
      const taxaEntregaInput = document.getElementById('taxaEntrega');
if (taxaEntregaInput) taxaEntregaInput.value = '0,00';

    }
  }
  // Limpa o campo de desconto também (opcional)
  const descontoInput = document.getElementById('desconto');
  if (descontoInput) descontoInput.value = "0,00";

   // Zera o campo de desconto em porcentagem
  const descontoPorcentagem = document.getElementById('descontoPercent');
  if (descontoPorcentagem) descontoPorcentagem.value = "0";
  

  // 🟨 NOVO: recolhe todos os <details> abertos
  document.querySelectorAll("details").forEach((detalhe) => {
    detalhe.open = false;
  });

  // Reativa os campos de desconto
  const descontoReais = document.getElementById("desconto");
  const descontoPercent = document.getElementById("descontoPercent");

  if (descontoReais) descontoReais.disabled = false;
  if (descontoPercent) descontoPercent.disabled = false;

  calcularTotal();
});

document.getElementById("desconto").addEventListener("input", function (e) {
  let valor = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número
  valor = (valor / 100).toFixed(2) + ""; // Divide por 100 e fixa 2 casas
  valor = valor.replace(".", ","); // Troca ponto por vírgula
  valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Adiciona separador de milhar
  e.target.value = valor;
});

function atualizarCamposDesconto() {
  const descontoReais = document.getElementById("desconto");
  const descontoPercent = document.getElementById("descontoPercent");

  // Remover formatação para comparar valores numéricos
  let valorReais = descontoReais.value.replace(/\./g, '').replace(',', '.');
  valorReais = parseFloat(valorReais) || 0;

  let valorPercent = parseFloat(descontoPercent.value) || 0;

  // Se valor reais > 0 desativa percentual, se zero reativa
  descontoPercent.disabled = valorReais > 0;

  // Se valor percentual > 0 desativa reais, se zero reativa
  descontoReais.disabled = valorPercent > 0;
}

// Vincula o evento nos dois inputs
document.getElementById("desconto").addEventListener("input", () => {
  // formata o campo desconto em reais normalmente
  let descontoInput = document.getElementById("desconto");
  let valor = descontoInput.value.replace(/\D/g, ""); // só números
  valor = (valor / 100).toFixed(2) + "";
  valor = valor.replace(".", ",");
  valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  descontoInput.value = valor;

  atualizarCamposDesconto();
});

document.getElementById("descontoPercent").addEventListener("input", () => {
  atualizarCamposDesconto();
});


document.getElementById("taxaEntrega").addEventListener("input", function (e) {
  let valor = e.target.value.replace(/\D/g, "");
  valor = (valor / 100).toFixed(2) + "";
  valor = valor.replace(".", ",");
  e.target.value = valor.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
});
