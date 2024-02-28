import _ from 'lodash';
import printMe from './print.js';
import { testBOM, readFile } from './bom.js';

function fileSelector() {
	const element = document.createElement('div');
	const sel = document.createElement('input');
	sel.setAttribute('type', 'file');
	sel.setAttribute('id', 'csvFileInput');
	sel.setAttribute('accept', '.csv');

	element.appendChild(sel);

	return element;
}

document.body.appendChild(fileSelector());
document.getElementById('csvFileInput').addEventListener('change', readFile);

// create file selector

testBOM('test_data.csv');