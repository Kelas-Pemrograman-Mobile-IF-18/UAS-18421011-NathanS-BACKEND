const wallet = require('../model/Wallet')
const response = require('../config/response')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

exports.inputWallet = (data, pics) =>
    new Promise(async (resolve, reject) => {
        const newWallet = new wallet({
            walletCode : data.walletCode,
            walletType : data.walletType,
            walletPrc  : data.walletPrc,
            pics  : pics
        })

        await wallet.findOne({walletCode: data.walletCode})
            .then(wallet => {
                if (wallet){
                    reject(response.commonErrorMsg('Wallet Already Exist'))
                } else {
                    newWallet.save()
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

exports.viewWallet = () =>
    new Promise(async (resolve, reject) => {
        wallet.find({})
            .then(result => {
                resolve(response.commonResult(result))
            })
            .catch(() => reject(response.commonErrorMsg('Server Down, Wait')))
    })

exports.viewWalletDetail = (walletCode) =>
    new Promise(async (resolve, reject) => {
        wallet.findOne({walletCode: walletCode})
            .then(result => {
                resolve(response.commonResult(result))
            })
            .catch(() => reject(response.commonErrorMsg('Server Down, Wait')))
    })

exports.updateWallet = (id, data, pics) =>
    new Promise(async (resolve, reject) => {
        await wallet.updateOne(
            {_id: ObjectId(id)},
            {
                $set: {
                    walletCode : data.walletCode,
                    walletType : data.walletType,
                    walletPrc  : data.walletPrc,
                    pics  : pics
                }
            }
        ).then(wallet => {
            resolve(response.commonSuccessMsg('Update Success'))
        }).catch(err => {
            reject(response.commonErrorMsg('Server Down, Wait'))
        })
    })

exports.deleteWallet = (_id) =>
    new Promise(async (resolve, reject) => {
        await wallet.remove({_id: ObjectId(_id)})
            .then(() => {
                resolve(response.commonSuccessMsg('Delete Success'))
            }).catch(() => {
                reject(response.commonErrorMsg('Delete Failed'))
            })
    })
