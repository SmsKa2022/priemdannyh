const express = require('express')
const server = express()
const path = require('path');
const PORT = 3000
server.use(express.static(__dirname + "/static"));


server.get('/', function (req, res) {
    res.sendFile(path.join(process.cwd(), 'index.html'))
})


    // this.app.use(express.static(path.join(__dirname, "index.html")));
server.listen(PORT)
console.log('http://127.0.0.1:3000')
console.log('http://localhost:3000')