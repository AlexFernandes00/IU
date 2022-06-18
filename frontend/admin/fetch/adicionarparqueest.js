window.onload = () => {
    const renderProducts = async () => {
        var myHeaders = new Headers();
    const formParque = document.getElementById("adicionaresta");
    const listaparques = document.getElementById("categgNovoProd");

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
        //console.log(parques)
        for (let i = 0; i < parques.length; i++) {
            let nome = parques[i].nome;
            let identificacaoParque = parques[i].idParque;
            console.log("Parques:" + parques[i])
            stringhtml += `<option id=${identificacaoParque}>${nome}</option>`
        }
        listaparques.innerHTML= stringhtml;

    formParque.addEventListener('submit', async function (event) {
        event.preventDefault();
        console.log("Cheguei até aqui")
            let data = {
                nome: document.getElementById("nomeest").value,
                lotacao: document.getElementById("lotacao").value,
                longitude: document.getElementById("longitude").value,
                latitude: document.getElementById("latitude").value,
                idParque: listaparques.options[listaparques.selectedIndex].id,
            }
            fetch(`http://127.0.0.1:8080/criarParqueEstacionamento`, {
                headers: {
                    "Content-Type": "application/json"
                },
                mode: 'cors',
                method: 'POST',
                body: JSON.stringify(data)
            }).then(response => {
                return response.json();
            }).then((result) => {
                window.location.href = 'a-listaestacionamentos.html';

/*
                if (result.body == "Registo feito com sucesso") {
console.log("ola")
                    swal({
                        title: 'Parque adicionado com sucesso!',
                        type: 'success',
                        showCancelButton: false,
                        showConfirmButton: false,
                        showLoaderOnConfirm: false,
                        timer: 2000
                    }).then(result => {
                        window.location.href = 'login.html';
                    })

                } else {

                    /*if (result.body.error == "Email em uso") {

                        swal.fire({
                            icon: 'error',
                            title: 'Email em uso!',
                            text: 'Tente com outro email, porfavor.'
                        })

                    } else {

                        if (result.body.error == "Nif em uso" ) {

                            swal.fire({
                                icon: 'error',
                                title: 'Nif em uso!',
                                text: 'Tente com outro nif, porfavor.'
                            })

                        }if ( result.body.error == "Nif invalido"){
                            swal.fire({
                                icon: 'error',
                                title: 'Nif invalido!',
                                text: 'Tente com outro nif, porfavor.'
                            })

                     } else {
                            swal.fire({
                                icon: 'error',
                                title: result.body.message,
                                text: "Relativamente aos campos: "+result.params
                            })
                        }

                    }*/
               /* }*/
            })
        

    });
    }
    renderProducts()
}