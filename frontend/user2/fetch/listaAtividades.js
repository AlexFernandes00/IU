
window.onload = () => {
    logout()
    
    const loader = document.querySelector("#loading");
    
    loader.classList.add("display");
    
      const renderProducts = async () => {
        var myHeaders = new Headers();
        const tblProdutos = document.getElementById("atividades");
    
        let strHtml = `
        
                 <thead> 
                 <th> Nome </th>
                 <th> Descrição </th>
                 <th> Data Início </th>
                 <th> Data Fim </th>
                 <th> Parque </th>
    
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
        const response = await fetch(`http://127.0.0.1:8080/listaratividades`, requestOptions)
    
        let atividades = await response.json();
        atividades = atividades.body;
        console.log(atividades)
        for (let i = 0; i < atividades.length; i++) {
    
          let nome = atividades[i].nome;
          let descricao = atividades[i].descricao;
          let dataInicio = atividades[i].dataInicio;
          let dataFim = atividades[i].dataFim;
          let nomeParque = atividades[i].nomeParque;
  
    
          strHtml += `
                <tr>
                
                <td> ${nome} </td>
                <td> ${descricao} </td>
                <td> ${dataInicio} </td>
                <td> ${dataFim} </td>
                <td> ${nomeParque}</td> 
              </tr>`
    
        }
        strHtml += "</tbody>"
    
        loader.style.display="none"
        tblProdutos.innerHTML = strHtml
    
        // Get the modal
        var modal = document.getElementById("modalP");
        /*   var modalD = document.getElementById("modald");  */
    
    
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
    
        
        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
          modal.style.display = "none";
        }
        
    
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        }
    
      } 
      renderProducts()
    
    
    }