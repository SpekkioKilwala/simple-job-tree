import _ from 'lodash';
import printMe from './print.js';
import { testBOM} from './bom.js';
import { readFileAction, processCSVData } from './fileRead.js';
import { partApply } from './basics.js';

function fileSelector() {
	const element = document.createElement('div');
	const sel = document.createElement('input');
	sel.setAttribute('type', 'file');
	sel.setAttribute('id', 'csvFileInput');
	sel.setAttribute('accept', '.csv');

	element.appendChild(sel);

	return element;
}

// test

document.body.appendChild(fileSelector());
document.getElementById('csvFileInput').addEventListener('change', partApply(readFileAction, processCSVData));

// create file selector

testBOM('test_data.csv');