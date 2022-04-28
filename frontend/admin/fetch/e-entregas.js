window.onload = () => {

    

    const renderEntregas = async () => {

        var myHeaders = new Headers();
        const tblEntregas = document.getElementById("entregas");   
        let strHtml = `   <table class="table table-striped">
            <thead>
                <tr>
                    <th style="text-align: center"> # </th>
                    <th style="text-align: center"> ID Cliente  </th>
                    <th style="text-align: center"> Cliente </th>
                    <th style="text-align: center"> ID Fatura </th>
                    <th style="text-align: center"> Estado </th>
                    <th style="text-align: center"> Última verificação</th>
                    <th style="text-align: center"> Data de Entrega </th>
             
                    <th> QRCode </th>
                </tr>
            </thead>

            <tbody>
            `
            

            
    // ---------------------------------------------
     
    const loader = document.querySelector("#loading");

    loader.classList.add("display");

    //--------------------------------------------------

       myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            mode: 'cors',
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        };
        
        const response = await fetch(`https://easymarket-backend.beagoddess.repl.co/delivery/encomendas`, requestOptions)
        
        let entregas = await response.json();
        let idBtn = "";
        let progress = "";
        let label;
        entregas = entregas.body;
        
        console.log(entregas)
        let mercado= "";
        //console.log(entregas)

  
        for (let i = 0; i < entregas.length; i++) {
            if(entregas[i].id_notes){
                idBtn = entregas[i].id_notes 
            }

            if(entregas[i].notes) {
                progress = "Em Processo"
            }

            if(entregas[i].mercado=="Coutinho"){
                mercado="Mercado Coutinho";
            }else{
                mercado="Mercado Ló";
            }

            strHtml += `
                <tr>
                    <td style="text-align: center"> ${i+1} </td>
                    <td style="text-align: center"> ${entregas[i].customer_id} </td>
                    <td style="text-align: center"> ${entregas[i].entity_name} 
                    <button class="btn btn-danger" onclick="calcRoute('`+entregas[i].dados_cliente.morada+`','${entregas[i].document_id}')" name="primary-btn" type="button" style="display: inline-block;
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
                <span class="close1" style="color: black;
                float: right;
                font-size: 28px;
                font-weight: bold;">&times;</span>
                  <h3>Dados do Cliente</h3>
                  <form id="pass" class="login100-form validate-form">
                    <div >
                        <span class="label-input100" style="font-weight: bold;align=center">Nome: </span>
                        <label> ${entregas[i].dados_cliente.name} </label>
                        <span class="focus-input100"></span>
                    </div>					

                    <div>
                        <span class="label-input100" align="center" style="font-weight: bold;">NIF: </span>
                        <label> ${entregas[i].dados_cliente.nif}</label>
                        <span class="focus-input100"></span>
                    </div>
                    <div>
                        <span class="label-input100" style="font-weight: bold;">Mercado de compra: </span>
                        <label> ${mercado}</label>
                        <span class="focus-input100"></span>
                    </div>

                    <div>
                        <span class="label-input100" style="font-weight: bold;">Morada: </span>
                        <label> ${entregas[i].dados_cliente.morada}</label>
                        <span class="focus-input100"></span>
                        
                        <div class="jumbotron" style=" background-color: transparent; margin: 0; padding: 10px;">
                        <div class="container-fluid">
                           
                          <form class="form-horizontal">
                                <div class="form-group">
                 
                                    <div class="col-xs-4">
                                        <input  id="from" placeholder="Origin" class="form-control" type=hidden>
                                    </div>
                               </div>
                               <div class="form-group">
                                
                                 
                                    <div class="col-xs-4">
                                        <input id="to" placeholder="Destination" class="form-control" type=hidden>
                                    </div>
                                  
                                 </div>
                                 
                            </form> 
                
                            <div class="col-xs-offset-2 col-xs-10">
                                
                            </div>
                        </div>
                        <div class="container-fluid">
                            <div name='${entregas[i].document_id}' style=" width: 80%; height: 400px; margin: 10px auto;">
                
                            </div>
                            <div name='${entregas[i].document_id}' style=" text-align: center; font-size: 2em; margin: 20px auto;">
                
                            </div>
                        </div>
                
                    </div>
                    </div>
                    
                 </form>
                </div>
            </div></td>
                    <td style="text-align: center"> ${entregas[i].document_id} </td>

                    <td style="text-align: center">

                    <label class="btn btn-danger" style="    border-radius: .125rem;
                    font-size: 11px;
                    font-weight: initial;
                    line-height: 1;
                    padding: .575rem .7625rem;">${progress}</label>

                </td>

                    <td style="text-align: center"> ${entregas[i].lastmodified.replace("T00:00:00+0100","").replace("T00:00:00","")}</td>
                    <td style="text-align: center"> ${entregas[i].lastmodified.replace("T00:00:00+0100","").replace("T00:00:00","")} </td>
                    
                    <td> <button class="btn btn-primary" name="qrcode"  mercado="${entregas[i].mercado}" id="${idBtn}" idF ="${entregas[i].document_id}" style="font-size:10px; line-height: 0.1; border-inline-width: inherit;"> Ler QRCode </button> </td>
                </tr>`
        }
        strHtml += "</tbody> </table>"
        loader.style.display="none"

        tblEntregas.innerHTML = strHtml 

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



        const camera = document.getElementById('webcam');

        let scanner = new Instascan.Scanner({ 
            video: camera,
            mirror: false
        });
        
        
        var span2 = document.getElementsByClassName("close")[0];
        // When the user clicks on the button, open the modal
        /*openBtn.onclick = function() {
           modal.style.display = "block";
        }*/

        let cameraBea = "";
       
        // When the user clicks on <span> (x), close the modal
         
          span2.onclick = function() {
            modal2.style.display = "none";
            scanner.stop(cameraBea);
            labelStatus.innerHTML = ""
          }


        const btnQRC = document.getElementsByName("qrcode");
        const labelStatus = document.getElementById("enviarStatus");

            for (let i = 0; i < btnQRC.length; i++) {
            btnQRC[i].addEventListener("click", () => {

                modalC.style.display = "block";
                
                // idF = Id fatura original
                let idF = btnQRC[i].getAttribute("idF")
               // id = Id fatura rascunho
               let id = btnQRC[i].getAttribute("id")
               let mercado = btnQRC[i].getAttribute("mercado")
                console.log(idF)

                camera.class = "active";
                
                Instascan.Camera.getCameras().then(function (cameras) {
                    if (cameras.length > 0) {
                        scanner.start(cameras[0]);
                        cameraBea = cameras[0];
                    } else {
                      console.error('No cameras found.');
                    }
                }).catch(function (e) {
                    console.error(e);
                });

                function alterarStatus(){

                    modal2.style.display = "none";
                    scanner.stop(cameraBea);
                    labelStatus.innerHTML = ""

                }

                scanner.addListener('scan', function(content){
                    if(content==idF) { 
                        labelStatus.innerHTML="QRCode encontrado. Encomenda entregue!"; 
                        var myHeaders2 = new Headers();

                        myHeaders2.append("Content-Type", "application/json");
                        
                        var requestOptions = {
                          mode : 'cors',
                          method: 'PUT',
                          headers: myHeaders2,
                          credentials : 'include',
                          body: JSON.stringify({"document_id": id,'mercado':mercado}),
                        };
                
                        fetch(`https://easymarket-backend.beagoddess.repl.co/delivery/encomendas`,requestOptions)
                        .then(response => {
                            return response.json();
                        })
                        .then((result) => {
                            console.log(result.body)
                            if(result.body.message=="Entregue"){
                                renderEntregas();
                                setTimeout(alterarStatus, 3000)

    
                            }
                        })

             
                    } else {
                        labelStatus.innerHTML = "QRCode inválido"
                    }

                    //console.log("Conteudo: "+content);
        
                });


            })}; 
    }

    const btnQRC = document.getElementsByName("qrcode");
    
    renderEntregas();

    
}


//javascript.js
//set map options


//define calcRoute function
function calcRoute(morada,id) {
var myLatLng = { lat: 38.3460, lng: -0.4907 };
var mapOptions = {
    //center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};

//create map
var map = new google.maps.Map(document.getElementsByName(id)[0], mapOptions);

//create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);

navigator.geolocation.getCurrentPosition(showPosition)
let lat = ""
let lng = ""

function showPosition(position) {
  lat = position.coords.latitude;
  lng = position.coords.longitude;
 

    //create request
    var request = {
        origin:{lat:lat, lng:lng},
        destination: morada,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.METRIC
    }

    //pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Get distance and time
            const output = document.getElementsByName(id)[1];
            output.innerHTML = "<div class=alert-info' style='background-color:#white; font-size:15px'> De: " + "Sua Localização" + ".<br />Para: " + morada + ".<br /> Distância <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Duração (Carro) <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";

            //display route
            directionsDisplay.setDirections(result);
        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            //center map in London
            map.setCenter(myLatLng);

            //show error message
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Não conseguiu calcular distância.</div>";
        }
    });
}
}



