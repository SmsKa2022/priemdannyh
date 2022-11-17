const express = require('express')
const server = express()
const path = require('path');
const { debugPort } = require('process');
const PORT = 3000
const {db} = require('./src/db')
server.set('view engine', 'hbs');
server.set('views', path.join(__dirname, 'src', 'views'))
server.use(express.urlencoded({extended:true}));
server.use(express.static(__dirname + "/static"));


server.get('/', function (req, res) {
    res.render('index', {listOfPeople:db.people})
    })

server.get ('/abc', function (req, res)
    { res.sendFile(path.join(process.cwd(), 'abc.html'))
})
server.get ('*', (req, res)=> {
    res.send(`<div>
    <h1>404</h1>
    <a href='/'> Ступай на главную страницу и не пиши чушь</a>
    </div>`)
})
server.post('/adressbook', function (req,res) {
    const dataFromFrom = req.body;
    // db.people.push(dataFromFrom);
    let name = dataFromFrom.name;
    let phone = dataFromFrom.phone;
    db.people.push({
        name: name,
        phone: phone
    });
    res.redirect('/');
})

    // this.app.use(express.static(path.join(__dirname, "index.html")));
server.listen(PORT)
console.log('http://127.0.0.1:3000')
console.log('http://localhost:3000')
console.log('http://localhost:3000/abc')
console.log('http://localhost:3000/abcd прокатились на еже')