
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

    fetch(`https://easymarket-backend.beagoddess.repl.co/admin/perfil`,requestOptions)
    .then(response => {
        return response.json();
    })
    .then((result) => {
        if(result.login){

            window.location.href = 'https://easymarketisi.web.app/';

        }else{

            nomePerfil.innerHTML=result.utilizador.nome;
            nomeEsquerdo.innerHTML=result.utilizador.nome;
            moradaEsquerdo.innerHTML=result.utilizador.morada;
            console.log(result.utilizador.nome);
            if(result.utilizador.nome=="Mercado Ló"){
                //console.log("ola")
                imagem.src = '../../../user/img/blog/sidebar/sr-1.png'
                imaagemEsquerda.src = '../../../user/img/blog/sidebar/sr-1.png'

            }
            if(result.utilizador.nome=="Mini-Mercado Coutinho"){
                //console.log("ola")
                imagem.src = '../../../user/img/blog/sidebar/sr-2.jpg'
                imaagemEsquerda.src = '../../../user/img/blog/sidebar/sr-2.jpg'

            }
            
        }
    });
