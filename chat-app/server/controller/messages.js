const Message = require('../model/message');
const messageRouter = require("express").Router();

messageRouter.post("/", async (req, res, next) => {
    try{
        const { from, to, message } = req.body;
        const data = new Message({
            message:{
                text: message,
            },
            users: [from, to],
            sender: from
        })
        const savedMessage = await data.save();
        if(savedMessage){
            return res.json({status:true, message:savedMessage});
        }else {
            return res.json({status:false, message:"Message not sent"});
        }

    }catch(err){
        next(err);
    }
})

messageRouter.post("/get", async (req, res, next) => {
    try {
        const {from, to} = req.body;
        const messages = await Message.find({
            users: {
                $all: [from, to]
            }
        }).sort({updatedAt: 1});

        const messages2 = messages.map(message => {
            return {
                fromSelf: message.sender.toString() === from,
                message: message.message.text
            }
        })

        return res.json(messages2);
    }catch(err){
        next(err);
    }
})

module.exports = messageRouter;