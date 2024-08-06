const email = document.getElementById("email")
const password = document.getElementById("password")
const submit = document.getElementById("submit")



submit.addEventListener("click", async (event)=>{

    event.preventDefault()

    const userData = { /* initie la valeur de userData */
        email: email.value,
        password: password.value
    }

    const reponse = await fetch("http://localhost:5678/api/users/login", { /* Envoie userData dans la base de données pour etre vérifié */
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })

    const data = await reponse.json() /* initie la réponse de la base de données */

    if (data.token) { /* renvoie vers la page si le token d'autentification est renvoyé */
        sessionStorage.setItem('auth token',data.token)
        window.location.href = "index.html"
    }

    else {
        document.getElementById("messageErreur").innerHTML = 
        "Erreur dans l’identifiant ou le mot de passe"
    }
})


