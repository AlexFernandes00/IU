
window.onload = () => {
    logout()
    
    const loader = document.querySelector("#loading");
    
    loader.classList.add("display");
    
      const renderProducts = async () => {
        var myHeaders = new Headers();
        const tblEst = document.getElementById("listaest");
        console.log("aqui");
    
        let strHtml = `
        
                 <thead> 
                 <th> Nome </th>
                 <th> Parque </th>
                 <th> Capacidade </th>
                 <th> Localização </th>
                 <th> Latitude </th>
                 <th> Longitude </th>
               </tr>
             </thead>
             <tbody>
            `
    
        myHeaders.append("Content-Type", "application/json");
    
        var requestOptions = {
          mode: 'cors',
          method: 'GET',
          headers: myHeaders,
          credentials: 'include'
        };
    
        // let products = "";
    
        //fetch("http://127.0.0.1:8080/allprodutos", requestOptions).then(response => {return response.json()}).then(result => products=result)
        const response = await fetch(`http://127.0.0.1:8080/listarParquesEstacionamento`, requestOptions)
    
        let estacionamento = await response.json();
        estacionamento = estacionamento.body;
        for (let i = 0; i < estacionamento.length; i++) {
    
          let nome = estacionamento[i].nome;
          let parque = estacionamento[i].nomeParque;
          let capacidade = estacionamento[i].lotacao;
          let latitude = estacionamento[i].latitude;
          let longitude = estacionamento[i].longitude;
    
          strHtml += `
                <tr>
                
                <td> ${nome} </td>
                <td> ${parque} </td>
                <td> ${capacidade} </td>
                <td> ${latitude} </td>
                <td> ${longitude}</td>
              </tr>`
    
        }
        strHtml += "</tbody>"
    
        loader.style.display="none"
        tblEst.innerHTML = strHtml
    
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
                  renderProducts()
    
                } catch (err) {
                  swal({ type: 'error', title: 'Erro', text: err })
                }
              }
            })
          })
        }
    
      } 
      renderProducts()
    
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
    
      /*fetch(`https://easymarket-backend.beagoddess.repl.co/admin/perfil`, requestOptions)
        .then(response => {
          return response.json();
        })
        .then((result) => {
          if(result.login){
            window.location.href = 'https://easymarketisi.web.app/';
    
          }else{
            nomePerfil.innerHTML = result.utilizador.nome;
            nomeEsquerdo.innerHTML = result.utilizador.nome;
            moradaEsquerdo.innerHTML = result.utilizador.morada;
          }
    
        });*/
    
    }
    
    function logout(){
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
      
    };
    
    
    
    