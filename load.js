var fs = require('fs');
var azure = require('azure-storage');

var Read = function() {
	let content = fs.readFileSync('sni2007.csv', 'latin1').toString();
	let lines = content.split('\n');
	let d = lines.map((x) => x.split(';'));
	let d2 = d.filter((x) => parseInt(x[1]));
	console.log(d2);
	return d2;
}

var Load = function(data) {
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

Load(Read());

