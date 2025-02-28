

const token =localStorage.getItem("authToken");

if(token != null){
    window.location.href="home.html";
                                                                    // recuperare il token e controlla che l'utente esiste, viene reindrizzato al homepage.
}

    document.getElementById("loginForm").addEventListener("submit", (event) =>{
        event.preventDefault();                                     // Impedisce il refresh della pagina
                                                                    //quando l'utente clicca viene eseguito l'EventListener che eseguirà la funzione

        const email=document.getElementById("email").value.trim();
        const password=document.getElementById("password").value.trim();  // Ottenere i valori inseriti dall'utente, trim() rimuove gli spazi aggiunti per sbaglio dall'utente

                                                                    
    if (!email || !password ){
        window.alert("Credenziali non valide");
        return;                                                 //interrompe la richiesta al server controllo se i campi sono vuoti

    }

        fetch("http://localhost:8080/login",{                  /* richihesta HTTP di tipo POST al server
                                                                localhost per verificare le credenziali
                                                                vengono inviati nel body in formato JSON ( ora sono) */ 
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
            "email": email,
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
            localStorage.setItem("userRole", data.role); //se esiste viene salavato nel localStorage e potra essere usato per mantenere Admin connesso
        if(data.role === "Admin"){                         // se tutto okay come admin, va al Admin home, altrimenti va alla pagina home utente
            window.location.href="Admin.html";
        }else if (data.role === "Utente"){
            window.location.href="Profile.html";
        } else {
            window.location.href = "Profile.html";
        }

        }else{
            window.alert("Login fallito");
        }
        
    })
    .catch(error => {
        console.log("Errore:", error);
    });
});