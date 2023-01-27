const player1 = "X";
const player2 = "O";
let playTime = player1;
let gameOver = false;

atualizaMostrador();
inicializarEspacos();


function atualizaMostrador() {
    let player = document.querySelectorAll("div#mostrador img")[0];
    if (gameOver) {
        return;
    }
    if (playTime == player1) {
        player.setAttribute("src", "./img/x.png");
        console.log("Player 1 iniciado");
    } else {
        player.setAttribute("src", "./img/o.png");
        console.log("Player 2 iniciado");
    }
}

function inicializarEspacos() {
    console.log("inicializarEspacos chamado");
    let espacos = document.getElementsByClassName("espaco");
    for (let i = 0; i < espacos.length; i++) {
        espacos[i].addEventListener("click", function() {
            console.log("ferrou" + i);
            if (gameOver) {
                return;
            }
            if (this.getElementsByClassName("img").length == 0) {
                if (playTime == player1) {
                    this.innerHTML = "<img src='./img/x.png'/>";
                    this.setAttribute("jogada", player1);
                    playTime = player2;

                } else {
                    this.innerHTML = "<img src='./img/o.png'/>";
                    this.setAttribute("jogada", player2);
                    playTime = player1;
                }
                console.log("playTime = " + playTime);
                atualizaMostrador();
                verificarVencedor();
            }
        });
    }

}

function getIdComAtributo(id, atributo) {
    return document.getElementById(id).getAttribute(atributo);
}

async function verificarVencedor() {
    atributo = "jogada";
    let a1 = getIdComAtributo("a1", atributo);
    let a2 = getIdComAtributo("a2", atributo);
    let a3 = getIdComAtributo("a3", atributo);

    let b1 = getIdComAtributo("b1", atributo);
    let b2 = getIdComAtributo("b2", atributo);
    let b3 = getIdComAtributo("b3", atributo);

    let c1 = getIdComAtributo("c1", atributo);
    let c2 = getIdComAtributo("c2", atributo);
    let c3 = getIdComAtributo("c3", atributo);

    let win = "";

    if ((a1 == b1 && b1 == c1 && a1 != "") || (a1 == a2 && a1 == a3 && a1 != "") || (a1 == b2 && b2 == c3 && a1 != "")) {
        win = a1;
    } else {
        if ((b1 == b2 && b1 == b3 && b2 != "") || (b2 == a2 && b2 == c2 && b2 != "") || (b2 == a3 && b2 == c1 && b2 != "")) {
            win = b2;
        } else {
            if ((c3 == c2 && c3 == c1) || (c3 == b3 && c3 == a3) && c3 != "") {
                win = c3;
            }
        }
    }
    if (win != "") {
        gameOver = true;

        await sleep(50);
        alert("O ganhador foi o: " + win);

    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}