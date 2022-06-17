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
         window.location.href = '../a-index.html';
          /* response.text().then((data) => {*/
          //  localStorage.setItem("email", data.email);
          // console.log(localStorage.getItem("email"));
        }
        else {
          if (result.body == "Login feito com sucesso" && result.idTipoUtilizador == 11) {
            console.log("certo")
            window.location.href = '../m-index.html';
          } else {
            if (result.body == "Login feito com sucesso" && result.idTipoUtilizador == 21) {
              window.location.href = 'home.html';
            } else {

              if (result.body.message == "Password errada") {
                Swal.fire({
                  title: "Email ou Password errados",
                  text: "Por favor confirme as suas credencias",
                  icon: "error",
                  width: "25rem"
                })
              } else {
                Swal.fire({
                  title: "Email ou Password errados",
                  text: "Por favor confirme as suas credencias",
                  icon: "error",
                  width: "25rem"
                })
              }
            }
          }
        }
      }).catch(error => { console.log(error) })

  })
}