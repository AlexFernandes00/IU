window.onload = () => {
    isLoggedIn();
    
    
    const nome = document.getElementById("nome");
    const apelido = document.getElementById("apelido");
    const email = document.getElementById("email");
    const nif = document.getElementById("nif");
    const telefone = document.getElementById("telefone");
    const morada = document.getElementById("morada");
    const password = document.getElementById("password");
    const data_nascimento = document.getElementById("nascimento");

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        mode: 'cors',
        method: 'GET',
        headers: myHeaders,
        credentials: 'include'
    };

    fetch(`https://easymarket-backend.beagoddess.repl.co/user/perfil`, requestOptions)
        .then(response => {
            return response.json();
        })
        .then((result) => {
            if(result.login){
                window.location.href = 'https://easymarketisi.web.app/';
            }else{
                nome.value = result.utilizador.nome;
                apelido.value = result.utilizador.apelido;
                email.value = result.utilizador.email;
                
                if(result.utilizador.nif=="" || result.utilizador.nif==null){
                    nif.value = result.utilizador.nif;
                    nif.readOnly = false;
                }else{
                    nif.value = result.utilizador.nif;
                    nif.readOnly = true;
                }
    
                if(result.utilizador.dataNascimento=="" || result.utilizador.dataNascimento==null ){
                    data_nascimento.value = result.utilizador.dataNascimento;
                    data_nascimento.readOnly = false;
                }else{
                    data_nascimento.value = result.utilizador.dataNascimento;
                    data_nascimento.readOnly = true;
                }
                
                telefone.value = result.utilizador.telefone;
                morada.value = result.utilizador.morada;
            }

            
        });

    const formEditar = document.getElementById("editar");

    formEditar.addEventListener('submit', async function (event) {

        event.preventDefault();

        let data = {
            nome: nome.value,
            email: email.value,
            apelido: apelido.value,
            telefone: telefone.value,
            nif: nif.value,
            morada: morada.value,
            data_nascimento: data_nascimento.value
            //password:password.value
        }

        console.log(data)

        var myHeaders1 = new Headers();

        myHeaders1.append("Content-Type", "application/json");

        var requestOptions = {
            mode: 'cors',
            method: 'PUT',
            headers: myHeaders1,
            credentials: 'include',
            body: JSON.stringify(data),
        };

        fetch(`https://easymarket-backend.beagoddess.repl.co/user/editar`, requestOptions)
            .then(response => {
                return response.json();
            })
            .then((result) => {

                if (result.body.message == "Alterado.") {

                    swal({
                        title: 'Alterado com sucesso!',
                        type: 'success',
                        showCancelButton: false,
                        showConfirmButton: false,
                        showLoaderOnConfirm: false,
                        timer: 2000
                    }).then(result => {
                        window.location.reload();
                    })
                }

            });
    })

    const formEditarPasword = document.getElementById("pass");

    formEditarPasword.addEventListener('submit', async function (event) {

        event.preventDefault(); 
        const passwordold = document.getElementById('passantiga');
        const passwordnew = document.getElementById('novapass');
        const rpasswordnew = document.getElementById('rnovapass');

        let data = {
            passwordold:passwordold.value,
            passwordnew:passwordnew.value
        }

        console.log(data);

        if (passwordnew.value != rpasswordnew.value) {

            swal.fire({
                icon: 'error',
                title: 'As passwords novas não se coincidem!'
            })

        } else {
            var myHeaders1 = new Headers();

        myHeaders1.append("Content-Type", "application/json");

        var requestOptions = {
            mode: 'cors',
            method: 'PUT',
            headers: myHeaders1,
            credentials: 'include',
            body: JSON.stringify(data),
        };

        fetch(`https://easymarket-backend.beagoddess.repl.co/user/editar/password`, requestOptions)
            .then(response => {
                return response.json();
            })
            .then((result) => {

                if (result.body.message == "Password alterada com sucesso.") {

                    swal({
                        title: 'Password alterado com sucesso!',
                        type: 'success',
                        showCancelButton: false,
                        showConfirmButton: false,
                        showLoaderOnConfirm: false,
                        timer: 2000
                    }).then(result => {
                        window.location.reload();
                    })
                } else {
                    if(result.body.message == "Erro."){
                        swal.fire({
                            icon: 'error',
                            title: 'Ocorreu algum erro...',
                            text: 'Tente novamente ou mais tarde, porfavor.'
                        })
                    }else{
                        swal.fire({
                            icon: 'error',
                            title: result.body.message,
                            text: 'Tente novamente, porfavor.'
                        })
                    }

                }

            });
        }
    })
};

function isLoggedIn(){
    const header = document.getElementById("header");

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    
    var requestOptions = {
      mode : 'cors',
      method: 'GET',
      headers: myHeaders,
      credentials : 'include'
    };

    fetch(`https://easymarket-backend.beagoddess.repl.co/user/loggedin`,requestOptions)
    .then(response => {
        return response.json();
    })
    .then((result) => {
        if(result.login=="false"){

            header.innerHTML = `<div class="header__top__right__language">
                <div>Português</div>
                </div>
                <div class="header__top__right__auth">
                <a href="login.html"> Entrar</a>
                </div>`

        } else {

            header.innerHTML =`<div class="header__top__right__language">
                <!--<img src="img/language.png" alt="">-->
                <div>Português</div>
                </div>
                <div class="header__top__right__language">
                <div><i class="fa fa-user" style="color: rgb(17, 22, 20);"></i></div>
                <ul class="header__menu__dropdown">
                    <li><a href="perfil.html">Perfil</a></li>
                    <li><a href="encomendas.html">Encomendas</a></li>
                </ul>
            </div>
                <div  class="header__top__right__auth" > 
                <a id="logout" href="index.html"> Sair</a>
                </div>`

            logout();

        }
    })
}

function logout(){
    const logout = document.getElementById("logout");

    logout.addEventListener("click", async function (event) {
        event.preventDefault();
        var myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
        
        var requestOptions = {
          mode : 'cors',
          method: 'GET',
          headers: myHeaders,
          credentials : 'include'
        };

        fetch(`https://easymarket-backend.beagoddess.repl.co/logout`,requestOptions)
        .then(response => {
            return response.json();
        })
        .then((result) => {
            
            if(result.login=="off"){
                window.location.href = logout.href;
            }
        })

    });
    
};