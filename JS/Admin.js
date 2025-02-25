/* Prende l'id dell'utente e il token
prende gli id ticket associati all'id operatore
stampa i dettagli dell'id ticket
ripete per ogni ticket presente
*/

// funzione per caricare i ticket associati all'id


async function createTicket() {
    const URL = `http://localhost:8080/ticket`;
    const ruolo = localStorage.getItem("ruolo");

    try {
        const response = await fetch(URL, {
            headers: {
                "Authorization" : "6ad0c906-8dff-4916-9150-0958d7111fac"
            }
        });
        if (!response.ok) {
            throw new Error("Errore nel recupero dei ticket");
          }
    const dati = await response.json();
       
var num = 1;
  dati.forEach (ticket => {
        const numero = document.createElement("th");
        numero.id = "id_ticket";
        numero.textContent = ticket.id;

        const tr = document.createElement("tr");
        tr.id = "riga";

        const utente = document.createElement("td");
        utente.id = "utente_ticket";
        utente.textContent = ticket.utente.nome;

        const operatore = document.createElement("td");
        operatore.id = "operatore_ticket";
        operatore.textContent = ticket.operatore.nome;

        const data_ap = document.createElement("td");
        data_ap.id = "data_ticket_ap";
        data_ap.textContent = ticket.data_chiusura;
        data_ap.classList.add("data-tb");

        const data_chi = document.createElement("td");
        data_chi.id = "data_ticket_chi";
        data_chi.textContent = ticket.data_apertura;
        data_chi.classList.add("data-tb");

        const oggetto = document.createElement("td");
        oggetto.id = "oggetto_ticket";
        oggetto.textContent = ticket.oggetto;
        
        console.log(ticket.oggetto);
        console.log(ticket);
       
        tr.appendChild(numero);
        tr.appendChild(utente);
        tr.appendChild(data_ap);
        tr.appendChild(data_chi);
        tr.appendChild(oggetto);

        //Aggiunta bottone
        
            const stato = document.createElement("select");
            const bottoncino = document.getElementById("bottoncino");
          
            stato.id = "stato_ticket";
            stato.classList.add("btn", "btn-primary", "stato");
          
            const stati = ["NUOVO", "APERTO", "VISUALIZZATO", "IN_LAVORAZIONE", "CHIUSO"];
          
            stati.forEach(status => {
              const stato_btn = document.createElement("option");
              stato_btn.value = status;
              stato_btn.textContent = status;
              stato.appendChild(stato_btn);
            });
          
            stato.value = ticket.status;
          
            bottoncino.appendChild(stato);
            tr.appendChild(bottoncino);
          
   });

  } catch (error) {
    console.error("Errore:", error);
    
  }
}
createTicket();



//colori per bottone
function aggiornaColoreBottone(stato_btn) {
    if (stato_btn.innerHTML === "APERTO") {
        stato_btn.style.backgroundColor = "red";
        stato_btn.style.borderColor = "red";
    } else if (stato_btn.innerHTML === "VISUALIZZATO") {
        stato_btn.style.backgroundColor = "blue";
        stato_btn.style.borderColor = "blue";
    } else if (stato_btn.innerHTML === "IN_LAVORAZIONE") {
        stato_btn.style.backgroundColor = "yellow";
        stato_btn.style.borderColor = "yellow";
        stato_btn.style.color = "black";
    } else if (stato_btn.innerHTML === "CHIUSO") {
        stato_btn.style.backgroundColor = "gray";
        stato_btn.style.borderColor = "gray";
    }
    console.log(stato_btn);
    console.log("ciao");
}


//Filtro
document.addEventListener("DOMContentLoaded", function() {
    const filtri = document.querySelectorAll(".dropdown-item");

    filtri.forEach(filtro => {
        filtro.addEventListener("click", function() {
            const statoSelezionato = this.id;
            const righe = document.querySelectorAll("#tbody tr"); //seleziona tutte le righe della tabella

            filtri.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            console.log(statoSelezionato);
            righe.forEach(riga => {
               
                const statoBtn = riga.querySelector(".stato");
                if (statoBtn) {
                    const statoTicket = statoBtn.innerHTML.trim();

                    if (statoTicket === statoSelezionato || statoSelezionato === "tutti" ) {
                        riga.style.display = "";
                    } else if (statoTicket !== statoSelezionato) {
                        riga.style.display = "none";
                    }
                }
            });
        });
    });
});


// Evento se il bottone è cliccato
function modificaStato(idTicket) {
    const stato_btn = document.getElementById("stato_ticket");

    stato_btn.addEventListener("change", () => {
    console.log("Bottone cliccato!"); //DA TOGLIERE
    const nuovoStato = stato_btn.value;

    fetch(`http://localhost:8080/ticket/${idTicket}`), { //controllare l'url
    method: "PUT",
    headers: {
       
    },
    body: JSON.stringify({ stato: nuovoStato})
    };
    })
    .then(response => {
        if (response.ok) {
            console.log("Stato aggiornato");
        } else {
            console.errore("Errore durante l'aggiornamento");
        }
    })
    .catch(errore => {
        console.errore("Errore" + error);
    });
};

// Evento se il bottone è cliccato
function modificaOperatore(idTicket) {
    const operatore = document.getElementById("id_operatore");

    stato_btn.addEventListener("change", () => {
    console.log("Bottone cliccato!"); //DA TOGLIERE
    const nuovoStato = stato_btn.value;

    fetch(`http://localhost:8080/ticket/${idTicket}`), { //controllare l'url
    method: "PUT",
    headers: {
       
    },
    body: JSON.stringify({ stato: nuovoStato})
    };
    })
    .then(response => {
        if (response.ok) {
            console.log("Stato aggiornato");
        } else {
            console.errore("Errore durante l'aggiornamento");
        }
    })
    .catch(errore => {
        console.errore("Errore" + error);
    });
};