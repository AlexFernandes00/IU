const req = require('request');
const querystring = require('querystring');
const request = require('request');
const connect = require ('../config/connectMySQL');

const controllerUtilizador = require('./utilizador.controller.js');
const { con } = require('../config/connectMySQL');
const utilizadorController = require('./utilizador.controller.js');

function fazerpublicacao (req, callback) {
    const titulo = req.body.titulo;
    const conteudo = req.body.conteudo;
    let date_ob = new Date();
    const idParque = req.body.idParque;

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);
    
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    
    // current year
    let year = date_ob.getFullYear();

    const data = year + "-" + month + "-" + date;
    utilizadorController.getId(req, (res)=> {
        const idUtilizador = res.body.idUtilizador;


        const post = { titulo:titulo, conteudo:conteudo, data:data, idUtilizador:idUtilizador, idParque:idParque }
        const query = connect.con.query('INSERT INTO post SET ?', post, function(err, rows, fields) {
            console.log(query.sql);
            });
                callback({
                    'statusCode': 200,
                    'body': ("Publicação feito com sucesso")
                })
    
        })
}

function editarpublicacao (req, callback) {
    const idPost = req.body.idPost;
    const titulo = req.body.titulo;
    const conteudo = req.body.conteudo;
    const idUtilizador = req.body.idUtilizador;
    const idParque = req.body.idParque;

    utilizadorController.getId(req, (res)=> {
        const idCriador = res.body.idUtilizador;
        if(idCriador==idUtilizador){
            if (idPost != "NULL" && typeof (idPost) != 'undefined') {
            const put = [titulo, conteudo, idParque, idPost]
            const query = connect.con.query('UPDATE post SET titulo = ?, conteudo = ?, idParque = ? WHERE idPost = ? ', put, function(err, rows, fields) {
                console.log(query.sql);
                });
                    callback({
                        'statusCode': 200,
                        'body': ("Publicação editada com sucesso")
                    })
            }
        }else{
            callback({
                'statusCode': 403,
                'body': ("Não tem autorização para alterar a publicação")
            })
        }
    })
    
}


function apagarpublicacao (req, callback) {
    const idPost = req.body.idPost;
    const idUtilizador = req.body.idUtilizador;
//temos que verificar se o id do Utilizador de quem quer apagar é igual a quem criou o post

    utilizadorController.getId(req, (res)=> {
        const idCriador = res.body.idUtilizador;
        console.log(idCriador);
        console.log(idUtilizador);
        if(idCriador==idUtilizador){
            if (idPost != "NULL" && typeof (idPost) != 'undefined') {
                const update = [idPost];
                const query = connect.con.query('DELETE FROM post WHERE idPost = ?', update, function(err, rows, fields) {
                    console.log(query.sql);
                    });
                callback({
                    'statusCode': 200,
                    'body': ("Publicacao apagada com sucesso")
                })
            }
        }else{
            callback({
                'statusCode': 403,
                'body': ("Não tem autorização para eliminar a publicação")
            })
        }
    })
}

function listarPub(req, res){
    const idPost = req.body.idPost;
    const titulo = req.body.titulo;
    const conteudo = req.body.conteudo;
    const data = req.body.data;
    const idUtilizador = req.body.idUtilizador;
    const idParque = req.body.idParque;


    const get = [titulo, conteudo, data, idUtilizador, idPost, idParque];
    const query = connect.con.query('SELECT * FROM post', get, function(error, results, fields) {
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

//temos que mudar o idParque de estático

module.exports = {
    fazerpublicacao: fazerpublicacao,
    editarpublicacao:editarpublicacao,
    apagarpublicacao:apagarpublicacao,
    listarPub:listarPub
   
}