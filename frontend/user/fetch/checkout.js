window.onload = function () {
  isLoggedIn()

  const formPagar = document.getElementById("pagar");

  const nome = document.getElementById("nome");
  const apelido = document.getElementById("apelido");
  const email = document.getElementById("email");
  const nif = document.getElementById("nif");
  const telefone = document.getElementById("telefone");
  const morada = document.getElementById("morada");


  formPagar.addEventListener('submit', async function (event) {
    event.preventDefault();
    let mercado = document.getElementById("mercadol").innerHTML
    //console.log(mercado)
    const table = document.getElementById("prod").tBodies[0].rows;
    const total = parseFloat(document.getElementById("tota").innerHTML.replace(/\s+/g, '').replace("€", '')).toFixed(2);
    //alert(total)
    //const tamanhoTabela = document.getElementById("prod").tBodies[0].rows.length; 

    if (mercado == "Mercado Coutinho") {
      mercado = "coutinho"
    } else {
      mercado = "mercadolo"
    }
    console.log(mercado)

    let ref = "";
    let qtd = "";
    let price = "";
    let nomeP = "";

    let arrayProdutos = [];

    for (i = 0; i < table.length; i++) {
      ref = table[i].cells[0].innerHTML.replace(/\s+/g, '')
      qtd = table[i].cells[3].innerHTML.replace(/\s+/g, '')
      price = table[i].cells[2].innerHTML.replace(/\s+/g, '').replace("€", '');
      nomeP = table[i].cells[1].innerHTML.trim();

      arrayProdutos.push({
        "name": nomeP,
        'sku': ref,
        'price': parseFloat(price).toFixed(2),
        'currency': "EUR",
        'quantity': qtd
      })

    }

    let data = {
      nome: nome.value,
      email: email.value,
      apelido: apelido.value,
      telefone: telefone.value,
      nif: nif.value,
      morada: morada.value,
      data_nascimento: ""
    }


    var myHeaders1 = new Headers();

    myHeaders1.append("Content-Type", "application/json");

    var requestOptions = {
      mode: 'cors',
      method: 'PUT',
      headers: myHeaders1,
      credentials: 'include',
      body: JSON.stringify(data),
    };


    fetch(`https://easymarket-backend.beagoddess.repl.co/user/editar`, requestOptions)
      .then(response => {
        console.log(data
        )
        return response.json();
      })
      .then((result) => {
        console.log(result)

        if (result.body.message == "Alterado.") {
          fetch(`https://easymarket-backend.beagoddess.repl.co/pay`, {
            mode: 'cors',
            method: 'POST',
            headers: {
              'Content-Type': "application/json",
              "Accept": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({
              "produtos": arrayProdutos,
              "mercado": mercado,
              "total": total
            })
          }
          ).then(response => {
            return response.json();
          })
            .then((result) => {
              document.cookie.split(';').forEach(function(c) {
                document.cookie = c.trim().split('=')[0] + '=;' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC;';
                });  
              window.location.href = result.link;

            });
          /*const response = await fetch(`http://127.0.0.1:8080/pay`, requestOptions)
          let pagar = response.json();
          console.log(pagar)*/


        }
      })
  })



  var myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    mode: 'cors',
    method: 'GET',
    headers: myHeaders,
    credentials: 'include'
  };

  fetch(`https://easymarket-backend.beagoddess.repl.co/user/perfil`, requestOptions)
    .then(response => {
      return response.json();
    })
    .then((result) => {
      if (result.login) {
        window.location.href = 'https://easymarketisi.web.app/';
      } else {
        nome.value = result.utilizador.nome;
        apelido.value = result.utilizador.apelido;
        email.value = result.utilizador.email;

        if (result.utilizador.nif == "") {
          nif.value = result.utilizador.nif;
        } else {
          nif.value = result.utilizador.nif;
          nif.readOnly = true;
        }

        if (result.utilizador.morada == "") {
          morada.value = result.utilizador.morada;
        } else {
          morada.value = result.utilizador.morada;
          morada.readOnly = true;
        }

        if (result.utilizador.telefone == "") {
          telefone.value = result.utilizador.telefone;
        } else {
          telefone.value = result.utilizador.telefone;
          telefone.readOnly = true;
        }
      }

    });


}

function isLoggedIn() {
  const header = document.getElementById("header");

  var myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    mode: 'cors',
    method: 'GET',
    headers: myHeaders,
    credentials: 'include'
  };

  fetch(`https://easymarket-backend.beagoddess.repl.co/user/loggedin`, requestOptions)
    .then(response => {
      return response.json();
    })
    .then((result) => {
      if (result.login == "false") {

        header.innerHTML = `<div class="header__top__right__language">
              <div>Português</div>
              </div>
              <div class="header__top__right__auth">
              <a href="login.html"> Entrar</a>
              </div>`



      } else {

        header.innerHTML = `<div class="header__top__right__language">
              <!--<img src="img/language.png" alt="">-->
              <div>Português</div>
              </div>
              <div class="header__top__right__language">
              <div><i class="fa fa-user" style="color: rgb(17, 22, 20);"></i></div>
              <ul class="header__menu__dropdown">
                  <li><a href="perfil.html">Perfil</a></li>
                  <li><a href="encomendas.html">Encomendas</a></li>
              </ul>
          </div>
              <div class="header__top__right__auth" > 
              <a id="logout" href="index.html"> Sair</a>
              </div>`

        logout();



      }

    })
}

function logout() {
  const logout = document.getElementById("logout");

  logout.addEventListener("click", async function (event) {
    event.preventDefault();
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      mode: 'cors',
      method: 'GET',
      headers: myHeaders,
      credentials: 'include'
    };

    fetch(`https://easymarket-backend.beagoddess.repl.co/logout`, requestOptions)
      .then(response => {
        return response.json();
      })
      .then((result) => {

        if (result.login == "off") {

          window.location.href = logout.href;
        }
      })

  });

};