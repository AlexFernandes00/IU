
window.onload = () => {
    //logout()
    
    //const loader = document.querySelector("#loading");
    
    //loader.classList.add("display");
    
      const renderProducts = async () => {
        var myHeaders = new Headers();
        const tblProdutos = document.getElementById("containerAtividades");
    
        let strHtml = `
        
                 
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
        
        for (let i = 0; i < atividades.length; i++) {
          
          let nome = atividades[i].nome;
          let descricao = atividades[i].descricao;
          let dataInicioDia = atividades[i].dataInicio.slice(8, 10);
          let dataInicioMes = atividades[i].dataInicio.slice(5, 7);
          let dataFimDia = atividades[i].dataFim.slice(8, 10);
          let dataFimMes = atividades[i].dataFim.slice(5, 7);
          let nomeParque = atividades[i].nomeParque;
          let meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    
          strHtml += `
          <div class="event">
          <div class="event-left">
            <div class="event-date">
              <div class="date">${parseInt(dataInicioDia)+1}</div>
              <div class="month">${meses[dataInicioMes-1]}</div>
            </div>
          </div>
  
          <div class="event-right">
            <h3 class="event-title">${nome}</h3>
  
            <div class="event-description">
            ${descricao}
            </div>
  
            <div class="event-timing">
              <img src="img/time.png" alt="" /> Termina dia: ${parseInt(dataFimDia)+1}/${parseInt(dataFimMes)}
            </div>
          </div>
        </div>`
        }
        strHtml += "</tbody>"
    
        //loader.style.display="none"
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
        
      
      
      