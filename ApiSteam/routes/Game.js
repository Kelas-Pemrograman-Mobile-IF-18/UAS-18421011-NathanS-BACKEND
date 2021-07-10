const multer = require('multer')
const fs = require('fs')
const router = require('express').Router()
const game = require('../controller/Game')

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

router.post("/input", upload, (req, res) => {
    game.inputGame(req.body, req.file.filename)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.get("/dataGame", (req, res) => {
    game.viewGame()
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
    game.updateGame(req.params.id, req.body, fileName)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.get("/dataGame/:id", (req, res) => {
    game.viewGameDetail(req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.delete("/delete/:id", (req, res) => {
    game.deleteGame(req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

module.exports = router
