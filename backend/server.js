require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8000;
const passport = require('passport');

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// passport middleware
app.use(passport.initialize());
// import passport filr into server
require('./config/passport')(passport);


app.get('/', (req, res)=> {
    res.status(200).json({ message: 'Smile you been watch by Backend Team'})
})

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
})
