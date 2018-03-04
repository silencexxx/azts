var azure = require('azure-storage');
var tableSvc = azure.createTableService();

tableSvc.createTableIfNotExists('snicodestablesvc', (err, result, response) => {
	if (!err) {
		console.log('no err!');
		let entGen = azure.TableUtilities.entityGenerator;
		var sniObj = {
			PartitionKey 	: engGen.String('sni'),
			RowKey		: engGen.String('1'),
			SniCode		: 9999,
			SniDescription	: 'test'
		};

		tableSvc.insertEntity('snicodestablesvc', sniObj, (insErr, insResult, insResponse) => {
			if (!insErr) {
				console.log('insert ok!');
			}
		});
	}
});


