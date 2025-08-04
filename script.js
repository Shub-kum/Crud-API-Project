const API_URL = "http://localhost:8080/api/users"

const loginform = document.getElementById("loginForm")
const registerForm = document.getElementById("registerForm")

if(registerForm){
    registerForm.addEventListener("submit", async (e) =>{
        e.preventDefault()

        const username = document.querySelector("#username").value
        const email = document.querySelector("#email").value
        const password = document.querySelector("#password").value

        const res = await fetch(`${API_URL}/register`,{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({username, email, password})
        })

        const data = await res.json()

        if(res.ok){
            alert("Registration is Successful. You can now login. 👍")
            window.location.href = "login.html"
        }
        else{
            alert(data.message || "Registration failed 😦.")
        }
    })
}


if(loginform){

    loginform.addEventListener("submit", async (e) =>{
        e.preventDefault()

        const username = document.querySelector("#loginusername").value
        const password = document.querySelector("#loginpassword").value

        const res = await fetch(`${API_URL}/login`,{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({username, password})
        })

        const data = await res.json()

        if(res.ok){
            localStorage.setItem("token",data.token)
            window.location.href = "index.html"
        }
        else{
            alert(data.message || "Login failed.")
        }
    })
}

