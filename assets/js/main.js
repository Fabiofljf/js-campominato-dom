/*L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.
*/


//PRIMO PASSO - creare una griglia.
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
        cell.innerHTML += i
            //console.log(cell);
        cells.append(cell)
            //console.log(cells)

    }

}

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

    //SECONDO PASSO - colorare le celle della griglia.

    /*
        1. Selezionare tutti i nodi della DOM (tutte le celle)
        2. Al click, evidenziare solo la cella di riferimento con THIS e cambiare colore
    */
    //Seleziono tutti i singoli nodi della DOM
    const allCell = document.querySelectorAll('.cella_singola')
        //console.log(allCell);
    for (let i = 0; i < allCell.length; i++) {
        //seleziono i singoli nodi della DOM
        const singleCell = allCell[i];
        //console.log(singleCell);

        //Applico la classe che al click cambia colore
        singleCell.addEventListener('click', function() {
            //console.log(this, i);
            this.classList.add('color')
        })

    }
}