var azure = require('azure-storage');
var tableSvc = azure.createTableService();

tableSvc.createTableIfNotExists('snicodestablesvc', (err, result, response) => {
	if (!err) {
		console.log('no err!');
		let entGen = azure.TableUtilities.entityGenerator;
		var sniObj = {
			PartitionKey 	: entGen.String('sni'),
			RowKey		: entGen.String('1'),
			SniCode		: entGen.Int32(9999),
			SniDescription	: entGen.String('test')
		};

		tableSvc.insertEntity('snicodestablesvc', sniObj, (insErr, insResult, insResponse) => {
			if (!insErr) {
				console.log('insert ok!');
			}
		});
	}
});


