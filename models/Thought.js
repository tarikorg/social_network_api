const { model, Schema, Types } = require('mongoose')

//schema only, no model for reaction
//will be used as a subdocument in the thought model
const reactionSchema = new Schema({
    //===reactionId
    //objectId data type 
    //default value is set to a new objectId
    reactionId: {
        type: Schema.Types.ObjectId,
        default: new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    username: {
        type: String,
        required: true,

    }
}, {
    toJSON: {
        virtuals: true
    },
    id: false,
    timestamps: true

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


//the Thought model (reactionSchema is nested in thoughtSchema)
const Thought = model('Thought', thoughtSchema)

module.exports = Thought
