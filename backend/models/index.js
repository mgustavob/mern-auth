const mongoose = require('mongoose');

// mongo connection
mongoose.connect(process.env.MONGO-URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})


// mongoose connection object
const db = mongoose.connection;

// set and event listener to fire when the connection opens
// console.log what host and port its running

db.once('open', ()=>{
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`)
})

db.on('error', (error)=>{
    console.log(`Database error \n${error}`);
})


mongoose.model.exports.User = require('./User')
