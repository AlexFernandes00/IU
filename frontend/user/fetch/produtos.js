window.onload = () => {
    isLoggedIn();

    const loader = document.querySelector("#loading");

    loader.classList.add("display");


    $("a").click(function() {
        $("a").removeClass("active");
        $(this).addClass("active");
     });
     
     $("b").click(function() {
        $("b").removeClass("active");
        $(this).addClass("active");
     });

    var rangeSlider = $(".price-range"),
        minamount = $("#minamount"),
        maxamount = $("#maxamount"),
        minPrice = rangeSlider.data('min'),
        maxPrice = rangeSlider.data('max');

    rangeSlider.slider({
        range: true,
        min: minPrice,
        max: maxPrice,
        values: [minPrice, maxPrice],
        slide: function (event, ui) {
            minamount.val('€' + ui.values[0]);
            maxamount.val('€' + ui.values[1]);

            getProducts(ui.values[0], ui.values[1])

        }
    });
    minamount.val('€' + rangeSlider.slider("values", 0));
    maxamount.val('€' + rangeSlider.slider("values", 1));

    const renderProducts = async () => {
        const divProdutos = document.getElementById("produtos");


        //console.log(divProdutos)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            mode: 'cors',
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        };

        const response = await fetch(`https://easymarket-backend.beagoddess.repl.co/user/produto`, requestOptions)
        let products = await response.json();
        //console.log(products.body)
        let AProduto = products.produtos;

        let strHtml = ``
        let unidade = 0;

        console.log(AProduto)

        for (let i = 0; i < AProduto.length; i++) {
            unidade++;
            let mercado, ordenarMercado = ""

            if (AProduto[i].mercado == "LO") {
                mercado = "Mercado Ló"
                ordenarMercado = "mLo"
            } else {
                mercado = "Mercado Coutinho"
                ordenarMercado = "mCou"
            }
            let imagem = ""

            if (AProduto[i].image == "https://www.moloni.pt/_imagens/?macro=imgList_BO_s3&img=" || AProduto[i].image == null) {

                const idImagem = AProduto[i].idImage;
                const idImagem1 = idImagem.replace("<p>", "").replace(`<span style="font-family: Verdana;">`, "").replace(`</span>`, "").replace(`</p>`, "")
                imagem = "https://drive.google.com/uc?export=view&id=" + idImagem1

            } else {
                imagem = AProduto[i].image
            }

            let categoria = "";
            if(AProduto[i].categoria=="Biosaudavel") {categoria="Bio e Saudável"}
        else if(AProduto[i].categoria=="Higienebeleza") {categoria="Higiene e Beleza"}
        else {
          categoria=AProduto[i].categoria
        }

        baseUni =""
        if(AProduto[i].baseUni=="Litro"||AProduto[i].baseUni=="KG" ) {baseUni="KG"}
        else {baseUni="UN"}
        

            let categoria_nome = "";
            switch (AProduto[i].categoria) {
                case "Bio e Saudável":
                    categoria_nome = "biosaudavel";
                    break;
                case "Mercearia":
                    categoria_nome = "mercearia";
                    break;
                case "Frescos":
                    categoria_nome = "frescos";
                    break;
                case "Latícinios":
                    categoria_nome = "laticinios";
                    break;
                case "Congelados":
                    categoria_nome = "congelados";
                    break;
                case "Bebidas":
                    categoria_nome = "bebidas";
                    break;
                case "Limpeza":
                    categoria_nome = "limpeza";
                    break;
                case "Higiene e Beleza":
                    categoria_nome = "higienebeleza";
                    break;
                case "Animais":
                    categoria_nome = "animais";
                    break;
                case "Biosaudavel":
                    categoria_nome = "biosaudavel";
                    break;
                case "Mercearia":
                    categoria_nome = "mercearia";
                    break;
                case "Frescos":
                    categoria_nome = "frescos";
                    break;
                case "Laticinios":
                    categoria_nome = "laticinios";
                    break;
                case "Congelados":
                    categoria_nome = "congelados";
                    break;
                case "Bebidas":
                    categoria_nome = "bebidas";
                    break;
                case "Limpeza":
                    categoria_nome = "limpeza";
                    break;
                case "Higienebeleza":
                    categoria_nome = "higienebeleza";
                    break;
                case "Animais":
                    categoria_nome = "animais";
                    break;

            }
            if(parseInt(AProduto[i].qtd)!=0){
            strHtml += ` <div class="store-product ${categoria_nome}" check="true"  checkM="true" checkP="true">
    <div class="col-lg-4 col-md-6 col-sm-6" style=" padding-right: 55px">
        <div class="product__item ${ordenarMercado}" >
            <div class="product__item__pic set-bg" style="background-image: url(${imagem}); width: 210px;">
                <ul class="product__item__pic__hover">
                    <li><a href="#" onclick="setCookie()"><i class="fa fa-shopping-cart"></i></a></li>
                </ul>
            </div>
                 <div class="product__discount__item__text">
                    <h7>${mercado}</h7>
                    <span data-category="${categoria_nome}">${categoria}</span>
                    <h5>${AProduto[i].description}</h5>
                    <div class="product__item__price">€${AProduto[i].unitPrice}/${baseUni}</div>
                    <br>
                    <form id="carrinhoqtd" class="add-to-cart" action="cart.html" method="post">
                        <div>
                            <label for="qty-1">Quantidade</label>
                            <input type="hidden" name="${AProduto[i].referencia}" value="${AProduto[i].referencia}">
                            <input name="item-select" id="item-select" type="number" min="1" oninput="validity.valid||(value='');"
                            productid="${AProduto[i].description}" idref="${AProduto[i].referencia}" qtd="${AProduto[i].qtd}"  precoprod="${AProduto[i].unitPrice}" loja="${mercado}" style="width: 50px" onBlur="setItem(this)" required/>
                        </div>
                        
                    </form>
                </div>
        </div>
     </div>

</div>`
            } else{
                strHtml += ` <div class="store-product ${categoria_nome}" check="true"  checkM="true" checkP="true">
    <div class="col-lg-4 col-md-6 col-sm-6" style=" padding-right: 55px">
        <div class="product__item ${ordenarMercado}" >
            <div class="product__item__pic set-bg" style="background-image: url(${imagem}); width: 210px;">
                <ul class="product__item__pic__hover">
                    <li><a href="#" onclick="setCookie()"><i class="fa fa-shopping-cart"></i></a></li>
                </ul>
            </div>
                 <div class="product__discount__item__text">
                    <h7>${mercado}</h7>
                    <span data-category="${categoria_nome}">${categoria}</span>
                    <h5>${AProduto[i].description}</h5>
                    <div class="product__item__price">€${AProduto[i].unitPrice}/${baseUni}</div>
                    <br>
                    <form id="carrinhoqtd" class="add-to-cart" action="cart.html" method="post">
                        <div>
                            <label for="qty-1" style="color:red">Produto Indisponível</label>
                            <input type="hidden" name="${AProduto[i].referencia}" value="${AProduto[i].referencia}">
                             </div>
                        
                    </form>
                </div>
        </div>
     </div>

</div>`
            }
        }

        loader.style.display="none"

        divProdutos.innerHTML = strHtml
        const produtosTotal = document.getElementById("produtosTotal");
        produtosTotal.innerHTML = unidade;

        const btns = document.querySelectorAll('.btn');
        const storeProducts = document.querySelectorAll('.store-product');
        // const search = document.getElementById(search);

        for (i = 0; i < btns.length; i++) {

            btns[i].addEventListener('click', (e) => {
                e.preventDefault()
                unidade = 0;

                const filter = e.target.dataset.filter;
                //console.log(filter);


                storeProducts.forEach((product) => {
                    if (product.attributes[2].nodeValue == "true" && product.attributes[3].nodeValue == "true") {
                        if (filter === 'todos') {
                            unidade++
                            product.attributes[1].nodeValue = "true"
                            product.style.display = 'block'
                        } else {
                            if (product.classList.contains(filter)) {
                                unidade++
                                product.attributes[1].nodeValue = "true"

                                product.style.display = 'block'
                            } else {

                                product.attributes[1].nodeValue = "false"

                                product.style.display = 'none'
                            }
                        }
                    } else {
                        if (filter === 'todos') {
                            product.attributes[1].nodeValue = "true"
                        } else {
                            if (product.classList.contains(filter)) {
                                product.attributes[1].nodeValue = "true"

    
                            } else {

                                product.attributes[1].nodeValue = "false"

              
                            }
                        }
                    }
                });
                produtosTotal.innerHTML = unidade;
            });
        };

        filterProdutosZ();
        filterMercadoZ();
        filterEscrever();
    }

    renderProducts()

    function getProducts(priceMin, priceMax) {
        const produtosTotal = document.getElementById("produtosTotal");
        let unidade = 0;

        const storeProducts = document.querySelectorAll('.store-product');

        storeProducts.forEach((product) => {
            if (product.attributes[2].nodeValue == "true" && product.attributes[1].nodeValue == "true") {
                
                let preco = product.attributes[0].ownerElement.firstElementChild.lastElementChild.lastElementChild.childNodes[7].innerHTML;
                preco = preco.split("/")
                preco = preco[0].replace("€", "")
    

                if (parseFloat(preco) > parseFloat(priceMin) && parseFloat(preco) < parseFloat(priceMax)) {
                    unidade++
                    
                    product.attributes[3].nodeValue = "true"
                    product.attributes[0].ownerElement.style.display = "block"
                } else {
                    product.attributes[3].nodeValue = "false"
                    product.attributes[0].ownerElement.style.display = "none"
                }
            } else {
                let preco = product.attributes[0].ownerElement.firstElementChild.lastElementChild.lastElementChild.childNodes[7].innerHTML;
                preco = preco.split("/")
                preco = preco[0].replace("€", "")

                if (parseFloat(preco) > parseFloat(priceMin) && parseFloat(preco) < parseFloat(priceMax)) {                
                    product.attributes[3].nodeValue = "true"
                } else {
                    product.attributes[3].nodeValue = "false"
                }       
            }
            
        });

        produtosTotal.innerHTML = unidade;
    }
    const total = async () => {

        const tot = document.getElementById("tot")
        var soma = 0;
        let stringHtml1 =
            `
              <span>
                  `
        let cookieArray2 = document.cookie.split(';');
        for (let i = 0; i < cookieArray2.length; ++i) {
            let pairArray2 = cookieArray2[i].split('=');
            console.log(pairArray2)
            soma += parseFloat(pairArray2[3]);
        }
        if (cookieArray2 == "") {
            stringHtml1 += `
            <span>
                0,00 €
                 </span>`
        } else {
            stringHtml1 += `
            <span>
                ${soma.toFixed(2)} €
                 </span>`
        }
        tot.innerHTML = stringHtml1
    }

    const valor = async () => {

        const val = document.getElementById("valor")
        var somar = 0;
        let stringHtml5 = ""

        let cookieArray3 = document.cookie.split(';');
        for (let i = 0; i < cookieArray3.length; ++i) {
            let pairArray3 = cookieArray3[i].split('=');
            somar += parseInt(pairArray3[1]);
        }

        if (cookieArray3 == "") {
            stringHtml5 += "0"
        } else {
            stringHtml5 += somar
        }
        val.innerHTML = stringHtml5

        total()
    }

    valor()

    function filterMercadoZ() {
        const btnsM = document.querySelectorAll('.button');
        const mercadoX = document.querySelectorAll('.product__item');
        // const search = document.getElementById(search); 

        for (i = 0; i < btnsM.length; i++) {

            btnsM[i].addEventListener('click', (e) => {
                e.preventDefault()
                unidade = 0;
                const filterM = e.target.dataset.filter;
                //console.log(filterM);

                mercadoX.forEach((product) => {
                    if (product.parentElement.parentElement.attributes[1].nodeValue == "true" && product.parentElement.parentElement.attributes[3].nodeValue == "true") {
                        if (filterM === 'ambos') {


                            unidade++
                            product.parentElement.parentElement.style.display = 'block'
                            product.parentElement.parentElement.attributes[2].nodeValue = 'true'


                        } else {
                            if (product.classList.contains(filterM)) {
                                unidade++
                                product.parentElement.parentElement.style.display = 'block'
                                product.parentElement.parentElement.attributes[2].nodeValue = 'true'

                            } else {
                                product.parentElement.parentElement.style.display = 'none'
                                product.parentElement.parentElement.attributes[2].nodeValue = 'false'
                            }
                        }
                    } else {
                        if (filterM === 'ambos') {
                            product.parentElement.parentElement.attributes[2].nodeValue = 'true'


                        } else {
                            if (product.classList.contains(filterM)) {
                                product.parentElement.parentElement.attributes[2].nodeValue = 'true'

                            } else {
                                product.parentElement.parentElement.attributes[2].nodeValue = 'false'
                            }
                        }
                    }

                });
                produtosTotal.innerHTML = unidade;
            });
        };
    }


    function filterProdutosZ() {
        // SEARCH FILTER
        const search = document.getElementById("search");
        const productName = document.querySelectorAll(".product__discount__item__text h5");

        // A BETTER WAY TO FILTER THROUGH THE PRODUCTS
        search.addEventListener("keyup", filterProducts);

        function filterProducts(e) {
            const text = e.target.value.toLowerCase();
            //console.log(productName[0]);
            productName.forEach(function (product) {
                const item = product.firstChild.textContent;

                if (item.toLowerCase().indexOf(text) != -1) {

                    /*      console.log(item) */
                    product.parentElement.parentElement.parentElement.style.display = "block"
                } else {
                    product.parentElement.parentElement.parentElement.style.display = "none"
                }
            })
        }
    }

    /* function filterEscrever(){
        const search = document.getElementById("search");
        const mercadoName = document.querySelectorAll(".product__discount__item__text h7");
    
        search.addEventListener("keyup", filterMercados);
    
        function filterMercados(e) {
                const text = e.target.value.toLowerCase();
                //console.log(mercadoName[0]);
                mercadoName.forEach(function(product) {
                    const itemM = product.firstChild.textContent;
                    if (itemM.toLowerCase().indexOf(text) != -1) {
                        console.log(itemM)
                        product.parentElement.parentElement.style.display = "block"
                    } else {
                        product.parentElement.parentElement.style.display = "none"
                    }
                })
            }
        } */
}

function isLoggedIn() {
    const header = document.getElementById("header");

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        mode: 'cors',
        method: 'GET',
        headers: myHeaders,
        credentials: 'include'
    };

    fetch(`https://easymarket-backend.beagoddess.repl.co/user/loggedin`, requestOptions)
        .then(response => {
            return response.json();
        })
        .then((result) => {

            if (result.login == "false") {


                header.innerHTML = `<div class="header__top__right__language">
                <div>Português</div>
                </div>
                <div class="header__top__right__auth">
                <a href="login.html"> Entrar</a>
                </div>`

            } else {

                header.innerHTML = `<div class="header__top__right__language">
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
                <a id="logout" href="produtos.html"> Sair</a>
                </div>`

                logout()

            }
        })
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




