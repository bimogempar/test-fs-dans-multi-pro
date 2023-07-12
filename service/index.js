const express = require('express');
const morgan = require('morgan');
const app = express();
const router = require('../service/app/routes');

app.use(morgan('dev'));
app.disable('etag');

app.get('/', (req, res) => {
	res.status(200).send({
		message: 'hello love <3'
	});
})

app.use('/api/v1/', router)

app.listen(3001, () => {
	console.log('server started successfully!! 🚀🚀🚀');
})
