const express = require('express');
const data = require('../data');

const router = express.Router();
let latestId = 0;

router.get('/', (req, res, next) => {
	res.json(data);
});

router.post('/', (req, res, next) => {
	const d = req.body;

	d.id = latestId;
	latestId = latestId + 1;

	data.push(d);
	res.status(201).json(d);
});

router.put('/:id', (req, res, next) => {
	const id = Number(req.params.id);

	for(let i = 0; i < data.length; i++) {
		if(data[i].id === id) {
			data[i] = req.body;
			data[i].id = id;
			break;
		}
	}

	res.sendStatus(200);
});

router.delete('/:id', (req, res, next) => {
	const id = Number(req.params.id);
	let index;

	for(let i = 0; i < data.length; i++) {
		if(data[i].id === id) {
			index = i;
			break;
		}
	}

	if(index >= 0) {
		data.splice(index, 1);
	}

	res.sendStatus(200);
});

module.exports = router;
