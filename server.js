const express=require('express');
const mongojs=require ('mongojs');
const db=mongojs('accounts',['users']);

const app=express();

app.set('view engine','ejs');

app.get('/',(req,res)=>{
    db.users.find((err,data)=>{
        res.render('index',{data:data})
    })   
})

app.get('/add',(req,res)=>{
    res.render('add_view')
})

app.listen('3000',()=>{
    console.log("Listening server on 3000");
})