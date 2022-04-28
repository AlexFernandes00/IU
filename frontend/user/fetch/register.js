window.onload = function () {
    const formRegisto = document.getElementById("registoForm");

    formRegisto.addEventListener('submit', async function (event) {
        event.preventDefault();

        if (document.getElementById("confirmpass").value != document.getElementById("pass").value) {

            swal.fire({
                icon: 'error',
                title: 'As passwords não se coincidem!'
            })

        } else {

            let data = {
                email: document.getElementById("email").value,
                password: document.getElementById("pass").value,
                nome: document.getElementById("nome").value,
                apelido: document.getElementById("apelido").value,
                nif: document.getElementById("nif").value,
                telefone: document.getElementById("telefone").value,
                dataNascimento: document.getElementById("datanascimento").value,
                morada: document.getElementById("morada").value
            }


            fetch(`https://easymarket-backend.beagoddess.repl.co/register`, {

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

                if (result.body.message == "Criado com sucesso") {

                    swal({
                        title: 'Registo com sucesso!',
                        type: 'success',
                        showCancelButton: false,
                        showConfirmButton: false,
                        showLoaderOnConfirm: false,
                        timer: 2000
                    }).then(result => {
                        window.location.reload();
                    })

                } else {

                    if (result.body.error == "Email em uso") {

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

                    }
                }
            })
        }

    });

}