var fs = require('fs');
var azure = require('azure-storage');
var denodeify = require('denodeify');

var rf = denodeify(fs.readFile);

var Read = function() {
	return rf('sni2007.csv', 'latin1')
		.then(content => content.split('\n'))
		.then(lines => lines.map((x) => x.split(';')))
		.then(d => d.filter((x) => parseInt(x[1])));
}

var Load = function(data) {

	console.log(data);
	return;

	var tableSvc = azure.createTableService();

	tableSvc.createTableIfNotExists('snicodestablesvc', (err, result, response) => {
		if (!err) {
			console.log('no err!');
			let entGen = azure.TableUtilities.entityGenerator;
			
			data.forEach((x) => {
				var sniObj = {
					PartitionKey 	: entGen.String('sni'),
					RowKey		: entGen.String(x[1]),
					SniCode		: entGen.Int32(x[1]),
					SniCode2	: entGen.String(x[0]),
					SniDescription	: entGen.String(x[2])
				};

				tableSvc.insertEntity('snicodestablesvc', sniObj, (insErr, insResult, insResponse) => {
					if (!insErr) {
						console.log('insert ok!');
					}
					else {
						console.log(insErr);
					}
				});
			});
		}
		else {
			console.log(err);
		}
	});
}

Read().then(Load);

