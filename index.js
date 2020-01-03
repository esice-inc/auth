require('dotenv').config()
const config = require('config');

const api = require('./api/v1');
const databaseFactory = require('./lib/database/factory');

const db = databaseFactory.create(config.database);
const app = api(db, config.api);

app.listen(config.api.port);
console.log('Esice auth service is listening on ', config.api.port);
