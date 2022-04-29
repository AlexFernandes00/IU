const mysql = require('mysql');
module.exports = {
	con: mysql.createConnection({
		host     : 'eu-cdbr-west-02.cleardb.net',
		user     : 'bfad16328b5182',
		password : 'cd9dc304',
		database : 'heroku_80fe657101d8766'
	})
};
//mysql://b7fd7111349504:9a7139dc@eu-cdbr-west-01.cleardb.com/heroku_4fd2a451b6abe21?reconnect=true