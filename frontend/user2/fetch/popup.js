window.onload = function () {
    const popup = document.getElementById("popupparque");

    popup.addEventListener('click', async function (event) {
        event.preventDefault();
        var date = new Date();
        var hora = date.getHours();       
        var min = date.getMinutes();
        var datahora = hora + ':' + min;
            let data = {
                lotacao: document.querySelector('input[name="radioL"]:checked').value,
                quantidadeLixo: document.querySelector('input[name="radioLixo"]:checked').value,
                data: datahora.value,
                tempo: document.getElementById('input[name="radioTempo"]:checked').innerHTML,    
                idParque: document.querySelector('#select1').value,
            }
            console.log(data)
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