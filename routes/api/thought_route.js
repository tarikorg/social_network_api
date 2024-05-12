const thought_route = require('express').Router()
const { User, Thought } = require('../../models')

//get all thoughts
thought_route.get('/thoughts', async (req, res) => {
    try {
        const getAllThoughts = await Thought.find({})
        res.json(getAllThoughts)
    } catch (err) {
        res.json(err)
    }
})

//get thought by id
thought_route.get('/thoughts/:id', async (req, res) => {
    try {
        const id = req.params.id
        const getThought = await Thought.findOne({ _id: id }).populate('reactions').populate('username')


        res.json(getThought)
    } catch (err) {
        res.json(err)
    }
})

//create a new thought
thought_route.post('/thoughts', async (req, res) => {
    try {
        //create a new thought
        //push the thought id to the user's thought array
        //return the new thought
        const newThoughtData = req.body
        const newThought = await Thought.create(newThoughtData)

        //if succesfull => push thought id to user thought array
        if (newThought) {
            //get required data for pushing user thought array
            const thoughtId = newThought._id
            const username = newThought.username
            const user = await User.findOneAndUpdate(
                { username: username },//target user by username
                { $push: { thoughts: thoughtId } },//push thought id to user thought array
                { new: true }
            )
        }

        res.json(newThought)
    } catch (err) {
        res.json(err)
    }
})

//update thought by id
thought_route.put('/thoughts/:id', async (req, res) => {
    try {
        const id = req.params.id
        const newThoughtData = req.body
        const updatedThought = await Thought.findOneAndUpdate(
            { _id: id },
            newThoughtData,
            { new: true }
        )
        res.json(updatedThought)

    } catch (err) {
        res.json(err)
    }
})

//delete thought by id
thought_route.delete('/thoughts/:id', async (req, res) => {
    try {
        const id = req.params.id
        await Thought.findOneAndDelete({ _id: id })
        //BONUS: delete user's associated thought 
        await User.findOneAndUpdate(
            { thoughts: id },
            { $pull: { thoughts: id } }
        )
        res.json({ message: 'Thought deleted!' })
    } catch (err) {
        res.json(err)
    }
})

// REACTIONS

//create a new reaction
thought_route.post('/thoughts/:thoughtId/reactions', async (req, res) => {
    try {
        const thoughtId = req.params.thoughtId
        const newReactionData = req.body
        const newReaction = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $push: { reactions: newReactionData } },
            { new: true }
        )
        res.json(newReaction)

    } catch (err) {
        res.json(err)
    }
})

//delete reaction by id
thought_route.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const thoughtId = req.params.thoughtId
        const reactionId = req.params.reactionId
        await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $pull: { reactions: { reactionId: reactionId } } },
            { new: true }
        )

        res.json({ message: 'Reaction deleted!' })
    } catch (err) {
        res.json(err)
    }
})

module.exports = thought_route