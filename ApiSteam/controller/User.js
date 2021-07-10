const userModel = require('../model/User')
const response = require('../config/response')
const bcrypt = require('bcrypt')


exports.signup = (data) =>
    new Promise((resolve, reject) => {
        userModel.findOne({userName: data.userName})
           .then(user => {
               if (user){
                   resolve(response.commonErrorMsg('Username already taken'))
               } else {
                   bcrypt.hash(data.password, 10, (err, hash) => {
                       if (err) {
                           reject(response.commonErrorMsg)
                       } else {
                           data.password = hash
                           userModel.create(data)
                               .then(() => resolve(response.commonSuccessMsg('Sign Up Success')))
                               .catch(() => reject(response.commonErrorMsg('Sign Up Failed')))
                       }
                   })
               }
           }).catch(() => reject(response.commonError))
    })

exports.signin = (data) =>
    new Promise((resolve, reject) => {
        userModel.findOne({
            userName: data.userName
        }).then(user => {
            if(user){
                if (bcrypt.compareSync(data.password, user.password)){
                    resolve(response.commonResult(user))
                } else {
                    reject(response.commonErrorMsg('Wrong Password'))
                }
            } else {
                reject(response.commonErrorMsg('Username not found'))
            }
        })
    })
