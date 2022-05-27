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

}

function apagarcomentario(req, callback) {

}




module.exports = {
    criarComentario: criarComentario,
    editarcomentario:editarcomentario,
    apagarcomentario:apagarcomentario
   
}