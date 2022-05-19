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
function editarParqueEstacionamento(req, callback) {
    const idParqueEstacionamento = req.body.idParqueEstacionamento;
    const nome = req.body.nome;
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;
    const lotacao = req.body.lotacao;


    if (idParqueEstacionamento != "NULL" && typeof (idParqueEstacionamento) != 'undefined') {
        const update = [nome, longitude, latitude, lotacao, idParqueEstacionamento];
        const query = connect.con.query('UPDATE ParqueEstacionamento SET nome = ?, longitude = ?, latitude = ?, lotacao = ? WHERE idParqueEstacionamento=?', update, function(err, rows, fields) {
            console.log(query.sql);
            });
        callback({
            'statusCode': 200,
            'body': ("Parque editado com sucesso")
        })
        
    }
};


function apagarParqueEstacionamento(req, callback) {
    const idParqueEstacionamento = req.body.idParqueEstacionamento;


    if (idParqueEstacionamento != "NULL" && typeof (idParqueEstacionamento) != 'undefined') {
        const update = [idParqueEstacionamento];
        const query = connect.con.query('DELETE FROM ParqueEstacionamento WHERE idParqueEstacionamento=?', update, function(err, rows, fields) {
            console.log(query.sql);
            });
        callback({
            'statusCode': 200,
            'body': ("Parque apagado com sucesso")
        })
        
    }
};



module.exports = {
    criarAtividade: criarAtividade,
    editarParqueEstacionamento: editarParqueEstacionamento,
    apagarParqueEstacionamento: apagarParqueEstacionamento,
}