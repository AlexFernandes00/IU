const mysql = require('mysql');
module.exports = {
	con: mysql.createConnection({
		host     : 'ec2-99-80-170-190.eu-west-1.compute.amazonaws.com',
		user     : 'uizaszyhizdori',
		password : 'f644718270f067e3cd7403e16171a44d0c6deda64505a3b29959baf30e151fb7',
		database : 'd3fqqj57f2logs'
	})
};
//mysql://b7fd7111349504:9a7139dc@eu-cdbr-west-01.cleardb.com/heroku_4fd2a451b6abe21?reconnect=true