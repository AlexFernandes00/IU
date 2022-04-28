window.onload = function() {

  const loader = document.getElementsByName("loading");

  for (let i = 0; i < loader.length; i++) {
    loader[i].classList.add("display");
  }

    getVendasPorDia()//.then(dados => preencherGrafico(dados));
    numvendas();
    getTopProdutos(); 
    entregas();

    // Função para contar numero de encomendas nos ultimos 7 dias
    const  cencomendas= document.getElementById("encomendasSemanais");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var requestOptions = {
        mode: 'cors',
        method: 'GET',
        headers: myHeaders,
        credentials: 'include'
    };
    fetch(`https://easymarket-backend.beagoddess.repl.co/encomendas`,requestOptions)
    .then(response => {
        return response.json();
      
    })
    .then((result) => {
     
      let encomendas = result.body;
      let contador = 0;
      let date = new Date;
      let ano = date.getFullYear();
      let mes = String(date.getMonth() + 1);
      let dia = date.getDate();

      for (encomenda of encomendas){
        var hj= new Date(ano, mes, dia) //data do dia de hoje 
        hj.setDate(hj.getDate()) //data de hoje para comparar
        var dataencomenda= encomenda.lastmodified.replace("T00:00:00+0100", "").replace("T00:00:00","")
        var datasete= new Date(dataencomenda)  // data da encomenda vinda da funcao
        datasete.setDate(datasete.getDate()) // data da encomenda para comparar
        // comparar data de hoje com data da encomenda de hoje
        if(hj.valueOf==datasete.valueOf) {
          contador +=1;
        }
        // comparar data da encomenda com a data de ontem 
        if(datasete.valueOf==hj.setDate(hj.getDate()-1).valueOf) {
          contador +=1;
        }
        // comparar data da encomenda com a data de dois dias atras
        if(datasete.valueOf==hj.setDate(hj.getDate()-2).valueOf) {
          contador +=1;
        }
        // comparar data da encomenda com a data de tres tres atras
        if(datasete.valueOf==hj.setDate(hj.getDate()-3).valueOf) {
          contador +=1;
        }
       // comparar data da encomenda com a data de dois quatro atras
       if(datasete.valueOf==hj.setDate(hj.getDate()-4).valueOf) {
        contador +=1;
        }
        // comparar data da encomenda com a data de dois cinco  atras
       if(datasete.valueOf==hj.setDate(hj.getDate()-5).valueOf) {
        contador +=1;
        }
        // comparar data da encomenda com a data de dois seis atras
       if(datasete.valueOf==hj.setDate(hj.getDate()-6).valueOf) {
        contador +=1;
        }
        // comparar data da encomenda com a data de dois sete atras
       if(datasete.valueOf==hj.setDate(hj.getDate()-7).valueOf) {
        contador +=1;
        }
      }
      cencomendas.innerHTML = contador
      const loader = document.getElementsByName("loading");
      loader[1].style.display="none"
    })
  }; 

//função para contar total monetário de vendas nos ultimos 7 dias
  function numvendas(){
    const vendas = document.getElementById("vendasSemanais");
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var requestOptions = {
          mode : 'cors',
          method: 'GET',
          headers: myHeaders,
          credentials : 'include'
        };

        fetch(`https://easymarket-backend.beagoddess.repl.co/encomendas`,requestOptions)
        .then(response => {
            return response.json();
        })
        .then((result) => {
          let encomendas = result.body;
          let contador = 0;
          let date = new Date;
          let ano = date.getFullYear();
          let mes = String(date.getMonth() + 1);
          let dia = date.getDate();
    
          for (encomenda of encomendas){
            var hj= new Date(ano, mes, dia) //data do dia de hoje 
            hj.setDate(hj.getDate()) //data de hoje para comparar
            var dataencomenda= encomenda.lastmodified.replace("T00:00:00+0100", "").replace("T00:00:00","")
            var datasete= new Date(dataencomenda)  // data da encomenda vinda da funcao
            datasete.setDate(datasete.getDate()) // data da encomenda para comparar
            var euro = '€'
          
            // comparar data de hoje com data da encomenda de hoje
            if(hj.valueOf==datasete.valueOf) {
              
              contador +=encomenda.reconciled_value;
             
            }
            // comparar data da encomenda com a data de ontem 
            if(datasete.valueOf==hj.setDate(hj.getDate()-1).valueOf) {
              contador +=encomenda.reconciled_value;
            }
            // comparar data da encomenda com a data de dois dias atras
            if(datasete.valueOf==hj.setDate(hj.getDate()-2).valueOf) {
              contador +=encomenda.reconciled_value;
            }
            // comparar data da encomenda com a data de tres tres atras
            if(datasete.valueOf==hj.setDate(hj.getDate()-3).valueOf) {
              contador +=encomenda.reconciled_value;
            }
           // comparar data da encomenda com a data de dois quatro atras
           if(datasete.valueOf==hj.setDate(hj.getDate()-4).valueOf) {
            contador +=encomenda.reconciled_value;
            }
            // comparar data da encomenda com a data de dois cinco  atras
           if(datasete.valueOf==hj.setDate(hj.getDate()-5).valueOf) {
            contador +=encomenda.reconciled_value;
            }
            // comparar data da encomenda com a data de dois seis atras
           if(datasete.valueOf==hj.setDate(hj.getDate()-6).valueOf) {
            contador +=encomenda.reconciled_value;
            }
            // comparar data da encomenda com a data de dois sete atras
           if(datasete.valueOf==hj.setDate(hj.getDate()-7).valueOf) {
            contador +=encomenda.reconciled_value;
            }
          }
          const loader = document.getElementsByName("loading");
          loader[0].style.display="none";
          vendas.innerHTML = parseFloat(contador).toFixed(2).concat(euro);
          
        })
};

//função para o grafico de vendas nos ulimos 7 dias?
async function getVendasPorDia() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
      mode: 'cors',
      method: 'GET',
      headers: myHeaders,
      credentials: 'include'
  };
  
  const response = await fetch(`https://easymarket-backend.beagoddess.repl.co/encomendas`, requestOptions)
  
  
  let encomendas = await response.json();
  
  encomendas = encomendas.body;
  
    const data = [];
    let label=[];
    now = new Date 
    dia =  String(now.getDate()).padStart(2, '0')
    mes =  String(now.getMonth()+1).padStart(2, '0')
    ano = now.getFullYear()
   
  
   let contador=0
   for(let cont =0; cont<30;cont++){ 
   if( dia-cont ==0) {
    label.push(30)
  }
  if(dia-cont <0){
    label.push(30-(cont-dia))
  } else{label.push(dia-cont)}
   }
    for (let i = 0; i < encomendas.length; i++) {

            var hj= new Date(ano, mes-1, dia-2) //data do dia de hoje 
            hj.setDate(hj.getDate()) //data de hoje para comparar
            var dataencomenda= encomendas[i].lastmodified.replace("T00:00:00+0100", "").replace("T00:00:00","")
            var datasete= new Date(dataencomenda)  // data da encomenda vinda da funcao
            datasete.setDate(datasete.getDate()) // data da encomenda para comparar
           hj= hj.toString()
           hj= hj.replace("00:00:00 GMT+0100 (Hora de verão da Europa Ocidental)", "")

            datasete=datasete.toString()
            datasete= datasete.replace("01:00:00 GMT+0100 (Hora de verão da Europa Ocidental)", "")

             for(let con =0; con<31;con++){ 
              var hj= new Date(ano, mes-1, dia-con) //data do dia de hoje 
              hj.setDate(hj.getDate()) //data de hoje para comparar
              hj= hj.toString()
              hj= hj.replace("00:00:00 GMT+0100 (Hora de verão da Europa Ocidental)", "")
              if(datasete===hj) {
              
                contador+=1
                let diferenca =  dia- datasete.substring(8,10)
                let index = 30- diferenca
                if(data[index-1]!=undefined){
                 data[index-1] += encomendas[i].reconciled_value
                 //console.log("dia: " + hj + "----" + con)

                }else {
                 data[index-1] = encomendas[i].reconciled_value ;
              
               }
              }            
              }
      
          }
 
          let zero = label.indexOf(0)
         // console.log("pq nao das"+label.slice(label.indexOf(0),label.indexOf(0)+1) )

          label.splice(zero, 1)
        //  console.log(label)
          label1= label.reverse();
    //alert(label)
    preencherGrafico(data, label1)
    //return data,label
  }

  
function preencherGrafico(data, label){
    Chart.defaults.global.legend.labels.usePointStyle = true;
    var ctx = document.getElementById('visit-sale-chart').getContext("2d");
    
    var gradientStrokeBlue = ctx.createLinearGradient(0, 0, 0, 360);
    gradientStrokeBlue.addColorStop(0, 'rgba(246,227,206,1)');
    gradientStrokeBlue.addColorStop(1, 'rgba(254,154,46,1)');
    var gradientLegendBlue = 'linear-gradient(to right, rgba(246,227,206,1), rgba(254,154,46,1))';

    var gradientStrokeRed = ctx.createLinearGradient(0, 0, 0, 300);
    gradientStrokeRed.addColorStop(0, 'rgba(224,248,224,1)');
    gradientStrokeRed.addColorStop(1, 'rgba(127,176,143,1)');
    var gradientLegendRed = 'linear-gradient(to right, rgba(224,248,224,1), rgba(127,176,143,1))';
    const loader = document.getElementsByName("loading");
    loader[3].style.display="none";
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels:label,// ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
          datasets: [
            {
                data: data,
                label: "",
                borderColor: gradientStrokeBlue,
                backgroundColor: gradientStrokeBlue,
                hoverBackgroundColor: gradientStrokeBlue,
                legendColor: gradientLegendBlue,
                pointRadius: 0,
                fill: false,
                borderWidth: 1,
                fill: 'origin'
            }]
        },
      options: {
        responsive: true,
        legend: false,
        legendCallback: function(chart) {
          var text = []; 
          text.push('<ul>'); 
          for (var i = 0; i < chart.data.datasets.length; i++) { 
              text.push('<li><span class="legend-dots" style="background:' + 
                         chart.data.datasets[i].legendColor + 
                         '"></span>'); 
              if (chart.data.datasets[i].label) { 
                  text.push(chart.data.datasets[i].label); 
              } 
              text.push('</li>'); 
          } 
          text.push('</ul>'); 
          return text.join('');
        },
        scales: {
            yAxes: [{
                ticks: {
                    display: false,
                    min: 0,
                    stepSize: 20,
                    max: 50
                },
                gridLines: {
                  drawBorder: false,
                  color: 'rgba(235,237,242,1)',
                  zeroLineColor: 'rgba(235,237,242,1)'
                }
            }],
            xAxes: [{
                gridLines: {
                  display:false,
                  drawBorder: false,
                  color: 'rgba(0,0,0,1)',
                  zeroLineColor: 'rgba(235,237,242,1)'
                },
                ticks: {
                    padding: 20,
                    fontColor: "#9c9fa6",
                    autoSkip: true,
                },
                categoryPercentage: 0.8,
                barPercentage: 0.5
            }]
          }
        },
        elements: {
          point: {
            radius: 0
          }
        }
    })

    
  
  } 

  async function getTopProdutos() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        mode: 'cors',
        method: 'GET',
        headers: myHeaders,
        credentials: 'include'
    };
    const response = await fetch(`https://easymarket-backend.beagoddess.repl.co/encomendas`, requestOptions)
  
    let encomendas = await response.json();
    
    encomendas = encomendas.body;
      let data2 = [];
      let labels2 =[];
      var myMap = new Map();
      let c = 0;
      let nomeProduto;
      let quantidade;
      
      for (let i = 0; i < encomendas.length; i++){
        for (let j = 0; j < encomendas[i].products.length; j++){
            if(encomendas[i].empresa == "lo"){
             nomeProduto =encomendas[i].products[j].description;
              quantidade = encomendas[i].products[j].quantity;
          }
          if(encomendas[i].empresa == "coutinho"){

            nomeProduto =encomendas[i].products[j].name;
             quantidade = encomendas[i].products[j].qty;
         }
            if(myMap.get(nomeProduto) !== undefined){

            let qt = myMap.get(nomeProduto);
            let soma = qt + quantidade;
            myMap.set(nomeProduto, soma)
            }
          if(myMap.get(nomeProduto) == undefined){
            myMap.set(nomeProduto, quantidade)
          } 
          
          if (i==encomendas.length-1 ){
            c++
          }
        
          if(c==encomendas[encomendas.length-1].products.length){ //vai buscar ultimo map
            const mapSort2 = new Map([...myMap.entries()].sort((a, b) => b[1] - a[1])); //mete map por ordem decrescente
            data2.push(Array.from(mapSort2)[0][1])
            data2.push(Array.from(mapSort2)[1][1])
            data2.push(Array.from(mapSort2)[2][1])
            data2.push(Array.from(mapSort2)[3][1])
            data2.push(Array.from(mapSort2)[4][1])
            labels2.push(Array.from(mapSort2)[0][0])
            labels2.push(Array.from(mapSort2)[1][0])
            labels2.push(Array.from(mapSort2)[2][0])
            labels2.push(Array.from(mapSort2)[3][0])
            labels2.push(Array.from(mapSort2)[4][0])
            
            preencherGrafico2(data2,labels2)
            
          }
     
        }
      }
      return data2, labels2
      
    }
      
function preencherGrafico2(data2,labels2){
  var ctx1 = document.getElementById("traffic-chart").getContext("2d");
  

  var gradientStrokeBlue = ctx1.createLinearGradient(0, 0, 0, 181);
  gradientStrokeBlue.addColorStop(0, 'rgba(246,227,206,1)');
  gradientStrokeBlue.addColorStop(1, 'rgba(254,154,46,1)');
  var gradientLegendBlue = 'linear-gradient(to right, rgba(246,227,206,1), rgba(254,154,46,1))';

  var gradientStrokeRed = ctx1.createLinearGradient(0, 0, 0, 50);
  gradientStrokeRed.addColorStop(0, 'rgba(224,248,224,1)');
  gradientStrokeRed.addColorStop(1, 'rgba(127,176,143,1)');
  var gradientLegendRed = 'linear-gradient(to right, rgba(224,248,224,1), rgba(127,176,143,1))';


  var gradientStrokeGreen = ctx1.createLinearGradient(0, 0, 0, 300);
  gradientStrokeGreen.addColorStop(0, 'rgba(245,249,204,1)');
  gradientStrokeGreen.addColorStop(1, 'rgba(239,217,112,1)');
  var gradientLegendGreen = 'linear-gradient(to right, rgba(245,249,204,1), rgba(239,217,112,1))';    
  
  var gradientStrokeOutraQualquer = ctx1.createLinearGradient(0, 0, 0, 300);
  gradientStrokeOutraQualquer.addColorStop(0, 'rgba(245,250,274,1)');
  gradientStrokeOutraQualquer.addColorStop(1, 'rgba(239,217,112,1)');
  var gradientLegendOutraQualquer = 'linear-gradient(to right, rgba(245,250,274,1), rgba(239,217,112,1))'; 
  
  
  var gradientStrokeGreen = ctx1.createLinearGradient(0, 0, 0, 300);
  gradientStrokeGreen.addColorStop(0, 'rgba(245,249,204,1)');
  gradientStrokeGreen.addColorStop(1, 'rgba(239,217,112,1)');
  var gradientLegendGreen = 'linear-gradient(to right, rgba(245,249,204,1), rgba(239,217,112,1))';   

 var trafficChartData = {
  type: 'doughnut',
    datasets: [{
      data: data2,
      backgroundColor: [
        gradientStrokeBlue,
        gradientStrokeGreen,
        gradientStrokeRed,
        gradientStrokeOutraQualquer,
        gradientStrokeGreen
      ],
      hoverBackgroundColor: [
        gradientStrokeBlue,
        gradientStrokeGreen,
        gradientStrokeRed,
        gradientStrokeOutraQualquer,
        gradientStrokeGreen
      ],
      borderColor: [
        gradientStrokeBlue,
        gradientStrokeGreen,
        gradientStrokeRed,
        gradientStrokeOutraQualquer,
        gradientStrokeGreen
      ],
      legendColor: [
        gradientLegendBlue,
        gradientLegendGreen,
        gradientLegendRed,
       gradientLegendOutraQualquer,
       gradientLegendGreen
      ]
    }],
    labels: labels2
  };
  var trafficChartOptions = {
    responsive: true,
    
    animation: {
      animateScale: true,
      animateRotate: true
    },
    plugins: {
      legend: {
          display: true}},
    //legend: false,
    legendCallback: function(chart) {
      var text = []; 
      text.push('<ul>'); 
      for (var i = 0; i < trafficChartData.datasets[0].data.length; i++) { 
          text.push('<li><span class="legend-dots" style="background:' + 
          trafficChartData.datasets[0].legendColor[i] + 
                      '"></span>'); 
          if (trafficChartData.labels[i]) { 
              text.push(trafficChartData.labels[i]); 
          }
          text.push('<span class="float-right">'+trafficChartData.datasets[0].data[i]+'</span>')
          text.push('</li>'); 
      } 
      text.push('</ul>'); 
      return text.join('');
    }
  };
  var trafficChart = new Chart(ctx1, {
    type: 'doughnut',
    data: trafficChartData,
    options: trafficChartOptions,
   // plotOptions: {showInLegend: true}
  });
  //document.getElementById("legenda").innerHTML= trafficChart
  const loader = document.getElementsByName("loading");
  loader[4].style.display="none"
}



function entregas(){
const  entregas = document.getElementById("entregas");

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
    mode: 'cors',
    method: 'GET',
    headers: myHeaders,
    credentials: 'include'
};
fetch(`https://easymarket-backend.beagoddess.repl.co/encomendas`,requestOptions)
.then(response => {
    return response.json();
  
})
.then((result) => {
 
  let encomendas = result.body;
  let contador = 0;
  let date = new Date;
  let ano = date.getFullYear();
  let mes = String(date.getMonth() + 1);
  let dia = date.getDate();

  for (encomenda of encomendas){
    
    var hj= new Date(ano, mes, dia) //data do dia de hoje 
    hj.setDate(hj.getDate()) //data de hoje para comparar
    var dataencomenda= encomenda.lastmodified.replace("T00:00:00+0100", "").replace("T00:00:00","")
    var datasete= new Date(dataencomenda)  // data da encomenda vinda da funcao
    datasete.setDate(datasete.getDate()) // data da encomenda para comparar

    // comparar data de hoje com data da encomenda de hoje
    if(hj.valueOf==datasete.valueOf && encomenda.notes == "Entregue") {
      contador +=1;
    }
    // comparar data da encomenda com a data de ontem 
    if(datasete.valueOf==hj.setDate(hj.getDate()-1).valueOf && encomenda.notes== "Entregue") {
      contador +=1;
    }
    // comparar data da encomenda com a data de dois dias atras
    if(datasete.valueOf==hj.setDate(hj.getDate()-2).valueOf && encomenda.notes== "Entregue") {
      contador +=1;
    }
    // comparar data da encomenda com a data de tres tres atras
    if(datasete.valueOf==hj.setDate(hj.getDate()-3).valueOf && encomenda.notes== "Entregue") {
      contador +=1;
    }
   // comparar data da encomenda com a data de dois quatro atras
   if(datasete.valueOf==hj.setDate(hj.getDate()-4).valueOf && encomenda.notes== "Entregue") {
    contador +=1;
    }
    // comparar data da encomenda com a data de dois cinco  atras
   if(datasete.valueOf==hj.setDate(hj.getDate()-5).valueOf && encomenda.notes== "Entregue") {
    contador +=1;
    }
    // comparar data da encomenda com a data de dois seis atras
   if(datasete.valueOf==hj.setDate(hj.getDate()-6).valueOf && encomenda.notes== "Entregue") {
    contador +=1;
    }
    // comparar data da encomenda com a data de dois sete atras
   if(datasete.valueOf==hj.setDate(hj.getDate()-7).valueOf && encomenda.notes== "Entregue") {
    contador +=1;
    }
  }
  const loader = document.getElementsByName("loading");
  loader[2].style.display="none";
  entregas.innerHTML = contador;
  
})
}; 

  

   

  

  



