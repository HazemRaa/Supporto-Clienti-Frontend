
function loadProfile(){
    const token = localStorage.getItem("authToken");

    const headers=token? {authorization: "Bearer " + token }: {};

    fetch("http://localhost:8080/utenti", {
        method:"GET",
        headers:headers,
       
    })
    .then((response)=> {
        if(!response.ok) {
            throw new Error("Errore 404!")
        }
        return response.json();
    })
    .then((data) => {
        console.log(data);
        document.getElementById("nome-edit").textContent = data.nome;
        document.getElementById("cognome-edit").textContent = data.cognome;
        document.getElementById("email-edit").textContent = data.email;
    })
    .catch((error) => {
        window.location.href = "Login.html";
        console.error("Errore durante il caricamento del profilo:", error);
    });
}
loadProfile();

// function per andare alla pagina miei tickets
function goToTickets() {
    window.location.href = "I miei ticket.html"; 
}

function editProfile(){
    // modificare il profilo 
    document.getElementById("nome-edit").style.display="inline";
    document.getElementById("cognome-edit").style.display="inline";
    document.getElementById("email-edit").style.display="inline";
    document.getElementById("password-edit").style.display="inline";
    document.getElementById("save-edit").style.display="inline";

    document.getElementById("nome-edit").value=document.getElementById("nome").textContent;
    document.getElementById("cognome-edit").value=document.getElementById("cognome").textContent;
    document.getElementById("email-edit").value=document.getElementById("email").textContent;
    document.getElementById("password-edit").value="";

    document.getElementById("nome-edit").disabled=false;
    document.getElementById("cognome-edit").disabled=false;
    document.getElementById("email-edit").disabled=false;
    document.getElementById("password-edit").disabled=false;

}

// salvare le modifiche 
    function saveProfile(){
        const token = localStorage.getItem("authToken");
        if(!token){ window.location.href="Login.htmk";
            return;

        }
        const nome=document.getElementById("nome-edit").value.trim();
        const cognome=document.getElementById("cognome-edit").value.trim();
        const email=document.getElementById("email-edit").value.trim();
        const password=document.getElementById("password-edit").value.trim();
    }
        const updateUtente={nome, cognome, email};  
        if(password) updateUtente.password=password;       /* se in spring non hanno il controllo per la ps se è vuoto o no lasciamola cosi se hanno il controllo aggiungi il campo passord alla variabile update/ controlliamo se l'utente non modifica la password 
                                                            il campo password non verrà inviato con la richiesta fetcch
                                                            evitando di sovrascrivelo */
        

    const token = localStorage.getItem("authToken");
    fetch("http://localhost:8080/utenti", {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
         body: JSON.stringify(updateUtente),
    })
    .then((response) => {
    if (!response.ok) {
        throw new Error("Errore nel salvataggio del profilo");
    }
    return response.json();
        })

    .then((data) => {
    console.log("Profilo aggiornato con successo:", data);


        document.getElementById("nome").textContent = data.nome;
        document.getElementById("cognome").textContent = data.cognome;
        document.getElementById("email").textContent = data.email;

    
        document.getElementById("nome-edit").style.display = "none";
        document.getElementById("cognome-edit").style.display = "none";
        document.getElementById("email-edit").style.display = "none";
        document.getElementById("password-edit").style.display = "none";
        document.getElementById("save-edit").style.display = "none";

        document.getElementById("nome-edit").disabled = true;
        document.getElementById("cognome-edit").disabled = true;
        document.getElementById("email-edit").disabled = true;
        document.getElementById("password-edit").disabled = true;
})


    
    .catch((error) => {
    console.error("Errore durante l'aggiornamento del profilo:", error);
    });

   
//eliminare l'account
function deleteAccount() {
    if (!confirm("Vuoi davvero eliminare l'account?")) return;

    fetch("http://localhost:8080/utenti", {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Errore durante l'eliminazione dell'account");
        }
        alert("Account eliminato con successo!");
        localStorage.removeItem("authToken");
        window.location.href = "Login.html";
    })
    .catch((error) => {
        console.error("Errore durante l'eliminazione dell'account:", error);
    });
}

loadProfile();