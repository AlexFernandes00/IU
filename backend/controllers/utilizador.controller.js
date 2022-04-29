const req = require('request');
const querystring = require('querystring');
const request = require('request');
const connect = require ('../config/connectMySQL');

function registo (req, callback){
    console.log(req.body);
    const nome = req.body.nome;

    const post = { nome: nome};
    const query = connect.con.query('INSERT INTO utilizadores SET ?', post, function(err, rows, fields) {
    console.log(query.sql);
    });
        callback({
            'statusCode': 200,
            'body': ("Registo feito com sucesso")
        })
}



module.exports = {
    registo: registo
   
}