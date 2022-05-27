window.onload = function () {
    const formParque = document.getElementById("registoAtivi");
    
    formParque.addEventListener('submit', async function (event) {
        event.preventDefault();
            let data = {
                nome: document.getElementById("nomeat").value,
                descricao: document.getElementById("descricao").value,
                dataInicio: document.getElementById("dataIn").value,
                datafim: document.getElementById("dataF").value,
                idParque: document.getElementById("parque").value,
            }
            fetch(`http://127.0.0.1:8080/criarAtividade`, {
                headers: {
                    "Content-Type": "application/json"
                },
                mode: 'cors',
                method: 'POST',
                body: JSON.stringify(data)
            }).then(response => {
                return response.json();
            }).then((result) => {
                window.location.href = 'a-listaatividades.html';

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