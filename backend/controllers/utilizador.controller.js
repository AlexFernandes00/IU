const req = require('request');
const querystring = require('querystring');
const request = require('request');
const connect = require ('../config/connectMySQL');

function registo (req, callback){
    console.log(req.body);
    const nome = req.body.nome;
    const apelido = req.body.apelido;
    const email = req.body.email;
    const numeroTrabalhador = req.body.numeroTrabalhador;
    const nif = req.body.nif;
    const telefone =req.body.telefone;
    const dataNascimento = req.body.dataNascimento;
    const password = req.body.password;


    const post = { nome: nome, apelido: apelido, email: email, numeroTrabalhador: numeroTrabalhador, nif: nif, telefone: telefone, dataNascimento: dataNascimento, password: password};
    const query = connect.con.query('INSERT INTO utilizador SET ?', post, function(err, rows, fields) {
    console.log(query.sql);
    });
        callback({
            'statusCode': 200,
            'body': ("Registo feito com sucesso")
        })
}

function login(request, response) {
	let email = request.body.email;
	let password = request.body.password;
    
	if (email && password) {
		
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [email, password], function(error, results, fields) {
			
			if (error) throw error;
			// Se existe
			if (results.length > 0) {
				// Autenticar utilizador
				request.session.loggedin = true;
				request.session.email = email;
				// redireciona para pagina
				response.redirect('/index.html');
			} else {
				response.send('Email ou password incorretos!');
			}			
			response.end();
		});
	} else {
		response.send('Introduzir email e password');
		response.end();
	}
}



module.exports = {
    registo: registo
   
}