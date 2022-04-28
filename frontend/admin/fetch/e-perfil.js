const nomePerfil = document.getElementById("nomePerfil");
const nomeEsquerdo = document.getElementById("nomeEsquerdo");
const moradaEsquerdo = document.getElementById("moradaEsquerdo");
const imagem = document.getElementById("imagem");
const imaagemEsquerda = document.getElementById("imagemEsq");

var myHeaders = new Headers();

myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  mode : 'cors',
  method: 'GET',
  headers: myHeaders,
  credentials : 'include'
};

fetch(`https://easymarket-backend.beagoddess.repl.co/delivery/perfil`,requestOptions)
.then(response => {
    return response.json();
})
.then((result) => {
    if(result.login){

        window.location.href = 'https://easymarketisi.web.app/';

    }else{

        nomePerfil.innerHTML=result.utilizador.nome+" "+result.utilizador.apelido;
        nomeEsquerdo.innerHTML=result.utilizador.nome+" "+result.utilizador.apelido;
        moradaEsquerdo.innerHTML= "Entregador Easy Market"

        if(result.utilizador.nome=="Rafael"){

            imagem.src = '/admin/assets/images/faces/face1.jpg'
            imaagemEsquerda.src = '/admin/assets/images/faces/face1.jpg'

        }
        
    }
});


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
    
}

logout();