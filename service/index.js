const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.disable('etag');

app.get('/', (req, res) => {
	res.status(200).send({
		message: 'hello love <3'
	});
})

const router = require('../service/app/routes');
app.use('/api/v1/', router)

app.listen(3001, () => {
	console.log('server started successfully!! 🚀🚀🚀');
})
