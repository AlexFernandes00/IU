/*function getCookie() {
        if (value == undefined) {
            alert("There is nothing in the shopping cart!");
        } else {
            var cookieArray = document.cookie.split(';');
            //var printHolder = "";
            for (var i = 0; i < cookieArray.length; ++i) {
                console.log(value)
                var pairArray = cookieArray[i].split('=');
                alert(pairArray[0] + "produto" + productID + "tem" + value);
            }
            //alert(printHolder);
            //ADICIONAR NA TABELA
        }
    } */


const renderCar = async () => {
  const tblProdutos = document.getElementById("tablecar");

  let strHtml = `
          
          <thead>
          <tr>
              <th>Referência</th>
              <th class="shoping__product">Produto</th>
              <th>Preço (€)</th>
              <th></th>
              <th>Qtd</th>
              <th></th>
              <th>Total (€)</th>
              <th></th>
          </tr>
      </thead> 
      <tbody>
              `


  let cookieArray = document.cookie.split(';');
  //var printHolder = "";
  for (let i = 0; i < cookieArray.length; ++i) {
    let pairArray = cookieArray[i].split('=');
    console.log(cookieArray.length)
    // alert("AMO-TE PROGRAMA FUNCIONA QUE NAO AGUENTO +")
    if (cookieArray == "") {
      strHtml += `
                  <tr>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                  <td></td>
                  <td </td>
                  
                  
                </tr>
                  `

    } else {

      strHtml += `
                  <tr>
                  <td> ${pairArray[4]} </td>
                  <td> ${pairArray[0]} </td>
                  <td> ${pairArray[2]} </td>
                  <td><button style="display: inline-block;
                  font-size: 12px;
                  text-align: center;
                  padding: 10px 10x 10px;
                  color: #000000;
                  text-transform: uppercase;
                  font-weight: 700;
                  background: #F0F7F4;

                  letter-spacing: 2px;
                  border-bottom: 0px;
                  border:none;" onclick="menos(this)">-</button></td>
                  <td>${pairArray[1]} </td>
                  <td><button style="display: inline-block;
                  font-size: 12px;
                  text-align: center;
                  padding: 10px 10x 10px;
                  color: #000000;
                  text-transform: uppercase;
                  font-weight: 700;
                  background: #F0F7F4;

                  letter-spacing: 2px;
                  border-bottom: 0px;
                  border:none;" class="secondary-btn" onclick="add(this)">+</button></td>
                  <td> ${pairArray[3]} </td>
                  <td class="shoping__cart__item__close">
                                        <span onclick="deleteRow(this)" class="icon_close"></span>
                                    </td>
                  
                  
                </tr>
                  `

    }
  }
  strHtml += "</tbody>"

  tblProdutos.innerHTML = strHtml
}
renderCar()




const tot = async () => {

  const total = document.getElementById("subtotal")
  var soma = 0;
  let stringHtml =
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
    stringHtml += `
        <span>
            0,00 €
             </span>
             `
  } else {
    stringHtml += `
        <span>
            ${soma.toFixed(2)} €
             </span>
             `}
  total.innerHTML = stringHtml
}
tot()

const total1 = async () => {

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
total1()

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
}
valor()

const check = async () => {

  const checkout = document.getElementById("totalcheck")
  var soma1 = 0;
  let stringHtml7 =
    `
      <span>
          `
  let cookieArray4 = document.cookie.split(';');
  for (let i = 0; i < cookieArray4.length; ++i) {
    let pairArray4 = cookieArray4[i].split('=');
    soma1 += parseFloat(pairArray4[3]);
  }
  if (cookieArray4 == "") {
    stringHtml7 += `
    <span>
        0,00€
         </span>
         `
  } else {
    stringHtml7 += `
    <span id="tota">
        ${soma1.toFixed(2)} €
         </span>
         `
  }
  checkout.innerHTML = stringHtml7

}
check()

const item = async () => {
  const tblcheck = document.getElementById("prod");
  let strHtml9 = `
      <thead>
      <tr>
          <th style="padding-right: 50px" id="rP">Ref</th> 
          <th style="padding-right: 50px" id="pP">Produtos</th>
          <th style="padding-right: 10px" id="tP">Total(€)</th>
          <th style="padding-right: 10px" id="qP">Qtd</th>
      </tr>
      </thead> 
      <tbody>
          `
  let cookieArray9 = document.cookie.split(';');
  for (let i = 0; i < cookieArray9.length; ++i) {
    let pairArray9 = cookieArray9[i].split('=');
    if (cookieArray9 == "") {

      strHtml9 += `
              <tr>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
            </tr>
              `
    } else {
      strHtml9 += `
              <tr>
              <td  > ${pairArray9[4]} </td>
              <td > ${pairArray9[0]} </td>
              <td > ${pairArray9[2]} </td>
              <td > ${pairArray9[1]} </td>
              
            </tr>
              `
    }
  }
  strHtml9 += "</tbody>"

  tblcheck.innerHTML = strHtml9
}
item()

const merc = async () => {
  const mercado = document.getElementById("mercado");
  let strHtml99 = `
          `
  let cookieArray99 = document.cookie.split(';');
  if(document.cookie.length===0){
  } else{
      let pairArray99 = cookieArray99[0].split('=');
      strHtml99 += `
      <span id="mercadol">${pairArray99[6]}</span>`
    }
  mercado.innerHTML = strHtml99
}
merc()

function deleteRow(t) {
  var row = t.parentNode.parentNode;
  document.getElementById("tablecar").deleteRow(row.rowIndex);
  var cells = row.getElementsByTagName("td");
  var name = cells[1].innerHTML;
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  total1();
  tot();
  valor();
}

function add(t) {
  var row = t.parentNode.parentNode;
  document.getElementById("tablecar");
  var cells = row.getElementsByTagName("td");
  var nome = cells[1].innerHTML;
  var ref = cells[0].innerHTML;
  var precoP = cells[2].innerHTML;
  //var total = cells[6].innerHTML;
  var valor2 = cells[4].innerHTML;
  //alert(nome);
  var value = parseInt(valor2) + 1;
  var tot1 = parseInt(value) * parseFloat(precoP);
  tot1 = tot1.toFixed(2);
  //alert(value);
  document.cookie = nome + "=" + value + "=" + precoP + "=" + tot1 + "=" + ref + "; ";
  cells[4].innerHTML=value;
  cells[6].innerHTML=tot1;
  
  tot();
  valor();
  total1();
}

/* function menos(t) {
  var row = t.parentNode.parentNode;
  document.getElementById("tablecar");
  var cells = row.getElementsByTagName("td");
  var nome = cells[1].innerHTML;
  var ref = cells[0].innerHTML;
  var precoP = cells[2].innerHTML;
  //var total = cells[6].innerHTML;
  var valor2 = cells[4].innerHTML;
  //alert(nome);
  var value = parseInt(valor2) - 1;
  if(parseInt(value)<0){
    value=0;
  }
  var tot1 = parseInt(value) * parseFloat(precoP);
  tot1 = tot1.toFixed(2);
  //alert(value);
  document.cookie = nome + "=" + value + "=" + precoP + "=" + tot1 + "=" + ref + "; ";
  cells[4].innerHTML=value;
  cells[6].innerHTML=tot1;

  tot();
  valor();
  total1()
  
} */

function menos(t) {
  var row = t.parentNode.parentNode;
  document.getElementById("tablecar");
  var cells = row.getElementsByTagName("td");
  var nome = cells[1].innerHTML;
  var ref = cells[0].innerHTML;
  var precoP = cells[2].innerHTML;
  //var total = cells[6].innerHTML;
  var valor2 = cells[4].innerHTML;
  //alert(nome);

  var value = parseInt(valor2);

  if(value==1){
    /* alert("Remover o produto do carrinho!") */
    swal({
      title: 'Produto removido do carrinho!',
      //text: "Não é reversível",
      icon: 'warning',
      /* showCancelButton: true, */
      confirmButtonColor: '#3085d6',
      /* cancelButtonColor: '#d33', */
      confirmButtonText: 'Ok'
    })
    var row = t.parentNode.parentNode;
    document.getElementById("tablecar").deleteRow(row.rowIndex);
    var cells = row.getElementsByTagName("td");
    var name = cells[1].innerHTML;
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;' + value + "=" + precoP + "=" + tot1 + "=" + ref + "; ";
    
    tot();
    valor();
    total1()

        
      } else{
        value = parseInt(valor2) - 1;
        
      var tot1 = parseInt(value) * parseFloat(precoP);
      tot1 = tot1.toFixed(2);
      //alert(value);
      document.cookie = nome + "=" + value + "=" + precoP + "=" + tot1 + "=" + ref + "; ";
      cells[4].innerHTML=value;
      cells[6].innerHTML=tot1;

      tot();
      valor();
      total1()
      
      }

}

