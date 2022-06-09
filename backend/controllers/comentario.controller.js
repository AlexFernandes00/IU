const req = require('request');
const querystring = require('querystring');
const request = require('request');
const connect = require ('../config/connectMySQL');

const controllerUtilizador = require('./utilizador.controller.js');
const { con } = require('../config/connectMySQL');
const utilizadorController = require('./utilizador.controller.js');

function criarComentario (req, callback){
    console.log(req.body);
    const conteudo = req.body.conteudo;

    let date_ob = new Date();

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

        console.log(idUtilizador)
        console.log(data)
        
        const idPost = 1;

        const post = { conteudo: conteudo, data: data, idPost: idPost, idUtilizador: idUtilizador};
        const query = connect.con.query('INSERT INTO comentario SET ?', post, function(err, rows, fields) {
        console.log(query.sql);
        });
            callback({
                'statusCode': 200,
                'body': ("Comentario feito com sucesso")
            })

    })
    }


function editarcomentario (req, callback) {
    const idComentario = req.body.idComentario;
    const conteudo = req.body.conteudo;
    const data = req.body.data;
    const idUtilizador = req.body.idUtilizador;
    const idPost = req.body.idPost;

    utilizadorController.getId(req, (res)=> {
        const idCriador = res.body.idUtilizador;
        if(idCriador==idUtilizador){
            if (idComentario != "NULL" && typeof (idComentario) != 'undefined') {
                const put = [conteudo, idComentario]
                const query = connect.con.query('UPDATE comentario SET conteudo = ? WHERE idComentario = ? ', put, function(err, rows, fields) {
                    console.log(query.sql);
                    });
                        callback({
                            'statusCode': 200,
                            'body': ("Comentário editada com sucesso")
                        })
                }
        }else{
            callback({
                'statusCode': 403,
                'body': ("Não tem autorização para alterar o comentário")
            })
        }
    })
}

function apagarcomentario(req, callback) {
    const idComentario = req.body.idComentario;
    const idUtilizador = req.body.idUtilizador;
//temos que verificar se o id do Utilizador de quem quer apagar é igual a quem criou o post

    utilizadorController.getId(req, (res)=> {
        const idCriador = res.body.idUtilizador;
        console.log(idCriador);
        console.log(idUtilizador);
        if(idCriador==idUtilizador){
            if (idComentario != "NULL" && typeof (idComentario) != 'undefined') {
                const update = [idComentario];
                const query = connect.con.query('DELETE FROM comentario WHERE idComentario = ?', update, function(err, rows, fields) {
                    console.log(query.sql);
                    });
                callback({
                    'statusCode': 200,
                    'body': ("Comentario apagado com sucesso")
                })
            }
        }else{
            callback({
                'statusCode': 403,
                'body': ("Não tem autorização para eliminar o comentario")
            })
        }
    })
}

function listarComentarios(req, res){
    const idComentario = req.body.idComentario;
    const conteudo = req.body.conteudo;
    const data = req.body.data;
    const idUtilizador = req.body.idUtilizador;
    const idPost = req.body.idPost;


    const get = [conteudo, data, idUtilizador, idPost, idComentario];
    const query = connect.con.query('SELECT * FROM comentario', get, function(error, results, fields) {
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

function listarComentariosPorPost(req, res){
    const idComentario = req.body.idComentario;
    const conteudo = req.body.conteudo;
    const data = req.body.data;
    const idUtilizador = req.body.idUtilizador;
    const idPost = req.body.idPost;


    const get = [conteudo, data, idUtilizador, idPost, idComentario];
    const query = connect.con.query('SELECT * FROM comentario', get, function(error, results, fields) {
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
    criarComentario: criarComentario,
    editarcomentario:editarcomentario,
    apagarcomentario:apagarcomentario,
    listarComentarios:listarComentarios,
    listarComentariosPorPost:listarComentariosPorPost
   
}