const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express();
const PORT = 3000;

// Single routing
const router = express.Router();

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(router);

app.use('/',require('./routes'))

app.listen(PORT, function (err) {
	if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});
