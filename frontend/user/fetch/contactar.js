window.onload = function() {
  isLoggedIn();
  
    const contactForm = document.getElementById("contactForm")
    contactForm.addEventListener("submit", async function() {
        console.log("000test")
    const name = document.getElementById("nameC").value
    const email = document.getElementById("emailC").value
    //const subject = document.getElementById("subjectC").value
    const message = document.getElementById("messageC").value
    const text = `emailC=${email}&nameC=${name}&messageC=${message}`;
    console.log(text);
    const response = await fetch(`https://easymarket-backend.beagoddess.repl.co/mail`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },          
      method: "POST",
      body: text
    })
    const result = await response.json()
    if(result.value.success) { 
        swal('Envio de mensagem', result.value.message.pt, 'success' )
    } else { 
        swal('Erro', result.value.message.pt , 'error')}
    } ); 
      
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
                <a id="logout" href="contact.html"> Sair</a>
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