const req = require('request');
const querystring = require('querystring');
const request = require('request');
const connect = require ('../config/connectMySQL');

const controllerUtilizador = require('./utilizador.controller.js');
const { con } = require('../config/connectMySQL');
const utilizadorController = require('./utilizador.controller.js');

function criarAtividade (req, callback){
    console.log(req.body);
    const nome = req.body.nome;
    const descricao = req.body.descricao;
    const dataInicio = req.body.dataInicio;
    const dataFim = req.body.dataFim;
    const idParque = req.body.idParque;

    const post = { nome: nome, descricao: descricao, dataInicio: dataInicio, dataFim: dataFim, idParque: idParque};
    const query = connect.con.query('INSERT INTO Atividade SET ?', post, function(err, rows, fields) {
    console.log(query.sql);
    });
        callback({
            'statusCode': 200,
            'body': ("Atividade adicionada com sucesso")
        })
    
    

    }

//update
function editarAtividade(req, callback) {
    const idAtividade = req.body.idAtividade;
    const nome = req.body.nome;
    const descricao = req.body.descricao;
    const dataInicio = req.body.dataInicio;
    const dataFim = req.body.dataFim;
    const idParque = req.body.idParque;


    if (idAtividade != "NULL" && typeof (idAtividade) != 'undefined') {
        const update = [nome, descricao, dataInicio, dataFim, idParque, idAtividade];
        const query = connect.con.query('UPDATE ParqueEstacionamento SET nome = ?, descricao = ?, dataInicio = ?, dataFim = ?, idParque = ? WHERE idAtividade=?', update, function(err, rows, fields) {
            console.log(query.sql);
            });
        callback({
            'statusCode': 200,
            'body': ("Atividade editado com sucesso")
        })
        
    }
};


function apagarAtividade(req, callback) {
    const idAtividade = req.body.idAtividade;


    if (idAtividade != "NULL" && typeof (idAtividade) != 'undefined') {
        const update = [idAtividade];
        const query = connect.con.query('DELETE FROM Atividade WHERE idAtividade = ?', update, function(err, rows, fields) {
            console.log(query.sql);
            });
        callback({
            'statusCode': 200,
            'body': ("Parque apagado com sucesso")
        })
        
    }
};


function listarAtividades(req, res){
    const idAtividade = req.body.idParqueEstacionamento;
    const nome = req.body.nome;
    const descricao = req.body.descricao;
    const dataInicio = req.body.dataInicio;
    const dataFim = req.body.dataFim;


    const get = [nome, descricao, dataInicio, dataFim, idAtividade];
    const query = connect.con.query('SELECT idAtividade, atividade.nome, atividade.descricao, dataInicio, dataFim, atividade.idParque, parque.imagem, parque.nome as nomeParque FROM atividade INNER JOIN parque ON atividade.idParque=parque.idParque;', get, function(error, results, fields) {
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
};



module.exports = {
    criarAtividade: criarAtividade,
    editarAtividade: editarAtividade,
    apagarAtividade: apagarAtividade,
    listarAtividades: listarAtividades,
}