
function loadProfile(){
    const token = localStorage.getItem("authToken");

    const headers=token? {authorization: "Bearer " + token }: {};

    fetch("http://localhost:8080/utenti", {
        method:"GET",
        headers:headers,
        "Authorization":`Bearer ${token}`
    })
    .then((response)=> {
        if(!response.ok) {
            throw new Error("Errore 404!")
        }
        return response.json();
    })
    .then((data) => {
        console.log(data);
        document.getElementById("nome-edit").textContent = `${data.nome}`;
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

    document.getElementById("nome-edit").value=document.getElementById("nome").innerText;
    document.getElementById("cognome-edit").value=document.getElementById("cognome").innerText;
    document.getElementById("email-edit").value=document.getElementById("email").innerText;
    document.getElementById("password-edit").value=document.getElementById("password").innerText;
}

// salvare le modifiche 
    function saveProfile(){
        const nome=document.getElementById("nome-edit").value.trim();
        const cognome=document.getElementById("cognome-edit").value.trim();
        const email=document.getElementById("email-edit").value.trim();
        const password=document.getElementById("password-edit").value.trim();

        document.getElementById("nome").innerText=nome;
        document.getElementById("cognome").innerText=cognome;
        document.getElementById("email").innerText=email;
        document.getElementById("password").innerText=password;

        document.getElementById("nome").style.display="inline";
        document.getElementById("cognome").style.display="inline";
        document.getElementById("email").style.display="inline";
        document.getElementById("password").style.display="inline";

        document.getElementById("nome-edit").style.display="none";
        document.getElementById("cognome-edit").style.display="none";
        document.getElementById("email-edit").style.display="none";
        document.getElementById("password-edit").style.display="none";


}
//eliminare l'account
function deleteAccount(){
    const conferma=confirm("Vuoi davver eliminare l'account? l'account non può essere recuperato");
    if(conferma===true){
        alert("Account eliminato!")
    }
    window.location.href="/Login.html";
}