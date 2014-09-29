var express = require('express')
var exphbs = require('express-handlebars')
var db = require('./data/database-config')
var bodyParser = require('body-parser')
var session = require('express-session')

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

app.engine('html', exphbs({defaultLayout: 'layout'}))

app.set('view engine', 'html')

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

app.use('/', require('./routers/app-router')(app) );

app.use('/admin', require('./routers/admin-router')(app) );

app.use('/api', require('./routers/api-router')(app) );


app.listen(1234);
