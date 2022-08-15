import mongoose from 'mongoose';
// const mongoose = require('mongoose');

const whatsappSchema =mongoose.Schema({
    message:String,
    name:String,
    timestamp:String,
    channel:String,
    received:Boolean,
})
const Messages = mongoose.model('messagecontents',whatsappSchema)


export default Messages;


// const whatsappSchema =mongoose.Schema({
//     message:String,
//     name:String,
//     timestamp:String,
//     received:Boolean,
// })

// module.exports = mongoose.model('messageContent',whatsappSchema)



