
import express from 'express';
import mongoose from'mongoose'
import cors from'cors'
import Pusher from 'pusher';
import dotenv from 'dotenv'
const PORT =process.env.PORT || 4000

import router from './routes/index.js'

dotenv.config()



const pusher = new Pusher({
    appId:process.env.PUSHER_APPID,
    key:process.env.PUSHER_KEY,
    secret:process.env.PUSHER_SECRET,
    cluster: "eu",
    useTLS: true
  });


const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/',router)


const connection_url=process.env.MONGO_APP_KEY





const start =async()=>{
    mongoose.connect(connection_url,{
        // useCreateIndex: true,`
        // useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("connected"))
    .catch((err)=>console.log(err))

    const db = mongoose.connection

    db.once('open',()=>{
        console.log("db contected")
        const msgCollection = db.collection('messagecontents');
        const changeStream=msgCollection.watch();


        changeStream.on('change',(change)=>{
            console.log(change)
            if(change.operationType === 'insert'){
                const messageDetails =change.fullDocument;
               
                    pusher.trigger('global',"inserted",{
                        name:messageDetails.name,
                        message:messageDetails.message,
                        timestamp:messageDetails.timestamp,
                        received:messageDetails.received,
                        channel:messageDetails.channel,
                    })
            
           
                    pusher.trigger('party',"hoot",{
                        name:messageDetails.name,
                        message:messageDetails.message,
                        timestamp:messageDetails.timestamp,
                        received:messageDetails.received,
                        channel:messageDetails.channel,
                    })
                    pusher.trigger('vixa',"boom",{
                        name:messageDetails.name,
                        message:messageDetails.message,
                        timestamp:messageDetails.timestamp,
                        received:messageDetails.received,
                        channel:messageDetails.channel,
                    })
               
            }else{
                console.log('Error triggering Pusher')
            }

        })

    
    })
     app.listen(PORT ,()=>{
      console.log('Server started on port ', PORT)
    })
}

start()