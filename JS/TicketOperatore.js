/* Prende l'id dell'utente e il token
prende gli id ticket associati all'id operatore
stampa i dettagli dell'id ticket
ripete per ogni ticket presente
*/

// funzione per caricare i ticket associati all'id


async function createTicket() {
    const URL = `http://localhost:8080/ticket`;
    const token = localStorage.getItem("authToken");

    try {
        const response = await fetch(URL, {
            headers: {
                "Authorization" : token
            }
        });
        if (!response.ok) {
            throw new Error("Errore nel recupero dei ticket");
          }
    const dati = await response.json();
var num = 1;
  dati.forEach (ticket => {
        const numero = document.createElement("th");
        numero.id = "id_ticket" + ticket.id;
        numero.textContent = num;
        num += 1;

        const tr = document.createElement("tr");
        tr.id = "riga" + ticket.id;

        const utente = document.createElement("td");
        utente.id = "utente_ticket" + ticket.id;
        utente.textContent = ticket.utente.email;

        const data_ap = document.createElement("td");
        data_ap.id = "data_ticket_ap"+ ticket.id;
        data_ap.textContent = ticket.dataApertura;
        data_ap.classList.add("data-tb");

        const data_chi = document.createElement("td");
        data_chi.id = "data_ticket_chi"+ ticket.id;
        data_chi.textContent =ticket.dataChiusura;
        data_chi.classList.add("data-tb");

        const oggetto = document.createElement("td");
        oggetto.id = "oggetto_ticket"+ ticket.id;
        oggetto.textContent = ticket.oggetto;   
       
        tr.appendChild(numero);
        tr.appendChild(utente);
        tr.appendChild(data_ap);
        tr.appendChild(data_chi);
        tr.appendChild(oggetto);
//Aggiunta bottone
        
const stato = document.createElement("select");
const th = document.createElement("th");

stato.id = "stato_ticket" + ticket.id;
th.classList.add("stato-th");

console.log(ticket.categoriaTicket)
stato.addEventListener("change", () => {
    modificaStato(ticket.id, ticket.id, ticket.categoriaTicket.id)}
);
stato.classList.add("btn", "btn-primary", "stato");

const stati = ["APERTO", "VISUALIZZATO", "IN_LAVORAZIONE", "CHIUSO"];

stati.forEach(status => {
  const stato_btn = document.createElement("option");
  stato_btn.value = status;
  stato_btn.textContent = status;
  stato.appendChild(stato_btn);
});

stato.value = ticket.status;

th.appendChild(stato);
tr.appendChild(th);
tbody.appendChild(tr)
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
function modificaStato(idTicket, num, idCategoria) {
    const stato_btn = document.getElementById("stato_ticket" + num);
    const token = localStorage.getItem("authToken");
    const nuovoStato = stato_btn.value;
    console.log(nuovoStato)
    console.log(idCategoria)

    fetch(`http://localhost:8080/ticket/${idTicket}`, {
        method: "PUT",
        headers: {
            "Authorization" : token,
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            "status": nuovoStato,
            "idCategoria": parseInt(idCategoria)
        })
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data)
    })
    .catch(errore => {
        console.error("Errore" + errore);
    });
};
