document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    if (username === "admin" && password === "1234") {
        localStorage.setItem("isLoggedIn", "true");
        alert("Accesso riuscito! Verrai reindirizzato alla home.");
        window.location.href = "home.html";
    } else {
        alert("Nome utente o password errati.");
    }
});
