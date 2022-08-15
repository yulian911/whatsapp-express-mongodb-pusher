import Messages from '../db.js'


class MessagesController {
    async createMessage(req, res, next) {
        const {name, message,timestamp,received,channel} = req.body

        
        try{
            await Messages.create({name, message, timestamp, received,channel})
            return res.status(200).json({msg:"stworzono"})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }

       
    }
    async getMessage(req, res, next) {
        const {channel} = req.query

        if(channel){
            try{
                const messages=  await Messages.find({channel})
                return res.status(200).json(messages)
              
             }catch(err){
                 return res.status(500).json({msg:err.message})
             }
        }else{
            try{
                const messages=  await Messages.find()
                return res.status(200).json(messages)
              
             }catch(err){
                 return res.status(500).json({msg:err.message})
             }
        }
       

       
    }
}

export default new MessagesController