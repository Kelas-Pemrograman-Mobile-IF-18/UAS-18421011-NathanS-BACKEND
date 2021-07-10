const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    walletCode: {
        type: String
    },
    walletType: {
        type: String
    },
    walletPrc: {
        type: String
    },
    pics: {
        type: String
    }

})

module.exports = mongoose.model('wallet', userSchema)