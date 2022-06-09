window.onload = function () {
    const formParque = document.getElementById("registoParque");
    
    formParque.addEventListener('submit', async function (event) {
        event.preventDefault();
        console.log("ola")
            let data = {
                nome: document.getElementById("nomeParque").value,
                descricao: document.getElementById("descrParque").value,
                //imagem: document.getElementById("imgNovoProd").value,
                imagem: document.getElementById("imgTest").innerHTML,
                localizacao: document.getElementById("locParque").value,
                longitude: document.getElementById("longitude").value,
                latitude: document.getElementById("latitude").value,
                capacidade: document.getElementById("capacidade").value,
                //mapa: document.getElementById("mapaParque").value,
                mapa: document.getElementById("imgMap").innerHTML,
            }
            console.log(data.mapa)
            console.log(data)
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
                console.log("dsdsdsf"+result)
                if (result.status==200){
                    window.location.href = 'a-listaparques.html';
                }else{
                    alert("Ocorreu um erro. Exprimente colocar uma imagem mais pequena");
                }

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