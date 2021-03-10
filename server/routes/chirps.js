const express = require('express');
const QueryString = require('qs');
const chirpsStore = require('../chirpstore')

let router = express.Router();

router.get('/:id?', (req, res) => {
    let id = req.params.id
    if (id) {
        res.json(chirpsStore.GetChirp(id))
    } else {
        let chirps = chirpsStore.GetChirps()

        let ids = Object.keys(chirps)
        let newChirps = ids.map(id => {
            return {
                id: id,
                username: chirps[id].username,
                message: chirps[id].message
            }
        })

        newChirps.pop()
        res.send(newChirps)
    }
});

router.post('/', (req, res) => {
    chirpsStore.CreateChirp(req.body);
    res.sendStatus(200)
})

router.put('/:id?', (req, res) => {
    let id = req.params.id
    chirpsStore.UpdateChirp(id, req.body)
    res.status(200).send(`Updated chirp: ${req.body.username}, ${req.body.message}`)
})

router.delete('/:id?', (req, res) => {
    let id = req.params.id
    chirpsStore.DeleteChirp(id)
    res.sendStatus(200)
})

module.exports = router;