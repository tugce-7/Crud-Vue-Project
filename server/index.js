
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require('../server/model/user.js')
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')

mongoose.connect('mongodb://localhost:27017/crud-vue', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
})

const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended :false}))

app.post('/signup'  ,  (req,res,next)=>{
const newUser = new User({
    username : req.body.username,
    password : bcrypt.hashSync(req.body.password,10) 
})
newUser.save(err=>{
    if(err){
        return res.status(400).json({
            title:'error',
            error :'email in use'
        })
    }
    return res.status(200).json({
        title:'sigunp success',
    })
})
})
app.post('/login', (req, res, next) => {
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) return res.status(500).json({
        title: 'server error',
        error: err
      })
      if (!user) {
        return res.status(401).json({
          title: 'user not found',
          error: 'invalid credentials'
        })
      }
      console.log(req.body)
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).json({
          tite: 'login failed',
          error: 'invalid credentials'
        })
      }
      let token = jwt.sign({ userId: user._id},'secretkey');
       return res.status(200).json({
         title: 'login sucess',
         token: token
       })
     })
  })

  app.get('/user', (req, res, next) => {
    let token = req.headers.token; 
    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err)
         return res.status(401).json({
          title: 'unauthorized'
         })

         User.findOne({ _id: decoded.userId }, (err, user) => {
            if (err) return console.log(err)
            return res.status(200).json({
              title: 'user grabbed',
              user: {
                username: user.username
            
              }
            })
          })}) 
})


const port = process.env.PORT || 5000;

app.listen(port , (err) => {
    if(err) return console.log(err);
    console.log('SERVER RUNNING' +port)
})