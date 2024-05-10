const { model , Schema, Types} = require('mongoose')

const reactionSchema = new Schema({
    //===reactionId
    //objectId data type 
    //default value is set to a new objectId
    reactionId: {
        type: Schema.Types.ObjectId,
        default: new Types.ObjectId()
    }

})

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },

    username: {
        type: String,
        required: true
    },
    
    reactions: [reactionSchema]
}, {
    toJSON: {
        virtuals: true
    },
    id: false,
    timestamps: true
})

