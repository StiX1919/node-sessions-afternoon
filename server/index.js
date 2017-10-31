const express = require('express');
const bodyParser = require('body-parser')
const session = require('express-session')
const checkForSession = require('./middlewares/checkForSession')

const swagController = require('./controllers/swag_controller')
const auth_controller = require('./controllers/auth_controller')
const cart_controller = require('./controllers/cart_controller')
const search_controller = require('./controllers/search_controller')

const app = express();

const port = 3000

app.use( bodyParser.json());
app.use( session({
    secret: 'shush',
    resave: false,
    saveUninitialized: false
}))
app.use( checkForSession )
app.use ( express.static(`{__dirname}/../public/build`))

app.get('/api/swag', swagController.read)

app.post('/api/login', auth_controller.login)
app.post('/api/register', auth_controller.register)
app.post('/api/signout', auth_controller.signout)
app.get('/api/user', auth_controller.getUser)

app.post('/api/cart', cart_controller.add)
app.post('/api/cart/checkout', cart_controller.checkout)
app.delete('/api/cart', cart_controller.delete)

app.get('/api/search', search_controller.search)

app.listen( port, () => { console.log(`Server is going live on port: ${port}`)})