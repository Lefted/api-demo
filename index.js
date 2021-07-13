const express = require('express')
const app = express()
const PORT = 8080;
const fs = require('fs')

app.use(express.json())

app.get('/tshirt', (req, res) => {


    fs.readFile('file.txt', 'utf8', (err, data) => {

        if (err)
            console.error(err)

        console.log(data)

        res.status(200).send({
            'data': data
        })
    })
})

app.listen(PORT, () => {

})

app.post('/tshirt/:id', (req, res) => {

    const { id } = req.params
    const { logo } = req.body;

    if (!logo)
        res.status(418).send({ message: 'We need a logo!' })


    let content = `Tshirt with your ${logo} and ID of ${id}`

    fs.writeFile('file.txt', content, err => {
        if (err) {
            console.error(err)
            return;
        }

    })
    res.send({ tshirt: `Tshirt with your ${logo} and ID of ${id}` })
})