const mysql = require('mysql');
module.exports = {
	con: mysql.createConnection({
		host     : 'eu-cdbr-west-01.cleardb.com',
		user     : 'b7fd7111349504',
		password : '9a7139dc',
		database : 'heroku_4fd2a451b6abe21'
	})
};
//mysql://b7fd7111349504:9a7139dc@eu-cdbr-west-01.cleardb.com/heroku_4fd2a451b6abe21?reconnect=true