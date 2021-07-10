const multer = require('multer')
const fs = require('fs')
const router = require('express').Router()
const wallet = require('../controller/Wallet')

var storage = multer.diskStorage({
    filename: function (req, file, cb) {
        let ext = file.originalname.substring(
            file.originalname.lastIndexOf("."),
            file.originalname.length
        )
        cb(null, Date.now() + ext);
    },
    destination: function (req, file, cb) {
        cb(null, './pics')
    }
})

var upload = multer({storage: storage}).single("pics")

router.post("/input", upload, (req , res) => {
    wallet.inputWallet(req.body, req.file.filename)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.get("/dataWallet", (req, res) => {
    wallet.viewWallet()
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.put("/update/:id", upload, (req, res) => {
    let fileName;
    if (req.body.pics){
        fileName = req.body.pics;
    } else {
        fileName = req.body.filename;
    }
    wallet.updateWallet(req.params.id, req.body, fileName)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.get("/dataWallet/:id", (req, res) => {
    wallet.viewWalletDetail(req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.delete("/delete/:id", (req, res) => {
    wallet.deleteWallet(req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

module.exports = router
