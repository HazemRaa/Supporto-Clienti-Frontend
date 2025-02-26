const token = localStorage.getItem("authToken");
const ruolo = localStorage.getItem("ruolo");

if (token === null) {
    window.location.href="login.html";
} else {
            document.getElementById("Ticket-form").addEventListener("submit" , (event)  =>{
                event.preventDefault();
                
                const oggetto=document.getElementById("oggetto").value.trim();
                const categoria=document.getElementById("categoria").value;
                const messaggio=document.getElementById("messaggio").value.trim();
                const privacy=document.getElementById("privacy").checked;

                console.log(categoria);
                console.log(token);
            
                if(!oggetto || !categoria || !messaggio) {
                    alert("compila tutti i campi")
                    return;
                }
                
                if(!privacy){
                    alert("Bisogna accettare la Privacy Policy per continuare.");
                    return;
                }
                        
                fetch("http://localhost:8080/ticket", {
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization" : token
                    },
            
                    body:JSON.stringify({
                        oggetto:oggetto,
                        idCategoria:categoria,
                        testoMessaggio:messaggio
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Errore di invio");
                    }
                    return response.json();  
                })
                .then(data => {
                    window.alert("Invio ticket avvenuto con successo!");
                    window.location.href = "Ticket.html";  
                })
                .catch(error => {
                    console.log("Errore:", error);
                });
            });
            
        }

//Creazione delle categorie
function creazioneCategorie (categorie) {
    fetch("http://localhost:8080/categorieTicket")
    .then(response => {
        if (!response.ok) {
            throw new Error("Errore di invio");
        }
        return response.json();  
    })
    .then(data => {
        const menu = document.getElementById("categoria");
        const categoria = data;

            data.forEach (categoria => {
            const opzione = document.createElement("option");
            opzione.value = categoria.id;
            opzione.text = categoria.nomeCategoria;
            menu.appendChild(opzione);

        })
    
    })


    .catch(error => {
        console.log("Errore:", error);
    });
};

    

    creazioneCategorie();