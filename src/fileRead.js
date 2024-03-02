function readFileAction(func, event) {
	// must use partial application on this to get an actual event handler
	// e.g.
	// partApply(readFileAction, processCSVData)
	let file = event.target.files[0];

	let reader = new FileReader();

	reader.onload = function(e) {
		let csvData = e.target.result;
		func(csvData);
	}

	reader.readAsText(file);
}

function processCSVData(data) {
	let rows = data.split("\n");
	rows.forEach(row => {
		let columns = row.split(","); // assuming a split on comma is correct
		console.log(columns);
	});
}

export {readFileAction, processCSVData };