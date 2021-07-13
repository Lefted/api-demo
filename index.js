const express = require('express')
const app = express()
const PORT = 8080;
const fs = require('fs')

// middleware -> convert bodies to json
app.use(express.json())

// post endpoint to create grades
app.post('/:klasse/:schueler_id', (req, res) => {
    const { vorname, nachname, endnote } = req.body
    const { klasse, schueler_id } = req.params

    // assert that values exist
    if (!vorname || !nachname || !endnote) {
        statusCode = 400
        message = 'expected vorname, nachname, endnote'
        res.status(400).send({ 'message': 'expexted vorname, nachname, endnote' })
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

// app.get('/tshirt', (req, res) => {


//     fs.readFile('file.txt', 'utf8', (err, data) => {

//         if (err)
//             console.error(err)

//         console.log(data)

//         res.status(200).send({
//             'data': data
//         })
//     })
// })

app.listen(PORT)

// app.post('/tshirt/:id', (req, res) => {

//     const { id } = req.params
//     const { logo } = req.body;

//     if (!logo)
//         res.status(418).send({ message: 'We need a logo!' })


//     let content = `Tshirt with your ${logo} and ID of ${id}`

//     fs.writeFile('file.txt', content, err => {
//         if (err) {
//             console.error(err)
//             return;
//         }

//     })
//     res.send({ tshirt: `Tshirt with your ${logo} and ID of ${id}` })
// })