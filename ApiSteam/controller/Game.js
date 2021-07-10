const game = require('../model/Game')
const response = require('../config/response')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

exports.inputGame = (data, pics) =>
    new Promise(async (resolve, reject) => {
        const newGame = new game({
            codeGame : data.codeGame,
            namaGame : data.namaGame,
            harga : data.harga,
            developer : data.developer,
            rdate : data.rdate,
            pics : pics
        })

        await game.findOne({codeGame: data.codeGame})
            .then(game => {
                if (game){
                    reject(response.commonErrorMsg('Game Already Exist'))
                } else {
                    newGame.save()
                        .then(r=>{
                            resolve(response.commonSuccessMsg('Input Success'))
                        }).catch(err => {
                            reject(response.commonErrorMsg('Input Failed'))
                    })
                }
            }).catch(err => {
                reject(response.commonErrorMsg('Server Down, Wait'))
        })
    })

exports.viewGame = () =>
    new Promise(async (resolve, reject) => {
        game.find({})
            .then(result => {
                resolve(response.commonResult(result))
            })
            .catch(() => reject(response.commonErrorMsg('Server Down, Wait')))
        })

exports.viewGameDetail = (codeGame) =>
    new Promise(async (resolve, reject) => {
        game.findOne({codeGame: codeGame})
            .then(result => {
                resolve(response.commonResult(result))
            })
            .catch(() => reject(response.commonErrorMsg('Server Down, Wait')))
    })

exports.updateGame = (id, data, pics) =>
    new Promise(async (resolve, reject) => {
        game.updateOne(
            {_id: ObjectId(id)},
            {
                $set: {
                    codeGame : data.codeGame,
                    namaGame : data.namaGame,
                    harga : data.harga,
                    developer : data.developer,
                    rdate : data.rdate,
                    pics : pics
                }
            }
        ).then(game => {
            resolve(response.commonSuccessMsg('Update Success'))
        }).catch(err => {
            reject(response.commonErrorMsg('Server Down, Wait'))
        })
    })

exports.deleteGame = (_id) =>
    new Promise(async (resolve, reject) => {
        await game.remove({_id: ObjectId(_id)})
            .then(() => {
                resolve(response.commonSuccessMsg('Delete Success'))
            }).catch(() => {
                reject(response.commonErrorMsg('Delete Failed'))
            })
    })
