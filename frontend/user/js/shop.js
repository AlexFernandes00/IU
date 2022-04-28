//npm install --save sweetalert2import Swal from 'sweetalert2'

// CommonJS
//const Swal = require('sweetalert2')
var value;
/*     var productID; */
    var nomeP;
    var precoP;
    var total;
    var ref;
    var stock;
    var loja;
   

    function setItem(abd) {
        value = abd.value;
        nomeP = abd.getAttribute("productid");
        precoP = abd.getAttribute("precoprod"); 
        ref = abd.getAttribute("idref");
        stock = abd.getAttribute("qtd");
        loja = abd.getAttribute("loja");


        var intRegex = /^\d+$/;
        var numberOfItems;
        if (!intRegex.test(value) || (value <= 0)) {
           /*  alert('Introduza um número válido do produto'); */
        } else {
            numberOfItems = value;
        }
    }

    function setCookie() {
      var mercado;
      
        /*let cookieArray11 = document.cookie.split(';');
        for (let i = 0; i < cookieArray11.length; ++i) {
          let pairArray11 = cookieArray11[i].split('=');
          sto += parseInt(pairArray11[1]);
        }*/
        if (value == undefined) {
          /*   alert("Adicione a quantidade que pretende do produto!"); */
        } else {
          if (parseInt(value)>parseInt(stock)){
                swal.fire({
                icon: 'error',
                title: 'Quantidade indisponível',
                text: 'A quantidade que inseriu não está disponível. Por favor, insira uma quantidade inferior a ' + stock + '.'
              })
                        
          } else{
            let cookieArr = document.cookie.split(';');
            for (let i = 0; i < cookieArr.length; ++i) {
            let array = cookieArr[i].split('=');
            mercado=array[6];
            }
            
            if(document.cookie.length===0){
              total = value * precoP;
              document.cookie = nomeP + "=" + value + "=" + parseFloat(precoP).toFixed(2) + "=" + parseFloat(total).toFixed(2) + "=" + ref + "=" + stock + "=" + loja +"; " ;
            }else{
              if(loja===mercado){
                total = value * precoP;
                document.cookie = nomeP + "=" + value + "=" + parseFloat(precoP).toFixed(2) + "=" + parseFloat(total).toFixed(2) + "=" + ref + "=" + stock + "=" + loja +"; " ;
                
              }else{
                const swalWithBootstrapButtons = Swal.mixin({
                  customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                  },
                  
                  confirmButtonColor: '#7FB08F',
                  
                  cancelButtonColor: 'color: #212529,background-color:#f8f9fa, border-color: #f8f9fa;',
                })
                
                swalWithBootstrapButtons.fire({
                  title: 'Atenção!',
                  text: "O produto selecionado pertence a um mercado diferente dos restantes produtos do carrinho. Deseja substituir os produtos pelo selecionado, ou cancelar e continuar com os produtos anteriores?",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Substituir',
                  cancelButtonText: 'Cancelar',
                  reverseButtons: true
                }).then((result) => {
                  if (result.isConfirmed) {
                    swalWithBootstrapButtons.fire(
                      'Substituído!',
                      'Os seus produtos foram substituídos',
                      'success'
                    )
                    document.cookie.split(';').forEach(function(c) {
                      document.cookie = c.trim().split('=')[0] + '=;' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC;';
                      });  
                      total = value * precoP;
                      document.cookie = nomeP + "=" + value + "=" + parseFloat(precoP).toFixed(2) + "=" + parseFloat(total).toFixed(2) + "=" + ref + "=" + stock + "=" + loja +"; " ;
                      
                  } else if (
                    
                    result.dismiss === Swal.DismissReason.cancel
                  ) {
                    swalWithBootstrapButtons.fire(
                      'Cancelado',
                      'Os seus produtos estão salvos :)',
                      'error'
                    )
                  }
                })
                    
              }
            }
            /*total = value * precoP;
              document.cookie = nomeP + "=" + value + "=" + parseFloat(precoP).toFixed(2) + "=" + parseFloat(total).toFixed(2) + "=" + ref + "=" + stock + "=" + loja +"; " ;*/
           /*alert(value + " (s) " + nomeP  + " a " + precoP  + "a" + total + "com" + stock+ "foi adicionado ao carrinho de compras!" );  */
            valor()
          }
        }
    }

    const valor = async () => {

        const val = document.getElementById("valor")
        var somar = 0;
        let stringHtml5 =""
      
        let cookieArray3 = document.cookie.split(';');
        for (let i = 0; i < cookieArray3.length; ++i) {
          let pairArray3 = cookieArray3[i].split('=');
          somar += parseInt(pairArray3[1]);
        }
      
        if (cookieArray3 == "") {
          stringHtml5 += "0"
        } else {
          stringHtml5 += somar
        }
        val.innerHTML = stringHtml5
        total1()
       
        
      }
     

      function total1(){

        const tot = document.getElementById("tot")
        var soma = 0;
        let stringHtml1 =
          `
              <span>
                  `
        let cookieArray2 = document.cookie.split(';');
        for (let i = 0; i < cookieArray2.length; ++i) {
          let pairArray2 = cookieArray2[i].split('=');
          console.log(pairArray2)
          soma += parseFloat(pairArray2[3]);
        }
        if (cookieArray2 == "") {
          stringHtml1 += `
            <span>
                0,00 €
                 </span>`
        } else {
          stringHtml1 += `
            <span>
                ${soma.toFixed(2)} €
                 </span>`
        }
        tot.innerHTML = stringHtml1
        
      }

    //const sof = document.getElementById("sofia");
    function getCookie() {
        /* alert("CARAÇAS") */
        if (value == undefined) {
            //alert("Não tem nada no carrinho de compras!");
        } else {
            var cookieArray = document.cookie.split(';');
            //var printHolder = "";
            for (var i = 0; i < cookieArray.length; ++i) {
                console.log(value);
                var pairArray = cookieArray[i].split('=');
                /* alert(pairArray[0] +  "tem" + value); */
                //sof.value = productID;
            }
            //alert(printHolder);
            //ADICIONAR NA TABELA
            //check();
            
        }

        
    }

    
  





