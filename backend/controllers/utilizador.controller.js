const req = require('request');
const querystring = require('querystring');
const request = require('request');
const connect = require ('../config/connectMySQL');

function registo (req, callback){
    console.log(req.body);
    const nome = req.body.nome;
    const apelido = req.body.apelido;
    const email = req.body.email;
    const numeroTrabalhador = 0;
    const nif = req.body.nif;
    const telefone =req.body.telefone;
    const dataNascimento = req.body.dataNascimento;
    const password = req.body.password;
	const idTipoUtilizador = 21;

    const post = { nome: nome, apelido: apelido, email: email, numeroTrabalhador: numeroTrabalhador, nif: nif, telefone: telefone, dataNascimento: dataNascimento, password: password, idTipoUtilizador: idTipoUtilizador};
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
		
		connect.con.query('SELECT * FROM utilizador WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
			
			if (error) throw error;
			// Se existe
			if (results.length > 0) {
				// Autenticar utilizador
				let idUtilizador = results.idUtilizador; 
				request.session.loggedin = true;
				request.session.email = email;
				// redireciona para pagina
				response({
                    'statusCode': 200,
                    'body': ("Login feito com sucesso")
                });
			} else {
				response.send('Email ou password incorretos!');
			}			
			//response.end();
		});
	} else {
		response.send('Introduzir email e password');
	}
}

async function getId(request, response) {
	let email = request.session.email;
	console.log(request.session.idUtilizador)
	if (email) {
		
		connect.con.query('SELECT idUtilizador FROM utilizador WHERE email = ?', [email], function(error, results, fields) {
			
			if (error) throw error;
			// Se existe
			if (results.length > 0) {
				
				response({
                    'statusCode': 200,
                    'body': (results[0])
                });
			} else {
				response.send('Erro com este email');
			}			
			//response.end();
		});
	} else {
		response.send('Erro, falta email');
	}
}

async function getIdTipoUtilizador(request, response) {
	let email = request.session.email;
	if (email) {
		
		connect.con.query('SELECT idTipoUtilizador FROM utilizador WHERE email = ?', [email], function(error, results, fields) {
			
			if (error) throw error;
			// Se existe
			if (results.length > 0) {
				
				response({
                    'statusCode': 200,
                    'body': (results[0])
                });
			} else {
				response.send('Erro com este email');
			}			
			//response.end();
		});
	} else {
		response.send('Erro, falta email');
	}
}


function registoManutencao (req, callback){
    console.log(req.body);
    const nome = req.body.nome;
    const apelido = req.body.apelido;
    const email = req.body.email;
    const numeroTrabalhador = req.body.numeroTrabalhador;
    const nif = req.body.nif;
    const telefone =req.body.telefone;
    const dataNascimento = req.body.dataNascimento;
    const password = req.body.password;
	const idTipoUtilizador = 11;

    const post = { nome: nome, apelido: apelido, email: email, numeroTrabalhador: numeroTrabalhador, nif: nif, telefone: telefone, dataNascimento: dataNascimento, password: password, idTipoUtilizador: idTipoUtilizador};
    const query = connect.con.query('INSERT INTO utilizador SET ?', post, function(err, rows, fields) {
    console.log(query.sql);
    });
        callback({
            'statusCode': 200,
            'body': ("Registo feito com sucesso")
        })
}


module.exports = {
    registo: registo,
    login: login,
    getId: getId,
	registoManutencao: registoManutencao,
	getIdTipoUtilizador: getIdTipoUtilizador,
}