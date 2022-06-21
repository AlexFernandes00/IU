
window.onload = () => {
    //logout()
    
    const loader = document.querySelector("#loading");
    
    //loader.classList.add("display");
    
      const renderParques = async () => {
        var myHeaders = new Headers();
        const tblProdutos = document.getElementById("listagem");
        const popups = document.getElementById("popups");
        let strHtml = '';
        let str2 = '';
        myHeaders.append("Content-Type", "application/json");
    
        var requestOptions = {
          mode: 'cors',
          method: 'GET',
          headers: myHeaders,
          credentials: 'include'
        };
    
        // let products = "";
    
        //fetch("http://127.0.0.1:8080/allprodutos", requestOptions).then(response => {return response.json()}).then(result => products=result)
        const response = await fetch(`http://127.0.0.1:8080/listarparques`, requestOptions)
    
        let parques = await response.json();
        parques = parques.body;
        console.log("TESTANDO -----> "+parques.body)
        for (let i = 0; i < parques.length; i++) {
            let idParque = parques[i].idParque;
            let nome = parques[i].nome; 
            let descricao = parques[i].descricao;
            let imagem = parques[i].imagem;
            let capacidade = parques[i].capacidade;
            let localizacao = parques[i].localizacao;
            let latitude= parques[i].latitude;
            let longitude = parques[i].longitude;
            let mapa = parques[i].mapa;
    
          strHtml += `
          <img src="`+ `` + imagem + `" width="560" height="382" alt="">
                        <div class="hover_Text d-flex align-items-end justify-content-between">
                            <div class="hover_text_iner">
                                <button type="place_btn" class="place_btn" onclick="openPopup(${idParque})">Sobre</button>
                                <h3>${nome}</h3>
                                <br>
                                <p>${descricao}</p>
                            </div>
                        </div>
                        
          `
          str2 += `<div class="popup-screen" id="popup-${idParque}" >
          <div class="popup-box" >
              <span class="details"><h6> INFORMAÇÕES DO ${nome}</h6></span>
              <br>
              <span class="details"><h5> Localização: </h5></span><h5>${localizacao}</h5>
              <span class="details"><h5> Lotação atual do parque:</h5></span><h5>${capacidade}</h5>
              <span class="details"><h5> Coordenadas:</h5></span><h5>${latitude} , ${longitude}</h5>
              <span class="details"><h5> Mapa do Parque:</h5></span><h5><img src="${mapa}" alt="image" class="profile-pic"></h5>
              <a href="#" class="btn" onclick="closePopup(${idParque})">Ok</a>
          </div>
      </div>`
    
        }
        strHtml += "</tbody>"
        console.log("string hotml----------------" + strHtml)
        //loader.style.display="none"
        tblProdutos.innerHTML = strHtml
        popups.innerHTML = str2;

        const header = document.getElementById("navbarSupportedContent");

        if(getCookie("isLoggedIn")==""){

          header.innerHTML = `<ul class="navbar-nav">
          <li class="nav-item" class="active">
              <a class="nav-link" href="home.html">Home</a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="parques.html">Parques</a>
          </li>
  
          <li class="nav-item">
              <a class="nav-link" href="atividades.html">Atividades</a>
          </li>
          <!-- <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="blog.html" id="navbarDropdown_1"
                  role="button" data-toggle="dropdown" aria-haspopup="true"
                  aria-expanded="false">
                  Atividades
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown_1">
                  <a class="dropdown-item" href="riosmaisreq.html">Parque Jardim da Estrela</a>
                  <a class="dropdown-item" href="riosmaiordif.html">Parque Eduardo VII</a>
                  <a class="dropdown-item" href="riosmenordif.html">Parque Florestal de Monsanto</a>
                  <a class="dropdown-item" href="riosmenordif.html">Parque da Bela Vista</a>
              </div>
          </li> -->
          <li class="nav-item">
              <a class="nav-link" href="forum.html">Fórum</a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="contact.html">Contacto</a>
          </li>
      </ul>
      <a href="singin.html" class="btn_12">ENTRAR</a> `
  
      } else {
          header.innerHTML =`<ul class="navbar-nav">
          <li class="nav-item" class="active">
              <a class="nav-link" href="home.html">Home</a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="parques.html">Parques</a>
          </li>
  
          <li class="nav-item">
              <a class="nav-link" href="atividades.html">Atividades</a>
          </li>
          <!-- <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="blog.html" id="navbarDropdown_1"
                  role="button" data-toggle="dropdown" aria-haspopup="true"
                  aria-expanded="false">
                  Atividades
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown_1">
                  <a class="dropdown-item" href="riosmaisreq.html">Parque Jardim da Estrela</a>
                  <a class="dropdown-item" href="riosmaiordif.html">Parque Eduardo VII</a>
                  <a class="dropdown-item" href="riosmenordif.html">Parque Florestal de Monsanto</a>
                  <a class="dropdown-item" href="riosmenordif.html">Parque da Bela Vista</a>
              </div>
          </li> -->
          <li class="nav-item">
              <a class="nav-link" href="forum.html">Fórum</a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="contact.html">Contacto</a>
          </li>
      </ul>
      <a href="singin.html" class="btn_12" id="btnSair">Sair</a> `
  
          //logout();
  
      }
      const botao = document.getElementById("btnSair");
  
  botao.addEventListener('click', async function (event) {
  event.preventDefault();
  logout();
  window.location.href = './singin.html'
  })
  
  
  function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length,c.length);
      }
  }
  return "";
  }
  
  
  function logout(){
  delete_cookie("isLoggedIn")
  }


        // Get the modal
        var modal = document.getElementById("modalP");
        /*   var modalD = document.getElementById("modald");  */
    
        // Get the button that opens the modal
        //const btnEditar = document.getElementsByName("editpr")[0];
        //console.log(btnEditar)
    
        /*   var btn = document.getElementById("desativarP");  */
    
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
    
        // When the user clicks on the button, open the modal
       /* btnEditar.onclick = function () {
          modal.style.display = "block";
        } */
        /*   
         btn.onclick = function() {
            modalD.style.display = "block";
          } 
         */
        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
          modal.style.display = "none";
        }
        /*  span.onclick = function() {
            modalD.style.display = "none";
          }  */
    
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        }
        /*   window.onclick = function(event) {
            if (event.target == modalD) {
              modalD.style.display = "none";
            }
          } */
    
    
          
    
        const formEditarProduct = document.getElementById("editprodut");
    
        const btnEditar = document.getElementsByName("editpr");
        
        for (let i = 0; i < btnEditar.length; i++) {
          btnEditar[i].addEventListener("click", () => {
            modalP.style.display = "block";
            
            let idE = btnEditar[i].getAttribute("id")
    
          
              document.getElementById("qunt").value = products[i].qtd
              document.getElementById("prec").value = products[i].unitPrice
             
              if(products[i].mercado=="LO") { document.getElementById("quntMax").value = products[i].qtdMax
               }
               else {
               
                document.getElementById("quntMax").value = products[i].summary 
               }
          
            
            formEditarProduct.addEventListener('submit', async function (event) {
              event.preventDefault();
              const quantidade = document.getElementById('qunt').value;
              const price = document.getElementById('prec').value;
              const quntMax = document.getElementById('quntMax').value;
              
             // let idE = btnEditar[i].getAttribute("id")
              console.log(idE)
        
              var myHeaders1 = new Headers();
        
              myHeaders1.append("Content-Type", "application/json");
        
              var requestOptions = {
                mode: 'cors',
                method: 'PUT',
                headers: myHeaders1,
                credentials: 'include',
                body: JSON.stringify({ "price": price, "quantidade": quantidade, "quntMax": quntMax, "referencia": idE }),
              };
        
              fetch(`https://easymarket-backend.beagoddess.repl.co/editproducts`, requestOptions)
                .then(response => {
                  return response.json();
                })
                .then((result) => {       
                  if (result.body.message == "Alterado com sucesso") {
                      window.location.reload();
                   
                  } else {
                    if (result.body.message == "Erro.") {
                      swal.fire({
                        icon: 'error',
                        title: 'Ocorreu algum erro...',
                        text: 'Tente novamente ou mais tarde, porfavor.'
                      })
                    } else {
                      swal.fire({
                        icon: 'error',
                        title: result.body.message,
                        text: 'Tente novamente, porfavor.'
                      })
                    }
        
                  }
    
          
    
            //console.log(pr)
    
          /*  for (let i = 0; i < products.length; i++) {
              if (products.referencia == btnEditar[i].getAttribute("id")) {
                  const id = btnEditar[i].getAttribute("id")
                  document.getElementById("qunt").value = products[i].qtd
                  document.getElementById("prec").value = products[i].unitPrice
                  document.getElementById("txtProduct").value = id
              } */
          })
         
            }); 
        })}; 
    
        //botão para apagar o produto
        const btnDelete = document.getElementsByName("remove")
        for (let i = 0; i < btnDelete.length; i++) {
          btnDelete[i].addEventListener("click", () => {
            console.log("entrou")
            swal({
              title: 'Tem a certeza que pretende desativar o produto?',
              //text: "Não é reversível",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#7FB08F',
              cancelButtonColor: 'color: #212529,background-color: #f8f9fa, border-color: #f8f9fa;',
              confirmButtonText: 'Desativar'
            }).then(async (result) => {
              if (result.value) {
                let idE = btnDelete[i].getAttribute("id")
                // console.log(idE)
                try {
                  const response = await
                    fetch(`https://easymarket-backend.beagoddess.repl.co/desativar`,
                      {
                        mode: 'cors',
                        method: "PUT",
                        body: JSON.stringify({
                          "referencia": idE
                        }),
                        headers: myHeaders,
                        credentials: 'include'
                      })
                  const spaces = await response.json()
                   swal({title:'Removido!',
                  confirmButtonColor: '#7FB08F'})
                  renderParques()
    
                } catch (err) {
                  swal({ type: 'error', title: 'Erro', text: err })
                }
              }
            })
          })
        }
    
      } 
      renderParques()
    
      const nomePerfil = document.getElementById("nomePerfil");
      const nomeEsquerdo = document.getElementById("nomeEsquerdo");
      const moradaEsquerdo = document.getElementById("moradaEsquerdo");
    
      var myHeaders = new Headers();
    
      myHeaders.append("Content-Type", "application/json");
    
      var requestOptions = {
        mode: 'cors',
        method: 'GET',
        headers: myHeaders,
        credentials: 'include'
      };    

      

function setCookie(cname, cvalue, exdays) {
const d = new Date();
d.setTime(d.getTime() + (exdays*24*60*60*1000));
let expires = "expires="+ d.toUTCString();
document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}



function delete_cookie(name) {
document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}



    


    
    /*function logout(){
      const logout = document.getElementById("logout");
    
      logout.addEventListener("click", async function (event) {
          event.preventDefault();
          var myHeaders = new Headers();
    
          myHeaders.append("Content-Type", "application/json");
          
          var requestOptions = {
            mode : 'cors',
            method: 'GET',
            headers: myHeaders,
            credentials : 'include'
          };
    
          fetch(`https://easymarket-backend.beagoddess.repl.co/logout`,requestOptions)
          .then(response => {
              return response.json();
          })
          .then((result) => {
              
              if(result.login=="off"){
                  window.location.href = logout.href;
              }
          })
    
      });
      
    };*/
    
    
    
  }