const user_route = require('express').Router()
const { User, Thought } = require('../../models')

//get all users
user_route.get('/users', async (req, res) => {
    try {
        const userList = await User.find({})
        res.json(userList)

    } catch (err) {
        res.json(err)

    }

})

//get user by id
user_route.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id


        const user = await User.findById(
            id
        )

        res.json(user) //return user

    } catch (err) {
        res.json(err)
    }
})

//create a new user
user_route.post('/users', async (req, res) => {
    try {
        const newUserData = req.body
        const newUser = await User.create(newUserData)
        res.json(newUser)

    } catch (err) {
        res.json(err)
    }
})

//update user by id
user_route.put('/users/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updatedUserData = req.body
        const updatedUser = await User.findByIdAndUpdate(
            id,
            updatedUserData,
            { new: true } //return updated user
        )
        res.json(updatedUser)
    } catch (err) {
        res.json(err)
    }
})

//delete user by id
user_route.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id
        await User.findOneAndDelete({ _id: id })
        //BONUS: whenever a user is deleted, delete all associated thoughts
        await Thought.deleteMany({ username: id })

        res.json({ message: 'User deleted' })
    } catch (err) {
        res.json(err)
    }
})

//add friend to user
user_route.post('/users/:userId/friends/:friendId', async (req, res) => {
    try {
        const userId = req.params.userId
        const friendId = req.params.friendId
        const addFriend = await User.findOneAndUpdate(
            { _id: userId },//find user by id
            { $addToSet: { friends: friendId } }, //set friendId into friends array 
            //$addToSet is used to prevent duplicate friends
            { new: true } //return updated user
        )
        res.json(addFriend)
    } catch (err) {
        res.json(err)
    }
})

//remove friend from user
user_route.delete('/users/:userId/friends/:friendId', async (req, res) => {
    try {
        const userId = req.params.userId
        const friendId = req.params.friendId
        await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { friends: friendId } }, //$pull is used to remove specific value from array ( pull friendId from friends array)
            { new: true }
        )
        //return updated user
        res.json({ message: 'Friend removed' })
    } catch (err) {
        res.json(err)
    }
})

module.exports = user_route
