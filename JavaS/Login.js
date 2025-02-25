

const token =localStorage.getItem("authToken");

if(token != null){
    window.location.href="Homepage.html";
                                                                    // recuperare il token e controlla che l'utente esiste, viene reindrizzato al homepage.
}

    document.getElementById("container").addEventListener("submit", (event) =>{
        event.preventDefault();                                     // Impedisce il refresh della pagina
                                                                    //quando l'utente clicca viene eseguito l'EventListener che eseguirà la funzione

        const username=document.getElementById("username").value.trim();
        const password=document.getElementById("password").value.trim();  // Ottenere i valori inseriti dall'utente, trim() rimuove gli spazi aggiunti per sbaglio dall'utente

                                                                    
    if (!username || !password ){
        window.alert("Credenziali non valide");
        return;                                                 //interrompe la richiesta al server controllo se i campi sono vuoti

    }

        fetch("http://localhost:8080/login",{                  /* richihesta HTTP di tipo POST al server
                                                                localhost per verificare le credenziali
                                                                vengono inviati nel body in formato JSON ( ora sono) */ 
            method: "POST",
            headers: {"Content-Type": "appliction/json"},
            body: JSON.stringify({
            "username": username,
            "password": password
        }) 
    })

    .then(response =>{
        if(!response.ok){                                   // controlla se il server ha risposto con un messaggio di error
            throw new Error("Errore nel login");

        }  return response.json();                          // se risponde senza error, Converte la risposta dal server che in formato (JSON) in oggetto JS
    })                                      
        .then(data => {                                     //quidi il  prossimo .then (Promise) riceve i dati convertiti, data è l'oggetto json convertito          

        if(data.token){                                     // controlla se il token è presente nella risposta 
            localStorage.setItem("authToken", data.token);  // se esiste viene salavato nel localStorage e potra essere usato per mantenere l'utente connesso
            localStorage.setItem("userRuolo:", data.user.ruolo); //se esiste viene salavato nel localStorage e potra essere usato per mantenere Admin connesso
        if(data.user.ruolo === "admin"){                         // se tutto okay come admin, va al Admin home, altrimenti va alla pagina home utente
            window.location.href="Adminpage.html";
        }else{
            window.location.href="Homepage.html";
        }
            
        }else{
            window.alert("Login fallito");
        }
        
    })
    .catch(error => {
        console.log("Errore:", error);
    });
});