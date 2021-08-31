
const form = document.getElementById('reg_form');

form.addEventListener('submit', async (event)=>{
    event.preventDefault();
    const userName = document.getElementById('userName').value;
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
    const result = await fetch('/register', {
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            userName,
            email,
            password
        })
    });
    const action = result;
    if (action.status == 200) {
        window.location.assign(action.url)
    }else if(action.status=500){
        const errorMsg = document.createElement("p");
          errorMsg.id = "errorMsg";
          errorMsg.innerHTML = action.statusText;
          form.appendChild(errorMsg);
    }
})