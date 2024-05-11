const user_route = require('express').Router()
const { User, Thought } = require('../../models')

//get all users
user_route.get('/users', async (req, res) => {
    try {
        const userList = await User.findAll({
            include: [{ model: Thought }] //users has thoughts reference

        })
        res.json(userList)

    } catch (err) {
        res.json(err)
    }

})

//get user by id
user_route.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id
        //get a single user by _id and thoughts and friends
        //make use to return every friends of the user
        const user = await User.findOne({
            where: { _id: id },
            include: [{ model: Thought }]
        }).populate('friends') //return all friends of the user

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
        const updatedUser = await User.findOneAndUpdate({ _id: id },
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
        const deleteUser = await User.findOneAndDelete({ _id: id })

        res.json(deleteUser)
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
            { $addToSet: { friends: friendId } }, //set friendId into friends array , $addToSet is used to prevent duplicate friends
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
        const removeFriend = await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { friends: friendId } }, // $pull is used to remove specific value from array ( pull friendId from friends array)
            { new: true }
        )
        //return updated user
        res.json(removeFriend)
    } catch (err) {
        res.json(err)
    }
})

module.exports = user_route
