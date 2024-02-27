// const testBOM = () => console.log("function exists!");

function testBOM(sourceFile) {
	console.log("function exists!");
	


}

function readFile(event) {
	let file = event.target.files[0];

	let reader = new FileReader();

	reader.onload = function(e) {
		let csvData = e.target.result;
		processCSVData(csvData);
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


export {testBOM, readFile};