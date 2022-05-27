const req = require('request');
const querystring = require('querystring');
const request = require('request');
const connect = require ('../config/connectMySQL');

const controllerUtilizador = require('./utilizador.controller.js');
const { con } = require('../config/connectMySQL');
const utilizadorController = require('./utilizador.controller.js');

function criarParque (req, callback){
    console.log(req.body);
    const nome = req.body.nome;
    const descricao = req.body.descricao;
    const imagem = req.body.imagem;
    const localizacao = req.body.localizacao;
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;
    const capacidade = req.body.capacidade;
    const mapa = req.body.mapa;

    const post = { nome: nome, descricao: descricao, imagem: imagem, localizacao: localizacao, longitude: longitude, latitude: latitude, capacidade: capacidade, mapa: mapa};
    const query = connect.con.query('INSERT INTO parque SET ?', post, function(err, rows, fields) {
    console.log(query.sql);
    });
        callback({
            'statusCode': 200,
            'body': ("Parque registado com sucesso")
        })
    
    

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
        });
            res({
                'statusCode': 200,
                'body': ("Parques listados com sucesso")
            }) 
}


module.exports = {
    criarParque: criarParque,
    editarParque: editarParque,
    apagarParque: apagarParque,
    adicionarParqueEstacionamentoParque: adicionarParqueEstacionamentoParque,
    listarparques: listarparques
   
}