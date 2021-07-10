const multer = require('multer')
const fs = require('fs')
const router = require('express').Router()
const cart = require('../controller/Cart')

var storage = multer.diskStorage({
    filename: function (req, file, cb) {
        let ext = file.originalname.substring(
            file.originalname.lastIndexOf("."),
            file.originalname.length
        )
        cb(null, Date.now() + ext);
    }
})

var upload = multer({storage: storage}).single("pics")

router.post("/input", upload, (req, res) => {
    cart.inputCart(req.body, req.file.filename)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.get("/dataCart", (req, res) => {
    cart.viewCart()
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.get("/dataCart/:id", (req, res) => {
    cart.viewCartDetail(req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.delete("/delete/:id", (req, res) => {
    cart.deleteCart(req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

module.exports = router
