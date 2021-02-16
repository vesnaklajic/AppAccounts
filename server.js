const express = require('express');
const mongojs = require('mongojs');
const db = mongojs('accounts', ['users']);

const app = express();

app.set('view engine', 'ejs');
//body parser is now in express
//now we have acces to the body of request /save
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    db.users.find((err, data) => {
        res.render('index', { data: data })
    })
})

app.get('/add', (req, res) => {
    res.render('add_view')
})
app.post('/save', (req, res) => {
    db.users.insert({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        tel: req.body.tel
    }, (err, data) => {
        res.redirect('/')
    })
})


app.get('/edit', (req, res) => {
    db.users.find((err, data) => {
        res.render('edit_view', { data: data })
    })
})


app.get('/delete_acc/:id', (req, res) => {
    let id = req.params.id;
    db.users.remove({ "_id": db.ObjectId(id) }, (err, data) => {
        res.redirect('/')
    })
})

app.get('/edit_acc/:id', (req, res) => {
    let id = req.params.id;
    db.users.findOne({ "_id": db.ObjectId(id) }, (err, data) => {
        res.render('edit-form-view', { data: data })
    })
})

app.post('/edit_db', (req, res) => {
    let id = req.body.id;
    db.users.update({"_id":db.ObjectId(id)}, {$set: {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            tel: req.body.tel
        }
    }, (err, data) => {
        res.redirect('/')
    })
})

app.listen('3000', () => {
    console.log("Listening server on 3000");
})