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


        const idParque = 1;

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

module.exports = {
    fazerpublicacao: fazerpublicacao
   
}