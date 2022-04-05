/*L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.
*/


//PRIMO PASSO - creare una griglia - FUNZIONE.
/**
 * generato nodi della DOM + assegnato classi ai nodi della DOM + aggiunto i numeri dentro i nodi della DOM - funzione.
 * @param {string} selettore // la classe a cui vogliamo aggiunge i nodi della DOM (celle)
 * @param {number} n_celle // numero che varia in base al livello scelto
 * @param {string} tag // tipo di tag da usare per il Ns nodo
 * @param {string} tag_classe1 // classe per stilizzare i nodi (celle)
 * @param {string} tag_classe2 // classe per dare una misura ai nodi (celle) in base ai vari livelli
 */
function getGrill(selettore, n_celle, tag, tag_classe1, tag_classe2) {
    //console.log(selettore, n_celle, tag, tag_classe1, tag_classe2)
    const cells = document.querySelector(selettore);
    //console.log(cells)
    //pulire area di gioco
    cells.innerHTML = ''

    for (let i = 1; i <= (n_celle); i++) {
        //console.log(n_celle);
        const cell = document.createElement(tag)
            //console.log(cell);

        //aggiungo la classe alle celle
        cell.classList.add(tag_classe1, tag_classe2)
            //console.log(cell)

        //aggiungo i numeri da 1 a N (i) nei nodi della DOM
        cell.innerHTML = i
            //console.log(i); - Numeri
            //console.log(cell);

        cells.append(cell)
            //console.log(cells)


    }

}



/*
SECONDO PASSO - Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta. I numeri nella lista delle bombe non possono essere duplicati.
*/

//Genero numeri casuali - FUNZIONE.
function getRandomNumbers(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//verifico se la mia funzione è valida;
//console.log(getRandomNumbers(1, 100));

//Arrey con i numeri casuali unici che ho creato con getRandomNumbers - FUNZIONE.
function getArrayNumbers() {
    const arrayRN = [];
    //console.log(arrayRN);
    //applico while loop per generare 16 numeri casuali unici;
    while (arrayRN.length !== 16) {
        //variabile che genera i singoli 16 numeri da 1 a 100;
        const nRandom = getRandomNumbers(1, 100)
            //console.log(nRandom);
            //se non c'è il numero, lo aggiunge alla mia array;
        if (!arrayRN.includes(nRandom)) {
            arrayRN.push(nRandom)
        }
    }
    //console.log(arrayRN.length);
    return arrayRN;
}
//verifico se la mia funzione è valida;
//console.log(getArrayNumbers());



//LIVELLI DI GIOCO
document.getElementById('btn_play').addEventListener('click', generaGioco_facile);
/**
 * ho invocato diverse funzioni al click dei diversi livelli di gioco
 * @param {string} event // per non far refresciare la pagina
 */
function generaGioco_facile(event) {
    //Previene il comportamento della pagina
    event.preventDefault()

    //richiamo l'id di select
    const livelli = document.getElementById('livelli').value;
    //console.log(livelli)
    //Livello facile
    if (livelli === "facile") {
        getGrill('.cella_padre', 100, 'div', 'cella_singola', 'misura_lg')
    }
    //Livello medio
    else if (livelli === "medio") {
        getGrill('.cella_padre', 81, 'div', 'cella_singola', 'misura_md')
    }
    //Livello difficile
    else {
        getGrill('.cella_padre', 49, 'div', 'cella_singola', 'misura_sm')
    }

    /*
    TERZO PASSO - In seguito l'utente clicca su una cella:
    - se il numero è presente nella lista dei numeri generati --> abbiamo calpestato una bomba, la cella si colora di rosso e la partita termina.
    - altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
    */

    //Colorare le celle della griglia.
    /*
        1. Selezionare tutti i nodi della DOM (tutte le celle)
        2. Al click, evidenziare solo la cella di riferimento con THIS e cambiare colore
    */
    //Seleziono tutti i singoli nodi della DOM
    const allCell = document.querySelectorAll('.cella_singola')
        //console.log(allCell);
        //console.log(getArrayNumbers())

    //Array con i 16 numeri
    const verificaNB = getArrayNumbers()
        //console.log(verificaNB); - Array

    for (let i = 0; i < allCell.length; i++) {
        //seleziono i singoli nodi della DOM
        const singleCell = allCell[i];
        //console.log(singleCell); - Intera cella
        //console.log(allCell[i]); - Intera cella
        //console.log(i);  - Posizione [0]

        //Applico la classe che al click cambia colore
        singleCell.addEventListener('click', function() {
            //console.log(this, i);
            let verifica = true
                //this.classList.add('color')
                //console.log(numeriDOM);

            //verifica al click se il numero che hai cliccatto non fa parte dell'array 
            if (!verificaNB.includes(parseInt(this.innerHTML))) {
                this.classList.add('color')
            } else {
                this.classList.add('color_red')
                verifica = false
                alert('HAI PERSO, hai preso una bomba')


            }

        })


    }
}




//Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.