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
        //if (result.body.message == "Login feito com sucesso" && result.body.company == "false") {
         //window.location.href = 'home.html';
          /* response.text().then((data) => {*/
          //  localStorage.setItem("email", data.email);
          // console.log(localStorage.getItem("email"));
          if (result.body == "Login feito com sucesso") {
          //window.location.href = 'home.html';
          alert(result.body)
          console.log(result.idTipoUtilizador);

        }else{
          alert(result.body)
        }
        /*else {
          if (result.body.message == "Login feito com sucesso" && result.body.company == "true") {
            window.location.href = 'a-index.html';
          } else {
            if (result.body.message == "Login feito com sucesso" && result.body.company == "none") {
              window.location.href = 'https://easymarketisi.web.app/a-entregador.html';
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
        }*/
      }).catch(error => { console.log(error) })

  })
}