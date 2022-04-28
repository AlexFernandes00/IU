window.onload = function() {
    isLoggedIn();
}

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
            let link = "";
            if(document.title=="Sobre nós"){
                link = "promocao.html";
            }else{
                if(document.title=="Loja"){
                    link = "maps.html";
                }else{
    
                    link = "index.html"
                }
            }
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
                <a id="logout" href="${link}"> Sair</a>
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