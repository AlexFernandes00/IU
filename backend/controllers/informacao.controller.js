const req = require('request');
const querystring = require('querystring');
const request = require('request');
const connect = require ('../config/connectMySQL');
var moment = require("moment");

const { con } = require('../config/connectMySQL');


function criarInformacao (req, callback){
    console.log(req.body);
    const lotacao = req.body.lotacao;
    const quantidadeLixo = req.body.quantidadeLixo;
    const data = moment().format('YYYY-MM-DD hh:mm:ss');
    const tempo = req.body.tempo;
    const idParque = req.body.idParque;

    const post = {lotacao: lotacao, quantidadeLixo: quantidadeLixo, data: data, tempo: tempo, idParque: idParque};
    const query = connect.con.query('INSERT INTO Informacao SET ?', post, function(err, rows, fields) {
    console.log(query.sql);
    });
        callback({
            'statusCode': 200,
            'body': ("Informacao adicionada com sucesso")
        })
    
    

    }
    
    function listarInformacoes(req, res){
        /*const idInformacao = req.body.idParque;
        const nome = req.body.nome;
        const descricao = req.body.descricao;
        const imagem = req.body.imagem;
        const localizacao = req.body.localizacao;
        const longitude = req.body.longitude;
        const latitude = req.body.latitude;
        const capacidade = req.body.capacidade;
        const mapa = req.body.mapa;*/
    
    
        const get = [];
        const query = connect.con.query('SELECT * FROM Informacao', get, function(error, results, fields) {
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


/*function listarAtividades(req, res){
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
            
};*/



module.exports = {
    criarInformacao: criarInformacao,
    listarInformacoes: listarInformacoes,
}