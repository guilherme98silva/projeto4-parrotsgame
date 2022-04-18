/* Variáveis globais */
const MIN_CARTAS = 4;
const MAX_CARTAS = 14;
const WAIFUS = ["waifu1", "waifu2", "waifu3", "waifu4", "waifu5", "waifu6", "waifu7"];

let qtdCartas = 0;
let qtdJogadas = 0; 
let jogada = [];
let baralho = [];
let tempoDecorrido = 0;
let intervalo = 0;

// FUNÇÕES //

/* Repete o  prompt enquanto o número de cartas estiver fora do parâmetro */
function obterNumeroCartas() {
  while(!numeroCartas()) {
    qtdCartas = Number(prompt(`Insira a quantidade de cartas (${MIN_CARTAS} a ${MAX_CARTAS})`))
  }
}
 
/* Valida o número de cartas escolhido */
function numeroCartas() {
  const isPar = qtdCartas % 2 === 0;
  const isQtdValida = qtdCartas >= MIN_CARTAS && qtdCartas <= MAX_CARTAS;
  
  return isPar && isQtdValida;
}

/* Gera o número de cartas necessário */
function gerarCartas() {
  const qtdPares = qtdCartas/2;
  for(let i = 0; i < qtdPares; i++) {
    const carta = criarCarta(i);
    baralho.push(carta);
    baralho.push(carta);
  }

  return baralho;
}

/* Cria uma carta (frente/verso) */
function criarCarta(indiceWaifus) {
  const animeGirls = WAIFUS[indiceWaifus];
  const carta_jogo = `
  <div class="carta" onclick="selecionarCarta(this)">
    <div class="face-carta frente">
      <img src="imagens/AYAYA.png"/>
    </div>
    <div class="face-carta verso">
      <img src="imagens/${animeGirls}.gif"/>
    </div>
  </div>
  `;
  
  return carta_jogo;
}

 /* Embaralha as cartas criadas */
 function embaralharCartas() {
  return baralho.sort(comparador);
}

function comparador() {
  return Math.random() - 0.5;
}

/* Distribui as cartas na tela */
function inserirCartasNaTela() {
  const container = document.querySelector(".container");
  for(let i = 0; i < baralho.length; i++) {
    container.innerHTML += baralho[i];
  }
}

/* Gira e compara as cartas selecionadas */
function selecionarCarta(div) {
  if(isCartaValida(div)) {
    div.classList.add("selecionado");
    jogada.push(div);
  
    if(jogada.length === 2) {
      checarCartasIguais();
    }
  }
}    

function isCartaValida(div) {
  return !div.classList.contains("selecionado") || 
    !div.classList.contains("finalizado");
}

/* Checa se a primeira e segunda carta viradas são iguais */
function checarCartasIguais() {
  const primeiraCarta = jogada[0];
  const segundaCarta = jogada[1];

  if(primeiraCarta.innerHTML === segundaCarta.innerHTML) {
    primeiraCarta.classList.add("finalizado");
    segundaCarta.classList.add("finalizado");
    setTimeout(checarFinalJogo, 500);
  } else {
    setTimeout(virarCartasDoAvesso, 1000);
  }
  
  qtdJogadas++;
}

/* Caso não seja par as cartas serão desviradas */
function virarCartasDoAvesso() {
  jogada[0].classList.remove("selecionado");
  jogada[1].classList.remove("selecionado");
  jogada = [];
}

/* Exibe uma mensagem caso todas as cartas estajam viradas */
function checarFinalJogo() {
  const cartasViradas = document.querySelectorAll(".finalizado").length;
  if(qtdCartas === cartasViradas) {
    clearInterval(intervalo);
    alert(`Parabéns! Você desvendou todas as anime girls em ${qtdJogadas} jogada(s) e em incríveis ${tempoDecorrido} segundos!`);
    reiniciarJogo();
  }
  jogada = [];
} 

/* Aumenta o contador de tempo */
function aumentarTempo() {
  tempoDecorrido++;
  document.querySelector(".tempo").innerHTML = tempoDecorrido;
}

/* Recarrega a página caso o jogador aperte s */
function reiniciarJogo() {
  const resposta = prompt("Deseja reiniciar? (s ou n)");
  if(resposta === `s`) { window.location.reload(true); }
}

/*---- INÍCIO DO JOGO ----*/

obterNumeroCartas();
intervalo = setInterval(aumentarTempo, 1000);
gerarCartas();
embaralharCartas();
inserirCartasNaTela();