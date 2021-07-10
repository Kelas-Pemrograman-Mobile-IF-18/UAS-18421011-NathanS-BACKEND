const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    namaGame: {
        type: String
    },
    harga: {
        type: String
    }

})

module.exports = mongoose.model('cart', userSchema)