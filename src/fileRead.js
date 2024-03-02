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

function partApply(f, x) {
	return function(y) {
			return f(x, y);
	}
}

// partApply() is given a function f and an argument, x.
// 	f() usually takes two arguments.
// partApply creates a *new, anonymous function*, which takes only one argument, and returns it.
// 	internally, that function will have access to both parameters - x and y - due to its scope when executed.

// So in this case, the REAL function f() is readFileAction(event, func) -
// 	 which will read the file that it can get from the event and execute the provided callback function on it.
// in this case, *x* would be the callback function I'm trying to partially apply.

// so the call becomes:
// partApply(readFileAction, processCSVData)

export {readFileAction, processCSVData, partApply };