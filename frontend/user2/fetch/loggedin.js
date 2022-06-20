window.onload = function() {
    //isLoggedIn();


//function isLoggedIn(){
    const header = document.getElementById("navbarSupportedContent");

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    
    var requestOptions = {
      mode : 'cors',
      method: 'GET',
      headers: myHeaders,
      credentials : 'include'
    };

    
       if(getCookie("isLoggedIn")==""){

            header.innerHTML = `<ul class="navbar-nav">
            <li class="nav-item" class="active">
                <a class="nav-link" href="home.html">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="parques.html">Parques</a>
            </li>

            <li class="nav-item">
                <a class="nav-link" href="atividades.html">Atividades</a>
            </li>
            <!-- <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="blog.html" id="navbarDropdown_1"
                    role="button" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
                    Atividades
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown_1">
                    <a class="dropdown-item" href="riosmaisreq.html">Parque Jardim da Estrela</a>
                    <a class="dropdown-item" href="riosmaiordif.html">Parque Eduardo VII</a>
                    <a class="dropdown-item" href="riosmenordif.html">Parque Florestal de Monsanto</a>
                    <a class="dropdown-item" href="riosmenordif.html">Parque da Bela Vista</a>
                </div>
            </li> -->
            <li class="nav-item">
                <a class="nav-link" href="forum.html">Fórum</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="contact.html">Contacto</a>
            </li>
        </ul>
        <a href="singin.html" class="btn_12">ENTRAR</a> `

        } else {
            header.innerHTML =`<ul class="navbar-nav">
            <li class="nav-item" class="active">
                <a class="nav-link" href="home.html">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="parques.html">Parques</a>
            </li>

            <li class="nav-item">
                <a class="nav-link" href="atividades.html">Atividades</a>
            </li>
            <!-- <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="blog.html" id="navbarDropdown_1"
                    role="button" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
                    Atividades
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown_1">
                    <a class="dropdown-item" href="riosmaisreq.html">Parque Jardim da Estrela</a>
                    <a class="dropdown-item" href="riosmaiordif.html">Parque Eduardo VII</a>
                    <a class="dropdown-item" href="riosmenordif.html">Parque Florestal de Monsanto</a>
                    <a class="dropdown-item" href="riosmenordif.html">Parque da Bela Vista</a>
                </div>
            </li> -->
            <li class="nav-item">
                <a class="nav-link" href="forum.html">Fórum</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="contact.html">Contacto</a>
            </li>
        </ul>
        <a href="singin.html" class="btn_12" id="btnSair">Sair</a> `

            //logout();

        }
        const botao = document.getElementById("btnSair");

  botao.addEventListener('click', async function (event) {
    event.preventDefault();
    logout();
    window.location.href = './singin.html'
  })
    }

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}


function logout(){
    delete_cookie("isLoggedIn")
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  

  function delete_cookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
/*function logout(){
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
    
};*/