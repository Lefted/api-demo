const express = require('express')
const app = express()
const PORT = 8080;
const fs = require('fs')

// middleware -> convert bodies to json
app.use(express.json())

// post endpoint to create grades
app.post('/noten/:klasse/:schueler_id', (req, res) => {
    const { vorname, nachname, endnote } = req.body
    const { klasse, schueler_id } = req.params
    const { passwort } = req.headers

    // assert that values exist
    if (!vorname || !nachname || !endnote) {
        res.status(400).send({ 'message': 'expexted vorname, nachname, endnote' })
        return
    }
    if (!passwort || passwort !== '123456') {
        res.status(400).send({ 'message': 'access denied. invalid or undefined passwort header' })
        return
    }

    const path = `./noten/${klasse}/${schueler_id}.txt`
    const content = JSON.stringify({ vorname, nachname, endnote }, null, 2)

    // create new entry in filesystem
    fs.writeFile(`./noten/${klasse}/${schueler_id}.txt`, content, (err) => {
        if (err) {
            console.error(err)
            res.status(500).send({ 'message': 'unable to create entry' })
        }
    })

    res.status(200).send({
        "message": 'success',
    })
})

// get endpoint for reading students grades
app.get('/noten/:klasse/:schueler_id', (req, res) => {
    const { klasse, schueler_id } = req.params
    const path = `./noten/${klasse}/${schueler_id}.txt`

    // assert that entry exists
    if (!fs.existsSync(path)) {
        res.status(404).send({ 'message': 'entry not found' })
        return
    }

    // read file
    fs.readFile(path, 'utf8', (err, content) => {
        if (err)
            res.status(500).send({ 'message': 'unable to read entry' })

        // send content back
        res.status(200).send(content)
    })
})

app.listen(PORT)