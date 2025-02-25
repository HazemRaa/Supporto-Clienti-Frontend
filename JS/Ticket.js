
/*
   //metodo per creare le categorie nel navbar
   fetch('https://fakestoreapi.com/products/categories')
   .then(res => res.json())
   .then(json => {
       console.log(json)
       for (let category of json) {
           const navigazione = document.getElementById("nav-bar-cat")
           
           //console.log(category)
           const nav = document.createElement("div");
           nav.classList.add("col-sm-6","col-md-2","navcat");
           const link = document.createElement("a");
           link.classList.add("nav-link");
           link.href = "Categoria.html?category="+category;
           if (category == "women's clothing") {
               link.innerHTML = "Donna"
           } else if (category == "men's clothing") {
               link.innerHTML = "Uomo"
           } 
           nav.appendChild(link)
           navigazione.appendChild(nav)
           
       }
   })

   fetch('https://fakestoreapi.com/products/7')
    .then(res => res.json())
    .then(json => {
        const card1 = document.getElementById('col-pref-gioielli')
        const titolo = document.querySelector('#col-pref-gioielli h5')
        titolo.innerHTML = json.title;
        //const desc = document.querySelector('#col-pref-gioielli p')
        //desc.innerHTML = json.description;
        const prezzo = document.querySelector('#col-pref-gioielli span')
        prezzo.innerHTML = json.price;
        const immagine = document.querySelector('#col-pref-gioielli img')
        immagine.src = json.image;
        const link = document.querySelector('#col-pref-gioielli a')
        link.href = "Prodotto.html?productid=7"
    })
*/

/* Prende l'id dell'utente e il token
prende gli id ticket associati all'id utente
stampa i dettagli dell'id ticket
ripete per ogni id presente
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
    //Da modificare con gli elementi presi da backend
        const numero = document.createElement("th");
        numero.id = "id_ticket";
        numero.textContent = num;
        num += 1;

        const tr = document.createElement("tr");
        tr.id = "riga";

        const utente = document.createElement("td");
        utente.id = "utente_ticket";
        utente.textContent = ticket.utente.nome;

        const data_ap = document.createElement("td");
        data_ap.id = "data_ticket_ap";
        data_ap.textContent = "12-12-2012";
        data_ap.classList.add("data-tb");

        const data_chi = document.createElement("td");
        data_chi.id = "data_ticket_chi";
        data_chi.textContent = "14-12-2012";
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
        //controllo sul ruolo

        
        const stato = document.createElement("td");
        const stato_btn = document.createElement("button");
        stato.id = "stato_ticket";
        stato_btn.classList.add("btn", "btn-primary", "stato"); 
        stato_btn.textContent = ticket.status;
        stato.appendChild(stato_btn);
        tr.appendChild(stato);
        aggiornaColoreBottone(stato_btn);

        const tbody=document.getElementById("tbody");
        tbody.appendChild(tr);
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



/*
// Evento se il bottone è cliccato da modificare solo per OPERATORE
stato_btn.addEventListener("click", () => {
  console.log("Bottone cliccato!");
})
*/

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


//possibilità di cambiare lo stato del bottone per l'operatore
