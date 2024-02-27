import _ from 'lodash';
import printMe from './print.js';
import { testBOM } from './bom.js';

function component() {
	const element = document.createElement('div');
	const btn = document.createElement('button');

	// Lodash, now imported by this script
	element.innerHTML = _.join(['Hello', 'webpack'], ' ');
	btn.innerHTML = 'Click me and check the console!';
	btn.onclick = printMe;

	element.appendChild(btn);

	return element;
}

function fileSelector() {
	const element = document.createElement('div');
	const sel = document.createElement('input');
	sel.setAttribute('type', 'file');
	sel.setAttribute('id', 'csvFileInput');
	sel.setAttribute('accept', '.csv');

	element.appendChild(sel);

	return element;
}

document.body.appendChild(component());
document.body.appendChild(fileSelector());

// create file selector

testBOM('test_data.csv');