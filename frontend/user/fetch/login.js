window.onload = function () {

  const btnLogin = document.getElementById("signup")

  // Autenticar gestor de espaço na área privada
  btnLogin.addEventListener("click", async function (event) {


    event.preventDefault();

    const email = document.getElementById('email')
    const password = document.getElementById('password')
    let data = {}
    data.email = email.value;
    data.password = password.value;
    console.log(data)

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
        //alert(result.body.company)
        //if (result.body.message == "Login com sucesso" && result.body.company == "false") {
          /* response.text().then((data) => {*/
          //  localStorage.setItem("email", data.email);
          // console.log(localStorage.getItem("email"));
          if (result.body.message == "Login com sucesso") {
          window.location.href = 'index.html';

        }
        /*else {
          if (result.body.message == "Login com sucesso" && result.body.company == "true") {
            window.location.href = 'https://easymarketisi.web.app/a-index.html';
          } else {
            if (result.body.message == "Login com sucesso" && result.body.company == "none") {
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