window.onload = () => {
  isLoggedIn();

  const renderIndividual = async () => {
    
    var myHeaders = new Headers();

    const tblIndividual = document.getElementById("indencomendas");

    let strHtml = `
      
      <thead class="thead-primary">
               <th style="color:#ffff; font-weight:bold" >PRODUTO</th>
               <th style="color:#ffff; font-weight:bold">QTD</th>
               <th style="color:#ffff; font-weight:bold">ID</th>
             <th style="color:#ffff; font-weight:bold">ESTADO</th>
             <th></th>
             <th style="color:#ffff; font-weight:bold">PREÇO</th>
             <th style="color:#ffff; font-weight:bold">QRCode</th>
             <th style="color:#ffff; font-weight:bold">Faturas</th>
             </tr>
           </thead>
           <tbody>
          `

    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      mode: 'cors',
      method: 'POST',
      headers: myHeaders,
      credentials: 'include'
    };

    
    const response = await fetch(`https://easymarket-backend.beagoddess.repl.co/invoicesuser`, requestOptions)
    
    let encomendas = await response.json();

    
    encomendas = encomendas.faturas;



    for (let i = 0; i < encomendas.length; i++) {
      strHtml += `
        <thead class="thead-sec">
        <tr>
            <th>Data: ${encomendas[i].date.replace("T00:00:00+0100", "")}</th>
            <th></th> 
            <th>ID Pedido: ${encomendas[i].document_id} </a> </th> 
            <th>${encomendas[i].notes}</th>
            <th></th>
          <th>Total: ${encomendas[i].reconciled_value} €</th>
          <th> <section id="cto" class="cto">
          <div class="container" data-aos="zoom-in">
              <a class="cto-btn scrollto" id="quser" idQR=${encomendas[i].document_id} name="qrcode">QRCode</a>
          </div>
        </section> </th>
        <th> <section id="cto" class="cto">`
        if(encomendas[i].empresa=="lo") {
   strHtml +=  ` <div class="container" data-aos="zoom-in">
            <a class="cto-btn scrollto" name="faturar" idFatura=${encomendas[i].document_id} >Fatura</a>
        </div>
      </section> </th>
        </tr>
      </thead> `}
      else {
     strHtml += `  <div class="container" data-aos="zoom-in">
            <a class="cto-btn scrollto" href=${encomendas[i].link} >Fatura</a>
        </div>
      </section> </th>
        </tr>
      </thead>`
      }

      
  

      if(encomendas[i].empresa=="lo") {
        label = "Mercado Ló"
    } else {
        label = "Mercado Coutinho"
    }

      for (let j = 0; j < encomendas[i].products.length; j++) {

        strHtml += ` <tr class="alert" role="alert">
      <td>
          <div class="email">
              <span> ${encomendas[i].products[j].name} </span>
              <span>${label}</span>
          </div>
      </td>
      <td class="quantity">
      <div class="input-group">
       <input type="text" name="quantity" class="quantity form-control input-number" value="${encomendas[i].products[j].qty}" min="1" max="100" readonly>
    </div>
</td>
      <td>
  </td>
      <td> </td>
      <td> </td>
  <td>${encomendas[i].products[j].price * encomendas[i].products[j].qty}€</td>
      <td>
    </td>
    <td>
   
</td>
    </tr>`
      }

      strHtml += "</tbody>"
      tblIndividual.innerHTML = strHtml


      let btnDownload = document.getElementsByName("faturar");
      for (let i = 0; i < btnDownload.length; i++) {
          btnDownload[i].addEventListener("click", (event) => {
              event.preventDefault();
              let data = btnDownload[i].getAttribute("idFatura");
            
                  window.open(`https://easymarket-backend.beagoddess.repl.co/pdfdownload/${data}`)
              })}

      const btnQRCU = document.getElementsByName("qrcode");

      window.onclick = function (event) {
        if (event.target == modalY) {
          modalY.style.display = "none";
        }
      }

      for (let i = 0; i < btnQRCU.length; i++) {
        btnQRCU[i].addEventListener("click", () => {
          modalY.style.display = "block";

          let idQR = btnQRCU[i].getAttribute("idQR")

          const foto = document.getElementById("qrcodeE");

          var myHeaders = new Headers();

          myHeaders.append("Content-Type", "application/json");

          var requestOptions = {
            mode: 'cors',
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
          };

          fetch(`https://easymarket-backend.beagoddess.repl.co/qrcode/${idQR}`, requestOptions)
            .then(response => {
              return response.json();
            })
            .then((result) => {
              // console.log(result.faturas[0].document_id)
              // console.log("ola")
              var parametersJson = {
                "size": 250, // Size of Qr Code
                "backgroundColor": "255-255-255", // Background Color Of Qr Code (In RGB)
                "qrColor": "38-38-38", // Color of Qr Code (In RGB)
                "padding": 2, // Padding 
                "data": "dev.to"
              };

              var parameters;
              parametersJson.data = result.body[0].document_id;
              parameters = `size=${parametersJson.size}&bgcolor=${parametersJson.backgroundColor}&color=${parametersJson.qrColor}&qzone=${parametersJson.padding}&data=${parametersJson.data}` // Stitch Together all Paramenters
              foto.src = `https://api.qrserver.com/v1/create-qr-code/?${parameters}`
              console.log(result)
              //foto.src = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ola'
            })

        })
      };
    }

  }


  renderIndividual()




  console.log("oluu")



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
}
