const express = require('express');
const server = express();
const fs = require('fs');
const path = require('path');
const PORT = 3000;
server.set('view engine', 'hbs');
server.set('views', path.join(__dirname, 'src', 'views'));
server.use(express.urlencoded({extended:true}));
server.use(express.static(__dirname + "/static"));


server.get ('/', (req, resp) => {
    const usersQuery = req.query;
    let listpeopleForRender = JSON.parse(fs.readFileSync('./src/data.json'));
    if (usersQuery.limit != undefined && Number.isNaN(+usersQuery.limit) === false) {
       listpeopleForRender = listpeopleForRender.slice(0, usersQuery.limit);
    }
    resp.render('index',{listOfPeople:listpeopleForRender})
})

//server.get('/', function (req, res) {
 //   res.render('index', {listOfPeople:db.people})
   // })

server.get ('/abc', function (req, res)
    { res.sendFile(path.join(process.cwd(), 'abc.html'))
})

server.get ('/index.html', function (req, res)
    { res.sendFile(path.join(process.cwd(), 'index.html'))
})

server.post('/adressbook', function (req,res) {
    let peopleFromDb = JSON.parse(fs.readFileSync('./src/data.json'));
    const dataFromFrom = req.body;
    // db.people.push(dataFromFrom);
    let name = dataFromFrom.name;
    let phone = dataFromFrom.phone;
    peopleFromDb.push({
        name: name,
        phone: phone
    });
    fs.writeFileSync('./src/data.json', JSON.stringify(peopleFromDb));
    res.redirect('/');
})

server.get ('*', (req, res)=> {
       res.render('404')
    })

    // this.app.use(express.static(path.join(__dirname, "index.html")));
server.listen(PORT)
console.log('http://127.0.0.1:3000')
console.log('http://localhost:3000')
console.log('http://localhost:3000/abc')
console.log('http://localhost:3000/abcd прокатились на еже')
console.log('http://localhost:3000/index.html')