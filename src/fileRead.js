// Purpose: povide a streamlined interface for the FileReader API.

function readFile(event) {

}

function processCSVData(data) {
	let rows = data.split("\n");
	rows.forEach(row => {
		let columns = row.split(","); // assuming a split on comma is correct
		console.log(columns);
	});
}

class FileTask {
  constructor(_callback) {
    this.callback = _callback;
  }

  handleEvent(event) {
    let file = event.target.files[0];

    let reader = new FileReader();
  
    reader.onload = function(e) {
      let csvData = e.target.result;
      this.callback(csvData);
    }
  
    reader.readAsText(file);
  }
}

export {readFile, processCSVData, FileTask};