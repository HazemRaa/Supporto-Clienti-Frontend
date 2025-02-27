/* Prende l'id dell'utente e il token
prende gli id ticket associati all'id operatore
stampa i dettagli dell'id ticket
ripete per ogni ticket presente
*/

document.addEventListener("DOMContentLoaded", function() {
    createTicket();
});

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
        
const selectStato = document.createElement("select");
const th = document.createElement("th");

selectStato.id = "stato_ticket" + ticket.id;
th.classList.add("stato-th");

selectStato.addEventListener("change", () => {
    modificaStato(ticket.id, ticket.id, ticket.categoriaTicket.id);
    aggiornaColoreBottone(selectStato);
}
    
);
 selectStato.classList.add("btn", "btn-primary", "stato");

const stati = ["APERTO", "VISUALIZZATO", "IN_LAVORAZIONE", "CHIUSO"];

stati.forEach(status => {
  const stato_btn = document.createElement("option");
  stato_btn.value = status;
  stato_btn.textContent = status;
  selectStato.appendChild(stato_btn);

});

selectStato.value = ticket.status;


th.appendChild(selectStato);
tr.appendChild(th);
tbody.appendChild(tr);

aggiornaColoreBottone(selectStato);
});

  } catch (error) {
    console.error("Errore:", error);
    
  }
}



//colori per bottone
function aggiornaColoreBottone(selectStato) {
    const id = selectStato.id; 
    const stato = document.getElementById(id); 

    if (stato) {
        if (stato.value === "APERTO") {
            stato.style.backgroundColor = "red";
            stato.style.borderColor = "red";
        } else if (stato.value === "VISUALIZZATO") {
            stato.style.backgroundColor = "blue";
            stato.style.borderColor = "blue";
        } else if (stato.value === "IN_LAVORAZIONE") {
            stato.style.backgroundColor = "yellow";
            stato.style.borderColor = "yellow";
            stato.style.color = "black";
        } else if (stato.value === "CHIUSO") {
            stato.style.backgroundColor = "gray";
            stato.style.borderColor = "gray";
        } else {
            stato.style.backgroundColor = "";
            stato.style.borderColor = "";
            stato.style.color = "";
        }
    }
}
    
    // funzione per inviare messaggio
    async function inviaMessaggio(ticketId, messaggio, idCategoria) {
        console.log("invia messaggio");
        const token = localStorage.getItem("authToken"); 
        if (!idCategoria) {
            console.error("ERRORE: idCategoria è undefined!");
            alert("Errore: ID Categoria non è definito. Impossibile inviare il messaggio.");
            return;
        }
    
        try {
            const requestBody = {
                status: "CHIUSO",
                testoMessaggio: messaggio,
                idCategoria: parseInt(idCategoria)
            };
    
            const response = await fetch(`http://localhost:8080/ticket/${ticketId}`, {
                method: "PUT",
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Errore API: ${response.status} - ${errorText}`);
            }
    
            return await response.json();
        } catch (error) {
            console.error("Errore durante l'invio del messaggio:", error);
            alert(`Errore nell'invio del messaggio: ${error.message}`);
            throw error;
        }
    }
    
    
    // Funzione per aprire il popup di invio messaggio
    function apriPopup(ticketId, idCategoria, callback) {  
        console.log("ID Categoria ricevuto nel popup:", idCategoria); // Debug
    
        // Rimuove il popup esistente se già presente
        const esistente = document.getElementById("popup-messaggio");
        if (esistente) esistente.remove();
    
        // Creazione dell'overlay
        const overlay = document.createElement("div");
        overlay.id = "popup-messaggio";
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.background = "rgba(0, 0, 0, 0.5)";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "1000";
    
        // Creazione del popup
        const popupBody = document.createElement("div");
        popupBody.style.background = "#ffaa00";
        popupBody.style.padding = "20px";
        popupBody.style.borderRadius = "10px";
        popupBody.style.width = "600px";
        popupBody.style.textAlign = "center";
        popupBody.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.3)";
        popupBody.style.position = "relative";
    
        popupBody.innerHTML = `
            <button class="popup-close" style="
                position: absolute;
                top: 10px;
                right: 10px;
                border: none;
                background: none;
                font-size: 20px;
                cursor: pointer;
            ">×</button>
            <h2>Invia un Messaggio</h2>
            <textarea id="messaggio-input" placeholder="Scrivi un messaggio..." style="
                width: 100%;
                height: 150px;
                margin-top: 10px;
                padding: 5px;
                border-radius: 5px;
                border: 1px solid #ccc;
            "></textarea>
            <button id="invia-messaggio" class="btn btn-primary" style="
                margin-top: 10px;
                padding: 10px 20px;
                border: none;
                background: #007bff;
                color: white;
                border-radius: 5px;
                cursor: pointer;
            ">Invia</button>
        `;
    
        overlay.appendChild(popupBody);
        document.body.appendChild(overlay);
    
        // Chiudi il popup quando si clicca sulla "X"
        document.querySelector(".popup-close").onclick = () => overlay.remove();
    
        // Gestione dell'invio del messaggio
        document.getElementById("invia-messaggio").onclick = async () => {
            const messaggio = document.getElementById("messaggio-input").value.trim();
            if (!messaggio) {
                alert("Inserisci un messaggio.");
                return;
            }
    
            await inviaMessaggio(ticketId, messaggio, idCategoria);
            overlay.remove();
            if (callback) callback();
        };
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
                        const statoTicket = statoBtn.value;
    
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
    
    
    // Funzione per aggiornare lo stato (con messaggio)
    function modificaStato(idTicket, num, idCategoria, messaggio) { 
        const stato_btn = document.getElementById("stato_ticket" + num);
        
        if (stato_btn.value === "CHIUSO") {
            alert("Devi inviare un messaggio prima di chiudere il ticket.");
            
            // Apri il popup per l'invio del messaggio
            apriPopup(idTicket, idCategoria, async () => {             
                console.log("Ticket chiuso, stato aggiornato correttamente.");
    
                // Disabilitiamo il pulsante stato
                stato_btn.value = "CHIUSO";
                stato_btn.disabled = true; 
                
                // Disabilitiamo la riga del ticket
                const ticketRow = document.getElementById("riga_" + idTicket);
                if (ticketRow) {
                    ticketRow.style.pointerEvents = "none";
                    ticketRow.style.opacity = "0.6";
                }
            });
    
            return; 
        }
    
        // Se lo stato non è CHIUSO, aggiorniamolo normalmente
        fetch(`http://localhost:8080/ticket/${idTicket}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "status": stato_btn.value,
                "idCategoria": parseInt(idCategoria)
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Errore HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Stato aggiornato:", data);
        })
        .catch(error => {
            console.error("Errore aggiornamento stato:", error);
        });
    
    }    
     
   
