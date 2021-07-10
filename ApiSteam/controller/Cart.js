const cart = require('../model/Cart')
const response = require('../config/response')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

exports.inputCart = (data) =>
    new Promise(async (resolve, reject) => {
        const newCart = new cart({
            namaGame : data.namaGame,
            harga : data.harga
        })

        await cart.findOne({namaGame: data.namaGame})
            .then(cart => {
                if (cart){
                    reject(response.commonErrorMsg('Game Already Exist'))
                } else {
                    newCart.save()
                        .then(r=>{
                            resolve(response.commonSuccessMsg('Add to Cart Success'))
                        }).catch(err => {
                        reject(response.commonErrorMsg('Add to Cart Failed'))
                    })
                }
            }).catch(err => {
                reject(response.commonErrorMsg('Server Down, Wait'))
            })
    })

exports.viewCart = () =>
    new Promise(async (resolve, reject) => {
        cart.find({})
            .then(result => {
                resolve(response.commonResult(result))
            })
            .catch(() => reject(response.commonErrorMsg('Server Down, Wait')))
    })

exports.viewCartDetail = (namaGame) =>
    new Promise(async (resolve, reject) => {
        cart.findOne({namaGame: namaGame})
            .then(result => {
                resolve(response.commonResult(result))
            })
            .catch(() => reject(response.commonErrorMsg('Server Down, Wait')))
    })

exports.deleteCart = (_id) =>
    new Promise(async (resolve, reject) => {
        await cart.remove({_id: ObjectId(_id)})
            .then(() => {
                resolve(response.commonSuccessMsg('Delete Success'))
            }).catch(() => {
                reject(response.commonErrorMsg('Delete Failed'))
            })
    })
