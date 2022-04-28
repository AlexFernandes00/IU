window.onload = () => {
  logout()
  
  const loader = document.querySelector("#loading");

  loader.classList.add("display");

    const renderDesativar = async () => {
        
        var myHeaders = new Headers();
        const tblProdutosDesativ = document.getElementById("produtosdesativadmin");
        let strHtml = `
	
              <thead> 
                <tr>
                    <th> Imagem </th>
                    <th> Designação </th>
                    <th> Referência </th>
                    <th> Categoria </th>
                    <th> Preço </th>
                    <th> Quantidade </th>
                    <th> Base Unidade </th>
                    <th> Alteração </th>        
                </tr>
              </thead>
                <tbody>
            `
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
              mode : 'cors',
              method: 'GET',
              headers: myHeaders,
              credentials : 'include'
            };
        const response = await fetch(`https://easymarket-backend.beagoddess.repl.co/allprodutoslocked`, requestOptions)
        
        let desativados = await response.json();
        //console.log(desativados)
        desativados = desativados.body;
    
        //console.log(desativados)
        
        for (let i = 0; i < desativados.length; i++) {
    
          let anzol = desativados[i].qtd;
          let shade = "";
       
          if(desativados[i].mercado=="LO") {shade= desativados[i].qtdMax} else {
          shade = desativados[i].summary;}
          let mar = (anzol / shade) * 100;
     
          let imagem = ""

          if (desativados[i].image == "https://www.moloni.pt/_imagens/?macro=imgList_BO_s3&img=" || desativados[i].image == null) {

              const idImagem = desativados[i].idImage;
              const idImagem1 = idImagem.replace("<p>", "").replace(`<span style="font-family: Verdana;">`, "").replace(`</span>`, "").replace(`</p>`, "")
              imagem = "https://drive.google.com/uc?export=view&id=" + idImagem1

          } else {
              imagem = desativados[i].image
          }

          let categoria = "";
          if(desativados[i].categoria=="Biosaudavel") {categoria="Bio e Saudável"}
      else if(desativados[i].categoria=="Higienebeleza") {categoria="Higiene e Beleza"}
      else {
        categoria=desativados[i].categoria
      }

      baseUni =""
      if(desativados[i].baseUni=="Litro"||desativados[i].baseUni=="KG" ) {baseUni="Quilograma"}
      else {baseUni="Unidade"}
      
          strHtml += `
                <tr>
                    <td class="py-1">
                      <img src="`+ `` + imagem + `" alt="` + desativados[i].description + `" />
                    </td>
                    <td> ${desativados[i].description} </td>
                    <td> ${desativados[i].referencia} </td>
                    <td> ${categoria} </td>
                    <td> ${desativados[i].unitPrice} € </td>
              <!--      <td class="text-danger"> ${desativados[i].qtd} <i class="mdi mdi-arrow-down"></i></td> -->
                    
                    <td >
                      <div class="progress" >
                        <div class="progress-bar bg-warning" role="progressbar" style="width:${mar}%" aria-valuenow="${anzol}" aria-valuemin="0" aria-valuemax="${shade}">  </div>
                        
                      </div>
                      <div style="padding-top:10px; text-align:center; color:#464646;">${anzol}/${shade}</div>
                    </td>  
                    
                    <td> ${baseUni} </td>
        
                    <td> 
                    <button name="ativar" class="btn btn-danger" style="    border-radius: .125rem;
                    font-size: 11px;
                    font-weight: initial;
                    line-height: 1;
                    padding: .575rem .7625rem;" id="${desativados[i].referencia}"  > Ativar </button>
                    </td>
                
              </tr>
                ` 
                
        } 
        strHtml += "</tbody>"
        loader.style.display="none"
        tblProdutosDesativ.innerHTML = strHtml

        
        //botão para ativar produtos
        const btnAtivar = document.getElementsByName("ativar");
        console.log(btnAtivar)
        for (let i = 0; i < btnAtivar.length; i++) {
            btnAtivar[i].addEventListener("click", () => {
              console.log("ativo")
                swal({
                 title: 'Tem a certeza que pretende ativar o produto?',
                 //text: "Não é reversível",
                 icon: 'warning',
                 showCancelButton: true,
                 confirmButtonColor: '#7FB08F',
                 cancelButtonColor: 'color: #212529,background-color: #f8f9fa, border-color: #f8f9fa;',
                 confirmButtonText: 'Ativar'
                  }).then( async (result) => {
                   if (result.value) {                        
                       let idE = btnAtivar[i].getAttribute("id")
                      // console.log(idE)
                        try {
                            const response = await 
                            fetch(`https://easymarket-backend.beagoddess.repl.co/ativar`,
                            { mode : 'cors',
                              method: "PUT",
                              body: JSON.stringify({
                                "referencia": idE
                              }),
                              headers: myHeaders,
                              credentials : 'include'})
                            const spaces = await response.json()                            
                            swal({title:'Ativado!',
                             confirmButtonColor: '#7FB08F'})
                            renderDesativar()
    
                        } catch(err) {
                            swal({type: 'error', title: 'Erro', text: err})
                        }
                    } 
                  })
            })
        }
  }
    renderDesativar()


    const nomePerfil = document.getElementById("nomePerfil");
    const nomeEsquerdo = document.getElementById("nomeEsquerdo");
    const moradaEsquerdo = document.getElementById("moradaEsquerdo");
  
    var myHeaders = new Headers();
  
    myHeaders.append("Content-Type", "application/json");
    
    var requestOptions = {
      mode : 'cors',
      method: 'GET',
      headers: myHeaders,
      credentials : 'include'
    };
  
    fetch(`https://easymarket-backend.beagoddess.repl.co/admin/perfil`,requestOptions)
    .then(response => {
        return response.json();
    })
    .then((result) => {  
      if(result.login){
        window.location.href = 'https://easymarketisi.web.app/';
      } else{
        nomePerfil.innerHTML=result.utilizador.nome;
        nomeEsquerdo.innerHTML=result.utilizador.nome;
        moradaEsquerdo.innerHTML=result.utilizador.morada;
      }

    });
  
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
