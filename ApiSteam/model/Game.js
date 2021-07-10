const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    codeGame: {
        type: String
    },
    namaGame: {
        type: String
    },
    harga: {
        type: String
    },
    pics: {
        type: String
    },
    developer: {
        type: String
    },
    rdate: {
        type: String
    }

})

module.exports = mongoose.model('game', userSchema)