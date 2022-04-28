function readImage() {
    if (this.files && this.files[0]) {
        var file = new FileReader();
        file.onload = function (e) {
            document.getElementById("imgNovoProd").src = e.target.result;
        };
        file.readAsDataURL(this.files[0]);
    }
}


window.onload = () => {

    logout()

    const formRegistoProduto = document.getElementById("registoProduto");

    formRegistoProduto.addEventListener('submit', async function (event) {
        event.preventDefault();


        if(parseInt(document.getElementById("qtdNovoProd").value)>(parseInt(document.getElementById("qtdRef").value))){

            Swal.fire({
                icon: 'error',
                title: 'Erro nos campos',
                text: "Tente novamente."
            })

        } else {

        // Adicionar Foto ao Google Drive ----------------------
        const fileInput = document.querySelector('#imgNovoProd');
        var formData = new FormData();

        formData.append('file', fileInput.files[0]);


        var requestOptions = {
            mode: 'cors',
            method: 'POST',
            body: formData
        };

        // /upload é para guardar a foto no google drive, retorna com o id da foto e depois fazemos o fetch de adicionar o produto

        fetch(`https://easymarket-backend.beagoddess.repl.co/upload`, requestOptions)
            .then(response => {
                return response.json();
            })
            .then((result) => {

                if (result.statusCode == 200 ) {
                    const idFoto = result.body;

                    let data = {
                        designacao: document.getElementById("desigNovoProd").value,
                        categoria: document.getElementById("categgNovoProd").value,
                        baseuni: document.getElementById("marcaNovoProd").value,
                        quantidade: document.getElementById("qtdNovoProd").value,
                        quantidadeMax: document.getElementById("qtdRef").value,
                        //imagem: document.getElementById("imgNovoProd").addEventListener("change", readImage, false),
                        preco: document.getElementById("precoNovoProd").value,
                        idFoto: idFoto
                    }


                    console.log(data);
                    
                    fetch(`https://easymarket-backend.beagoddess.repl.co/registo/produto`,
                        {
                            mode: 'cors',
                            method: 'POST',
                            headers: {
                                'Content-Type': "application/json",
                                "Accept": "application/json"
                            },
                            body: JSON.stringify(data),
                            credentials: 'include'

                        }).then(response => {
                            return response.json();
                        }).then((result) => {
                            console.log(result)
                            if (result.body == "Produto criado com sucesso") {
                                window.location.reload();
                            } else {
                                swal.fire({
                                    icon: 'error',
                                    title: result.body.message,
                                    text: "Relativamente aos campos: " + result.params
                                })
                            }
                        })
                } else {

                }
            })

        }
    });


    const nomePerfil = document.getElementById("nomePerfil");
    const nomeEsquerdo = document.getElementById("nomeEsquerdo");
    const moradaEsquerdo = document.getElementById("moradaEsquerdo");
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        mode: 'cors',
        method: 'GET',
        headers: myHeaders,
        credentials: 'include'
    };

    fetch(`https://easymarket-backend.beagoddess.repl.co/admin/perfil`, requestOptions)
        .then(response => {
            return response.json();
        })
        .then((result) => {
            if (result.login) {
                window.location.href = 'https://easymarketisi.web.app/';

            } else {
                nomePerfil.innerHTML = result.utilizador.nome;
                nomeEsquerdo.innerHTML = result.utilizador.nome;
                moradaEsquerdo.innerHTML = result.utilizador.morada;
            }
        });


}

function logout() {
    const logout = document.getElementById("logout");

    logout.addEventListener("click", async function (event) {
        event.preventDefault();
        var myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            mode: 'cors',
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        };

        fetch(`https://easymarket-backend.beagoddess.repl.co/logout`, requestOptions)
            .then(response => {
                return response.json();
            })
            .then((result) => {

                if (result.login == "off") {
                    window.location.href = logout.href;
                }
            })

    });

};