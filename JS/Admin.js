// Caricare i ticket quando la pagina si carica
document.addEventListener("DOMContentLoaded", function () {
    createTicket();
});


const token = localStorage.getItem("authToken");

// Funzione per caricare e mostrare tutti i ticket
function createTicket() {
    const tbody = document.getElementById("tbody");

    getAllTickets().then(tickets => {
        tickets.forEach(ticket => {
    
            

            const tr = document.createElement("tr");
            tr.id = "riga" + ticket.id;

            const numero = document.createElement("th");
            numero.textContent = ticket.id;

            const utente = document.createElement("td");
            utente.textContent = ticket.utente.email;

            const operatore = document.createElement("td");
            operatore.textContent = ticket.operatore ? ticket.operatore.nome + " " + ticket.operatore.cognome : "Nessun operatore";

            const data_ap = document.createElement("td");
            data_ap.textContent = ticket.dataApertura;

            const data_chi = document.createElement("td");
            data_chi.textContent = ticket.dataChiusura;

            const oggetto = document.createElement("td");
            oggetto.textContent = ticket.oggetto;

            tr.appendChild(numero);
            tr.appendChild(utente);
            tr.appendChild(operatore);
            tr.appendChild(data_ap);
            tr.appendChild(data_chi);
            tr.appendChild(oggetto);

            // Aggiunta bottone
            const stato = document.createElement("td");
            const stato_btn = document.createElement("button");
            stato.id = "stato_ticket" + ticket.id;
            stato_btn.classList.add("btn", "btn-primary", "stato");
            stato_btn.textContent = ticket.status;
            stato.appendChild(stato_btn);
            tr.appendChild(stato);
            aggiornaColoreBottone(stato_btn);

            const tbody = document.getElementById("tbody");
            tbody.appendChild(tr);
        });
    });
}

// Funzione per ottenere tutti i ticket dal server
function getAllTickets() {
    return fetch("http://localhost:8080/ticket", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Errore durante il caricamento dei ticket");
        }
        return response.json();
    })
    .catch(error => {
        
        console.error("Errore:", error);
        document.getElementById("error-message").textContent = "Impossibile caricare i ticket. Riprova più tardi.";
        return []; 
    });
}


//colori per bottone
function aggiornaColoreBottone(stato_btn) {
    if (stato_btn.innerHTML === "APERTO") {
        stato_btn.style.backgroundColor = "red";
        stato_btn.style.borderColor = "red";
        stato_btn.style.color = "white";
    } else if (stato_btn.innerHTML === "VISUALIZZATO") {
        stato_btn.style.backgroundColor = "blue";
        stato_btn.style.borderColor = "blue";
        stato_btn.style.color = "white";
    } else if (stato_btn.innerHTML === "IN_LAVORAZIONE") {
        stato_btn.style.backgroundColor = "yellow";
        stato_btn.style.borderColor = "yellow";
        stato_btn.style.color = "black";
    } else if (stato_btn.innerHTML === "CHIUSO") {
        stato_btn.style.backgroundColor = "gray";
        stato_btn.style.borderColor = "gray";
        stato_btn.style.color = "white";
    }
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