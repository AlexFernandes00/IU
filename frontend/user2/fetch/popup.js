window.onload = function () {
    const popup = document.getElementById("popupparque");
    
    popup.addEventListener('submit', async function (event) {
        event.preventDefault();
            let data = {
                nomeParque: document.getElementById("parque").value,
                lotacao: document.getElementById("lotacao").value,
                lixo: document.getElementById("lixo").value,
                tempo: document.getElementById("tempo").innerHTML,
            }
            fetch(`http://127.0.0.1:8080/criarParque`, {
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