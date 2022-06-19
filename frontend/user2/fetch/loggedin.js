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

    fetch(`http://127.0.0.1:8080/user/loggedin`,requestOptions)
    .then(response => {
        return response.json();
    })
    .then((result) => {
       if(result.login=="false"){

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
        <a href="singin.html" class="btn_12" >ENTRAR</a> `

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
        <a href="singin.html" class="btn_12">Sair</a> `

            //logout();

        }
    })
//}
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