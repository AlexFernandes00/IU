window.onload = function () {

  const btnLogin = document.getElementById("loginbtn");
  // Autenticar gestor de espaço na área privada
  btnLogin.addEventListener("click", async function (event) {

    event.preventDefault();

    const email = document.getElementById('email')
    const password = document.getElementById('pass')
    let data = {}
    data.email = email.value;
    data.password = password.value;

    fetch(`http://127.0.0.1:8080/login`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
        "Accept": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify(data)
    }
    ).then(response => {
      return response.json();
    })
      .then((result) => {
        if (result.body == "Login feito com sucesso" && result.idTipoUtilizador == 1) {
         window.location.href = '../a-index.html'
        }else {
          if (result.body == "Login feito com sucesso" && result.idTipoUtilizador == 11) {
            window.location.href = '../m-index.html'
          }else {
            if (result.body == "Login feito com sucesso" && result.idTipoUtilizador == 21) {
              window.location.href = 'home.html'
            } else {
              if (result.body == "Password errada") {
                Swal.fire({
                  title: "Email ou password errados!",
                  text: "Por favor, confirme as suas credenciais.",
                  icon: "error",
                  width: "30rem"
                })
              } else {
                Swal.fire({
                  title: "Email ou password errados!",
                  text: "Por favor, confirme as suas credenciais",
                  icon: "error",
                  width: "30rem"
                })
              }
            }
          }
        }
      }).catch(error => { console.log(error) })
    //--------------------------------------------------------------------------------Teste html
    /*if(data.email == true){
      $("openbtn").hide();
      document.getElementById("userName").innerHTML = user.displayName;
      $("userName").show();
      //--------------------------------------------------------------------------------Teste html
    }*/
  })
}