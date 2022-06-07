const req = require('request');
const querystring = require('querystring');
const request = require('request');
const connect = require ('../config/connectMySQL');
const fetch = require('node-fetch');
const FormData = require('form-data');
const Axios = require('axios').default;
const fs = require('fs');

const controllerUtilizador = require('./utilizador.controller.js');
const { con } = require('../config/connectMySQL');
const utilizadorController = require('./utilizador.controller.js');

function criarParque (req, callback){
    console.log(req.body);
    const nome = req.body.nome;
    const descricao = req.body.descricao;
    //const imagem = req.body.imagem;
    const localizacao = req.body.localizacao;
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;
    const capacidade = req.body.capacidade;
    //const mapa = req.body.mapa;
    //const imagem = "exemplo";
    let file = 'controllers/EIS-01.jpg';
    let b = fs.readFileSync(file, { encoding: 'base64' });

//<img src="data:image/jpeg;base64,
    const base64imagem = req.body.imagem;
    const base64mapa = req.body.mapa;
    
    base64imagem = "base64imagem".replace('<img src="data:image/jpeg;base64,','');
    base64mapa = "base64mapa".replace('<img src="data:image/jpeg;base64,','');
    
    var bodyData = new FormData();
    var bodyData2 = new FormData();
    bodyData.append('image', base64imagem);
    bodyData2.append('image', base64mapa);
    //console.log("bodyData. " + b)

    let data = {
        image: req.body.imagem,
    }



    //console.log("image: " + req.body.imagem)
    /*
    fetch(`https://api.imgbb.com/1/upload?expiration=600&key=8b6ee1c4b875473d85898d90a8209aac`, {
        

        headers: {
            "Content-Type": "application/json"
        },
        mode: 'cors',
        method: 'POST',
        body: {
            image: bodyData
          }

    }).then(response => {
        return response.json();
    }).then((result) => {
        console.log(result)
        imagem = result.data.url

        const post = { nome: nome, descricao: descricao, imagem: imagem, localizacao: localizacao, longitude: longitude, latitude: latitude, capacidade: capacidade, mapa: mapa};
    const query = connect.con.query('INSERT INTO parque SET ?', post, function(err, rows, fields) {
    console.log(query.sql);
    });
        callback({
            'statusCode': 200,
            'body': ("Parque registado com sucesso")
        })
    })*/

    /*Axios({
        method: 'post',
        url: 'https://api.imgbb.com/1/upload?expiration=600&key=8b6ee1c4b875473d85898d90a8209aac',
        headers: bodyData.getHeaders(),
        data: {
          image: bodyData
        }
      }).then((resolve) => {
        console.log(resolve.data);
      }).catch(error => console.log(error.response.data));*/
    
      Axios.post('https://api.imgbb.com/1/upload?expiration=600&key=8b6ee1c4b875473d85898d90a8209aac', bodyData, {
        headers: bodyData.getHeaders(),
      }).then(result => {
        // Handle result…
        console.log("resultado " + result.data.data.url);
        const imagem = result.data.data.url;

        Axios.post('https://api.imgbb.com/1/upload?expiration=600&key=8b6ee1c4b875473d85898d90a8209aac', bodyData2, {
            headers: bodyData2.getHeaders(),
        }).then(result => {
            // Handle result…
            console.log("resultado " + result.data.data.url);
            const mapa = result.data.data.url;
            const post = { nome: nome, descricao: descricao, imagem: imagem, localizacao: localizacao, longitude: longitude, latitude: latitude, capacidade: capacidade, mapa: mapa};
            const query = connect.con.query('INSERT INTO parque SET ?', post, function(err, rows, fields) {
            console.log(query.sql);
            });
                callback({
                    'statusCode': 200,
                    'body': ("Parque registado com sucesso")
                })
        });
      });
    

    }

//update
function editarParque(req, callback) {
    const idParque = req.body.idParque;
    const nome = req.body.nome;
    const descricao = req.body.descricao;
    const imagem = req.body.imagem;
    const localizacao = req.body.localizacao;
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;
    const capacidade = req.body.capacidade;
    const mapa = req.body.mapa;


    if (idParque != "NULL" && typeof (idParque) != 'undefined') {
        const update = [nome, descricao, imagem, localizacao, longitude, latitude, capacidade, mapa, idParque];
        const query = connect.con.query('UPDATE parque SET nome = ?, descricao = ?, imagem = ?, localizacao = ?, longitude = ?, latitude = ?, capacidade = ?, mapa = ? WHERE idParque=?', update, function(err, rows, fields) {
            console.log(query.sql);
            });
        callback({
            'statusCode': 200,
            'body': ("Parque editado com sucesso")
        })
        
    }
};


function apagarParque(req, callback) {
    const idParque = req.body.idParque;


    if (idParque != "NULL" && typeof (idParque) != 'undefined') {
        const update = [idParque];
        const query = connect.con.query('DELETE FROM parque  WHERE idParque=?', update, function(err, rows, fields) {
            console.log(query.sql);
            });
        callback({
            'statusCode': 200,
            'body': ("Parque editado com sucesso")
        })
        
    }
};


function adicionarParqueEstacionamentoParque (req, callback){
    console.log(req.body);
    const idParque = req.body.idParque;
    const idParqueEstacionamento = req.body.idParqueEstacionamento;

    const post = { idParque: idParque, idParqueEstacionamento: idParqueEstacionamento};
    const query = connect.con.query('INSERT INTO ParqueEstacionamentoParque SET ?', post, function(err, rows, fields) {
    console.log(query.sql);
    });
        callback({
            'statusCode': 200,
            'body': ("Parque de estacionamento adicionado com sucesso")
        })
    
    

    }

function listarparques(req, res){
    const idParque = req.body.idParque;
    const nome = req.body.nome;
    const descricao = req.body.descricao;
    const imagem = req.body.imagem;
    const localizacao = req.body.localizacao;
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;
    const capacidade = req.body.capacidade;
    const mapa = req.body.mapa;


    const get = [nome, descricao, imagem, localizacao, longitude, latitude, capacidade, mapa, idParque];
    const query = connect.con.query('SELECT * FROM parque', get, function(error, results, fields) {
        console.log(results)
        res({
            'statusCode': 200,
            'body': (results)
        }) 
        });
            /*res({
                'statusCode': 200,
                'body': (results)
            }) */
}


module.exports = {
    criarParque: criarParque,
    editarParque: editarParque,
    apagarParque: apagarParque,
    adicionarParqueEstacionamentoParque: adicionarParqueEstacionamentoParque,
    listarparques: listarparques
   
}