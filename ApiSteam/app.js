const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 6969
const dbConfig = require('./config/DbConfig');
const cors = require('cors');
const path = require('path')

mongoose.connect(dbConfig.mongoURL, {
    useNewUrlParser: true
}).then(() => console.log("connect mongodb"))
    .catch(err => console.log(err))

app.use(cors())

app.use(bodyParser.json({
    extended: true,
    limit: '50mb'
}))

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}))

app.use('/pics', express.static(path.join(__dirname, 'pics')))
app.use('/user', require('./routes/User'))
app.use('/wallet', require('./routes/Wallet'))
app.use('/game', require('./routes/Game'))
app.use('/cart', require('./routes/Cart'))

app.listen(port, function () {
    console.log('Server Load Success at '+ port)
})
