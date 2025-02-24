// Seleziona il campo della password e crea un'icona per mostrare/nascondere la password
const passwordInput = document.querySelector("input[type='password']");
const togglePassword = document.createElement("i");
togglePassword.classList.add("fas", "fa-eye");

// Aggiungi l'icona accanto al campo di input della password
const container = document.querySelector(".container"); // Modifica se necessario per selezionare un elemento contenitore
container.appendChild(togglePassword);

// Aggiungi un evento al click dell'icona per cambiare il tipo di input
togglePassword.addEventListener("click", function() {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";  // Mostra la password
        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash"); // Cambia l'icona
    } else {
        passwordInput.type = "password";  // Nascondi la password
        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye"); // Cambia l'icona
    }
});
