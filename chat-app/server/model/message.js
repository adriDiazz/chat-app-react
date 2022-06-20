const {Schema, model} = require('mongoose');

const messageSchema = new Schema(
    {
        message: {
            text: {
                type: String,
                required: true
            },
        },
            users:Array,
            sender: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        },
        {
            timestamps: true
        })

const Message = model('Message', messageSchema);

module.exports = Message;