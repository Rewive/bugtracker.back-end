const express = require(`express`);
const app = express();
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const config = require('config');
const PORT = config.get('port') || 3000;

app.use(express.static('public'));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); //свагер
app.use('/api/docs', swaggerUi.serve); //свагер
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser());
app.disable('x-powered-by');

app.use('/', require('./main/router'));
app.use('/', require('./product/router'));

app.get('/api/docs', swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => console.log(`App has been started! \nURL: http://localhost:${PORT}`));