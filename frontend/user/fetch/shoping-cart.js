window.onload = function() {
    isLoggedIn();

}

function isLoggedIn(){
    let login = ""
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
            login="false"
            header.innerHTML = `<div class="header__top__right__language">
                <div>Português</div>
                </div>
                <div class="header__top__right__auth">
                <a href="login.html"> Entrar</a>
                </div>`

            

        } else {
            login="true"
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
                <div class="header__top__right__auth" > 
                <a id="logout" href="shoping-cart.html"> Sair</a>
                </div>`

            logout();
            
            

        }

        btnContinuar(login);
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

function btnContinuar(login){
    const btnCont = document.getElementById("continuar")

    // Autenticar gestor de espaço na área privada
    btnCont.addEventListener("click", async function (event) {
        event.preventDefault();
        if(login == "true"){
           
                /* checkout = document.getElementByName("continuarA"); */
                if(document.cookie.length===0){
                  /* document.getElementByName('continuarA').style.display = 'none' ; */
                  btnCont.display = "none";

                  Swal.fire({
                    //text: "Para finalizar a sua compra é necessário efetuar login!",
                    html:
                    `<style>
                    a:link {
                      color: green;
                      background-color: transparent;
                      text-decoration: none;
                    }
                    
                    a:visited {
                      color: green;
                      background-color: transparent;
                      text-decoration: none;
                    }
                    
                    a:hover {
                      color: green;
                      background-color: transparent;
                    }
                    
                    a:active {
                      color: #54823A;
                      background-color: transparent;
                      
                    }
                    </style>` +
                    'O seu Carrinho encontra-se vazio! <br>'  +
                    '<a href="produtos.html">Ver Produtos </a> ', 
                   
                    icon: "error",
                    showConfirmButton: false,
                    width: "25rem"
                })


                } else{
                 /*  document.getElementByName('continuarA').style.display = 'block'; */
                 btnCont.display = "inline";
                    window.location =  btnCont.href;
                 
                }
            

        } else {
            Swal.fire({
                //text: "Para finalizar a sua compra é necessário efetuar login!",
                html:
                `<style>
                a:link {
                  color: green;
                  background-color: transparent;
                  text-decoration: none;
                }
                
                a:visited {
                  color: green;
                  background-color: transparent;
                  text-decoration: none;
                }
                
                a:hover {
                  color: green;
                  background-color: transparent;
                }
                
                a:active {
                  color: #54823A;
                  background-color: transparent;
                  
                }
                </style>` +
                'Para finalizar a sua compra é necessário efetuar <br>'  +
                '<a href="login.html">Login</a> ', 
                //text: "Se pretende fazer checkout é necessário que esteja logado. Porfavor, faça login.",
                icon: "error",
                showConfirmButton: false,
                width: "25rem"
            })
        }
    })
    
}