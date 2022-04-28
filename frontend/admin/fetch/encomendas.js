window.onload = () => {
    logout()

    const loader = document.querySelector("#loading");

    loader.classList.add("display");

    const renderEncomendas = async () => {

        var myHeaders = new Headers();
        const tblEncomendas = document.getElementById("encomendas");   
        let strHtml = `
        <thead>
        <tr>
          <th style="text-align: center"> ID Cliente  </th>
          <th style="text-align: center" class="nomeee"> Cliente </th>
          <th style="text-align: center"> ID Fatura </th>
          <th style="text-align: center"> Estado </th>
          <th id="verif" class="titleColumn" style="text-align: center"> Última verificação ▲ </th>
          <th> Detalhes </th>
        </tr>
      </thead>
      <tbody class="table_body">
            `
            
       myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            mode: 'cors',
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        };
        
        const response = await fetch(`https://easymarket-backend.beagoddess.repl.co/encomendas`, requestOptions)
        
        let encomendas = await response.json();
        let label;
        
        encomendas = encomendas.body;
        //encomendas =[];
        console.log(encomendas)
        function formatDate (input) {
            var datePart = input.match(/\d+/g),
            year = datePart[0].substring(2), // get only two digits
            month = datePart[1], day = datePart[2];
          
            return day+'/'+month+'/'+year;
          }

        for (let i = 0; i < encomendas.length; i++) {

            strHtml += `
            <tr>
            <td style="text-align: center"> ${encomendas[i].customer_id} </td>
            </td>
            <td style="text-align: center" class="nomeC"> ${encomendas[i].entity_name} </td>
            <td style="text-align: center">  ${encomendas[i].document_id} </td>`
           
            if(encomendas[i].notes=="Em processo" || encomendas[i].notes=="Em Processo") {
                label = `<label class="btn btn-danger" style="    border-radius: .125rem;
                font-size: 11px;
                font-weight: initial;
                line-height: 1;
                padding: .375rem .5625rem;">${encomendas[i].notes}</label>`
            } else {
                label = `<label class="badge badge-primary">${encomendas[i].notes}</label>`
            }
           
            strHtml += `
            <td style="text-align: center">
         ${label}
            </td>`

            strHtml += `
        <td style="text-align: center">${formatDate(encomendas[i].lastmodified.replace("T00:00:00+0100","").replace("T00:00:00","").replace(" ",""))} </td> 
        <td ><button class="badge badge-success" id="primary-btn" name="primary-btn" type="button" style="display: inline-block;
        font-size: 12px;
        text-align: center;
        color: #808080;
        background-color: #e5e5e5;
        text-transform: uppercase;
        font-weight: 700;
        letter-spacing: 2px;
        border-bottom: 0px;
        border:none;
        padding: .575rem .7625rem;
       " class="site-btn">+</button>
    <div id="modal" name="modal" style="margin-top:80px;" class="modal">
        <div class="modal-content">
            <span class="close1" style="color: black;float: right;font-size: 28px;font-weight: bold;">&times;</span>
            <h3>Dados da Encomenda</h3>
            <form id="pass" class="login100-form validate-form">
            <div>
                <span class="label-input100" align="right" style="font-weight: bold;padding-bottom:20px">Produtos: </span>
            `
            let produtos = encomendas[i].products
            for( produto of produtos) {
                if( encomendas[i].empresa == "coutinho"){
                strHtml+=`<ul><li style="display:inline-block;">${produto.qty}</li>
                <li style="display:inline-block;padding:10px"> ${produto.name}</li>
                <li style="display:inline-block;padding:10px"> ${produto.price}€</li>
                
                </ul>
                  
                </div>
               
                      `}
                
                if( encomendas[i].empresa == "lo"){
                    console.log("aqui")
                    strHtml+=`<ul><li style="display:inline-block;">${produto.quantity}</li>
                    <li style="display:inline-block;padding:5px">${produto.description}</li>
                    <li style="display:inline-block;padding:5px"> ${produto.unitPrice.amount}€</li>
                    
                    </ul>
                    
                           `}}
                    strHtml+=`<span class="label-input100" align="center" style="font-weight: bold;">Total: ${encomendas[i].reconciled_value}€ </span>
                    <label> </label>
                    <span class="focus-input100"></span><br></br>
                    <a  href=${encomendas[i].link} style="display:inline-block; margin-right:auto; margin-left:auto;" class="badge badge-primary">Download Fatura</a>
                    </div>

               
                   
           
            
            

        </form>
        </div>
                   </div>
</div></td>     
          </tr> `
         
                
        }
        strHtml += "</tbody> </table> "

        loader.style.display="none"

        tblEncomendas.innerHTML = strHtml

        const modal = document.getElementsByName("modal");
        const btn = document.getElementsByName("primary-btn");
        const span3 = document.getElementsByClassName("close1");

        for (let i = 0; i < btn.length; i++) {
            btn[i].addEventListener("click", () => {
                modal[i].style.display = "block";
            })
        }

        for (let i = 0; i < span3.length; i++) {
            span3[i].onclick = function() {
                modal[i].style.display = "none";
            }
        } 

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }


        function convertDate(d) {
            var p = d.split("/");
            //console.log(p);
            let marcia=p[2]+p[1]+p[0];
            marcia=marcia.replace(" ","");
           
            return marcia;
            
          };
        
          function sortByDate() {
           //alert("OKLAAAAAAAAAAAAAAAAAAAAAA")
            var tbody = document.querySelector("#encomendas tbody");
            var rows = [].slice.call(tbody.querySelectorAll("tr"));
            rows.sort(function(a,b) {
                console.log(convertDate(a.cells[4].innerHTML));
              return convertDate(a.cells[4].innerHTML) - convertDate(b.cells[4].innerHTML);
              
            });
            
            rows.forEach(function(v) {
              tbody.appendChild(v);
              //console.log(v);
            });
         }
        
         document.getElementById("verif").addEventListener("click", sortByDate);
        //var columns = document.querySelectorAll('.titleColumn');
        //columns.forEach(c => c.addEventListener("click", (event) => {
            //var columnTitle = event.target.textContent;
        //     function sortByDate() {
        //         console.log("sim");
        //         var tbody = document.querySelector("#encomendas tbody");
                
        //         // get trs as array for ease of use
        //         var rows = [].slice.call(tbody.querySelectorAll("tr"));
                
        //         rows.sort(function(a,b) {
        //           return convertDate(a.cells[0].innerHTML) - convertDate(b.cells[0].innerHTML);
        //         });
                
        //         rows.forEach(function(v) {
        //           tbody.appendChild(v); // note that .appendChild() *moves* elements
        //         });
        //      }
        //      document.querySelector("dateBtn").addEventListener("click", sortByDate);
        // //}))
       


        // var sortBy = (criteria) => {

        //     // aqui você seleciona as trs do tableBody
        //     var trs = document.querySelectorAll('.table_body tr');
        //     //const sortedActivities = trs.sort((a, b) => b.date - a.date)
        //     sortBy(columnTitle);
    
        //     // e pode applicar qualquer algoritmo de ordenação no array de trs retornado, inclusive o proprio .sort() do Array JavaScript
        //     // Dê uma olhada aqui https://www.w3schools.com/js/js_array_sort.asp
    
        //     // apos ter o array ordenado você pode selecionar novamente o tableBody e adicionar as trs em ordem na propriedade .innerHTML do tbody
        //     tbody.innerHTML = seu conteúdo html (trs ordenadas) 
        // }
    
        //var columns = document.querySelectorAll('.titleColumn');
    
    

        let btnDownload = document.getElementsByName("faturar");
        for (let i = 0; i < btnDownload.length; i++) {
            btnDownload[i].addEventListener("click", (event) => {
                event.preventDefault();
                let data = btnDownload[i].getAttribute("idFatura");
              
                    window.open(`https://easymarket-backend.beagoddess.repl.co/pdfdownload/${data}`)
                })}

                    
        
       



        /* filterenc(); */
    }

    
   /*  var search_input = document.querySelector("#search");

    search_input.addEventListener("keyup", function(e){
      var span_items = document.querySelectorAll(".table_body .nomeC");
      var table_body = document.querySelector(".table_body tr");
      var search_item = e.target.value.toLowerCase();
     console.log(span_items)
     span_items.forEach(function(item){
       if(item.textContent.toLowerCase().indexOf(search_item) != -1){
          item.closest("tr").style.display = "block";
       }
       else{
         item.closest("tr").style.display = "none";
         }
     })
      
    }); */


    
    renderEncomendas()


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

    fetch(`https://easymarket-backend.beagoddess.repl.co/admin/perfil`, requestOptions)
        .then(response => {
            return response.json();
        })
        .then((result) => {
            if(result.login){
                window.location.href = 'https://easymarketisi.web.app/';
            }else {
                nomePerfil.innerHTML = result.utilizador.nome;
                nomeEsquerdo.innerHTML = result.utilizador.nome;
                moradaEsquerdo.innerHTML = result.utilizador.morada;
            }

        });



/* 
         function filterenc(){
            // SEARCH FILTER
            const search = document.getElementById("search");
            const productName = document.querySelectorAll("table table-striped .nomeC");
            console.log(productName)
          
            // A BETTER WAY TO FILTER THROUGH THE PRODUCTS
            search.addEventListener("keyup", filterEc);
          
            function filterEc(e) {
                const text = e.target.value.toLowerCase();
                
                productName.forEach(function(product) {
                    const item = product.firstChild.textContent;
          
                    if (item.toLowerCase().indexOf(text) != -1) {
          
                
                        product.parentElement.parentElement.parentElement.style.display = "block"
                    } else {
                        product.parentElement.parentElement.parentElement.style.display = "none"
                    }
                })
            }
          } 
 */
         /*  function filterenc() {
            var input, filter, table, tr, td, i;
            input = document.getElementById("search");
            filter = input.value.toUpperCase();
            table = document.getElementById("encomendas");
            tr = table.getElementsByTagName("tr");

            console.log(tr)

            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[1];
                var x = $("#search").val();
                var regex = /^[a-zA-Z]+$/;
                if (!x.match(regex)) {
                    td = tr[i].getElementsByTagName("td")[0];
                }
                if (td) {
                    if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        } */

        /* function filterenc() {
            var input, filter, table, tr, td, i;
            input = document.getElementById("search");
            filter = input.value.toUpperCase();
            table = document.getElementById("encomendas");
            tr = table.getElementsByTagName("tr");
            for (i = 0; i < tr.length; i++) {
              td = tr[i].getElementsByTagName("td")[0];
              if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                  tr[i].style.display = "";
                } else {
                  tr[i].style.display = "none";
                }
              }       
            }
          } */


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






