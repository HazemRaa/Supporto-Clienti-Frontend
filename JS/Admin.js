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
            data_ap.textContent = ticket.data_apertura;

            const data_chi = document.createElement("td");
            data_chi.textContent = ticket.data_chiusura || "Ancora aperto";

            const oggetto = document.createElement("td");
            oggetto.textContent = ticket.oggetto;

            // Bottone per mostrare dettagli del ticket
            const dettagliTd = document.createElement("td");
            const dettagliBtn = document.createElement("button");
            dettagliBtn.textContent = "Dettagli";
            dettagliBtn.classList.add("btn", "btn-info");
            dettagliBtn.onclick = function () {
                mostraDettagli(ticket);
            };

            dettagliTd.appendChild(dettagliBtn);

            tr.appendChild(numero);
            tr.appendChild(utente);
            tr.appendChild(operatore);
            tr.appendChild(data_ap);
            tr.appendChild(data_chi);
            tr.appendChild(oggetto);
            tr.appendChild(dettagliTd);

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

// Caricare i ticket quando la pagina si carica
document.addEventListener("DOMContentLoaded", function () {
    createTicket();
});



// Funzione per mostrare i dettagli di un ticket
function mostraDettagli(ticket) {   
    alert(`
    ID Ticket: ${ticket.id}
    Utente: ${ticket.utente.email} 
    Operatore: ${ticket.operatore ? ticket.operatore.nome + " " + ticket.operatore.cognome : "Nessun operatore"}
    Data Apertura: ${ticket.data_apertura}
    Data Chiusura: ${ticket.data_chiusura || "Ancora aperto"}
    Oggetto: ${ticket.oggetto}
    Descrizione: ${ticket.descrizione || "Nessuna descrizione disponibile"}
    Stato: ${ticket.status}
    `);
}
