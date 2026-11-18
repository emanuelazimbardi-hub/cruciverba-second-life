
/* CRUCIVERBA SECOND LIFE - LE 10 PAROLE */

const parole = [
    {
        numero: 1,
        risposta: "RIPARARE",
        direzione: "O",
        riga: 1,
        colonna: 3,
        colore: "lime",
        indizio: "Rimediare a un danno, correggere un difetto o rimettere in funzione un oggetto rotto."
    },
    {
        numero: 5,
        risposta: "RIGENERARE",
        direzione: "V",
        riga: 1,
        colonna: 7,
        colore: "arancione",
        indizio: "Generare di nuovo, restituire efficienza o dare una nuova vita a qualcosa che è logoro, danneggiato o esaurito."
    },
    {
        numero: 7,
        risposta: "RIUSARE",
        direzione: "V",
        riga: 1,
        colonna: 9,
        colore: "viola",
        indizio: "Adoperare di nuovo un oggetto prima che diventi un rifiuto, prolungandone il ciclo di vita."
    },
    {
        numero: 13,
        risposta: "RIDURRE",
        direzione: "O",
        riga: 4,
        colonna: 1,
        colore: "lime",
        indizio: "Diminuire la quantità di rifiuti, risorse e consumi alla fonte, evitando lo spreco."
    },
    {
        numero: 17,
        risposta: "RICICLARE",
        direzione: "V",
        riga: 4,
        colonna: 5,
        colore: "arancione",
        indizio: "Processo che trasforma i materiali di scarto in nuove materie prime, riducendo il consumo di risorse vergini."
    },
    {
        numero: 21,
        risposta: "CULTURALE",
        direzione: "V",
        riga: 4,
        colonna: 13,
        colore: "arancione",
        indizio: "La quarta componente dello sviluppo sostenibile, dedicata alla tutela e alla trasmissione del patrimonio culturale."
    },
    {
        numero: 25,
        risposta: "AMBIENTALE",
        direzione: "V",
        riga: 5,
        colonna: 11,
        colore: "viola",
        indizio: "Capacità di usare le risorse naturali in modo responsabile, senza compromettere le generazioni future."
    },
    {
        numero: 37,
        risposta: "ECONOMICA",
        direzione: "V",
        riga: 8,
        colonna: 2,
        colore: "lime",
        indizio: "Capacità di un sistema economico di generare crescita e reddito duraturi senza esaurire le risorse naturali."
    },
    {
        numero: 47,
        risposta: "SOCIALE",
        direzione: "O",
        riga: 10,
        colonna: 1,
        colore: "viola",
        indizio: "Capacità di garantire equità, inclusione, coesione e rispetto dei diritti umani nel tempo."
    },
    {
        numero: 61,
        risposta: "RECUPERARE",
        direzione: "O",
        riga: 12,
        colonna: 4,
        colore: "lime",
        indizio: "Processo che permette di valorizzare scarti o materiali che altrimenti verrebbero eliminati."
    }
];

/* CREAZIONE DELLA GRIGLIA */

const griglia = document.getElementById("griglia");

const caselle = new Map();

parole.forEach(parola => {

    for (let i = 0; i < parola.risposta.length; i++) {

        const riga = parola.riga +
            (parola.direzione === "V" ? i : 0);

        const colonna = parola.colonna +
            (parola.direzione === "O" ? i : 0);

        const posizione = `${riga}-${colonna}`;

        if (!caselle.has(posizione)) {

            const casella = document.createElement("div");

            casella.className = "casella";

            casella.style.gridRow = riga;
            casella.style.gridColumn = colonna;

            griglia.appendChild(casella);

            caselle.set(posizione, casella);
        }

        if (i === 0) {

            const numero = document.createElement("span");

            numero.className = "numero";
            numero.textContent = parola.numero;

            caselle.get(posizione).appendChild(numero);
        }
    }
});

/* INSERIMENTO DELLE DEFINIZIONI */

const orizzontali = document.getElementById("indizi-orizzontali");
const verticali = document.getElementById("indizi-verticali");

parole.forEach(parola => {

    const indizio = document.createElement("p");

    indizio.className = "indizio";

    const numero = document.createElement("strong");
    numero.textContent = `${parola.numero}) `;

    indizio.appendChild(numero);
    indizio.appendChild(document.createTextNode(parola.indizio));

    if (parola.direzione === "O") {
        orizzontali.appendChild(indizio);
    } else {
        verticali.appendChild(indizio);
    }
});



/* INTERATTIVITA' DEL CRUCIVERBA */

let parolaSelezionata = null;
const paroleRisolte = new Set();

const campoRisposta = document.getElementById("risposta");
const pulsanteVerifica = document.getElementById("verifica");
const testoSelezione = document.getElementById("parola-selezionata");
const messaggio = document.getElementById("messaggio");

/* SELEZIONE DELLA DEFINIZIONE */

parole.forEach(parola => {
    const elenco = parola.direzione === "O"
        ? orizzontali
        : verticali;

    const stessoTipo = parole.filter(
        p => p.direzione === parola.direzione
    );

    const indice = stessoTipo.indexOf(parola);
    const elemento = elenco.children[indice];

    elemento.addEventListener("click", () => {
        parolaSelezionata = parola;

        testoSelezione.textContent =
            `Parola ${parola.numero} - ${parola.risposta.length} lettere`;

        campoRisposta.value = "";
        messaggio.textContent = "";
        campoRisposta.focus();
    });
});

/* COLORI DEFINITIVI DEGLI INCROCI */

const incrociFinali = {
    "1-7": 5,
    "1-9": 7,
    "4-5": 17,
    "4-7": 5,
    "10-2": 47,
    "10-5": 47,
    "10-7": 47,
    "12-5": 17,
    "12-11": 25,
    "12-13": 21
};

/* AGGIORNAMENTO DELLA GRIGLIA */

function aggiornaGriglia() {
    aggiornaAiuto();
    const contenuti = new Map();

    parole.forEach(parola => {
        if (!paroleRisolte.has(parola.numero)) return;

        for (let i = 0; i < parola.risposta.length; i++) {
            const r = parola.riga +
                (parola.direzione === "V" ? i : 0);

            const c = parola.colonna +
                (parola.direzione === "O" ? i : 0);

            const posizione = `${r}-${c}`;

            if (!contenuti.has(posizione)) {
                contenuti.set(posizione, []);
            }

            contenuti.get(posizione).push({
                numero: parola.numero,
                lettera: parola.risposta[i],
                colore: parola.colore
            });
        }
    });

    caselle.forEach((casella, posizione) => {
        casella.classList.remove(
            "risolta-lime",
            "risolta-arancione",
            "risolta-viola"
        );

        const vecchiaLettera =
            casella.querySelector(".lettera");

        if (vecchiaLettera) vecchiaLettera.remove();

        const opzioni = contenuti.get(posizione);
        if (!opzioni) return;

        const preferito = incrociFinali[posizione];

        const scelta = opzioni.find(
            o => o.numero === preferito
        ) || opzioni[opzioni.length - 1];

        casella.classList.add(
            `risolta-${scelta.colore}`
        );

        const lettera = document.createElement("span");
        lettera.className = "lettera";
        lettera.textContent = scelta.lettera;

        casella.appendChild(lettera);
    });
}

/* VERIFICA DELLA RISPOSTA */

pulsanteVerifica.addEventListener("click", () => {
    if (!parolaSelezionata) {
        messaggio.textContent =
            "Seleziona prima una definizione.";
        return;
    }
    const parolaVerificata = parolaSelezionata;
    const risposta = campoRisposta.value
        .trim()
        .toUpperCase()
        .replace(/\s+/g, "");

    if (risposta === parolaSelezionata.risposta) {
        paroleRisolte.add(parolaSelezionata.numero);

        aggiornaGriglia();
        aggiornaAiuto();

        messaggio.textContent =
            "Risposta corretta! La parola si è colorata.";

        campoRisposta.value = "";
        parolaSelezionata = null;

        testoSelezione.textContent =
            "Seleziona un'altra definizione.";

        if (paroleRisolte.size === parole.length) {
            messaggio.textContent =
                "Complimenti! Hai completato il cruciverba Second Life!";
        }
    } else {
        messaggio.textContent =
            "Risposta non corretta. Riprova!";
    }    mostraRisultatoSullaGriglia(
        parolaVerificata,
        risposta === parolaVerificata.risposta
    );
});

/* INVIO DALLA TASTIERA */

campoRisposta.addEventListener("keydown", evento => {
    if (evento.key === "Enter") {
        pulsanteVerifica.click();
    }
});

/* PULSANTE RICOMINCIA */

document.getElementById("ricomincia")
    .addEventListener("click", () => {
        paroleRisolte.clear();
        parolaSelezionata = null;
        campoRisposta.value = "";

        testoSelezione.textContent =
            "Seleziona una definizione per iniziare.";

        messaggio.textContent = "";
        aggiornaGriglia();
    });

/* FUNZIONE AIUTO */

const pulsanteAiuto =
    document.getElementById("mostra-aiuto");

const listaAiuto =
    document.getElementById("lista-aiuto");

/* Recupera le dieci risposte */
const paroleAiuto = parole.map(p => p.risposta);

/* Mescola le parole in ordine casuale */
for (let i = paroleAiuto.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [paroleAiuto[i], paroleAiuto[j]] =
        [paroleAiuto[j], paroleAiuto[i]];
}

/* Crea i riquadri delle parole */
paroleAiuto.forEach(risposta => {
    const elemento = document.createElement("span");

    elemento.className = "parola-aiuto";
    elemento.textContent = risposta;

    listaAiuto.appendChild(elemento);
});

/* Mostra o nasconde l'aiuto */
pulsanteAiuto.addEventListener("click", () => {
    const aperto =
        pulsanteAiuto.getAttribute("aria-expanded") === "true";

    listaAiuto.hidden = aperto;

    pulsanteAiuto.setAttribute(
        "aria-expanded",
        String(!aperto)
    );

    pulsanteAiuto.textContent = aperto
        ? "Mostra le parole disponibili"
        : "Nascondi le parole";
});

/* AGGIORNA LE PAROLE DELLA SEZIONE AIUTO */

function aggiornaAiuto() {

    const elementi =
        document.querySelectorAll(".parola-aiuto");

    elementi.forEach(elemento => {

        const parola = parole.find(
            p => p.risposta === elemento.textContent.trim()
        );

        if (!parola) return;

        elemento.classList.remove(
            "aiuto-lime",
            "aiuto-arancione",
            "aiuto-viola"
        );

        if (paroleRisolte.has(parola.numero)) {
            elemento.classList.add(
                "aiuto-" + parola.colore
            );
        }

    });
}

/* SELEZIONE DELLE PAROLE DALLA GRIGLIA */

caselle.forEach((casella, posizione) => {

    const paroleCollegate = parole.filter(parola => {

        for (let i = 0; i < parola.risposta.length; i++) {

            const r = parola.riga +
                (parola.direzione === "V" ? i : 0);

            const c = parola.colonna +
                (parola.direzione === "O" ? i : 0);

            if (`${r}-${c}` === posizione) {
                return true;
            }
        }

        return false;
    });

    casella.addEventListener("click", () => {

        const nonRisolte = paroleCollegate.filter(
            p => !paroleRisolte.has(p.numero)
        );

        const disponibili = nonRisolte.length
            ? nonRisolte
            : paroleCollegate;

        const indice = disponibili.findIndex(
            p => p.numero === parolaSelezionata?.numero
        );

        const parola = disponibili[
            (indice + 1) % disponibili.length
        ];

        parolaSelezionata = parola;

        testoSelezione.textContent =
            `${parola.numero}) ${parola.indizio} ` +
            `(${parola.risposta.length} lettere)`;

        campoRisposta.value = "";
        messaggio.textContent = "";

        document.querySelector(".area-risposta")
            .scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        campoRisposta.focus({
            preventScroll: true
        });
    });
});

/* RITORNO AUTOMATICO ALLA GRIGLIA */

let timerRisultato;
let caselleTemporanee = [];

const avvisoGriglia = document.createElement("div");

avvisoGriglia.style.cssText = `
    position: fixed;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    display: none;
    max-width: 90vw;
    padding: 12px 18px;
    background: white;
    color: #19231D;
    border: 2px solid #888D30;
    border-radius: 10px;
    text-align: center;
    font-weight: bold;
    box-shadow: 0 4px 14px #00000030;
`;

avvisoGriglia.setAttribute("role", "status");
document.body.appendChild(avvisoGriglia);

function mostraRisultatoSullaGriglia(parola, corretta) {

    clearTimeout(timerRisultato);

    // Elimina eventuali vecchie evidenziazioni rosse
    caselleTemporanee.forEach(casella => {
        casella.style.backgroundColor = "";
        casella.style.borderColor = "";
    });

    caselleTemporanee = [];

    // Se la risposta è sbagliata, colora di rosso
    if (!corretta) {

        for (let i = 0; i < parola.risposta.length; i++) {

            const r = parola.riga +
                (parola.direzione === "V" ? i : 0);

            const c = parola.colonna +
                (parola.direzione === "O" ? i : 0);

            const casella = caselle.get(`${r}-${c}`);

            if (!casella) continue;

            // Non cambiare i colori delle lettere già risolte
            const giaRisolta = [
                "risolta-lime",
                "risolta-arancione",
                "risolta-viola"
            ].some(classe => casella.classList.contains(classe));

            if (giaRisolta) continue;

            casella.style.backgroundColor = "#F5B7B1";
            casella.style.borderColor = "#C62828";

            caselleTemporanee.push(casella);
        }
    }

    // Mostra il messaggio anche nella parte alta
    avvisoGriglia.textContent = messaggio.textContent;

    avvisoGriglia.style.borderColor =
        corretta ? "#888D30" : "#C62828";

    avvisoGriglia.style.display = "block";

    // Riporta il giocatore alla griglia
    campoRisposta.blur();

    griglia.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    // Dopo 2,5 secondi rimuove il rosso e l'avviso
    timerRisultato = setTimeout(() => {

        caselleTemporanee.forEach(casella => {
            casella.style.backgroundColor = "";
            casella.style.borderColor = "";
        });

        caselleTemporanee = [];
        avvisoGriglia.style.display = "none";

    }, 2500);
}
