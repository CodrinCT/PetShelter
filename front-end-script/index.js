const form = document.getElementById("login_form");
let errorMsg = document.createElement("p");
      form.addEventListener("submit", async (event)=> {
        try {
          event.preventDefault();
          const email = document.getElementById("email").value;
          const password = document.getElementById("password").value;
          const result = await fetch("/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          })
          if (result.redirected) {
            window.location.assign(result.url);
           }else{
          errorMsg.id = "errorMsg";
          const err = await result.json();
          errorMsg.innerHTML = err.err
           console.log(err);
          form.appendChild(errorMsg);
           }
        } catch (e) {
          errorMsg.id = "errorMsg";
          errorMsg.innerHTML = `an error has occured<br> please try again later`;
          console.log('err: ' + e);
          form.appendChild(errorMsg);
        }
      })
