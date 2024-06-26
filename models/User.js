const { model, Schema } = require('mongoose')

//validate email function 
const validateEmail = function (email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
}

//user schema
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        //match email format
        validate: [validateEmail, 'Please enter a valid email address'],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ]

}, {
    toJSON: {
        virtuals: true,
    },
    id: false
}

)



//get the amount of friends a user has
userSchema.virtual('friendCount')
    .get(function () {
        return this.friends.length // get length of friends array
    })

//init user model
const User = model('User', userSchema)

module.exports = User