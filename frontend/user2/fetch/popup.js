window.onload = () => {
    
    const renderProducts = async () => {
    var myHeaders = new Headers();
    const popup = document.getElementById("btnSubmeter");
    const listaparques = document.getElementById("value");
    myHeaders.append("Content-Type", "application/json");
    
    var requestOptions = {
      mode: 'cors',
      method: 'GET',
      headers: myHeaders,
      credentials: 'include'
    };
    let stringhtml = "";

    const response = await fetch(`http://127.0.0.1:8080/listarparques`, requestOptions)
    
        let products = await response.json();
        parques = products.body;
        for (let i = 0; i < parques.length; i++) {
            let nome = parques[i].nome;
            let identificacaoParque = parques[i].idParque;
            stringhtml += `<option id=${identificacaoParque}>${nome}</option>`
        }
        listaparques.innerHTML= stringhtml;
  

    popup.addEventListener('click', async function (event) {
        event.preventDefault();
        var date = new Date();
        var hora = date.getHours();       
        var min = date.getMinutes();
        var datahora = hora + ':' + min;
            let data = {
                lotacao: document.querySelector('input[name="radioL"]:checked').value,
                data: datahora,
                idParque: listaparques.options[listaparques.selectedIndex].id,
                quantidadeLixo: document.querySelector('input[name="radioLixo"]:checked').value,
                tempo: document.querySelector('input[name="radioTempo"]:checked').value,    
            }
        fetch(`http://127.0.0.1:8080/criarInformacao`, {
                headers: {
                    "Content-Type": "application/json"
                },
                mode: 'cors',
                method: 'POST',
                body: JSON.stringify(data)

            }).then(response => {
                return response.json();
            }).then((result) => {
                window.location.href = 'home.html';
            })
        

    });
}
    renderProducts()

}