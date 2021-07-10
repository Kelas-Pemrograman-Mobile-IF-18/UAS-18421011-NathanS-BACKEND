const router = require('express').Router()
const userController = require('../controller/User')

router.post('/signup', (req, res) => {

    userController.signup(req.body)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))

})

router.post('/signin', (req, res) => {
    userController.signin(req.body)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

module.exports = router